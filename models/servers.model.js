const { Schema, model } = require('mongoose');

const ServerSchema = Schema({

    name: {
        type: String,
        require: true,
    },
    apikey: {
        type: String,
        require: true,
        unique: true,
    },
    url: {
        type: String,
        require: true,
    },
    serverId: {
        type: String,
    },

    status: {
        type: Boolean,
        default: true
    },

    fecha: {
        type: Date,
        default: Date.now
    },

});

ServerSchema.method('toJSON', function() {

    const { __v, _id, password, ...object } = this.toObject();
    object.sid = _id;
    return object;

});

module.exports = model('Servers', ServerSchema);