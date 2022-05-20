
//1. GET Request
const axios = require('axios');
url = "https://google.com"
let res = axios.get(url)
  .then(res => {
    console.log(res.status);
  })
  .catch(error => {
    console.error(error);
  });

//2. Find Type of object or unknown variable
console.log(typeof variableName);


//3. Async arrow function to use await.
// const axios = require('axios');

const sendGetRequest = async () => {
    try {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();