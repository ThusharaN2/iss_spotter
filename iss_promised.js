const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}; //requests IP adress and promises to return it(JSON string)

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
