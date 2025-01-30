import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config(); 



const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`, 
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
      }
    );
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log(
      `MONGODB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection ERROR:", error);
    process.exit(1);
    
  }
};

export default connectDB;
