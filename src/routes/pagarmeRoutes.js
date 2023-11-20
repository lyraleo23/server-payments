import express from "express";
import PagarMeController from "../controllers/pagarmeController.js";

const router = express.Router();

router
  .post("/webhook/pagar-me/orders", PagarMeController.postbackOrders)
  .post("/webhook/pagar-me/transactions", PagarMeController.postbackTransactions)
export default router;   