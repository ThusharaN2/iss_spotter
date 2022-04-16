const request = require('request');


const fetchMyIP = function(callback) { 
  let url = "https://api.ipify.org?format=json"
request(url, (error, response, body) => {
  if (error) return callback(error, null);
  
   if (response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    return;
  }
  const ip = JSON.parse(body).ip;
  callback(null, ip);
})
}
module.exports = { fetchMyIP };