const { response } = require('express');

const ObjectId = require('mongoose').Types.ObjectId;

const Payment = require('../models/payments.model');

/** =====================================================================
 *  GET PAYMENTS
=========================================================================*/
const getPayments = async(req, res = response) => {

    try {

        const skip = Number(req.query.skip);
        const limit = Number(req.query.limit);

        const payments = await Payment.find()
            .populate('subid')
            .skip(skip)
            .limit(limit);

        res.json({
            ok: true,
            payments,
            total: payments.length
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please try again'
        });
    }

};
/** =====================================================================
 *  GET PAYMENTS
=========================================================================*/

/** =====================================================================
 *  GET PAYMENT ID
=========================================================================*/
const getPaymentId = async(req, res = response) => {

    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error de ID'
            });
        }

        const paymentDB = await Payment.findById(id);

        if (!paymentDB) {
            return res.status(400).json({
                ok: false,
                msg: 'We have not found the payment, please try again.'
            });
        }

        res.json({
            ok: true,
            server: paymentDB
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please try again'
        });
    }

};
/** =====================================================================
 *  GET PAYMENT ID
=========================================================================*/

/** =====================================================================
 *  CREATE PAYMENT
=========================================================================*/
const createPayment = async(req, res = response) => {

    try {

        setTimeout(async() => {

            const payment = new Payment(req.body);

            // SAVE USER
            await payment.save();

            res.json({
                ok: true,
                payment
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
 *  CREATE PAYMENT
=========================================================================*/


/** =====================================================================
 *  UPDATE PAYMENT
=========================================================================*/
const updatePayment = async(req, res = response) => {

    const paid = req.params.id;

    try {

        if (!ObjectId.isValid(paid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error de ID'
            });
        }

        // SEARCH PAYMENT
        const paymentDB = await Payment.findById(paid);
        if (!paymentDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error con este perfil: CODE 108'
            });
        }
        // SEARCH PAYMENT

        // VALIDATE PAYMENT
        let {...campos } = req.body;
        const paymentUpdate = await Payment.findByIdAndUpdate(paid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            payment: paymentUpdate
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
 *  UPDATE PAYMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getPayments,
    getPaymentId,
    createPayment,
    updatePayment
};