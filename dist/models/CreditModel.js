"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const creditSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Firstname is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    identification: {
        type: String,
        required: [true, 'Identification is required'],
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
    },
    municipio: {
        type: String,
        required: [true, 'Municipio is required'],
    },
    direction: {
        type: String,
    },
    document: {
        type: String,
    },
    selfie: {
        type: String,
    },
    income: {
        type: Number,
        required: [true, 'Income must have a value'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});
exports.CreditModel = mongoose_1.default.model('Credit', creditSchema);
//# sourceMappingURL=CreditModel.js.map