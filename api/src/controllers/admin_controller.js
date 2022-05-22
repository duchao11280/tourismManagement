const PlaceModel = require('../models/place_model.js');
const ImageModel = require('../models/image_model');
const UserModel = require('../models/user_model');
const NotificationModel = require('../models/notification_model');
const ServiceModel = require('../models/service_model');
const TypeService = require('../models/typeservice_model')
const TripModel = require('../models/trip_model')
const DetailTripModel = require('../models/detailtrip_model')
//========================PLace================================//
//get all place
exports.getAllPlaces = (req, res) => {
    PlaceModel.getAllPlaces((err, places) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: places })
    });
}
exports.getAllPlacesEnable = (req, res) => {
    PlaceModel.getAllPlacesEnable((err, places) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: places })
    });
}
exports.getPlaceAndImageByPlaceID = (req, res) => {
    PlaceModel.getPlaceByID(req.params.id, (err, place) => {
        if (err || place[0] === undefined) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        let data = {
            placeID: place[0].placeID,
            placeName: place[0].placeName,
            description: place[0].description,
            tips: place[0].tips,
            city: place[0].city,
            address: place[0].address,
            latitude: place[0].latitude,
            longitude: place[0].longitude,
            images: [],
        }
        ImageModel.getAllImageByPlaceID(data.placeID, (err, imgs) => {
            if (err) {
                res.status(500).json({ status: false, message: "Thất bại" })
                return;
            };
            var images = [];
            imgs.forEach(element => {
                images.push({
                    id: Object.values(element)[0],
                    imgURL: process.env.DOMAIN + '/public/images/' + Object.values(element)[1]
                })
            });
            data.images = images

            res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
        })
    })
}

// get image by placeID
exports.getImageByPlaceID = (req, res) => {
    ImageModel.getAllImageByPlaceID(req.params.id, (err, imgs) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        var data = [];
        imgs.forEach(element => {
            data.push({
                id: Object.values(element)[0],
                image: process.env.DOMAIN + '/public/images/' + Object.values(element)[1]
            })
        });
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
    })
}

exports.searchAllPlaceByCity = (req, res) => {
    PlaceModel.searchAllPlaceByCity(req.body.city, (err, places) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: places })
    });
}
// upload image to server
exports.uploadImagePlace = (req, res) => {
    try {
        if (req.files.length != 0) {
            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i] == undefined) {
                    return res.status(404).json({ status: false, message: "Upload hình ảnh thất bại" });

                }
            }
            placeID = req.params.id;
            for (let i = 0; i < req.files.length; i++) {
                ImageModel.insertImagePlace(req.files[i].filename, placeID, (err, result) => {
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };

                })
            }
            res.json({ status: true, message: 'Thêm hình ảnh thành công' })
        }

    } catch (error) {
        res.status(500).json({ status: false, message: "Kết nối thất bại, vui lòng thử lại sau" })
        return;
    }
}
// Delete image
exports.deleteImage = (req, res) => {
    ImageModel.deleteImage(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Xóa hình ảnh thành công' })
    })
}
// Insert Place
exports.insertPlace = async (req, res) => {
    try {
        var placeReq = new PlaceModel(req.body);
        let placeID;
        PlaceModel.insertPlace(placeReq.placeName, placeReq.description,
            placeReq.tips, placeReq.city, placeReq.address, placeReq.latitude, placeReq.longitude, (err, data) => {
                if (err) {
                    res.status(500).json({ status: false, message: "Thất bại" })
                    return;
                }
                if (req.files.length != 0) {
                    placeID = data.insertId;
                    for (let i = 0; i < req.files.length; i++) {
                        ImageModel.insertImagePlace(req.files[i].filename, placeID, (err, result) => {
                            if (err) {
                                res.status(500).json({ status: false, message: "Thất bại" })
                                return;
                            };
                        })
                    }
                }
                res.json({ status: true, message: 'Thêm địa điểm thành công' })
            })
    } catch (error) {
        res.status(500).json({ status: false, message: "Kết nối thất bại, vui lòng thử lại sau" })
        return;
    }
}
// Update info place
exports.updateInfoPlace = (req, res) => {
    var placeReq = new PlaceModel(req.body);
    PlaceModel.updateInfoPlace(req.params.id, placeReq.placeName, placeReq.description,
        placeReq.tips, placeReq.city, placeReq.address, placeReq.latitude, placeReq.longitude, (err, data) => {
            if (err) {
                res.status(500).json({ status: false, message: "Thất bại" })
                return;
            };
            res.json({ status: true, message: 'Cập nhật địa điểm thành công' })
        })

}
// Delete Place
exports.deletePlace = (req, res) => {
    PlaceModel.deletePlace(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Vô hiệu hóa địa điểm thành công' })
    })
}
// Kích hoạt Place
exports.enablePlace = (req, res) => {
    PlaceModel.enablePlace(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Kích hoạt địa điểm thành công' })
    })
}

//========================User================================//
// get all user
exports.getAllUsers = (req, res) => {
    UserModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại", data: [] })
            return;
        };
        if (users[0] === undefined) {
            res.status(200).json({ status: false, message: "Không có dữ liệu", data: [] })
            return;
        }

        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: users })
    });
}

// disable user
exports.disableUser = (req, res) => {
    UserModel.disableUser(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Vô hiệu hóa thành công' })
    })

}
// enable user
exports.enableUser = (req, res) => {
    UserModel.enableUser(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Kích hoạt thành công' })
    })

}
//========================Notification================================//
exports.addNotification = (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    var now = new Date();
    var month = now.getMonth() + 1;
    var time = (now.getFullYear() + "-" + month + "-" + now.getDate() +
        " " + `0${new Date().getHours()}`.slice(-2) + ":" + `0${new Date().getMinutes()}`.slice(-2));
    NotificationModel.insertNotification(title, content, time, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Thêm mới thành công' })
    })
}

exports.updateNotification = (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    var now = new Date();
    var month = now.getMonth() + 1;
    var time = (now.getFullYear() + "-" + month + "-" + now.getDate() +
        " " + `0${new Date().getHours()}`.slice(-2) + ":" + `0${new Date().getMinutes()}`.slice(-2));
    NotificationModel.updateNotification(id, title, content, time, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Cập nhật thành công' })
    })
}
exports.deleteNotification = (req, res) => {
    var id = req.params.id;
    NotificationModel.deleteNotification(id, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Xóa thành công' })
    })
}
//======================Services=====================//
exports.getAllServices = (req, res) => {
    ServiceModel.getAllServices((err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: services })
    });
}
exports.getAllServicesEnable = (req, res) => {
    ServiceModel.getAllServicesEnable((err, services) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: services })
    });
}
// update info service
exports.updateInfoService = (req, res) => {
    var service = new ServiceModel(req.body);
    ServiceModel.updateInfoService(req.params.id, service.serviceName,
        service.typeID, service.description, service.placeID, service.address,
        service.hotline, service.latitude, service.longitude, (err, data) => {
            if (err) {
                res.status(500).json({ status: false, message: "Thất bại" })
                return;
            };
            res.json({ status: true, message: 'Cập nhật thành công' })
        })

}
// enable service
exports.enableService = (req, res) => {
    ServiceModel.enableService(req.params.id, (err, service) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Kích hoạt thành công' })
    })
}

// disable service
exports.disableService = (req, res) => {
    ServiceModel.disableService(req.params.id, (err, service) => {
        if (err) {
            res.status(500).json({ status: false, message: err })
            return;
        };
        res.json({ status: true, message: 'Vô hiệu hóa thành công' })
    })
}
// insert service
exports.insertService = async (req, res) => {
    try {
        var service = new ServiceModel(req.body);
        let serviceID;
        ServiceModel.insertService(service.serviceName, service.typeID,
            service.description, service.placeID, service.address,
            service.hotline, service.latitude, service.longitude,
            (err, data) => {
                if (err) {
                    res.status(500).json({ status: false, message: "Thất bại" })
                    return;
                }
                if (req.files.length != 0) {
                    serviceID = data.insertId;
                    for (let i = 0; i < req.files.length; i++) {
                        ImageModel.insertImageService(req.files[i].filename, serviceID, (err, result) => {
                            if (err) {
                                res.status(500).json({ status: false, message: "Thất bại" })
                                return;
                            };
                        })
                    }
                }
                res.json({ status: true, message: 'Thêm dịch vụ thành công' })
            })
    } catch (error) {
        res.status(500).json({ status: false, message: "Kết nối thất bại, vui lòng thử lại sau" })
        return;
    }
}

exports.uploadImageService = (req, res) => {
    try {
        if (req.files.length != 0) {
            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i] == undefined) {
                    return res.status(404).json({ status: false, message: "Upload hình ảnh thất bại" });

                }
            }
            serviceID = req.params.id;
            for (let i = 0; i < req.files.length; i++) {
                ImageModel.insertImageService(req.files[i].filename, serviceID, (err, result) => {
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };

                })
            }
            res.json({ status: true, message: 'Thêm hình ảnh thành công' })
        }

    } catch (error) {
        res.status(500).json({ status: false, message: "Kết nối thất bại, vui lòng thử lại sau" })
        return;
    }
}
// get service by service id
exports.getServiceAndImageByServiceID = (req, res) => {
    ServiceModel.getAllServiceByServiceID(req.params.id, (err, services) => {
        if (err || services[0] === undefined) {
            res.status(500).json({ status: false, message: err })
            return;
        };
        let data = {
            serviceID: services[0].serviceID,
            serviceName: services[0].serviceName,
            description: services[0].description,
            typeID: services[0].typeID,
            typeService: services[0].typeService,
            placeID: services[0].placeID,
            placeName: services[0].placeName,
            city: services[0].city,
            address: services[0].address,
            hotline: services[0].hotline,
            latitude: services[0].latitude,
            longitude: services[0].longitude,
            isDisabled: services[0].isDisabled,
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
                    imgURL: process.env.DOMAIN + '/public/images/' + Object.values(element)[1]
                })
            });
            data.images = images

            res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
        })
    })
}
// get type service
exports.getAllTypeService = (req, res) => {
    TypeService.getAllType((err, type) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Vô hiệu hóa thành công', data: type })
    })
}

exports.getAllTrip = (req, res) => {
    TripModel.getAllTrip((err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        }
        if (data.length == 0) {
            res.status(204).json({ status: true, message: 'Không có dữ liệu', data: data })
        } else
            res.status(200).json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
    })
}

// enable trip
exports.enableTrip = (req, res) => {
    TripModel.enableTrip(req.params.id, (err, trip) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Kích hoạt thành công' })
    })
}

// disable trip
exports.disableTrip = (req, res) => {
    TripModel.disableTrip(req.params.id, (err, trip) => {
        if (err) {
            res.status(500).json({ status: false, message: err })
            return;
        };
        res.json({ status: true, message: 'Vô hiệu hóa thành công' })
    })
}
exports.addTrip = (req, res) => {
    TripModel.addTrip(req.body.tripName, req.body.city, req.body.tripDetail, req.userID, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Thêm mới thành công' })
    })
}
exports.getDetailTripByID = (req, res) => {
    let id = req.params.id;
    let data = {};
    TripModel.getTripByID(id, (err, trip) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        }
        data.tripID = trip[0].tripID;
        data.tripName = trip[0].tripName;
        data.city = trip[0].city;
        data.numberOfDays = trip[0].numberOfDays;
        data.isDisabled = trip[0].isDisabled;
        data.userID = trip[0].userID;

        DetailTripModel.getTripDetailByTripID(id, (err, detail) => {
            if (err) {
                res.status(500).json({ status: false, message: "Thất bại" })
                return;
            }
            data.detail = [];
            let listDay = []

            detail.forEach((item) => {
                listDay.push(item.day)
            })
            // xóa bỏ các ngày trùng có dữ liệu
            listDay = Array.from(new Set(listDay))
            let listDayEmpty = [];
            for (let i = listDay[listDay.length - 1] + 1; i <= trip[0].numberOfDays; i++) {
                listDayEmpty.push(i)
            }
            listDay.push(...listDayEmpty)
            listDay.forEach((day) => {
                let detailPerDay = { day: day }
                let detailOfDay = []
                detail.forEach((detailItem) => {
                    if (detailItem.day == day) {
                        detailOfDay.push(detailItem)
                    }
                })
                detailPerDay.detail = detailOfDay;
                data.detail.push(detailPerDay);
            })
            res.status(200).json({ status: true, message: "Lấy dữ liệu thành công", data: data })

        })

    })
}
exports.updateBasicInfoTrip = (req, res) => {
    let id = req.params.id;
    let tripName = req.body.tripName;
    let numberOfDays = req.body.numberOfDays;
    let city = req.body.city;
    TripModel.updateBasicInfoTrip(id, tripName, numberOfDays, city, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Cập nhật thành công' })
    })
}
exports.updateDetailTripItem = (req, res) => {
    let id = req.params.id;
    let placeID = req.body.placeID;
    let serviceID = req.body.serviceID;
    let note = req.body.note;
    let timeClock = req.body.timeClock;
    DetailTripModel.updateDetailTripItem(id, placeID, serviceID, note, timeClock, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Cập nhật thành công' })
    })
}
exports.deleteDetailTripItem = (req, res) => {
    DetailTripModel.deleteDetailTripItem(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Xóa thành công' })
    })
}
exports.addPlaceToDetailTrip = (req, res) => {
    let tripID = req.params.id
    let day = req.body.day;
    let placeID = req.body.placeID;
    let note = req.body.note;
    let timeClock = req.body.timeClock;
    DetailTripModel.addPlaceToDetailTrip(tripID, day, placeID, note, timeClock, (err, result) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Thêm thành công' })
    })
}
// delete day of detail trip
exports.deleteDayOfDetailTrip = (req, res) => {
    let tripID = req.params.tripid
    let day = req.params.day;
    TripModel.deleteDayOfDetailTrip(tripID, day, (err, result) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Xóa thành công' })
    })
}