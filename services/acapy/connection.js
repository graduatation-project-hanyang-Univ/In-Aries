const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { CONNECTION_PATH } = require('./constants');

/*
{
    body: {
      mediation_id: '',
      metadata: {},
      my_label: 'test_my_label',
      recipient_keys: [''],
      routing_keys: [''],
      service_endpoint: '',
    },
    alias: '',
    auto_accept: false,
    multi_use: true,
    public: false,
  }
 */
async function createInvitation() {
  const res = await axiosWithAcapy.post(`${CONNECTION_PATH.ROOT}/${CONNECTION_PATH.CREATE}`);

  return extractDataFromAxiosRes(res);
}

async function receiveInvitation(invitation) {
  const res = await axiosWithAcapy.post(`${CONNECTION_PATH.ROOT}/${CONNECTION_PATH.RECEIVE}`, invitation);

  return extractDataFromAxiosRes(res);
}

async function getConnections() {
  const res = await axiosWithAcapy.get(CONNECTION_PATH.ROOT);

  return extractDataFromAxiosRes(res);
}

async function getConnection(connId) {
  const res = await axiosWithAcapy.get(`${CONNECTION_PATH.ROOT}/${connId}`);

  return extractDataFromAxiosRes(res);
}

async function deleteConnection(connId) {
  const res = await axiosWithAcapy.delete(`${CONNECTION_PATH.ROOT}/${connId}`);

  return extractDataFromAxiosRes(res);
}

async function acceptInvitation(connId) {
  const res = await axiosWithAcapy.post(`${CONNECTION_PATH.ROOT}/${connId}/${CONNECTION_PATH.ACCEPT}`);

  return extractDataFromAxiosRes(res);
}

// 연결이 돼야 실행되는듯?
async function getConnectionEndpoints(connId) {
  const res = await axiosWithAcapy.get(`${CONNECTION_PATH.ROOT}/${connId}/${CONNECTION_PATH.ENDPOINTS}`);

  return extractDataFromAxiosRes(res);
}

module.exports = {
  createInvitation,
  receiveInvitation,
  getConnections,
  getConnection,
  deleteConnection,
  acceptInvitation,
  getConnectionEndpoints,
};
