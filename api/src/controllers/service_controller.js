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
            res.status(500).json({ status: false, message: "Thất bại", data: [] })
            return;
        }
        else {
            if (services === undefined) {
                res.status(204).json({ status: false, message: "Không có dữ liệu", data: [] })
                return;
            }
            let serviceWithinRadius = []
            services.forEach(service => {

                let distance = calcDistance.getDistanceFromLatLong(latitude, longitude, service.latitude, service.longitude);
                if (distance <= d) {
                    let objD = { distance: distance }
                    serviceWithinRadius.push(Object.assign(service, objD));
                }
            })
            if (serviceWithinRadius.length === 0) {
                res.status(204).json({ status: false, message: "Không có dữ liệu", data: [] })
                return;
            }
            serviceWithinRadius.sort((a, b) => {
                return a.distance - b.distance;
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

exports.getServiceById = (req, res) => {
    let id = req.params.id;
    ServiceModel.getAllServiceByServiceID(id, (err, service) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        }
        let data = {
            serviceID: service[0]?.serviceID,
            serviceName: service[0]?.serviceName,
            description: service[0]?.description,
            typeID: service[0]?.typeID,
            typeService: service[0]?.typeService,
            placeID: service[0]?.placeID,
            placeName: service[0]?.placeName,
            city: service[0]?.city,
            address: service[0]?.address,
            hotline: service[0]?.hotline,
            latitude: service[0]?.latitude,
            longitude: service[0]?.longitude,
            isDisabled: service[0]?.isDisabled,
            images: [],
        }
        ImageModel.getAllImageByServiceID(data.serviceID, (err, imgs) => {
            if (err) {
                res.status(500).json({ status: false, message: "Thất bại" })
                return;
            };
            var images = [];
            imgs.forEach(element => {
                images.push({
                    id: Object.values(element)[0],
                    image: process.env.DOMAIN + '/public/images/' + Object.values(element)[1]
                })
            });
            data.images = images

            res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
        })
    })
}