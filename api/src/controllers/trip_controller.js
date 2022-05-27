const TripModel = require('../models/trip_model')
const DetailTripModel = require('../models/detailtrip_model')
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
            for (let i = listDay[listDay.length - 1] + 1 || 1; i <= trip[0].numberOfDays; i++) {
                listDayEmpty.push(i)
            }
            listDay.push(...listDayEmpty)
            listDay.forEach((day) => {
                let detailPerDay = { day: day }
                let detailOfDay = []
                detail.forEach((detailItem) => {
                    if (detailItem.day == day && detailItem.isDisabled != 1) {
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