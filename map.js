(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map",
{ "compressionlevel":-1,
 "height":18,
 "infinite":false,
 "layers":[
        {
         "data":[12, 12, 12, 12, 12, 9, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            12, 12, 12, 12, 12, 9, 6, 2, 2, 2, 2, 2, 2, 2, 2, 3, 12, 12,
            12, 12, 12, 12, 12, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 12, 12,
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 2, 2, 2, 2, 2,
            12, 12, 12, 12, 12, 5, 12, 12, 12, 12, 12, 12, 9, 10, 10, 10, 10, 10,
            2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 8, 10, 10, 10, 10, 10,
            10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
            10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
            18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
            1, 2, 2, 2, 3, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 1,
            9, 10, 10, 10, 11, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 9],
         "height":18,
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