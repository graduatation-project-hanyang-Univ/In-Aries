const { CREDENTIALS_PATH } = require('./constants');
const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');

async function getCredentials() {
  const res = await axiosWithAcapy.get(`${CREDENTIALS_PATH.ROOT}`);

  return extractDataFromAxiosRes(res);
}

module.exports = {
  getCredentials,
};
