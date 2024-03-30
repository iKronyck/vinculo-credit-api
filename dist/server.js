"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config({
    path: './.env',
});
process.on('uncaughtException', (error) => {
    console.log('UNCAUGHT EXCEPTION!');
    console.log(error.name, error.message);
    process.exit(1);
});
const app_1 = __importDefault(require("./app"));
const PORT = process.env.APP_PORT || 1234;
const DATABASE = process.env.DATABASE || '';
const USERNAME = process.env.DATABASE_USERNAME || '';
const PASSWORD = process.env.DATABASE_PASSWORD || '';
const DB = DATABASE.replace('<username>', USERNAME).replace('<password>', PASSWORD);
mongoose_1.default
    .connect(DB, {})
    .then(() => {
    console.log('DB connection successfully!!');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
const server = app_1.default.listen(PORT, () => {
    console.log(`The app is running in port ${PORT}`);
});
process.on('unhandledRejection', (error) => {
    console.log('UNHANDLED REJECTION!');
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map