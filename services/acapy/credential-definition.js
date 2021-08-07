const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { CREDENTIAL_DEFINITION_PATH } = require('./constants');

async function createCredentialDefinition(options) {
  const { schemaId, supportRevocation, revocationRegistrySize, tag } = options;
  const res = await axiosWithAcapy.post(CREDENTIAL_DEFINITION_PATH.ROOT, {
    schema_id: schemaId,
    support_revocation: supportRevocation,
    revocation_registry_size: revocationRegistrySize,
    tag,
  });

  return extractDataFromAxiosRes(res);
}

async function getCredentialDefinitions() {
  const res = await axiosWithAcapy.get(`${CREDENTIAL_DEFINITION_PATH.ROOT}/${CREDENTIAL_DEFINITION_PATH.GETS}`);

  return extractDataFromAxiosRes(res);
}

async function getCredentialDefinition(credDefId) {
  const res = await axiosWithAcapy.get(`${CREDENTIAL_DEFINITION_PATH.ROOT}/${credDefId}`);

  return extractDataFromAxiosRes(res);
}

module.exports = {
  createCredentialDefinition,
  getCredentialDefinitions,
  getCredentialDefinition,
};
