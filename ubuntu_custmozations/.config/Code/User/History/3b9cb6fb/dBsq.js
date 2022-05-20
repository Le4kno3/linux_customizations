const axios = require('axios');

const url="https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=XKHFKV52IKJK3NMS3RFYFGIDUNMFNC7J3B";
    
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