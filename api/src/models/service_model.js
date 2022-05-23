const dbConn = require("../../config/db.config")

var Service = function (service) {
    this.serviceID = service.serviceID,
        this.serviceName = service.serviceName,
        this.description = service.description,
        this.typeID = service.typeID,
        this.placeID = service.placeID,
        this.address = service.address,
        this.hotline = service.hotline,
        this.latitude = service.latitude,
        this.longitude = service.longitude,
        this.isDisabled = service.isDisabled

}

// Insert service
Service.insertService = (serviceName, typeID, description, placeID,
    address, hotline, latitude, longitude, result) => {
    dbConn.query(`INSERT INTO services(serviceName, typeID, description, placeID, 
        address, hotline, latitude, longitude, isDisabled) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [serviceName, typeID, description, placeID, address, hotline,
            latitude, longitude], (err, res) => {
                result(err, res);
            })
}
// Update service
Service.updateInfoService = (id, serviceName, typeID, description, placeID,
    address, hotline, latitude, longitude, result) => {
    dbConn.query(`Update services Set serviceName = ?, typeID =?, description = ?, placeID = ?, 
    address = ?, hotline = ?, latitude = ?, longitude =? where serviceID=${id}`,
        [serviceName, typeID, description, placeID, address, hotline,
            latitude, longitude], (err, res) => {
                result(err, res);
            }
    );
}
// Disable service
Service.disableService = (id, result) => {
    dbConn.query(`Update services Set  isDisabled=1 where serviceID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// Enable service
Service.enableService = (id, result) => {
    dbConn.query(`Update services Set  isDisabled=0 where serviceID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// Get Service By ID

// Get all services 
Service.getAllServices = (result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeService,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city,
        services.latitude, services.longitude, isDisabled 
        From services, typeservice, place
        Where services.placeID = place.placeID and services.typeID = typeservice.typeID`,
        (err, res) => {
            result(err, res);
        }
    );
}

// get all hotel
Service.getHotelByCity = (city, result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeService,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city,
        services.latitude, services.longitude, isDisabled 
        From services, typeservice, place
        Where services.isDisabled = 0 and services.placeID = place.placeID and services.typeID = typeservice.typeID and services.typeID=1 and city="${city}" `,
        (err, res) => {
            result(err, res);
        }
    );
}

// get all hotel
Service.getServicesByCity = (city, result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeService,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city,
        services.latitude, services.longitude, isDisabled 
        From services, typeservice, place
        Where services.isDisabled = 0 and services.placeID = place.placeID and services.typeID = typeservice.typeID and services.typeID=2 and city="${city}" `,
        (err, res) => {
            result(err, res);
        }
    );
}
// Get all service Enable by placeID

Service.getAllServicesEnableByPlaceIDAndTypeService = (id, typeService, result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeService,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city,
        services.latitude, services.longitude, services.isDisabled 
        From services, typeservice, place
        Where services.placeID = place.placeID and services.typeID = typeservice.typeID 
        and services.isDisabled = 0 and services.placeID =${id} and typeservice.typeService=?`, [typeService],
        (err, res) => {
            result(err, res);
        }
    );
}

// Get service by service id 
Service.getAllServiceByServiceID = (id, result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeService,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city,
        services.latitude, services.longitude, services.isDisabled
        From services, typeservice, place
        Where services.placeID = place.placeID and services.typeID = typeservice.typeID 
        and services.serviceID =${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}

module.exports = Service;