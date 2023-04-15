/// ************SERVER.JS****************
/// express app using mongodb for storage
/// for development purposes, mongodb is in local docker image
/// *************************************
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 8000; // this will fail with local MongoDB if port is not 2717
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');

// setup
connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/tickets/', require('./routes/ticketRoutes'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Dev Flow Pro!' });
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
