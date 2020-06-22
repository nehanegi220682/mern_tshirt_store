require('dotenv').config()


const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//My routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");



//DB CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
});


//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//ROUTES
//it says all of the routes that starts with /api are coming from authroutes
app.use("/api", authRoutes);//prefexing all authentication roues with /api
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//PORT
const port = process.env.Port || 8000;

//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
}); 
 
