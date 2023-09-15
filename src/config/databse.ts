import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        //use modern url parser
        useNewUrlParser: true,
        //   use new engine server discovery
        useUnifiedTopology: true,
        // Specify your write concern here
        w: "majority",
        wtimeout: 5000,
        dbName: "Medibook",
      } as ConnectOptions
    );
    console.log("database is connected");
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export default connectDB;
