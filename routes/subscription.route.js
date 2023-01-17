/** =====================================================================
 *  SUBSCRIPTION ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { getSubscriptions, getSubscriptionId, createSubscription, updateSubscription, postSubscriptionsQuery, searchSubscription } = require('../controllers/subscriptions.controller');


const router = Router();

/** =====================================================================
 *  GET SUBSCRIPTIONS
=========================================================================*/
router.get('/', validarJWT, getSubscriptions);
/** =====================================================================
 *  GET SUBSCRIPTIONS
=========================================================================*/

/** =====================================================================
 *  GET SUBSCRIPTIONS
=========================================================================*/
router.get('/search/:query', validarJWT, searchSubscription);
/** =====================================================================
 *  GET SUBSCRIPTIONS
=========================================================================*/

/** =====================================================================
 *  GET SUBSCRIPTION ID
=========================================================================*/
router.get('/subscription/:id', validarJWT, getSubscriptionId);
/** =====================================================================
 *  GET SUBSCRIPTION ID
=========================================================================*/
/** =====================================================================
 *  POST CREATE SUBSCRIPTION
=========================================================================*/
router.post('/', validarJWT, createSubscription);
/** =====================================================================
 *  POST CREATE SUBSCRIPTION
=========================================================================*/

/** =====================================================================
 *  POST SUBSCRIPTIONS QUERY
=========================================================================*/
router.post('/query', validarJWT, postSubscriptionsQuery);
/** =====================================================================
 *  POST SUBSCRIPTIONS QUERY
=========================================================================*/

/** =====================================================================
 *  PUT SUBSCRIPTION
=========================================================================*/
router.put('/:id', validarJWT, updateSubscription);
/** =====================================================================
 *  PUT SUBSCRIPTION
=========================================================================*/

// EXPORT
module.exports = router;