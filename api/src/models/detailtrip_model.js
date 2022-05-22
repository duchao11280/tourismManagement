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
    dbConn.query(`Insert INTO detailtrip(tripID,placeID,note,day,timeClock) 
        values(?,?,?,?,?)`, [tripID, placeID, note, day, timeClock], (err, res) => {
        result(err, res)
    })
}
DetailTrip.getTripDetailByTripID = (id, result) => {
    dbConn.query(`Select detailtrip.id, detailtrip.tripID, detailtrip.placeID,
        place.placeName, detailtrip.note, detailtrip.day, detailtrip.timeClock 
        from detailtrip, place where tripID = ? and 
        detailtrip.placeID = place.placeID and place.isDeleted != 1 
        ORDER BY day, timeClock`, [id], (err, res) => {
        result(err, res);
    })
}
DetailTrip.updateDetailTripItem = (id, placeID, note, timeClock, result) => {
    dbConn.query(`UPDATE detailtrip set placeID = ?, note = ?, timeClock = ? WHERE id=${id}`, [placeID, note, timeClock], (err, res) => {
        result(err, res)
    })
}
DetailTrip.deleteDetailTripItem = (id, result) => {
    dbConn.query(`DELETE From detailtrip WHERE id=?`, [id], (err, res) => {
        result(err, res)
    })
}
module.exports = DetailTrip;