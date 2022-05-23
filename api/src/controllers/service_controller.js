const ServiceModel = require('../models/service_model');
const ImageModel = require('../models/image_model.js');
const calcDistance = require('../utitlities/distance.js')

exports.getAllServiceAndImagesByPlaceIDAndTypeService = (req, res) => {
    ServiceModel.getAllServicesEnableByPlaceIDAndTypeService(req.params.id, req.body.typeService, (err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: err, data: [] })
            return;
        } else if (services[0] === undefined) {
            res.status(200).json({ status: false, message: "Không có dữ liệu", data: [] })
            return;
        }
        else {
            var data = []
            var flag = 0;
            services.forEach(service => {
                var images = [];
                ImageModel.getAllImageByServiceID(service.serviceID, (err, imgs) => {
                    flag++;
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };
                    for (var i = 0; i < imgs.length; i++) {
                        images.push({
                            id: imgs[i].id,
                            image: process.env.DOMAIN + '/public/images/' + imgs[i].image
                        })
                    }
                    data.push({
                        serviceID: service.serviceID,
                        serviceName: service.serviceName,
                        description: service.description,
                        typeID: service.typeID,
                        typeService: service.typeService,
                        placeID: service.placeID,
                        placeName: service.placeName,
                        city: service.city,
                        address: service.address,
                        hotline: service.hotline,
                        latitude: service.latitude,
                        longitude: service.longitude,
                        isDisabled: service.isDisabled,
                        images: images
                    })

                    if (flag == services.length) {
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })

        }
    });
}

exports.getHotelByCity = (req, res) => {
    // console.log(req.body.city)
    ServiceModel.getHotelByCity(req.body.city, (err, services) => {
        // console.log(err)
        if (err) {
            res.status(500).json({ status: false, message: err, data: [] })
            return;
        } else if (services[0] === undefined) {
            res.status(200).json({ status: false, message: "Không có dữ liệu", data: [] })
            return;
        }
        else {
            var data = []
            var flag = 0;
            services.forEach(service => {
                var images = [];
                ImageModel.getAllImageByServiceID(service.serviceID, (err, imgs) => {
                    flag++;
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };
                    for (var i = 0; i < imgs.length; i++) {
                        images.push({
                            id: imgs[i].id,
                            image: process.env.DOMAIN + '/public/images/' + imgs[i].image
                        })
                    }
                    data.push({
                        serviceID: service.serviceID,
                        serviceName: service.serviceName,
                        description: service.description,
                        typeID: service.typeID,
                        typeService: service.typeService,
                        placeID: service.placeID,
                        placeName: service.placeName,
                        city: service.city,
                        address: service.address,
                        hotline: service.hotline,
                        latitude: service.latitude,
                        longitude: service.longitude,
                        isDisabled: service.isDisabled,
                        images: images
                    })

                    if (flag == services.length) {
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })

        }
    });
}

exports.getServicesByCity = (req, res) => {
    ServiceModel.getServicesByCity(req.body.city, (err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: err, data: [] })
            return;
        } else if (services[0] === undefined) {
            res.status(200).json({ status: false, message: "Không có dữ liệu", data: [] })
            return;
        }
        else {
            var data = []
            var flag = 0;
            services.forEach(service => {
                var images = [];
                ImageModel.getAllImageByServiceID(service.serviceID, (err, imgs) => {
                    flag++;
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };
                    for (var i = 0; i < imgs.length; i++) {
                        images.push({
                            id: imgs[i].id,
                            image: process.env.DOMAIN + '/public/images/' + imgs[i].image
                        })
                    }
                    data.push({
                        serviceID: service.serviceID,
                        serviceName: service.serviceName,
                        description: service.description,
                        typeID: service.typeID,
                        typeService: service.typeService,
                        placeID: service.placeID,
                        placeName: service.placeName,
                        city: service.city,
                        address: service.address,
                        hotline: service.hotline,
                        latitude: service.latitude,
                        longitude: service.longitude,
                        isDisabled: service.isDisabled,
                        images: images
                    })

                    if (flag == services.length) {
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })

        }
    });
}

// Search for places within X radius with latitude and longitude
exports.searchServicesWithinRadiusWithLatLong = (req, res) => {
    let d = isNaN(req.params.distance) ? 5 : req.params.distance;
    let latitude = isNaN(parseFloat(req.params.latitude)) ? 0 : parseFloat(req.params.latitude);
    let longitude = isNaN(parseFloat(req.params.longitude)) ? 0 : parseFloat(req.params.longitude);
    ServiceModel.getAllServicesEnable((err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại", data:[] })
            return;
        }
        else {
            if(services === undefined){
                res.status(204).json({ status: false, message: "Không có dữ liệu", data: [] })
                return;
            }
            let serviceWithinRadius = []
            services.forEach(service => {

                let distance = calcDistance.getDistanceFromLatLong(latitude, longitude, service.latitude, service.longitude);
                if (distance <= d) {
                    let objD = {distance: distance}
                    serviceWithinRadius.push(Object.assign(service, objD));
                }
            })
            if(serviceWithinRadius.length === 0){
                res.status(204).json({ status: false, message: "Không có dữ liệu", data: [] })
                return;
            }
            serviceWithinRadius.sort((a,b)=>{
                return a.distance - b.distance ;
            })
            var data = []
            var flag = 0;
            serviceWithinRadius.forEach(service => {
                var images = [];
                
                ImageModel.getAllImageByServiceID(service.serviceID, (err, imgs) => {
                    flag++
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };
                    for (var i = 0; i < imgs.length; i++) {
                        images.push({
                            id: imgs[i].id,
                            image: process.env.DOMAIN + '/public/images/' + imgs[i].image
                        })
                    }
                    data.push({
                        serviceID: service.serviceID,
                        serviceName: service.serviceName,
                        description: service.description,
                        typeID: service.typeID,
                        typeService: service.typeService,
                        placeID: service.placeID,
                        placeName: service.placeName,
                        city: service.city,
                        address: service.address,
                        hotline: service.hotline,
                        latitude: service.latitude,
                        longitude: service.longitude,
                        isDisabled: service.isDisabled,
                        images: images
                    })
                    if (flag >= serviceWithinRadius.length) {
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })
           
        }

    });

}