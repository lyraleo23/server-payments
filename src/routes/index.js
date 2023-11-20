import express from "express";
import pagarme from "./pagarmeRoutes.js";
import tuna from "./tunaRoutes.js";
import cors from "cors";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "API Payments"})
  })

  app.use( 
    cors({
      origin: '*'
    }),
    express.json(),
    express.urlencoded(),
    pagarme,
    tuna
  )
}

export default routes;