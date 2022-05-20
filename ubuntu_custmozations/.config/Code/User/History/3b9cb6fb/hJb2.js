const axios = require('axios');

//specify the list of addresses to test.
const audit_addresses = [
    '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
    '0x1961a995B49A1A76b576bB889d6509f6685ea471',
    '0x03791A210E2Ac10BE5575Ed2aC31845Eb453b9Fe',
    '0x9e584b8003d0929eF790047d37D6Ec7D8ef6655a'
];

test_address = audit_addresses[0];

// fetch past 10 transactions
let module_url = 'account';
let action_url  = 'txlist';
let address_url = test_address;
let startblock = '0';
let endblock = '99999999';
let page_url = '1';
let offset_url = '10';  //last 10 transactions
let sort_url = 'asc';
let apikey_ethscan='XKHFKV52IKJK3NMS3RFYFGIDUNMFNC7J3B';

const final_url="https://api.etherscan.io/api?module=" + module_url + "&action=" + action_url + "&address=" + address_url + "&startblock=" + startblock + "&endblock=" + endblock + "&page=" + page_url + "&offset=" + offset_url + "&sort=" + sort_url + "&apikey=" + apikey_ethscan;

console.log(final_url);

let res = axios.get(final_url)
  .then(res => {
    console.log("This is printed");
    console.log(res.data);
  })
  .catch(error => {
    console.error(error);
  });

