const mongoose = require('mongoose');

async function connectDB() {
    try {
      // אם הוגדר MONGO_URI (למשל מ-docker-compose) - מתחברים אליו (מונגו מקומי).
      // אחרת - נופלים חזרה לחיבור הענן (Atlas).
      const uri = process.env.MONGO_URI
        || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`;
      await mongoose.connect(uri);
      console.log("💥 Mongo DB connected successfully 💥");
    } catch (error) {
      console.error("DB connection failed 😞");
      console.error(error);
    }
}

module.exports = connectDB; // הפונקציה הזו זמינה לקבצים אחרים