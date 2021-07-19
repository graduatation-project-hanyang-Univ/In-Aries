const Axios = require('axios');

const axiosWithAcapy = Axios.create({
  baseURL: 'http://localhost:8001',
});

function extractDataFromAxiosRes(res) {
  return res.data;
}

module.exports = {
  axiosWithAcapy,
  extractDataFromAxiosRes,
};
