const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes');
const todosRoutes = require('./routes/todosRoutes')
const port = process.env.PORT ;
const mongoURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/todos"

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.error(err));


// Available routes
app.use('/api', authRoutes)
app.use('/api', todosRoutes)

app.get('/', (req,res) => {
    res.send('Hello World!')
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
