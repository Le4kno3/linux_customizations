
//GET Request
const axios = require('axios');
url = "https://google.com"
let res = axios.get(url)
  .then(res => {
    console.log("This is printed");
    console.log(res.data);
  })
  .catch(error => {
    console.error(error);
  });

