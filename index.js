// const { fetchMyIP } = require('./iss');
// const {fetchCoordsByIP } = require ('./iss')
// const {fetchISSFlyOverTimes} = require ('./iss')
const { nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP ('162.245.144.188' , (error, coordinates) => {
//   if (error) {
//     console.log("It did not work ", error)
//     return
//   }
//   console.log("It worked! Returned coordinates are: ", coordinates)
// })

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});
