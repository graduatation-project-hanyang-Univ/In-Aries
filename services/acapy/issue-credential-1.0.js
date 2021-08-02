const { extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { ISSUE_CREDENTIAL_PATH } = require('./constants');
const { axiosWithAcapy } = require('../../uilts/axios_utils');

async function createOffer(options) {
  const { credDefId, credentialPreview } = options;

  const res = await axiosWithAcapy.post(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.CREATE_OFFER}`, {
    cred_def_id: credDefId,
    credential_preview: credentialPreview,
  });

  return extractDataFromAxiosRes(res);
}

async function sendOffer(options) {
  const { connectionId, credDefId, credentialPreview } = options;

  const res = await axiosWithAcapy.post(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.SEND_OFFER}`, {
    connection_id: connectionId,
    cred_def_id: credDefId,
    credential_preview: credentialPreview,
  });
  console.log(res);

  return extractDataFromAxiosRes(res);
}

async function createVC() {
  const res = axiosWithAcapy.post(`${ISSUE_CREDENTIAL_PATH.ROOT}/${ISSUE_CREDENTIAL_PATH.CREATE}`, {});
}

module.exports = {
  sendOffer,
  createOffer,
};
