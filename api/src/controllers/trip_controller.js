const TripModel = require('../models/trip_model')
const DetailTripModel = require('../models/detailtrip_model')
const calcDistance = require('../utitlities/distance.js')
exports.getTripEnableByCity = (req, res) => {
    let city = req.body.city;
    TripModel.getTripEnableByCity(city, (err, data) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại", data: [] })
            return;
        }
        if (data.length == 0) {
            res.status(204).json({ status: true, message: 'Không có dữ liệu', data: [] })
        } else
            res.status(200).json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
    })
}

exports.getTripDetailById = (req, res) => {
    let id = req.params.id;
    let data = {};
    TripModel.getTripByID(id, (err, trip) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        }
        if (trip.length === 0) {
            res.status(204).json({ status: false, message: "Không có dữ liệu", data: {} })
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
            data.distance = []
            let listDay = []

            detail.forEach((item) => {
                listDay.push(item.day)
            })
            // xóa bỏ các ngày trùng có dữ liệu
            listDay = Array.from(new Set(listDay))
            let listDayEmpty = [];
            for (let i = listDay[listDay.length - 1] + 1 || 1; i <= trip[0].numberOfDays; i++) {
                listDayEmpty.push(i)
            }
            listDay.push(...listDayEmpty)
            listDay.forEach((day) => {
                let detailPerDay = { day: day }
                let detailOfDay = []

                detail.forEach((detailItem) => {
                    if (detailItem.day == day && detailItem.isDisabled != 1) {
                        detailOfDay.push({ ...detailItem, distanceToNext: 0 })
                    }
                })

                if (detailOfDay.length > 1) {
                    for (let i = 0; i < detailOfDay.length - 1; i++) {
                        let distance = calcDistance.getDistanceFromLatLong(detailOfDay[i].latitude, detailOfDay[i].longitude, detailOfDay[i + 1].latitude, detailOfDay[i + 1].longitude)
                        detailOfDay[i].distanceToNext = distance;
                    }
                }
                detailPerDay.detail = detailOfDay;
                data.detail.push(detailPerDay);
            })
            res.status(200).json({ status: true, message: "Lấy dữ liệu thành công", data: data })

        })

    })
}