!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self)["leaflet-kmz"]={})}(this,(function(e){"use strict";function t(e){return e["doc.kml"]?"doc.kml":function(e){return e.filter(e=>/.*\.kml/.test(e))}(Object.keys(e))[0]}function i(e){return e.split("/").pop()}function r(e){return/\.(jpe?g|png|gif|bmp)$/i.test(e)}function n(e,t){return t instanceof Promise?t:Promise.all(e.map(e=>function(e){return new Promise((t,i)=>{let r=document.createElement("script");r.addEventListener("load",t.bind(e),{once:!0}),r.src=e,document.head.appendChild(r)})}(e)))}function o(e){var t=e instanceof ArrayBuffer?String.fromCharCode.apply(null,new Uint8Array(e)):e;return(new DOMParser).parseFromString(t,"text/xml")}const s=L.KMZLayer=L.FeatureGroup.extend({options:{interactive:!0,ballon:!0,bindPopup:!0,bindTooltip:!0,preferCanvas:!1},initialize:function(e,t){L.extend(this.options,t),L.Browser.mobile&&(this.options.bindTooltip=!1),this._layers={},e&&this.load(e)},add:function(e){this.load(e)},load:function(e){L.KMZLayer._jsPromise=n(this._requiredJSModules(),L.KMZLayer._jsPromise).then(()=>this._load(e))},_load:function(e){return function(e){return new Promise((t,i)=>{let r=new XMLHttpRequest;r.open("GET",e),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.responseType="arraybuffer",r.onload=()=>{4!==r.readyState||200!==r.status&&0!==r.status?console.warn("Error "+r.status+" while fetching remote file: "+e):t(r.response||r.responseText)},r.onerror=()=>i("Error "+r.status+" while fetching remote file: "+e),r.send()})}(e).then(t=>this._parse(t,{name:i(e),icons:{}}))},_parse:function(e,t){return i=e,"PK"===String.fromCharCode(new Uint8Array(i,0,1),new Uint8Array(i,1,1))?this._parseKMZ(e,t):this._parseKML(e,t);var i},_parseKMZ:function(e,i){var n;(n=e,new Promise((e,t)=>{window.JSZip.loadAsync(n).then(t=>{var i=Object.keys(t.files).map(e=>{var i=t.files[e];if(r(e)){var n=e.split(".").pop().toLowerCase().replace("jpg","jpeg"),o=function(e,t){var i="text/plain";return/\.(jpe?g|png|gif|bmp)$/i.test(e)?i="image/"+t:/\.kml$/i.test(e)&&(i="text/plain"),i}(e,n);return i.async("base64").then(t=>[e,"data:"+o+";base64,"+t])}return i.async("text").then(t=>[e,t])});Promise.all(i).then(t=>e(t.reduce((e,t)=>(e[t[0]]=t[1],e),{})))})})).then(e=>{var n=t(e),o=Object.keys(e).filter(e=>r(e)),s=e[n];i.icons=o.reduce((t,i)=>(t[i]=e[i],t),{}),this._parseKML(s,i)})},_parseKML:function(e,t){var i=o(e),r=function(e,t){var i=e instanceof XMLDocument?e:o(e),r=window.toGeoJSON.kml(i);return r.properties=L.extend({},r.properties,t||{}),r}(i,t),n=(this.options.geometryToLayer||this._geometryToLayer).call(this,r,i);this.addLayer(n),this.fire("load",{layer:n,name:r.properties.name})},_geometryToLayer:function(e,t){var i=this._map?this._map.options.preferCanvas:this.options.preferCanvas;return L.geoJson(e,{pointToLayer:(t,r)=>i?L.kmzMarker(r,{iconUrl:e.properties.icons[t.properties.icon]||t.properties.icon,iconSize:[28,28],iconAnchor:[14,14],interactive:this.options.interactive}):L.marker(r,{icon:L.icon({iconUrl:e.properties.icons[t.properties.icon]||t.properties.icon,iconSize:[28,28],iconAnchor:[14,14]}),interactive:this.options.interactive}),style:e=>{var t={},i=e.properties;return i.stroke&&(t.stroke=!0,t.color=i.stroke),i.fill&&(t.fill=!0,t.fillColor=i.fill),i["stroke-opacity"]&&(t.opacity=i["stroke-opacity"]),i["fill-opacity"]&&(t.fillOpacity=i["fill-opacity"]),i["stroke-width"]&&(t.weight=1.05*i["stroke-width"]),t},onEachFeature:(e,t)=>{if(this.options.ballon){var i=e.properties,r=i.name||"",n=i.description||"";(r||n)&&(this.options.bindPopup&&t.bindPopup("<div><b>"+r+"</b><br>"+n+"</div>"),this.options.bindTooltip&&t.bindTooltip("<b>"+r+"</b>",{direction:"auto",sticky:!0}))}},interactive:this.options.interactive})},_requiredJSModules:function(){var e=[],t="https://unpkg.com/";return"function"!=typeof window.JSZip&&e.push(t+"jszip@3.5.0/dist/jszip.min.js"),"object"!=typeof window.toGeoJSON&&e.push(t+"@tmcw/togeojson@4.1.0/dist/togeojson.umd.js"),e}});L.kmzLayer=function(e,t){return new L.KMZLayer(e,t)},L.KMZMarker=L.CircleMarker.extend({_updatePath:function(){var e=this._renderer,t=this._icon,i=this;e._drawing&&!i._empty()&&(t?t.drawImage():((t=this._icon=new Image(this.options.iconSize[0],this.options.iconSize[1])).anchor=[t.width/2,t.height/2],t.onload=t.drawImage=()=>{var r=i._point.subtract(t.anchor);e._ctx.drawImage(t,r.x,r.y,t.width,t.height)},t.src=this.options.iconUrl))}}),L.kmzMarker=function(e,t){return new L.KMZMarker(e,t)};var a=L.KMZMarker;e.KMZLayer=s,e.KMZMarker=a,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=leaflet-kmz.js.map
