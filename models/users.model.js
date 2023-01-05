const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    usuario: {
        type: String,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true
    },

    phone: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String
    },

    img: {
        type: String
    },

    status: {
        type: Boolean,
        default: true
    },

    role: {
        type: String,
        default: 'ADMIN'
    },

    fecha: {
        type: Date,
        default: Date.now
    },

});

UserSchema.method('toJSON', function() {

    const { __v, _id, password, ...object } = this.toObject();
    object.password = '********'
    object.uid = _id;
    return object;

});

module.exports = model('Users', UserSchema);