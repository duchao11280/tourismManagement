/**
 * 
 * @param {*} deg convert degree to radian
 */
const degToRad = (deg) =>{
    return deg*(Math.PI/180)
}

/**
 * 
 * @param {*} latFirst latitude first (degree)
 * @param {*} longFirst longitude first (degree)
 * @param {*} latSecond latitude second (degree)
 * @param {*} longSecond longitude seconde (degree)
 */
exports.getDistanceFromLatLong = (latFirst, longFirst, latSecond, longSecond) =>{
    let R = 6371; // bán kính trái đất
    let dLat = degToRad(latSecond- latFirst);
    let dLong = degToRad(longSecond- longFirst);
    let dh = Math.sqrt(Math.pow((Math.sin(dLat/2)),2) 
        + Math.cos(degToRad(latFirst))*Math.cos(degToRad(latSecond))*Math.pow((Math.sin(dLong/2)),2))
    let d = 2*R*Math.asin(dh)
    return d;
}