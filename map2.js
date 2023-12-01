(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map2",
{ "compressionlevel":-1,
 "height":12,
 "infinite":false,
 "layers":[
        {
         "data":[13, 13, 13, 13, 13, 10, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 10, 6, 2, 2, 2, 2, 2, 2, 2, 2, 3, 13, 13,
            13, 13, 13, 13, 13, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 13, 13,
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 1, 2, 2, 2, 2, 2,
            13, 13, 13, 13, 13, 5, 13, 13, 13, 13, 13, 13, 10, 11, 11, 11, 11, 11,
            2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 8, 11, 11, 11, 11, 11,
            11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
            11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
         "height":12,
         "id":1,
         "name":"Capa de patrones 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":18,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.2",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"blocks.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.10",
 "width":18
});