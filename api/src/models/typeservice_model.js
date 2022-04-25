const { resolve } = require("path")
const dbConn = require("../../config/db.config")

var TypeService = function(typeService){
    this.typeID = typeService.id,
    this.typeService = typeService.typeService

}

TypeService.getAllType = (result) =>{
    dbConn.query(`Select * from typeservice`,(err,res) =>{
        result(err,res);
    })
}

module.exports = TypeService