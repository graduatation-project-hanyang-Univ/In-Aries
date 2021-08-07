const { extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { PRESENT_PROOF_PATH } = require('./constants');
const { axiosWithAcapy } = require('../../uilts/axios_utils');

async function sendRequest(options) {
  const { connId, proofRequest } = options;

  const res = await axiosWithAcapy.post(`${PRESENT_PROOF_PATH.ROOT}/${PRESENT_PROOF_PATH.SEND_REQUEST}`, {
    connection_id: connId,
    proof_request: proofRequest,
  });

  return extractDataFromAxiosRes(res);
}

async function verifyPresentation(presExId) {
  const res = await axiosWithAcapy.post(`${PRESENT_PROOF_PATH.ROOT}/${PRESENT_PROOF_PATH.RECORDS}/${presExId}/${PRESENT_PROOF_PATH.VERIFY}`);

  return extractDataFromAxiosRes(res);
}

module.exports = {
  sendRequest,
  verifyPresentation,
};
