const { Schema, model } = require('mongoose');

const SubscriptionsSchema = Schema({

    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    uid: {
        type: String,
        require: true,
        unique: true
    },

    expiration: {
        type: Number,
    },

    server: {
        type: Schema.Types.ObjectId,
        ref: 'Servers',
        require: true
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

SubscriptionsSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.subid = _id;
    return object;

});

module.exports = model('Subscriptions', SubscriptionsSchema);