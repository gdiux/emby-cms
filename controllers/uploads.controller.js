//

const path = require('path');
const fs = require('fs');

// const sharp = require('sharp');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

// HELPERS
const { updateImage } = require('../helpers/update-image');

// MODELS

/** =====================================================================
 *  UPLOADS FILES
=========================================================================*/
// const uploadFiles = async(req, res = response) => {

//     try {

//         const type = req.params.type;
//         const desc = req.params.desc;
//         const wid = req.params.wid;
//         const file = req.files.image;

//         // VALIDAR ARCHIVOS
//         const validArch = ['pdf', 'docx', 'xlsx', 'jpg', 'png', 'jepg', 'webp'];
//         const nameShort = file.name.split('.');
//         const extFile = nameShort[nameShort.length - 1];

//         if (!validArch.includes(extFile)) {

//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No se permite este tipo de archivo, solo extenciones PDF - Word - Excel - JPG - PNG - WEBP'
//             });
//         }
//         // VALIDAR ARCHIVOS

//         // ===========================================================
//         //  COMPROBAR SI ES ARCHIVO
//         // ==========================================================
//         if (type === 'archivos') {

//             // GENERATE NAME UID
//             const nameFile = `${ uuidv4() }.${extFile}`;

//             // PATH IMAGE
//             const path = `./uploads/archivos/${ nameFile }`;
//             file.mv(path, async(err) => {

//                 if (err) {
//                     return res.status(500).json({
//                         ok: false,
//                         msg: 'Error al guardar el archivo'
//                     });
//                 }

//                 // UPDATE IMAGE
//                 // updateImage(tipo, id, nameFile, uid, desc);

//                 // SEARCH USER BY ID
//                 const workerDb = await Worker.findById(wid);
//                 if (!workerDb) {
//                     return res.status(500).json({
//                         ok: false,
//                         msg: 'Error, no existe este usuario'
//                     });
//                 }

//                 workerDb.attachments.push({
//                     attachment: nameFile,
//                     type,
//                     desc,
//                     date: Date.now()
//                 });

//                 await workerDb.save();

//                 return res.json({
//                     ok: true,
//                     worker: workerDb,
//                 });

//             });


//         } else {
//             // ===========================================================
//             //  SI ES IMAGEN
//             // ==========================================================

//             // GENERATE NAME UID
//             const nameFile = `${ uuidv4() }.webp`;

//             // PATH IMAGE
//             const path = `./uploads/archivos/${ nameFile }`;

//             // CONVERTIR A WEBP
//             sharp(req.files.image.data)
//                 .resize(1024, 768)
//                 .webp({ equality: 75, effort: 6 })
//                 .toFile(path, async(err, info) => {

//                     // UPDATE IMAGE
//                     // const nuevo = await updateImage(tipo, id, nameFile, uid, desc);

//                     const workerDb = await Worker.findById(wid);
//                     if (!workerDb) {
//                         return res.status(500).json({
//                             ok: false,
//                             msg: 'Error, no existe este usuario'
//                         });
//                     }

//                     workerDb.attachments.push({
//                         attachment: nameFile,
//                         type,
//                         desc,
//                         date: Date.now()
//                     });

//                     await workerDb.save();

//                     return res.json({
//                         ok: true,
//                         worker: workerDb,
//                     });

//                 });
//         }


//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado, porfavor intente nuevamente'
//         });

//     }

// };

/** =====================================================================
 *  GET IMAGES
=========================================================================*/
const getImages = (req, res = response) => {

    const tipo = req.params.tipo;
    const image = req.params.image;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${image}`);

    // IMAGE DEFAULT
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {

        // CHECK TYPE
        if (tipo !== 'user') {
            const pathImg = path.join(__dirname, `../uploads/default.webp`);
            res.sendFile(pathImg);
        } else {
            const pathImg = path.join(__dirname, `../uploads/user/user-default.webp`);
            res.sendFile(pathImg);
        }

    }

};
/** =====================================================================
 *  GET IMAGES
=========================================================================*/


/** =====================================================================
 *  DELETE FILE
=========================================================================*/

// EXPORTS
module.exports = {
    // fileUpload,
    getImages
};