import express from "express";
import TunaController from "../controllers/tunaController.js";

const router = express.Router();

router
  .post("/webhook/tuna/notification", TunaController.receiveNotification)
export default router;   