const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const session = require("express-session");
const path = require("path");

const authRouter = require("./Routers/authRouter");
const productsRouter = require("./Routers/productsRouter");
const EmployeeRouter = require("./Routers/EmployeeRouter");
const DepartmentRouter = require("./Routers/DepartmentRouter");
const ShiftRouter = require("./Routers/ShiftRouter");
const usersInfoRouter = require("./Routers/userInfoRouter");
const saveEmployeeWithoutDepartmentRouter = require("./Routers/saveEmployeeWithoutDepartmentRouter");

const actionsRouter = require("./Routers/actionsRouter");

const app = express();
const port = 8000;
connectDB();
app.use(
  session({
    secret: "my-token",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // time remaining in milliseconds
  })
);
app.use(cors());
app.use(express.json());

// routers
app.use("/auth", authRouter);
app.use("/homePage", productsRouter);
app.use("/Employee", EmployeeRouter); //
app.use("/Department", DepartmentRouter);
app.use("/userInfo", usersInfoRouter);
app.use("/Shift", ShiftRouter);
app.use("/saveEmployeeWithoutDepartment", saveEmployeeWithoutDepartmentRouter);
app.use("/actions", actionsRouter);
app.use(express.static(path.join(__dirname, "../Client")));
app.use("/Server", express.static(path.join(__dirname, "../Server")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client", "LoginPage.html"));
});

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
