const { Schema, model } = require('mongoose');

const PaymentsSchema = Schema({

    subid: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },

    description: {
        type: String,
    },

    method: {
        type: String,
        require: true,
    },

    amount: {
        type: Number,
        require: true,
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

PaymentsSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.paid = _id;
    return object;

});

module.exports = model('Payments', PaymentsSchema);