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
    this.isDisable = service.isDisable

}

// Insert service
Service.insertService = (serviceName, typeID, description, placeID,
    address, hotline, latitude, longitude, result) => {
    dbConn.query(`INSERT INTO services(serviceName, typeID, description, placeID, 
        address, hotline, latitude, longitude, isDisable) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [serviceName, typeID, description, placeID, address, hotline,
            latitude, longitude], (err, res) => {
                result(err, res);
            })
}
// Update service
Service.updateInfoSerivce = (id, serviceName, typeID, description, placeID,
    address, hotline, latitude, longitude, result) => {
    dbConn.query(`Update services Set serviceName = ?, typeID =?, description = ?, placeID = ?, 
    address = ?, hotline = ?, latitude = ?, longitude =? where placeID=${id}`,
        [serviceName, typeID, description, placeID, address, hotline, 
            latitude, longitude], (err, res) => {
                result(err, res);
            }
    );
}
// Disable service
Service.disableService = (id, result) => {
    dbConn.query(`Update place Set  isDisable=1 where placeID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// Enable service
Service.disableService = (id, result) => {
    dbConn.query(`Update place Set  isDisable=0 where placeID=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}
// Get Service By ID

// Get all services 
Service.getAllServices = (result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeName,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city
        services.latitude, services.longitude, isDisable 
        From services, typeservice, place
        Where services.placeID = place.placeID and services.typeID = typeservice.typeID`,
        (err, res) => {
            result(err, res);
        }
    );
}
// Get all service Enable

Service.getAllServicesEnable = (result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeName,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city
        services.latitude, services.longitude, isDisable 
        From services, typeservice, place
        Where services.placeID = place.placeID and services.typeID = typeservice.typeID 
        and services.isDisable = 0`,
        (err, res) => {
            result(err, res);
        }
    );
}

// Get service by service id 
Service.getServiceByServiceID = (id, result) => {
    dbConn.query(`Select services.serviceID, services.serviceName, services.typeID, 
        typeservice.typeName,services.description, services.placeID, place.placeName,
        services.address, services.hotline, place.city
        services.latitude, services.longitude, isDisable 
        From services, typeservice, place
        Where services.placeID = place.placeID and services.typeID = typeservice.typeID 
        and services.services.serviceID =${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}