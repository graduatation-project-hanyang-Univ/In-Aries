const { extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { ISSUE_CREDENTIAL_PATH } = require('./constants');
const { axiosWithAcapy } = require('../../uilts/axios_utils');

async function sendProposal(options) {
  const { connId, credentialProposal } = options;

  const res = await axiosWithAcapy.post(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.SEND_PROPOSAL}`, {
    connection_id: connId,
    credential_proposal: credentialProposal,
  });

  return extractDataFromAxiosRes(res);
}

async function sendCredential(options) {
  const { connId, credentialProposal } = options;

  const res = await axiosWithAcapy.post(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.SEND}`, {
    connection_id: connId,
    credential_proposal: credentialProposal,
  });

  return extractDataFromAxiosRes(res);
}

async function getCredentialRecords() {
  const res = await axiosWithAcapy.get(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.RECORDS}`);

  return extractDataFromAxiosRes(res);
}

async function storeCredential(credExId) {
  const res = await axiosWithAcapy.post(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.RECORDS}/${credExId}/${ISSUE_CREDENTIAL_PATH.STORE}`);

  return extractDataFromAxiosRes(res);
}

module.exports = {
  sendProposal,
  sendCredential,
  storeCredential,
  getCredentialRecords,
};
