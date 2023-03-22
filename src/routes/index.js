import express from "express";
import cielo from "./cieloRoutes.js";
import cors from "cors";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "API Miligrama"})
  })

  app.use( 
    cors({
      origin: '*'
    }),
    express.json(),
    express.urlencoded(),
    cielo
  )
}

export default routes;