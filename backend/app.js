const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');
const usersRoutes = require("./routes/users");
const employeesRoutes = require("./routes/employee");
const technologyRoutes = require("./routes/technology");
const projectRoutes = require("./routes/project");

const app = express();

// DB CONNECTION
mongoose
    .connect(
        "mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":" + process.env.MONGO_ATLAS_PW + "@cluster0.eejwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Connected to DB"))
    .catch((err) => console.log(err, 'Error Occured'));

app.use(bodyParser.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({extended: true});
//app.use(bodyParser.json());

// app.use("/images", express.static(path.join("images")));

// Set Static access for angular
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
});




app.use("/api/user", usersRoutes);
app.use("/api/employee", employeesRoutes);
app.use("/api/technology", technologyRoutes);
app.use("/api/project", projectRoutes);


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});
module.exports = app;