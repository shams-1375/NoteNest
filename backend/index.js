const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();



const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MonogoDB Successfully"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`);
});
