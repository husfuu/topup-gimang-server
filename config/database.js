const dotenv = require("dotenv");
dotenv.config();

const {
    DB_USERNAME_PROD,
    DB_PASSWORD_PROD,
    DB_NAME_PROD,
    DB_HOST_PROD,
    DB_PORT,
    DB_USERNAME_DEV,
    DB_PASSWORD_DEV,
    DB_NAME_DEV,
    DB_HOST_DEV,
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME_DEV,
        password: DB_PASSWORD_DEV,
        database: DB_NAME_DEV,
        host: DB_HOST_DEV,
        dialect: "postgres",
    },
    test: {
        username: "husfuu",
        password: "husfuuPass",
        database: "topup-gimang_test",
        host: "127.0.0.1",
        dialect: "postgres",
    },
    production: {
        username: DB_USERNAME_PROD,
        password: DB_PASSWORD_PROD,
        database: DB_NAME_PROD,
        host: DB_HOST_PROD,
        dialect: "postgres",
        port: DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
