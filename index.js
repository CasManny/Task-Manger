require('dotenv').config()
const express = require('express');
const connectDb = require('./db/connect');
const router = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const ErrorHandler = require('./middleware/error-handler');
const app = express()



const PORT = process.env.PORT || 5000;

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', router)
app.use(ErrorHandler)
app.use(notFound)

const start = async () => {
    try {
        await connectDb(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
