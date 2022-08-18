const dotenv = require("dotenv");
dotenv.config();

console.log(dotenv);

const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME_DEVELOPMENT,
    DATABASE_HOST,
    DATABASE_NAME_PRODUCTION,
} = process.env;

module.exports = {
    development: {
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME_DEVELOPMENT,
        host: DATABASE_HOST,
        dialect: "postgres",
    },
    test: {
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME_DEVELOPMENT,
        host: DATABASE_HOST,
        dialect: "postgres",
    },
    production: {
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME_PRODUCTION,
        host: DATABASE_HOST,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
