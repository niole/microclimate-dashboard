var climateDb = db.getSiblingDB("climate")
climateDb.floorplans.insert({
    "roomNames": ["apte-livingroom", "apte-bathroom", "apte-bedroom", "apte-kitchen"],
    "floorPlanName": "apte"
});

for (var i=0; i < 10; i++) {
    climateDb.events.insert({
        roomName: "apte-bathroom",
        temperature: i*10,
        floorPlanName: "apte",
        createdAt: Date.now() - (i*24*60*60*1000)
    });
}
