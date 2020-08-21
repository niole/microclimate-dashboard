var climateDb = db.getSiblingDB("climate")
climateDb.floorplans.insert({
    "roomNames": ["apte-livingroom", "apte-bathroom", "apte-bedroom", "apte-kitchen"],
    "floorPlanName": "apte"
});
