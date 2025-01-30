// import express from "express";
// import connectDB from './connections/connectDBs.js';
// import registerUser from "./userProcess/register.js";
// import loginUser from "./userProcess/login.js";
// import userChallan from "./userProcess/challan.js";
// import checkAmount from "./userProcess/check-challan-validity.js";
// import fetchchallanDetails from "./userProcess/fetchchallan.js";
// import payChallan from "./userProcess/paychallan.js";
// import challanHistory from "./userProcess/challanHistory.js";
// import challanRecords from "./userProcess/challanrecords.js";
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());

// app.use(express.json());

// connectDB();

// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });

// app.post('/api/users/register',registerUser);
// app.post('/api/users/login',loginUser);
// app.post('/api/users/createchallan',userChallan);
// app.post('/api/users/checkamount',checkAmount);
// app.post('/api/users/fetchthechallandetails',fetchchallanDetails);
// app.post('/api/users/paychallan',payChallan);
// app.post('/api/users/checkHistory',challanHistory);
// app.get('/api/users/challanrecords',challanRecords);

// app.use((req, res, next) => {
//   res.status(404).send('Page not found');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




import express from "express";
import connectDB from "./connections/connectDBs.js"; // Correct path for connectDB.js
import registerUser from "./userProcess/register.js";
import loginUser from "./userProcess/login.js";
import userChallan from "./userProcess/challan.js";
import checkAmount from "./userProcess/check-challan-validity.js";
import fetchchallanDetails from "./userProcess/fetchchallan.js";
import payChallan from "./userProcess/paychallan.js";
import challanHistory from "./userProcess/challanHistory.js";
import challanRecords from "./userProcess/challanrecords.js";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv here as well for PORT

dotenv.config(); // Configure dotenv to load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);
app.post("/api/users/createchallan", userChallan);
app.post("/api/users/checkamount", checkAmount);
app.post("/api/users/fetchthechallandetails", fetchchallanDetails);
app.post("/api/users/paychallan", payChallan);
app.post("/api/users/checkHistory", challanHistory);
app.get("/api/users/challanrecords", challanRecords);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
