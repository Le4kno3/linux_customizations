const axios = require('axios');

const url="www.google.com";
    
console.log(url);

axios
  .get(url)
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });