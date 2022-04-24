const dbConn = require("../../config/db.config")

var Image = function(image){
    this.id = image.id,
    this.image = image.image,
    this.placeID = image.placeID,
    this.isDeleted = image.isDeleted,
    this.serviceID = image.serviceID
}

Image.getAllImageByPlaceID = (id, result) => {
    dbConn.query(`Select id,image From image Where isDeleted !=1 and placeID=${id}`,(err,res)=>{
        result(err,res);
    })
}
Image.insertImagePlace = (filename,id, result) => {
    dbConn.query('Insert into image(image,placeID,isDeleted) VALUES(?,?,0) ',[filename,id],(err,res)=>{
        result(err,res);
    })
}
// Inser image service
Image.insertImageService = (filename,id, result) => {
    dbConn.query('Insert into image(image,serviceID,isDeleted) VALUES(?,?,0) ',[filename,id],(err,res)=>{
        result(err,res);
    })
}
// get image by service id
Image.getAllImageByServiceID = (id, result) => {
    dbConn.query(`Select id,image From image Where isDeleted !=1 and serviceID=${id}`,(err,res)=>{
        result(err,res);
    })
}
// bật biến cờ để xem xet là đã xóa
Image.deleteImage = (id, result) => {
    dbConn.query(`Update image Set  isDeleted=1 where id=${id}`,
        (err, res) => {
            result(err, res);
        }
    );
}


module.exports = Image;