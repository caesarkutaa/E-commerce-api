// @ts-nocheck
require("dotenv").config();
const express = require("express");
const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
const rootMiddleware = require("./middleware");
const rootRouter = require("./routes");   

const app = express();

app.use(cors())
// Middleware Setup
app.use(cors());
app.use(helmet()); 
app.use(morgan('combined')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Rate Limiting Setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Initialize Cache
const cache = new NodeCache({ stdTTL: 600 });




// connect database
require("./DB/db").connect();

// middleware
app.use(rootMiddleware);

// routes
app.use("/api/v1/", rootRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});      


const port = process.env.PORT || 3023;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
