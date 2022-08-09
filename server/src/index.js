const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB is connected'))
.catch((err) => console.log(err))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>You are finally Home!</h1>')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))