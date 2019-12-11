const db = require("../models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // for the auth token
const moment = require("moment");

// Defining methods for the decisionsController
module.exports = {
  createEvent: function(req, res) {
    let newEvent = req.body;
    db.Event.create(newEvent).then(dbEvent => {
      res.json(dbEvent);
    });
  },
  getEventsBySprintId: function(req, res) {
    id = req.params.id;
    db.Event.find({ sprint: id })
      .sort({ createdDate: 1 })
      .then(eventsResponse => {
        res.json(eventsResponse);
      });
  },
  getBurnup: async function(req, res) {
    const burnupResponse = await getEventDataForBurnup(req.params.id);

    res.json(burnupResponse);
  }
};

const getStartDateForSprint = async sprintId => {
  // return createdDate for the event that has the matching sprint ID field and the type "start sprint"
  const eventResponse = await db.Event.find({
    sprint: sprintId,
    type: "sprint started"
  });
  const sprintStartDate = eventResponse[0].createdDate;
  return sprintStartDate;
};

const getEventDataForBurnup = async sprintId => {
  //find all events with the sprintID, sorted
  const eventsResponse = await db.Event.find({
    sprint: sprintId
  });
  const sprintStartDate = eventsResponse[0].createdDate;
  //model a response object with "labels" and "data"
  let burnupData = {
    labels: [],
    data: []
  };
  //create labels using the start date of the sprint and creating 13 more (14 days total)
  burnupData.labels = getLabels(sprintStartDate);

  //Set event dates to same format as labels
  eventsResponse.forEach((event, i) => {
    const newDate = moment(event.createdDate).format("MMM DD");
    event.createdDate = newDate;
  });

  let currentPointsValue = 0;
  //loop through each label comparing to events
  burnupData.labels.forEach((label, i) => {
    //find the last matching event with the same date,
    let event = eventsResponse
      .reverse()
      .find(event => moment(event.createdDate).format("MMM DD") === label);
    if (event) {
      // if there is one found, set currentpoints to the points value
      currentPointsValue = event.completedPoints;
    }
    //push currentPointsValue, which defaults to the previous value if no match was found
    burnupData.data.push(currentPointsValue);
  });

  return burnupData;
};

const getLabels = sprintStartDate => {
  //CREATE LABELS: startin with the first event, use the data to create a label for the day,
  //and create 13 more using moment
  const myMoment = moment(sprintStartDate).format("MMM DD");
  const myMoments = [];

  for (i = 0; i < 14; i++) {
    const newMoment = moment(myMoment)
      .add(i, "day")
      .format("MMM DD");
    myMoments.push(newMoment);
    console.log(newMoment);
  }
  return myMoments;
};
