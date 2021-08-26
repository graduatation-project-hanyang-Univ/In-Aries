const express = require('express');
const { sendCredential } = require('../services/acapy/issue-credential-1.0');

const router = express.Router();

const PATH = {
  CONNECTIONS: '/topic/connections/',
  BASIC_MESSAGE: '/topic/basicmessages/',
  ISSUE_CREDENTIAL: '/topic/issue_credential/',
  PRESENT_PROOF: '/topic/present_proof/',
};

router.post(`${PATH.CONNECTIONS}`, async (req, res) => {
  const { connection_id: connId, state, rfc23_state: rfc23State } = req.body;

  if (rfc23State === 'response-sent' && state === 'response') {
    console.log(`connected, connection id : ${connId}`);
  }

  res.status(200).end();
});

router.post(`${PATH.ISSUE_CREDENTIAL}`, async (req, res) => {
  const {
    role,
    state,
    connection_id: connId,
    credential_proposal_dict: { credential_proposal: credentialProposal },
  } = req.body;

  // if the issuer receive credential proposal from potential holder, execute
  if (state === 'proposal_received' && role === 'issuer') {
    const axiosRes = await sendCredential({
      connId,
      credentialProposal,
    });
    console.log('credential proposal received:', axiosRes);
  } else {
    console.log(`${PATH.ISSUE_CREDENTIAL}, ${state}, ${role}`);
  }

  res.status(200).end();
});

router.post(`${PATH.PRESENT_PROOF}`, async (req, res) => {
  const { role, state } = req.body;

  // if the verifier succeeds verification, execute
  if (role === 'verifier' && state === 'verified') {
    console.log('VP verified', JSON.stringify(req.body, null, 2));
  } else {
    console.log(`${PATH.PRESENT_PROOF}, ${state}, ${role}`);
  }

  res.status(200).end();
});

router.post(`/*`, async (req, res) => {
  const { role, state } = req.body;

  console.log(`${req.url}, ${state}, ${role}`);

  res.status(200).end();
});

module.exports = router;
