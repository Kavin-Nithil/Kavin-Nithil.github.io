function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getRoomValue() {
  var uirooms = document.getElementsByName("uirooms");
  for (var i in uirooms) {
    if (uirooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var location = document.getElementById("uiLocations");
  var distroad = document.getElementById("uidist");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var rooms = getRoomValue();
  var salecond = document.getElementById("uiSalecond");
  var park = document.getElementById("uiPark");
  var buildtype = document.getElementById("uiType");
  var road = document.getElementById("uiRoad");
  var Mzzone = document.getElementById("uiZone");
  var age = document.getElementById("uiage");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      location: location.value,
      dist: parseInt(distroad.value),
      bed: bhk,
      bath: bathrooms,
      room: rooms,
      sale_cond: salecond.value,
      park: park.value,
      build_type: buildtype.value,
      street: road.value,
      zone: Mzzone.value,
      age: parseInt(age.value) * 365,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + "₹ " + data.estimated_price.toString() + "</h2>";
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $("#uiLocations").empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $("#uiLocations").append(opt);
      }
    }
  });

  var url1 = "http://127.0.0.1:5000/get_mzzone_names";
  $.get(url1, function (data, status) {
    console.log("got response for get_mzzone_names request");
    if (data) {
      var zone = data.Zone;
      var uiZone = document.getElementById("uiZone");
      $("#uiZone").empty();
      for (var i in zone) {
        var opt = new Option(zone[i]);
        $("#uiZone").append(opt);
      }
    }
  });

  var url2 = "http://127.0.0.1:5000/get_park_names";
  $.get(url2, function (data, status) {
    console.log("got response for get_park_names request");
    if (data) {
      var parking_facil = data.Parking_Facility;
      var uiPark = document.getElementById("uiPark");
      $("#uiPark").empty();
      for (var i in parking_facil) {
        var opt = new Option(parking_facil[i]);
        $("#uiPark").append(opt);
      }
    }
  });

  var url3 = "http://127.0.0.1:5000/get_road_names";
  $.get(url3, function (data, status) {
    console.log("got response for get_road_names request");
    if (data) {
      var roadtype = data.Road_Type;
      var uiRoad = document.getElementById("uiRoad");
      $("#uiRoad").empty();
      for (var i in roadtype) {
        var opt = new Option(roadtype[i]);
        $("#uiRoad").append(opt);
      }
    }
  });

  var url4 = "http://127.0.0.1:5000/get_type_names";
  $.get(url4, function (data, status) {
    console.log("got response for get_type_names request");
    if (data) {
      var buildtype = data.Build_Type;
      var uiType = document.getElementById("uiType");
      $("#uiType").empty();
      for (var i in buildtype) {
        var opt = new Option(buildtype[i]);
        $("#uiType").append(opt);
      }
    }
  });

  var url5 = "http://127.0.0.1:5000/get_salecond_names";
  $.get(url5, function (data, status) {
    console.log("got response for get_salecond_names request");
    if (data) {
      var salecond = data.Sale_Condition;
      var uiSalecond = document.getElementById("uiSalecond");
      $("#uiSalecond").empty();
      for (var i in salecond) {
        var opt = new Option(salecond[i]);
        $("#uiSalecond").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
