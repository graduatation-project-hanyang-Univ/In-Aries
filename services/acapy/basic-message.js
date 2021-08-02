const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { BASIC_MESSAGE } = require('./constants');

async function sendMessage(connId, msg) {
  const res = await axiosWithAcapy.post(`${BASIC_MESSAGE.ROOT}/${connId}/${BASIC_MESSAGE.SEND}`, {
    content: msg,
  });

  return extractDataFromAxiosRes(res);
}

module.exports = {
  sendMessage,
};
