"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const creditRoutes_1 = require("./routes/creditRoutes");
const AppError_1 = __importDefault(require("./utils/AppError"));
const APP_VERSION = (_a = process.env.APP_VERSION) !== null && _a !== void 0 ? _a : 1;
const API_PATH = `/api/v${APP_VERSION}`;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Name',
            version: '1.0.2',
            description: 'A short description of your API',
            contact: {
                name: 'Israel Alfaro',
                url: 'https://www.linkedin.com/in/ikronyck',
                email: 'israel.devalfaro@gmail.com',
            },
        },
        servers: [
            {
                url: `${process.env.APP_URL}${process.env.APP_VERSION}`,
            },
        ],
    },
    apis: ['./routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
const app = (0, express_1.default)();
if (process.env.APP_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(`${API_PATH}/images`, express_1.default.static(path_1.default.join(__dirname, 'public', 'img', 'users')));
app.use(`${API_PATH}/api-docs`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true, customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/2.x/theme-newspaper.css' }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(API_PATH, creditRoutes_1.creditRoutes);
app.get('/', (_req, res) => {
    res.status(200).json({
        name: 'Israel',
    });
});
app.all('*', (req, _res, next) => {
    next(new AppError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
exports.default = app;
//# sourceMappingURL=app.js.map