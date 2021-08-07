const { axiosWithAcapy, extractDataFromAxiosRes } = require('../../uilts/axios_utils');
const { CONNECTION_PATH } = require('./constants');

async function createInvitation(alias) {
  const res = await axiosWithAcapy.post(
    `${CONNECTION_PATH.ROOT}/${CONNECTION_PATH.CREATE}`,
    {},
    {
      params: {
        alias,
      },
    },
  );

  return extractDataFromAxiosRes(res);
}

async function receiveInvitation(invitation, alias) {
  const res = await axiosWithAcapy.post(`${CONNECTION_PATH.ROOT}/${CONNECTION_PATH.RECEIVE}`, invitation, {
    params: {
      alias,
    },
  });

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
  const res = await axiosWithAcapy.post(`${CONNECTION_PATH.ROOT}/${connId}/${CONNECTION_PATH.ACCEPT_INVITATION}`);

  return extractDataFromAxiosRes(res);
}

async function acceptRequest(connId) {
  const res = await axiosWithAcapy.post(`${CONNECTION_PATH.ROOT}/${connId}/${CONNECTION_PATH.ACCEPT_REQUEST}`);

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
  acceptRequest,
  getConnectionEndpoints,
};
