const { response } = require('express');

const ObjectId = require('mongoose').Types.ObjectId;

const Subscription = require('../models/subscriptions.model');

/** =====================================================================
 *  GET SUBSCRIPTIONS
=========================================================================*/
const getSubscriptions = async(req, res = response) => {

    try {

        const subscriptions = await Subscription.find()
            .populate('server');

        res.json({
            ok: true,
            subscriptions,
            total: subscriptions.length
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
 *  GET SUBSCRIPTIONS
=========================================================================*/

/** =====================================================================
 *  GET SEARCH SUBSCRIPTIONS
=========================================================================*/
const searchSubscription = async(req, res = response) => {

    try {

        const query = req.params.query;
        const regex = new RegExp(query, 'i');

        const [subscriptions, total] = await Promise.all([
            Subscription.find({
                $or: [
                    { email: regex },
                    { name: regex },
                ]
            }).populate('server'),
            Subscription.countDocuments()
        ]);

        res.json({
            ok: true,
            subscriptions,
            total
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
 *  GET SEARCH SUBSCRIPTIONS
=========================================================================*/

/** =====================================================================
 *  GET SUBSCRIPTION ID
=========================================================================*/
const getSubscriptionId = async(req, res = response) => {

    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error ID'
            });
        }

        const subscriptionDB = await Subscription.findById(id);

        if (!subscriptionDB) {
            return res.status(400).json({
                ok: false,
                msg: 'We have not found this subscription, please try again.'
            });
        }

        res.json({
            ok: true,
            subscription: subscriptionDB
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
 *  GET SUBSCRIPTION ID
=========================================================================*/

/** =====================================================================
 *  CREATE SUBSCRIPTION
=========================================================================*/
const createSubscription = async(req, res = response) => {

    try {

        setTimeout(async() => {

            const subscription = new Subscription(req.body);
            subscription.email = subscription.email.toLowerCase();

            // SAVE USER
            await subscription.save();

            res.json({
                ok: true,
                subscription
            });

        }, 1000);



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please try again'
        });
    }
};
/** =====================================================================
 *  CREATE SUBSCRIPTION
=========================================================================*/

/** =====================================================================
 *  GET SUBSCRIPTIONS QUERY
=========================================================================*/
const postSubscriptionsQuery = async(req, res = response) => {

    try {

        const query = req.body;

        const subscriptions = await Subscription.find(query);

        res.json({
            ok: true,
            subscriptions,
            total: subscriptions.length
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
 *  GET SUBSCRIPTIONS QUERY
=========================================================================*/

/** =====================================================================
 *  UPDATE SUBSCRIPTION
=========================================================================*/
const updateSubscription = async(req, res = response) => {

    const suid = req.params.id;

    try {

        if (!ObjectId.isValid(suid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error ID'
            });
        }

        // SEARCH SUBSCRIPTION
        const subscriptionDB = await Subscription.findById(suid);
        if (!subscriptionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'We have not found this subscription, please try again.'
            });
        }
        // SEARCH SUBSCRIPTION

        // VALIDATE SUBSCRIPTION
        let { email, ...campos } = req.body;

        if (email) {
            email = email.toLowerCase();
            campos.email = email;
        }

        // UPDATE
        const subscriptionUpdate = await Subscription.findByIdAndUpdate(suid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            subscription: subscriptionUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please try again'
        });
    }

};
/** =====================================================================
 *  UPDATE SUBSCRIPTION
=========================================================================*/

// EXPORTS
module.exports = {
    getSubscriptions,
    getSubscriptionId,
    postSubscriptionsQuery,
    createSubscription,
    updateSubscription,
    searchSubscription
};