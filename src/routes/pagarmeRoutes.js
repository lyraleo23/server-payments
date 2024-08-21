import express from "express";
import PagarMeController from "../controllers/pagarmeController.js";

const router = express.Router();

router
  .post("/webhook/pagar-me/orders", PagarMeController.postbackOrders)
  .post("/webhook/pagar-me/transactions", PagarMeController.postbackTransactions)
  .post("/webhook/pagar-me/v5", PagarMeController.pedidosV5)
export default router;   