const { axiosWithAcapy } = require('../../uilts/axios_utils');

async function listWalletDids() {
  const res = await axiosWithAcapy('/wallet/did');

  return res.data;
}

module.exports = {
  listWalletDids,
};
