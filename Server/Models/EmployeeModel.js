const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
    {
        FirstName: String,
        LastName: String,
        StartWorkYear: Number,
        Department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    },
    { versionKey: false }
);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
