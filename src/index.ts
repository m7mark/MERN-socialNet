import express, { Application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/user'
import profileRouter from './routes/profile'
import cors from 'cors'
import path from 'path'
import { v2 } from 'cloudinary'
import { getCloudinaryConfig } from './config/cloudinary.config'
import { handleRouteErrors } from './utils/handleRouteErrors'

const dirName = path.dirname(__dirname)
const PORT = process.env.PORT || 5000

dotenv.config()
v2.config(getCloudinaryConfig())

export const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(dirName, '/uploads')))
app.use(express.static(path.join(dirName, '/loginpage/build')))
app.use('/api', authRouter)
app.use('/api', profileRouter)
app.get('*', (_, res) => {
  res.sendFile(path.join(dirName, '/loginpage/build', 'index.html'))
})
app.use(handleRouteErrors)

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL || '')
    app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } catch (e) {
    console.log(e)
  }
}
startApp()
