const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    appointments: [{
        type: Schema.Types.Mixed,
    }],
    typeOfUser: {
        type: String,
    },
    tokens : {
        type: [String]
    },
    created: {
        type: Date,
        default: Date.now
    },
    settings: {
        type: Schema.Types.Mixed
    },
    color: {
        type: String
    },
    stars: {
        type: [String],
        default: ["0", "0", "0", "0", "0"]
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;