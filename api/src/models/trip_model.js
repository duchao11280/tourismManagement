let dbConn = require('../../config/db.config');

let Trip = function (trip) {
    this.id = trip.id;
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
Trip.addTrip = (tripName, city, tripDetail, userID, result) => {
    let numberOfDays = tripDetail?.length
    dbConn.getConnection((err, connection) => {
        if (err) {
            result(err, null)
        } else {
            connection.beginTransaction((err) => {
                if (err) {
                    return connection.rollback(function () {
                        result(err, null);
                    });
                }
                else {
                    var queryAddToTrip = `Insert INTO trip(tripName,city,numberOfDays,userID) values(?,?,?,?)`
                    connection.query(queryAddToTrip, [tripName, city, numberOfDays, userID], (err, data) => {
                        if (err) {
                            return connection.rollback(function () {
                                result(err, null);
                            });
                        } else {
                            let tripID = data.insertId
                            var queryAddToDetailTrip = `Insert INTO detailtrip(tripID,placeID,note,day,timeClock) values(?,?,?,?,?)`
                            tripDetail.forEach((tripPerDay) => {
                                tripPerDay.detail.forEach((place) => {
                                    connection.query(queryAddToDetailTrip, [tripID, place.placeID, place.note, tripPerDay.day, place.timeClock], (err, data) => {
                                        if (err) {
                                            return connection.rollback(function () {
                                                result(err, null);
                                            });
                                        }
                                    })
                                })

                            })
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        result(err, null);
                                    });
                                }
                                result(null, "Thành công")
                            })

                        }
                    })
                }
            })
        }
    });

}

Trip.getTripByID = (id, result) => {
    dbConn.query(`Select * from trip Where tripID = ?`, [id], (err, res) => {
        result(err, res);
    })
}

Trip.updateBasicInfoTrip = (id, tripName, numberOfDays, city, result) => {
    dbConn.query(`UPDATE trip set tripName = ?,numberOfDays = ?, city = ? WHERE tripID=${id}`, [tripName, numberOfDays, city], (err, res) => {
        result(err, res)
    })
}
Trip.deleteDayOfDetailTrip = (tripID, day, result) => {
    dbConn.getConnection((err, connection) => {
        if (err) {
            result(err, null)
        } else {
            connection.beginTransaction((err) => {
                if (err) {
                    return connection.rollback(function () {
                        result(err, null);
                    });
                }
                else {
                    var queryDeleteDetailTrip = `DELETE From detailtrip WHERE tripID=? and day= ?`
                    connection.query(queryDeleteDetailTrip, [tripID, day], (err, data) => {
                        if (err) {
                            return connection.rollback(function () {
                                result(err, null);
                            });
                        } else {
                            var querySubDayTrip = `Update trip set numberOfDays = numberOfDays - 1 where tripID=${tripID}`
                            connection.query(querySubDayTrip, (err, data) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        result(err, null);
                                    });
                                }
                                else {
                                    connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(function () {
                                                result(err, null);
                                            });
                                        }
                                        result(null, "Thành công")
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    });
}
module.exports = Trip;