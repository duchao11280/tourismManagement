const dbConn = require("../../config/db.config")

var Place = function (place) {
    this.placeID = place.placeID,
        this.placeName = place.placeName,
        this.description = place.description,
        this.tips = place.tips,
        this.city = place.city,
        this.address = place.address,
        this.latitude = place.latitude,
        this.longitude = place.longitude,
        this.isDeleted = place.isDeleted
}
Place.getAllPlaces = (result) => {
    dbConn.query('Select * From place', (err, res) => {
        if (res) {


            result(null, res);
        } else {
            result(err, null);
        }
    })
}
// lấy tất cả các địa điểm chưa bị vô hiệu hóa
Place.getAllPlacesEnableByCity = (city, result) => {
    dbConn.query('Select * From place Where isDeleted != 1 and city=?', [city], (err, res) => {
        if (res) {


            result(null, res);
        } else {
            result(err, null);
        }
    })
}
Place.getPlaceByID = (id, result) => {
    dbConn.query(`Select * from place Where placeID=${id}`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(err, null);
        }
    })
}
Place.getPlaceIDByPlaceName = (placeName, result) => {
    dbConn.query(`SELECT DISTINCT placeID from place WHERE placeName=${placeName}`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(err, null);
        }
    })
}
Place.searchAllPlaceByCity = (city, result) => {
    dbConn.query(`SELECT * from place WHERE city=?`, [city], (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(err, null);
        }
    })
}
Place.getPlaceIDandName = (result) => {
    dbConn.query('Select placeID,placeName From place Where isDeleted != 1', (err, res) => {
        if (res) {


            result(null, res);
        } else {
            result(err, null);
        }
    })
}
// thêm vào một địa điểm mới
Place.insertPlace = (placeName, description, tips, city, address, latitude, longitude, result) => {
    dbConn.query('Insert into place(placeName, description, tips, city, address, latitude, longitude, isDeleted) VALUES(?,?,?,?,?,?,?,0) ',
        [placeName, description, tips, city, address, latitude, longitude,], (err, res) => {
            result(err, res);
        })
}
// cập nhât các thông tin địa điểm
Place.updateInfoPlace = (id, placeName, description, tips, city, address, latitude, longitude, result) => {
    dbConn.query(`Update place Set  placeName=?, description=?,  tips=?, city=? , address=?, latitude=?, longitude=? where placeID=${id}`,
        [placeName, description, tips, city, address, latitude, longitude], (err, res) => {
            result(err, res);
        }
    );
}
// bật biến cờ để xem xet là đã xóa
Place.deletePlace = (id, result) => {
    dbConn.query(`Update place Set  isDeleted=1 where placeID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// kích hoạt lại địa điểm
Place.enablePlace = (id, result) => {
    dbConn.query(`Update place Set  isDeleted=0 where placeID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// get place and images
Place.getAllPlaceAndImages = (result) => {
    dbConn.query('Select * from place LEFT JOIN image ON place.placeID = image.placeID', (err, res) => {
        result(err, res);
    })
}


Place.getImageService = (result) => {
    dbConn.query('Select image, serviceID from image WHERE serviceID is not null and isDeleted !=1 GROUP BY serviceID', (err, res) => {
        result(err, res);
    })
}

module.exports = Place;