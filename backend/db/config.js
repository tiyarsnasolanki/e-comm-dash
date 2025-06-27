const mongoose = require("mongoose");

require("dotenv").config();
mongoose
  .connect("mongodb+srv://TIYARSNA:12345@e-comm.oyln1ud.mongodb.net/?retryWrites=true&w=majority&appName=E-comm")

  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed", err));


