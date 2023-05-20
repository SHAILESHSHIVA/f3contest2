let apiKey = "0b7854c6b27a4ee9af63b50c256fdd19";

let container1 = document.getElementById("container1");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition);
} else {
  alert("Geolocation not supported");
}

async function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  if (data.length !== 0) {
    let name = data.results[0].timezone.name;
    let std = data.results[0].timezone.offset_STD;
    let stdsec = data.results[0].timezone.offset_STD_seconds;
    let dst = data.results[0].timezone.offset_DST;
    let dstsec = data.results[0].timezone.offset_DST_seconds;
    let country = data.results[0].country;
    let city = data.results[0].city;
    container1.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                <div class="lonspan"><span>Lat : ${lat}</span><span>Long : ${long}</span></div>
                                <div>Offset STD : ${std}</div>
                                <div>Offset STD Seconds : ${stdsec}</div>
                                <div>Offset DST : ${dst}</div
                                <div>Offset DST Seconds : ${dstsec}</div>
                                <div>Country : ${country}</div>
                                <div>City : ${city}</div>`;
  } else {
    alert("location not found");
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

let input = document.getElementById("input");
let result = document.getElementById("result");
let error = document.querySelector(".error");
let container3 = document.querySelector(".container3");

async function getAddress() {
  if (input.value) {
    if (error.style.display === "block") {
      error.style.display = "none";
    }
    let address = input.value;
    let url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${apiKey}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    if (data.features.length !== 0) {
      result.innerHTML = "";
      container3.style.display = "block";
      let name = data.features[0].properties.timezone.name;
      let lat = data.features[0].properties.lat;
      let long = data.features[0].properties.lon;
      let std = data.features[0].properties.timezone.offset_STD;
      let stdsec = data.features[0].properties.timezone.offset_STD_seconds;
      let dst = data.features[0].properties.timezone.offset_DST;
      let dstsec = data.features[0].properties.timezone.offset_DST_seconds;
      let country = data.features[0].properties.country;
      let city = data.features[0].properties.city;
      result.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                    <div class="lonspan"><span>Lat : ${lat}</span><span>Long : ${long}</span></div>
                                    <div>Offset STD : ${std}</div>
                                    <div>Offset STD Seconds : ${stdsec}</div>
                                    <div>Offset DST : ${dst}</div
                                    <div>Offset DST Seconds : ${dstsec}</div>
                                    <div>Country : ${country}</div>
                                    <div>City : ${city}</div>`;
    } else {
      error.style.display = "block";
      container3.style.display = "none";
    }
  } else {
    if (container3.style.display === "block") {
      container3.style.display = "none";
    }
    error.style.display = "block";
  }
}
