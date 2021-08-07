const Axios = require('axios');
require('dotenv').config();

const axiosWithAcapy = Axios.create({
  baseURL: process.env.ACAPY_ADMIN_ENDPOINT,
});

function extractDataFromAxiosRes(res) {
  return res.data;
}

module.exports = {
  axiosWithAcapy,
  extractDataFromAxiosRes,
};
