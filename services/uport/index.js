const { Resolver } = require('did-resolver');
const { getResolver } = require('ethr-did-resolver');
const { Credentials } = require('uport-credentials');
const transports = require('uport-transports').transport;
const message = require('uport-transports').message.util;
require('dotenv').config();

const credentials = new Credentials({
  did: process.env.UPORT_DID,
  privateKey: process.env.UPORT_PRIVATE_KEY,
  resolver: new Resolver(
    getResolver({
      rpcUrl: process.env.INFURA_RPC_URL,
    }),
  ),
});

async function createUportIssuanceQRCode() {
  const reqToken = await credentials.createDisclosureRequest({
    notifications: true,
    callbackUrl: `${process.env.WEBHOOK_URL}/uports/webhooks/issuance`,
  });

  return message.paramsToQueryString(message.messageToURI(reqToken), {
    callback_type: 'post',
  });
}

async function createUportVerificationQRCode() {
  const reqToken = await credentials.createDisclosureRequest({
    verified: ['name', 'height', 'age', 'sex'],
    callbackUrl: `${process.env.WEBHOOK_URL}/uports/webhooks/verification`,
  });

  return message.paramsToQueryString(message.messageToURI(reqToken), {
    callback_type: 'post',
  });
}

async function issueVC(jwt) {
  const creds = await credentials.authenticateDisclosureResponse(jwt);
  console.log(creds);

  const attestation = await credentials.createVerification({
    sub: creds.did,
    exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
    claim: {
      age: '25',
      sex: 'male',
      height: '180',
      name: 'taeyong',
    },
  });

  const push = transports.push.send(creds.pushToken, creds.boxPub);
  console.log(push);

  push(attestation);
}

async function verifyVP(jwt) {
  const creds = await credentials.authenticateDisclosureResponse(jwt);
  console.log(creds);
}

module.exports = {
  createUportIssuanceQRCode,
  issueVC,
  createUportVerificationQRCode,
  verifyVP,
};
