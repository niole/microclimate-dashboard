const express = require('express');
const db = require('../infrastructure/database');
const Event = require('../domain/Event');
const FloorPlan = require('../domain/FloorPlan');

const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/floorplan/:name/start/:start/end/:end', (req, res) => {
  const { name, start, end } = req.params;
  db
  .then(() => Event.find({
    floorPlanName: name,
    createdAt: {
      "$gte": start,
      "$lte": end
    }
  }).sort({ createdAt: 1 }))
  .then(events => res.send(events))
  .catch(error => {
    console.error('Failed to get events at start time ', start, ', end time ', end, ', error: ', error);
    res.sendStatus(500);
  });
});

/**
  gets all events of all time for a floor plan
*/
router.get('/floorplan/:name/all', (req, res) => {
  const floorPlanName = req.params.name;
  db
    .then(() => Event.find({ floorPlanName}).sort({ createdAt: 1 }))
    .then(allEvents => res.send(allEvents))
    .catch(error => console.error('Failed to get all events', error));
});

/**
  gets most recent set of events for floor plan
*/
router.get('/floorplan/:name/last', (req, res) => {
  const floorPlanName = req.params.name;
  db
    .then(() => FloorPlan.findOne({ floorPlanName }))
    .then(foundFloorPlan => {
      if (!foundFloorPlan) {
        return Promise.reject(`Floorplan ${floorPlanName} does not exist`);
      } else {
        const { roomNames } = foundFloorPlan;
        const foundRoomEvents = roomNames
          .map(roomName =>
            Event.find({ roomName })
              .sort({ createdAt: -1 })
              .limit(1)
              .catch(error => {
                console.error('Couldnt find room name. error: ', error);
                return Promise.resolve([]);
              })
          );

        Promise.all(foundRoomEvents)
          .then(found => found.reduce((acc, next) => [...acc, ...next], []))
          .then(events => {
              res.send(events);
          });
      }
    })
});

module.exports = router;
