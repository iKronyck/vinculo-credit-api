"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditRoutes = void 0;
const express_1 = __importDefault(require("express"));
const creditController_1 = require("../controllers/creditController");
const router = express_1.default.Router();
exports.creditRoutes = router;
const creditController = new creditController_1.CreditController();
router.get('/credits', creditController.getAllCredits);
router.post('/credits', creditController.uploadDocumentPhoto, creditController.resizePhoto, creditController.createCredit);
//# sourceMappingURL=creditRoutes.js.map