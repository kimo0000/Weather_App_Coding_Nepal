const wrapper = document.querySelector(".wrapper"),
  iconLeft = wrapper.querySelector("header .left"),
  popupText = wrapper.querySelector(".popup_text"),
  inputField = document.querySelector(".inp input"),
  btnLocation = document.querySelector(".btn_location"),
  weatherEl = document.querySelector(".weather"),
  image = weatherEl.querySelector("img"),
  temperatue = weatherEl.querySelector(".temp"),
  average = weatherEl.querySelector(".average"),
  position = weatherEl.querySelector(".position span"),
  feellLike = weatherEl.querySelectorAll(".feel p span")[0],
  humidity = weatherEl.querySelectorAll(".humid p span")[0];

let timeOut;
let api;
let apiKey = `e634413557b9f6ba626e1e7dc79fa79c`;

const fetchApi = async () => {
  popupText.classList.add("pending");
  popupText.innerText = `please wait, Is Searching City Name of ${inputField.value}...`;
  await fetch(api)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.message) {
        popupText.classList.add("error");
        popupText.innerText = result.message;
      } else {
        popupText.classList.replace("error", "pending");
        popupText.innerText = `please wait, Is Searching City Name of ${inputField.value}...`;
        timeOut = setTimeout(() => wrapper.classList.add("active"), 2000);
        console.log(result.weather[0].description);
        console.log(result.weather[0].icon);
        let id = result.weather[0].id;

        if (id == 800) {
          image.src = "imgs/clear.jpg";
        } else if (id >= 200 && id <= 232) {
          image.src = "imgs/storm.jpg";
        } else if (id >= 600 && id <= 622) {
          image.src = "imgs/snow.jpg";
        } else if (id >= 701 && id <= 781) {
          image.src = "imgs/haze.jpg";
        } else if (id >= 801 && id <= 804) {
          image.src = "imgs/cloud.jpg";
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
          image.src = "imgs/rain.jpg";
        }

        temperatue.innerText = parseInt(result.main.temp) + " º C";
        average.innerText = result.weather[0].description;
        position.innerText = result.sys.country + ", " + result.name;
        feellLike.innerText = parseInt(result.main.feels_like) + " º C";
        humidity.innerText = result.main.humidity + "%";
      }
    });
};

const fetchData = (city) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchApi();
};

const weatherDetail = (e) => {
  if (e.key == "Enter" && inputField.value) {
    fetchData(inputField.value);
  }
};

const getCurrPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, onError);
  } else {
    alert("Your Browser Do not Supporter Geolocation");
  }
};

function onSucces(position) {
  popupText.classList.add("pending");
  console.log(position);
  let { latitude, longitude } = position.coords;
  console.log(latitude, longitude);
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchApi();
}

function onError(error) {
  console.log(error);
}

inputField.addEventListener("keyup", weatherDetail);
btnLocation.addEventListener("click", getCurrPosition);
iconLeft.addEventListener("click", () => {
  wrapper.classList.remove("active");
  popupText.classList.remove("error", "pending");
  inputField.value = "";
});
