/** =====================================================================
 *  USER ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { createUsers, updateUser, deleteUser, getUserId } = require('../controllers/users.controller');

const router = Router();

/** =====================================================================
 *  GET USERS ID
=========================================================================*/
router.get('/user/:id', getUserId);
/** =====================================================================
 *  GET USERS ID
=========================================================================*/
/** =====================================================================
 *  POST CREATE USER
=========================================================================*/
router.post('/', [
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createUsers
);
/** =====================================================================
 *  POST CREATE USER
=========================================================================*/

/** =====================================================================
 *  PUT USER
=========================================================================*/
router.put('/', [
        validarJWT,
        check('email', 'El email es obligatorio').isEmail(),
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        validarCampos
    ],
    updateUser
);
/** =====================================================================
 *  PUT USER
=========================================================================*/
/** =====================================================================
 *  DELETE USER
=========================================================================*/
router.delete('/:id', validarJWT, deleteUser);
/** =====================================================================
 *  DELETE USER
=========================================================================*/



// EXPORT
module.exports = router;