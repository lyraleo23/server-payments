import express from "express";
import CieloController from "../controllers/cieloController.js";

const router = express.Router();

router
  .post("/webhook/cielo-superlink/notification", CieloController.receiveNotification)
  // .post("/webhook/cielo-superlink/chage-status", CieloController.changeStatus)
export default router;   