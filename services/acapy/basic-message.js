const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { BASIC_MESSAGE_PATH } = require('./constants');

async function sendMessage(connId, msg) {
  const res = await axiosWithAcapy.post(`${BASIC_MESSAGE_PATH.ROOT}/${connId}/${BASIC_MESSAGE_PATH.SEND}`, {
    content: msg,
  });

  return extractDataFromAxiosRes(res);
}

module.exports = {
  sendMessage,
};
