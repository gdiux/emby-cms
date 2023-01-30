const Subscription = require('../models/subscriptions.model');

const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));


/** =====================================================================
 *  GET SUBSCRIPTIONS
=========================================================================*/

async function validateDate() {

    try {

        let hoy = new Date().getTime();

        const subscribers = await Subscription.find({ expiration: { $lte: hoy }, status: true })
            .populate('server');

        if (subscribers.length > 0) {

            for (const subscriber of subscribers) {

                // OBTENER USER DE EMBY
                const userDB = await fetch(`${subscriber.server.url}/emby/Users/${subscriber.uid}`, {
                    method: 'GET',
                    headers: {
                        "X-Emby-Token": subscriber.server.apikey,
                    }
                });

                userDB.json().then(async user => {

                        if (user.Policy.IsAdministrator) {

                            let body = {
                                "IsDisabled": false,
                                "IsAdministrator": true
                            };

                            const response = await fetch(`${subscriber.server.url}/emby/Users/${subscriber.uid}/Policy`, {
                                method: 'post',
                                body: JSON.stringify(body),
                                headers: {
                                    'Content-Type': 'application/json',
                                    "X-Emby-Token": subscriber.server.apikey,
                                }
                            });

                            // const data = await response.json().then(async() => {

                            //     const response = await fetch(`${subscriber.server.url}/emby/Users/${subscriber.uid}/Policy`, {
                            //         method: 'post',
                            //         body: JSON.stringify(body),
                            //         headers: {
                            //             'Content-Type': 'application/json',
                            //             "X-Emby-Token": subscriber.server.apikey,
                            //         }
                            //     });

                            // });

                            await Subscription.findByIdAndUpdate(subscriber._id, { status: false }, { new: true, useFindAndModify: false })
                        } else {

                            const response = await fetch(`${subscriber.server.url}/emby/Users/${subscriber.uid}/Policy`, {
                                method: 'post',
                                body: JSON.stringify({ "IsDisabled": false }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    "X-Emby-Token": subscriber.server.apikey,
                                }
                            });

                            await Subscription.findByIdAndUpdate(subscriber._id, { status: false }, { new: true, useFindAndModify: false })

                        }

                    })
                    // OBTENER USER DE EMBY


            }

        }

        return;


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error, please try again'
        });
    }

};

module.exports = {
    validateDate
}