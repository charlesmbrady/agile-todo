/* Mongo Database */
const project = require("../../../package.json"); //require project data to get project name for naming database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MONGO_URL =
  process.env.MONGODB_URI || `mongodb://localhost:27017/${project.name}`;

//Make connection to the database and pass options
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const dbConnection = mongoose.connection;

// Error handling if connection cannot be made
dbConnection.on("error", err => {
  console.log(`There was an error connecting to the database: ${err}`);
});

// Log success once connection is made
dbConnection.once("open", () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGO_URL}`
  );
});

module.exports = dbConnection;
