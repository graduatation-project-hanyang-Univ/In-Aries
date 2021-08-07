const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { SCHEMA_PATH } = require('./constants');

async function createSchema(options) {
  const { schemaName, schemaVersion, attributes } = options;

  const res = await axiosWithAcapy.post(SCHEMA_PATH.ROOT, {
    schema_name: schemaName,
    schema_version: schemaVersion,
    attributes,
  });

  return extractDataFromAxiosRes(res);
}

async function getSchemas() {
  const res = await axiosWithAcapy.get(`${SCHEMA_PATH.ROOT}/${SCHEMA_PATH.GETS}`);

  return extractDataFromAxiosRes(res);
}

async function getSchema(schemaId) {
  const res = await axiosWithAcapy.get(`${SCHEMA_PATH.ROOT}/${schemaId}`);

  return extractDataFromAxiosRes(res);
}

module.exports = {
  createSchema,
  getSchemas,
  getSchema,
};
