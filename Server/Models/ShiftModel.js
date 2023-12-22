const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema(
  {
    date: Date,
    StartingHour: String,
    EndingHour: String,
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    //each shift has number of employees
  },
  {
    versionKey: false,
  }
);

const Shift = mongoose.model("Shift", ShiftSchema);

module.exports = Shift;
