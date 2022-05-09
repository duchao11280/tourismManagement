const PlaceModel = require('../models/place_model.js');
const ImageModel = require('../models/image_model.js');


exports.getAllPlaceAndImagesByCity = (req, res) => {
    PlaceModel.getAllPlacesEnableByCity(req.body.city, (err, places) => {
        if (err || places[0] === undefined) {
            res.status(500).json({ status: false, message: "Thất bại", data: [] })
            return;
        } else {
            var data = []
            var flag = 0;
            places.forEach(place => {
                var images = [];
                ImageModel.getAllImageByPlaceID(place.placeID, (err, imgs) => {
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
                        placeID: place.placeID,
                        placeName: place.placeName,
                        description: place.description,
                        tips: place.tips,
                        city: place.city,
                        address: place.address,
                        latitude: place.latitude,
                        longitude: place.longitude,
                        images: images
                    })

                    if (flag == places.length) {
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })

        }
    });
}

exports.getImageService = (req, res) => {
    PlaceModel.getImageService((err, places) => {

        var data = [];
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        places.forEach(image => {
            var images = [];
            images.push(
                {
                    serviceName: image.serviceName,
                    serviceID: image.serviceID,
                    image: process.env.DOMAIN + '/public/images/' + image.image
                })
            data.push({
                images: images
            })
        })
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
    })

}





exports.getAllPlaceIDandName = (req, res) => {
    PlaceModel.getPlaceIDandName((err, place) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        };
        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: place })
    })
}

