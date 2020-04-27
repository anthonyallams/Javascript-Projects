const key = "GFGsTcRUuRiV63FlyFucEl0wbh5LrntO";

// "http://dataservice.accuweather.com/locations/v1/cities/search";
// http://dataservice.accuweather.com/currentconditions/v1/

// Function to Get City Information from Accuweather API
const getCity = async (city) => {
  // Weather API Parameters
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  //   console.log(data[0]);
  return data[0];
};

// Function to get Weather Information from Accuweather API
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data[0]);
};

// getCity("lagos");
// getWeather(4607);

getCity("lagos")
  .then((data) => {
    getWeather(data.Key);
  })
  .catch((err) => console.log(err));
