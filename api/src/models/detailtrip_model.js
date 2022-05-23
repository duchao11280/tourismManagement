let dbConn = require('../../config/db.config');

let DetailTrip = function (detailtrip) {
    this.id = detailtrip.id;
    this.tripID = detailtrip.tripID;
    this.placeID = detailtrip.placeID;
    this.serviceID = detailtrip.serviceID;
    this.type = detailtrip.type;
    this.note = detailtrip.note;
    this.day = detailtrip.day;
    this.timeClock = detailtrip.timeClock;
    this.createAt = detailtrip.createAt;
    this.updateAt = detailtrip.updateAt;
}
DetailTrip.addPlaceToDetailTrip = (tripID, day, placeID, note, timeClock, result) => {
    dbConn.query(`Insert INTO detailtrip(tripID,placeID,note,day,timeClock,type) 
        values(?,?,?,?,?,0)`, [tripID, placeID, note, day, timeClock], (err, res) => {
        result(err, res)
    })
}
DetailTrip.addServiceToDetailTrip = (tripID, day, serviceID, note, timeClock, result) => {
    dbConn.query(`Insert INTO detailtrip(tripID,serviceID,note,day,timeClock,type) 
        values(?,?,?,?,?,1)`, [tripID, serviceID, note, day, timeClock], (err, res) => {
        result(err, res)
    })
}
DetailTrip.getTripDetailByTripID = (id, result) => {
    dbConn.query(`Select detailtrip.id, detailtrip.tripID, detailtrip.placeID,
        detailtrip.note, detailtrip.day, detailtrip.timeClock, detailtrip.serviceID,
        detailtrip.type, place.placeName , services.serviceName
        from detailtrip  LEFT JOIN place ON detailtrip.placeID = place.placeID LEFT JOIN services ON detailtrip.serviceID = services.serviceID
        WHERE tripID =?
        ORDER BY day, timeClock`, [id], (err, res) => {
        result(err, res);
    })
}
DetailTrip.updateDetailTripItem = (id, placeID, serviceID, note, timeClock, result) => {
    dbConn.query(`UPDATE detailtrip set placeID = ?, serviceID = ?, note = ?, timeClock = ? WHERE id=${id}`, [placeID, serviceID, note, timeClock], (err, res) => {
        result(err, res)
    })
}
DetailTrip.deleteDetailTripItem = (id, result) => {
    dbConn.query(`DELETE From detailtrip WHERE id=?`, [id], (err, res) => {
        result(err, res)
    })
}
module.exports = DetailTrip;