import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
// import { rateLimit } from 'express-rate-limit'
import hpp from 'hpp'
import mongoose from 'mongoose'
import {airdropRouter, earnRouter, userRouter, authRouter, workForceRouter, agentRouter} from "./routes";

mongoose.connect(process.env.mongoURI||"").then(()=>{
  console.log("DB connected Successfully.")
})

const port = process.env.PORT || 3002
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())

// const limiter = rateLimit({
//   windowMs: 1000, // in ms
//   limit: 10,
//   standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//   message: 'Too many requests.'
// })
// app.use(limiter)
app.use(hpp()) // prevents HTTP Parameter Pollution attacks

app.disable('x-powered-by') // disables powered by express header
const corsOptions = {
  origin(origin: any, callback: any) {
    if (process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      if (origin) {
        // origin check disables requests where no origin is present, like Postman
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  },
  credentials: true, // Essential for cookies, especially with JWT
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(cors(corsOptions))
app.use("/", userRouter);
app.use("/auth",authRouter);
app.use("/agent",agentRouter);
app.use("/airdrop",airdropRouter);
app.use("/earn",earnRouter);
app.use("/workforce",workForceRouter);

app.use((req, res, next) => {
  res.status(404).send('Resource not found')
})
if (app.get('env') === 'production') {
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send('Server Error')
  })
}

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
