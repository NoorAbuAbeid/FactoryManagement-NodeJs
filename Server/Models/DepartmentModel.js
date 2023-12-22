const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
    {
        Name: String,
        Manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },

    },
    { versionKey: false }
);

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = Department;
