/*

git config user.name "goldenstateofmind"
git config user.email "stateofgoldenmind@gmail.com"
git config github.user "goldenstateofmind"
git push https://goldenstateofmind@github.com/goldenstateofmind/countymap.git master

commit history based not on:
  git clone...
  git push...
but on
  git commit
  ?
*/


var m2px = 1;
function newM2px() {
    var centerLatLng = map.getCenter();
    var pointC = map.latLngToContainerPoint(centerLatLng);
    var pointX = [pointC.x + 100, pointC.y];

    var latLngC = map.containerPointToLatLng(pointC);
    var latLngX = map.containerPointToLatLng(pointX);

    var distanceX = latLngC.distanceTo(latLngX)/100;

    reciprocal = 1 / distanceX;
    m2px = reciprocal;
}

function geoStyle(m) {
    return Math.ceil(m * m2px);
}

var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString') {
      highlightLayer.setStyle({
        color: '#ddd',
      });
    } else {
      highlightLayer.setStyle({
        fillColor: '#fff',
        fillOpacity: 0.05,
        // color: "rgb(233,219,240)",
        weight: 3
      });
    }
    // highlightLayer.openPopup();
}

// SW, NE
var sfBounds = [[37.6956,-122.5180], [37.8094,-122.4029]];
var map = L.map('map', {
    zoomControl:true, maxZoom:28, minZoom:1
// }).fitBounds([[32,-124.5],[42,-114]]);
// }).fitBounds([[37,-122],[40,-120]]);
})
.fitBounds(sfBounds);

// map.attributionControl.addAttribution('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a>');

var hash = new L.Hash(map);
L.control.locate({
    icon: 'fa fa-map-marker',
    setView: 'untilPanOrZoom',
    locateOptions: {
        maxZoom: 17
    }
}).addTo(map);

var bounds_group = new L.featureGroup([]);

function setBounds() {
    // map.setMaxBounds(map.getBounds());
}



/*
BEGIN sf_hoods
*/

function pop_sf_hoods(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td>' + (feature.properties['name'] !== null ? Autolinker.link(String(feature.properties['name'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['link'] !== null ? Autolinker.link(String(feature.properties['link'])) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

map.createPane('pane_sf_hoods');
map.getPane('pane_sf_hoods').style.zIndex = 404;
map.getPane('pane_sf_hoods').style['mix-blend-mode'] = 'normal';
var layer_sf_hoods = new L.geoJson(sf_hoods, {
    attribution: '<a href=""></a>',
    pane: 'pane_sf_hoods',
});
layer_sf_hoods.setStyle({'className': 'sf_hoods'});
// bounds_group.addLayer(layer_sf_hoods);
// map.addLayer(layer_sf_hoods);

/*
END sf_hoods
BEGIN Counties
*/

function pop_Countylabels_0(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });

    /*
    var popupContent = '<table>\
            <tr>\
                <th scope="row">NAME</th>\
                <td>' + (feature.properties['NAME'] !== null ? Autolinker.link(String(feature.properties['NAME'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['label'] !== null ? Autolinker.link(String(feature.properties['label'])) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});*/
}

function style_Countylabels_0_0() {
    return {
        // stroke: false,
        // color: "rgb(187,166,217)", // purple/lavender
        // strokeColor: 'rgba(253,0,0,1)',
        // fillOpacity: 0.5,
        /*pane: 'pane_Countylabels_0',
        color: "rgba(182, 121, 12, 0.8)", // not stroke, strokeColor
        fill: true,
        fillColor: 'rgba(253,253,243,0.05)',
        weight: 1, // not strokeWidth: 1,*/
        className: "countyLines"
    }
}
map.createPane('pane_Countylabels_0');
map.getPane('pane_Countylabels_0').style.zIndex = 400;
map.getPane('pane_Countylabels_0').style['mix-blend-mode'] = 'normal';
var layer_Countylabels_0 = new L.geoJson(json_Countylabels_0, {
    attribution: '<a href=""></a>',
    pane: 'pane_Countylabels_0',
    onEachFeature: pop_Countylabels_0,
    style: style_Countylabels_0_0,
});
bounds_group.addLayer(layer_Countylabels_0);
map.addLayer(layer_Countylabels_0);


/*
END Counties

BEGIN Camps
*/

function pop_Peaks_1(feature, layer) {
    layer.on({
    });
}

function styleCamps() {
    return {
        pane: 'pane_camps',
        shape: 'circle',
        radius: geoStyle(4.0),
        color: 'rgba(50,200,50,1)',
        weight: geoStyle(1),
        fill: true,
        fillColor: 'rgba(50,200,50,0.75)',
    };
}
map.createPane('pane_camps');
map.getPane('pane_camps').style.zIndex = 401;
map.getPane('pane_camps').style['mix-blend-mode'] = 'normal';
var layer_camps = new L.geoJson(json_camps, {
    attribution: '<a href=""></a>',
    pane: 'pane_camps',
    // onEachFeature: pop_Peaks_1,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.shapeMarker(latlng, styleCamps(feature));
    },
});
bounds_group.addLayer(layer_camps);
map.addLayer(layer_camps);

/*
END Camps

BEGIN Peaks
*/

function pop_Peaks_1(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    /*
      var popupContent = '<table>\
              <tr>\
                  <th scope="row">NAME</th>\
                  <td>' + (feature.properties['NAME'] !== null ? Autolinker.link(String(feature.properties['NAME'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['ELEV_FT'] !== null ? Autolinker.link(String(feature.properties['ELEV_FT'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['label'] !== null ? Autolinker.link(String(feature.properties['label'])) : '') + '</td>\
              </tr>\
          </table>';
      layer.bindPopup(popupContent, {maxHeight: 400});
    */
}

function style_Peaks_1_0() {
    return {
        pane: 'pane_Peaks_1',
        shape: 'triangle',
        radius: geoStyle(4.0),
        opacity: 1,
        color: 'rgba(68,68,68,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: geoStyle(1),
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(204,204,204,1.0)',
    };
}
map.createPane('pane_Peaks_1');
map.getPane('pane_Peaks_1').style.zIndex = 401;
map.getPane('pane_Peaks_1').style['mix-blend-mode'] = 'normal';
var layer_Peaks_1 = new L.geoJson(json_Peaks_1, {
    attribution: '<a href=""></a>',
    pane: 'pane_Peaks_1',
    onEachFeature: pop_Peaks_1,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.shapeMarker(latlng, style_Peaks_1_0(feature));
    },
});
bounds_group.addLayer(layer_Peaks_1);
map.addLayer(layer_Peaks_1);

/*
END Peaks

BEGIN Rivers
*/


    function pop_ca_map_streams_streams_mshp2pct_0(feature, layer) {
        layer.on({
            mouseout: function(e) {
                for (i in e.target._eventParents) {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            },
            mouseover: highlightFeature,
        });
        var popupContent = '<table>\
                <tr>\
                    <td colspan="2">' + (feature.properties['Name'] !== null ? Autolinker.link(String(feature.properties['Name'])) : '') + '</td>\
                </tr>\
            </table>';
        // layer.bindPopup(popupContent, {maxHeight: 400});
    }

    function style_ca_map_streams_streams_mshp2pct_0_0(feature) {
        if (feature.properties['len_km'] >= 19 && feature.properties['len_km'] <= 58 ) {
            return {
            pane: 'pane_ca_map_streams_streams_mshp2pct_0',
            opacity: 1,
            color: 'rgba(126,189,233,1)',
            dashArray: '',
            lineCap: 'round',
            lineJoin: 'round',
            weight: 0.6,
            fillOpacity: 0,
        }
        }
        if (feature.properties['len_km'] >= 58 && feature.properties['len_km'] <= 109 ) {
            return {
            pane: 'pane_ca_map_streams_streams_mshp2pct_0',
            opacity: 1,
            color: 'rgba(126,189,233,1)',
            dashArray: '',
            lineCap: 'round',
            lineJoin: 'round',
            weight: geoStyle(0.8),
            fillOpacity: 0,
        }
        }
        if (feature.properties['len_km'] >= 109 && feature.properties['len_km'] <= 168 ) {
            return {
            pane: 'pane_ca_map_streams_streams_mshp2pct_0',
            opacity: 1,
            color: 'rgba(126,189,233,1)',
            dashArray: '',
            lineCap: 'round',
            lineJoin: 'round',
            weight: geoStyle(1),
            fillOpacity: 0,
        }
        }
        if (feature.properties['len_km'] >= 168 && feature.properties['len_km'] <= 292 ) {
            return {
            pane: 'pane_ca_map_streams_streams_mshp2pct_0',
            opacity: 1,
            color: 'rgba(126,189,233,1)',
            dashArray: '',
            lineCap: 'round',
            lineJoin: 'round',
            weight: geoStyle(1.2),
            fillOpacity: 0,
        }
        }
        if (feature.properties['len_km'] >= 292 && feature.properties['len_km'] <= 565 ) {
            return {
            pane: 'pane_ca_map_streams_streams_mshp2pct_0',
            opacity: 1,
            color: 'rgba(126,189,233,1)',
            dashArray: '',
            lineCap: 'round',
            lineJoin: 'round',
            weight: geoStyle(1.4),
            fillOpacity: 0,
        }
        }
    }

    map.createPane('pane_ca_map_streams_streams_mshp2pct_0');
    map.getPane('pane_ca_map_streams_streams_mshp2pct_0').style.zIndex = 402;
    map.getPane('pane_ca_map_streams_streams_mshp2pct_0').style['mix-blend-mode'] = 'normal';
    var layer_ca_map_streams_streams_mshp2pct_0 = new L.geoJson(json_ca_map_streams_streams_mshp2pct_0, {
        attribution: '<a href=""></a>',
        pane: 'pane_ca_map_streams_streams_mshp2pct_0',
        onEachFeature: pop_ca_map_streams_streams_mshp2pct_0,
        style: style_ca_map_streams_streams_mshp2pct_0_0,
    });
    bounds_group.addLayer(layer_ca_map_streams_streams_mshp2pct_0);
    map.addLayer(layer_ca_map_streams_streams_mshp2pct_0);


/*
END Rivers
BEGIN Lakes
*/

    function pop_osm_calif_water_40hec_mshp5pctcopy_1(feature, layer) {
        layer.on({
            mouseout: function(e) {
                for (i in e.target._eventParents) {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            },
            mouseover: highlightFeature,
        });
        var popupContent = '<table>\
                <tr>\
                    <td colspan="2">' + (feature.properties['name'] !== null ? Autolinker.link(String(feature.properties['name'])) : '') + '</td>\
                </tr>\
            </table>';
        layer.bindPopup(popupContent, {maxHeight: 400});
    }

    var pattern_osm_calif_water_40hec_mshp5pctcopy_1_0 = new L.StripePattern({
        weight: 0.3,
        spaceWeight: 2.0,
        color: '#000000',
        opacity: 0.5,
        spaceOpacity: 0,
        angle: 315
    });

    pattern_osm_calif_water_40hec_mshp5pctcopy_1_0.addTo(map);

/*natural:
river
water
bay
glacier
marsh
wetland
dry
*/
    function style_osm_calif_water_40hec_mshp5pctcopy_1_0(feature) {
        switch(String(feature.properties['natural'])) {
            case 'bay':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(152,215,237,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(234,179,58,1)',
        }
                break;
            case 'glacier':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(152,215,237,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(255,255,255,1)',
        }
                break;
            case 'marsh':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(152,215,237,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(22,212,98,1)',
        }
                break;
            case 'river':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(152,215,237,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(19,179,237,1)',
        }
                break;
            case 'water':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(126,189,233,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(183,224,237,1)',
        }
                break;
            case 'wetland':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            stroke: false,
            fillOpacity: 1,
            fillPattern: pattern_osm_calif_water_40hec_mshp5pctcopy_1_0
        }
                break;
            default:
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(152,215,237,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(233,36,72,1)',
        }
                break;
            case 'dry':
                return {
            pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
            opacity: 1,
            color: 'rgba(152,215,237,1)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(183,224,237,0.2)',
        }
                break;
        }
    }
    map.createPane('pane_osm_calif_water_40hec_mshp5pctcopy_1');
    map.getPane('pane_osm_calif_water_40hec_mshp5pctcopy_1').style.zIndex = 403;
    map.getPane('pane_osm_calif_water_40hec_mshp5pctcopy_1').style['mix-blend-mode'] = 'normal';

    water_json = json_osm_calif_water_40hec_mshp5pctcopy_1;

    water_json.features = water_json.features.filter(f => {
      return f.geometry.coordinates.length > 0 && ['river', 'water'].indexOf(f.properties.natural) !== -1;
      // 1092 -> 1030 -> 774
    });

    var layer_osm_calif_water_40hec_mshp5pctcopy_1 = new L.geoJson(water_json, {
        attribution: '<a href=""></a>',
        pane: 'pane_osm_calif_water_40hec_mshp5pctcopy_1',
        onEachFeature: pop_osm_calif_water_40hec_mshp5pctcopy_1,
        style: style_osm_calif_water_40hec_mshp5pctcopy_1_0,
    });
    bounds_group.addLayer(layer_osm_calif_water_40hec_mshp5pctcopy_1);
    // map.addLayer(layer_osm_calif_water_40hec_mshp5pctcopy_1);

/*
END Lakes
*/

var osmGeocoder = new L.Control.OSMGeocoder({
    collapsed: false,
    position: 'topright',
    text: 'Search',
});
osmGeocoder.addTo(map);


// https://a.tiles.mapbox.com/v4/mapbox.light/8/41/97.png?access_token=pk.eyJ1Ijoiamhua2xseSIsImEiOiIxLUVDMzVNIn0.MguPdmGTQUvosyLINY3wGQ
// var baselayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// var baselayer = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiamhua2xseSIsImEiOiIxLUVDMzVNIn0.MguPdmGTQUvosyLINY3wGQ', {

var mapboxLight = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiamhua2xseSIsImEiOiIxLUVDMzVNIn0.MguPdmGTQUvosyLINY3wGQ', {
    maxZoom: 28,
    attribution: 'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 28,
    attribution: 'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors, ©<a href="https://carto.com/attribution/">CARTO</a>'
}).addTo(map);

var osmMapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 28,
    attribution: 'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var thunderOutdoors = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=36ff718905b84b6995cf4df8cdf86e6f', {
    maxZoom: 28,
    attribution: 'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var satellite = L.tileLayer('https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0g75k/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpdjhqc2VoMTAwYTYydHM5NWl2dndnZm4ifQ.zS3tz6K9ck2VLQlKoA2ryg', {
    maxZoom: 28,
    attribution: 'Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// DG's mb key? https://api.tiles.mapbox.com/v4/digitalglobe.nal0g75k/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpdjhqc2VoMTAwYTYydHM5NWl2dndnZm4ifQ.zS3tz6K9ck2VLQlKoA2ryg


var baseMaps = {
"Carto": carto,
"Light": mapboxLight,
"Outdoors": thunderOutdoors,
"OSM": osmMapnik,
"Satellite": satellite,
};


// var baseMaps = {};
L.control.layers(
    baseMaps,
    {
        'Peaks': layer_Peaks_1,
        'Camps': layer_camps,
        'Lakes': layer_osm_calif_water_40hec_mshp5pctcopy_1,
        'Neighborhoods (SF)': layer_sf_hoods,
        'County labels': layer_Countylabels_0,
    }
).addTo(map);

setBounds();

/*
*/
var i = 0;
layer_Countylabels_0.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip(
        (layer.feature.properties['label'] !== null?String('<div class="label-parent"><div>' + layer.feature.properties['label'].toUpperCase()) + '</div></div>':''),
        {
            permanent: true,
            direction: "center",
            // offset: [-0, -0],
            className: 'county_labels'
        }
    );
    labels.push(layer);
    totalMarkers += 1;
      layer.added = true;
      addLabel(layer, i);
      i++;
});

var i = 0;
layer_Peaks_1.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip(
        // (label_Peaks_1_eval_expression(context) !== null ? \
        (layer.feature.properties['Name'] !== null ? String('<div style="text-align: center; color: #999; font-size: 10px; font-style: italic; font-family: \'Myriad Set Pro\', sans-serif;">' + label_Peaks_1_eval_expression(context)) + '</div>' : ''),
        {
            permanent: true, offset: [-2, -1], className: 'css_Peaks_1'
        });
    labels.push(layer);
    totalMarkers += 1;
  layer.added = true;
  addLabel(layer, i);
  i++;
});

var i = 0;
layer_camps.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip(
        (layer.feature.properties['name'] !== null ? String('<div>' + layer.feature.properties['name'] ) + '</div>' : ''),
        {
            permanent: true, offset: [-2, -1], className: 'label_camps'
        });
    labels.push(layer);
    totalMarkers += 1;
  layer.added = true;
  addLabel(layer, i);
  i++;
});

var i = 0;
layer_sf_hoods.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip(
        (layer.feature.properties['name'] !== null ? String('<div class="label-parent"><div>' + layer.feature.properties["name"].toUpperCase()) + '</div></div>' : ''),
        {
            permanent: true,
            className: 'sf_hoods_labels'
        });
    labels.push(layer);
    totalMarkers += 1;
  layer.added = true;
  addLabel(layer, i);
  i++;
});

var i = 0;
layer_osm_calif_water_40hec_mshp5pctcopy_1.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip(
        // (label_Peaks_1_eval_expression(context) !== null ? \
        (layer.feature.properties['name'] !== null ? String('<div class="water_labels">' + layer.feature.properties["name"]) + '</div>' : ''),
        {
            permanent: true, offset: [-2, -1], className: 'css_lakes'
        });
    labels.push(layer);
    totalMarkers += 1;
  layer.added = true;
  addLabel(layer, i);
  i++;
});

newM2px();

layer_Peaks_1.setStyle(style_Peaks_1_0);
// layer_sf_hoods.setStyle(style_Peaks_1_0);


function intersectLayerWithBbox(LGJLayer, geojson, clipZ, minZ, maxZ) {
  minZ = minZ || 0;
  maxZ = maxZ || 25;
  var bbox;
  var intersectedPolygons = [];
  var ipfc = {
    "type": "FeatureCollection",
    "features": intersectedPolygons
  };

  var z = map.getZoom();
  if ( z >= minZ && z <= maxZ ) {
    map.removeLayer(LGJLayer);
    LGJLayer.clearLayers();
    if ( z < clipZ ) {
      // show without clipping
      // console.log("showing unclipped", z);
      ipfc = cj(geojson);
    }
    if (z >= clipZ && z <= maxZ) {
      console.log("clipping", z);
      bbox = map.getBounds();

      var N = bbox.getNorth();
      var E = bbox.getEast();
      var S = bbox.getSouth();
      var W = bbox.getWest();

      var turfBbox = turf.helpers.polygon([[
        [E,N],
        [W,N],
        [W,S],
        [E,S],
        [E,N]
      ]]);

      geojson.features.forEach(f => {
        var polygon = turf.helpers.polygon(f.geometry.coordinates);
        var intersection = turf.intersect(turfBbox, polygon);
        if (intersection) {
          intersection.properties = f.properties;
          intersectedPolygons.push(intersection);
        }
      })
    }

    LGJLayer.addData(ipfc);
    LGJLayer.setStyle({'className': 'sf_hoods'});
    map.addLayer(LGJLayer);

    var i = 0;
    var zClass = "";
    if (z >= 14 ) zClass = 14;
    if (z >= 16 ) zClass = 16;
    if (z >= 18 ) zClass = 18;
    var classStr = "sf_hoods_labels sfhl_z" + zClass;
    // console.log('classStr', classStr);
    LGJLayer.eachLayer(function(layer) {
      var prop = layer.feature.properties['name'] || "";
      var tt = '<div class="label-parent"><div>' + prop.toUpperCase() + '</div></div>';
      layer.bindTooltip(tt, {
        permanent: true,
        className: classStr
      });
      labels.push(layer);
      totalMarkers += 1;
      layer.added = true;
      addLabel(layer, i);
      i++;
    });
  }
}

map.on('zoom', function(){
});


map.on("zoomend", function(){
    newM2px();
    layer_Peaks_1.setStyle(style_Peaks_1_0);
    // layer_sf_hoods.setStyle(style_Peaks_1_0);

});

map.on('moveend', function() {
  // intersectLayerWithBbox(LGJLayer, geojson, clipZ, minZ, maxZ)

  var z = map.getZoom();
  if (z >= 13) {
      intersectLayerWithBbox(layer_sf_hoods, sf_hoods, 15, 11)
      resetLabels(labelLayers);
      return layer_sf_hoods.addTo(map);
  }
  return layer_sf_hoods.removeFrom(map);

});


var labelLayers = [
  layer_Countylabels_0,
  layer_Peaks_1,
  layer_sf_hoods,
  layer_osm_calif_water_40hec_mshp5pctcopy_1
];

// resetLabels(labelLayers);

/*
map.on("zoomend", function(){
    resetLabels(labelLayers);
});

map.on("layeradd", function(){
    resetLabels(labelLayers);
});

map.on("layerremove", function(){
    resetLabels(labelLayers);
});
*/

function cj(o) { return JSON.parse(JSON.stringify(o)); }
