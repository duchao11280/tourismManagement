const PlaceModel = require('../models/place_model.js');
const ImageModel = require('../models/image_model.js');
const calcDistance = require('../utitlities/distance.js')


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




// Search for places within X radius with latitude and longitude
exports.searchPlacesWithinRadiusWithLatLong = (req, res) => {
    let d = isNaN(req.params.distance) ? 5 : req.params.distance;
    let latitude = isNaN(parseFloat(req.params.latitude)) ? 0 : parseFloat(req.params.latitude);
    let longitude = isNaN(parseFloat(req.params.longitude)) ? 0 : parseFloat(req.params.longitude);
    PlaceModel.getAllPlacesEnable((err, places) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại", data: [] })
            return;
        }
        else {
            if(places === undefined){
                res.status(204).json({ status: false, message: "Không có dữ liệu", data: [] })
                return;
            }
            let placeWithinRadius = []
            places.forEach(place => {

                let distance = calcDistance.getDistanceFromLatLong(latitude, longitude, place.latitude, place.longitude);
                if (distance <= d) {
                    let objD = {distance: distance}
                    placeWithinRadius.push(Object.assign(place, objD));
                }
            })
            if(placeWithinRadius.length === 0){
                res.status(204).json({ status: false, message: "Không có dữ liệu", data: [] })
                return;
            }
            placeWithinRadius.sort((a,b)=>{
                return a.distance - b.distance ;
            })
            var data = []
            var flag = 0;
            placeWithinRadius.forEach(place => {
                var images = [];
                ImageModel.getAllImageByPlaceID(place.placeID, (err, imgs) => {
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
                    if (flag == placeWithinRadius.length) {
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })
           
        }

    });

}

