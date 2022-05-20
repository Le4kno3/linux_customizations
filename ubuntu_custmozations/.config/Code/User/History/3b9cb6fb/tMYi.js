
//GET Request
const axios = require('axios');
url = "https://google.com"
let res = axios.get(url)
  .then(res => {
    console.log(res.status);
  })
  .catch(error => {
    console.error(error);
  });

