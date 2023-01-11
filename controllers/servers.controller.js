const { response } = require('express');

const ObjectId = require('mongoose').Types.ObjectId;

const Server = require('../models/servers.model');

/** =====================================================================
 *  GET SERVERS
=========================================================================*/
const getServers = async(req, res = response) => {

    try {

        const servers = await Server.find();

        res.json({
            ok: true,
            servers,
            total: servers.length
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  GET SERVERS
=========================================================================*/

/** =====================================================================
 *  GET SERVER ID
=========================================================================*/
const getServerId = async(req, res = response) => {

    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error de ID'
            });
        }

        const severDB = await Server.findById(id);

        if (!severDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este servidor, porfavor intente nuevamente.'
            });
        }

        res.json({
            ok: true,
            server: severDB
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  GET SERVER ID
=========================================================================*/

/** =====================================================================
 *  CREATE SERVER
=========================================================================*/
const createServer = async(req, res = response) => {

    try {

        setTimeout(async() => {

            const server = new Server(req.body);
            server.name = server.name.toLowerCase();

            // SAVE USER
            await server.save();

            res.json({
                ok: true,
                server
            });

        }, 1000);



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};
/** =====================================================================
 *  CREATE SERVER
=========================================================================*/


/** =====================================================================
 *  UPDATE SERVER
=========================================================================*/
const updateServer = async(req, res = response) => {

    const sid = req.params.id;

    try {

        if (!ObjectId.isValid(sid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error de ID'
            });
        }

        // SEARCH SERVER
        const severDB = await Server.findById(sid);
        if (!severDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error con este perfil: CODE 108'
            });
        }
        // SEARCH SERVER

        // VALIDATE SERVER
        let { name, ...campos } = req.body;
        name = name.toLowerCase();

        // UPDATE
        campos.name = name;
        const serverUpdate = await Server.findByIdAndUpdate(sid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            server: serverUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};
/** =====================================================================
 *  UPDATE SERVER
=========================================================================*/

// EXPORTS
module.exports = {
    getServers,
    getServerId,
    createServer,
    updateServer
};