const ServiceModel = require('../models/service_model');
const ImageModel = require('../models/image_model.js');

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

exports.getAllHotel = (req, res) => {
    ServiceModel.getAllHotel((err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: services })
    });
}

exports.getAllOtherServices = (req, res) => {
    ServiceModel.getAllOtherServices((err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: services })
    });
}
