"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditController = void 0;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const CreditModel_1 = require("../models/CreditModel");
const AppError_1 = __importDefault(require("../utils/AppError"));
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.default('Not an image! Please upload only images.', 400), false);
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
class CreditController {
    constructor() {
        this.uploadDocumentPhoto = upload.single('document');
        this.resizePhoto = async (req, _res, next) => {
            if (!req.file)
                return next();
            if (!req.body.selfie)
                return next();
            const uuid = (0, uuid_1.v4)();
            const now = Date.now();
            req.file.filename = `document-${uuid}-${now}.jpeg`;
            const selfie = req.file.filename.replace('document', 'selfie');
            const buffer = Buffer.from(req.body.selfie.split(',')[1], 'base64');
            req.body.selfie = `images/${selfie}`;
            await (0, sharp_1.default)(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/users/${req.file.filename}`);
            await (0, sharp_1.default)(buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/users/${selfie}`);
            next();
        };
    }
    async getAllCredits(_req, res) {
        try {
            const credits = await CreditModel_1.CreditModel.find({});
            res.status(200).json({
                status: 'success',
                results: credits.length,
                data: {
                    credits,
                },
            });
        }
        catch (error) {
            res.status(500).json({
                status: 'fail',
                message: error.message,
            });
        }
    }
    async createCredit(req, res) {
        try {
            const body = req.body;
            if (req.file)
                body.document = `images/${req.file.filename}`;
            const newCredit = await CreditModel_1.CreditModel.create(body);
            res.status(201).json({
                status: 'success',
                data: {
                    credit: newCredit,
                },
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error.message,
            });
        }
    }
}
exports.CreditController = CreditController;
//# sourceMappingURL=creditController.js.map