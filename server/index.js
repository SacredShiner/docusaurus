import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import userRoutes from './routes/routes.js'

const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true })))
app.use((express.urlencoded({ limit: "30mb", extended: true })))
app.use((cors()))
app.use(express.static(path.join(__dirname, 'client')))

// Routes
app.use('/api', userRoutes);

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/client/index.html'));
// });

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
).catch((error) =>
    console.log(error.message)
)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)