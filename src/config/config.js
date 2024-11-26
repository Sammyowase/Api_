const mongoose = require("mongoose");
const connectdb = async () => {
    try {
        let DB = process.env.DB_CONNECT 
        await mongoose.connect("mongodb+srv://samuelowase02:1SqaqhhRwu6fLUpW@cluster0.c7ltd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
}}

module.exports = connectdb;