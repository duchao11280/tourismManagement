const RoomModel = require('../models/room_model')
const BookRoomModel = require('../models/bookroom_model')
const PlaceModel = require('../models/place_model')
exports.getAllRoomIsEnable = (req,res)=>{
    PlaceModel.getAllPlacesEnable((err, places) => {
        if (err) {
            res.status(500).json({ status: false, message: "Thất bại" })
            return;
        } else {
            var data = []
            var flag =0;
            places.forEach(place => {
                let listRoom =[]
                RoomModel.getAllRoomIsEnableByPlaceID(place.placeID, (err, rooms) => {
                    flag++;
                    if (err) {
                        res.status(500).json({ status: false, message: "Thất bại" })
                        return;
                    };
                    if(rooms.length !=0){
                        for (var i = 0; i < rooms.length; i++) {
                            listRoom.push({
                                roomID: rooms[i].roomID,
                                roomName: rooms[i].roomName,
                                slot: rooms[i].slot,
                                price: rooms[i].price,
                                description: rooms[i].description,
                                address: rooms[i].address,
                                userID: rooms[i].userID,
                                userName: rooms[i].userName,
                            })
                        }
                        data.push({
                            placeID: place.placeID,
                            placeName: place.placeName,
                            listRoom: listRoom,
                        })
                    }
                    if(flag == places.length){
                        
                        res.json({ status: true, message: 'Lấy dữ liệu thành công', data: data })
                    }
                })

            })
            
        }
    });
}
exports.searchRoomtoBook = (req, res) => {
    RoomModel.searchRoomtoBook(req.body.placeID,req.body.price,
        req.body.slot,req.body.startTime, (err, listRoom) =>{
            if (err) {
                res.status(500).json({status: false, message: "Thất bại"})
                return;
            };
            res.json({status: true, message:'Lấy dữ liệu thành công', data: listRoom, timeBook:req.body.startTime})
        })
}
exports.bookRoom = (req, res) =>{
    BookRoomModel.insertBookRoom(req.body.roomID,req.body.userID,
        req.body.startTime,req.body.phoneNumber,(err,room)=>{
            if (err) {
                res.status(500).json({status: false, message: "Thất bại"})
                return;
            };
            res.json({status: true, message:'Đặt thành công'})
        })
}

exports.getRoomBookedByUserID = (req, res) => {
    BookRoomModel.getAllByUserID(req.params.id, (err,bookroom)=>{
        if (err) {
            res.status(500).json({status: false, message: "Thất bại"})
            return;
        };
        res.json({status: true, message:'Lấy dữ liệu thành công',data:bookroom })
    })
}