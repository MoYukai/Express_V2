class index{
  static async isPointInPolygon(polygon, lng, lat) {
 
    var numberOfPoints = polygon.length;
    var polygonLats = [];
    var polygonLngs = [];
    for (var i = 0; i < numberOfPoints; i++) {
        polygonLats.push(polygon[i]['lat']);
        polygonLngs.push(polygon[i]['lng']);
    }
  
    var polygonContainsPoint = false;
    for (var node = 0, altNode = (numberOfPoints - 1); node < numberOfPoints; altNode = node++) {
        if ((polygonLngs[node] > lng != (polygonLngs[altNode] > lng))
            && (lat < (polygonLats[altNode] - polygonLats[node])
                * (lng - polygonLngs[node])
                / (polygonLngs[altNode] - polygonLngs[node])
                + polygonLats[node]
            )
        ) {
            polygonContainsPoint = !polygonContainsPoint;
        }
    }
  
    return polygonContainsPoint;
  }
}

module.exports = index


