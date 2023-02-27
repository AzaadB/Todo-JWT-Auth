const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
//Importing the corsOptions function from the config folder and the corsOptions file(line 15)

require("dotenv").config();

const TodoRoutes = require("./routes/TodoRoutes");

const UserRoutes = require("./routes/UserRoutes");

//express app
const app = express();

const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/todos", TodoRoutes);
app.use("/api/user", UserRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

//Port listening at:
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); // Listening at PORT = process.env.PORT || 9000;
