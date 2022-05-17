let dbConn = require('../../config/db.config');

let Trip = function (trip) {
    this.tripID = trip.tripID;
    this.tripName = trip.tripName;
    this.city = trip.city;
    this.numberOfDays = trip.numberOfDays;
    this.isDisabled = trip.isDisabled;
    this.userID = trip.userID;
    this.createAt = trip.createAt;
    this.updateAt = trip.updateAt;
}

Trip.getAllTrip = (result) => {
    dbConn.query(`Select * from trip `, (err, res) => {
        result(err, res)
    })
}
// Disable trip
Trip.disableTrip = (id, result) => {
    dbConn.query(`Update trip Set  isDisabled=1 where tripID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// Enable trip
Trip.enableTrip = (id, result) => {
    dbConn.query(`Update trip Set  isDisabled=0 where tripID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
module.exports = Trip;