const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
// ROUTES
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admins.routes");
const adminAuthRoutes = require("./routes/adminAuth.routes");
const bankRoutes = require("./routes/bankaccounts.routes");
const categoryRoutes = require("./routes/categories.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const nominalRoutes = require("./routes/nominals.routes");
const paymentRoutes = require("./routes/payments.routes");
const transactionRoutes = require("./routes/transactions.routes");
const userbiodataRoutes = require("./routes/userbiodatas.routes");
const voucherRoutes = require("./routes/vouchers.routes");
const checkoutRoutes = require("./routes/checkout.routes");
const playerRoutes = require("./routes/players.routes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {},
    }),
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    "/adminlte",
    express.static(path.join(__dirname, "/node_modules/admin-lte/")),
);
app.use(cors());

// app.use('/users', usersRouter);
app.use(authRoutes);
app.use(adminAuthRoutes);
app.use(adminRoutes);
app.use(bankRoutes);
app.use(categoryRoutes);
app.use(nominalRoutes);
app.use(dashboardRoutes);
app.use(paymentRoutes);
app.use(transactionRoutes);
app.use(userbiodataRoutes);
app.use(voucherRoutes);
app.use(checkoutRoutes);
app.use(playerRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
