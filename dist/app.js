"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const OrderRoutes_1 = __importDefault(require("./routes/OrderRoutes"));
app.use(express_1.default.json());
//application routes
app.use('/api/products', ProductRoutes_1.default);
app.use('/api/orders', OrderRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
