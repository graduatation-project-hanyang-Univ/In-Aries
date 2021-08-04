const express = require('express');
const { sendCredential } = require('../services/acapy/issue-credential-1.0');

const router = express.Router();

const PATH = {
  CONNECTIONS: '/webhooks/topic/connections/',
  BASIC_MESSAGE: '/webhooks/topic/basicmessages/',
  ISSUE_CREDENTIAL: '/topic/issue_credential/',
};

router.post(`${PATH.ISSUE_CREDENTIAL}`, async (req, res) => {
  const {
    role,
    state,
    connection_id: connId,
    credential_proposal_dict: { credential_proposal: credentialProposal },
  } = req.body;

  // if issuer receive credential proposal from potential holder, execute
  if (state === 'proposal_received' && role === 'issuer') {
    const axiosRes = await sendCredential({
      connId,
      credentialProposal,
    });
    console.log('axiosRes:', axiosRes);
  }

  res.status(200).end();
});

module.exports = router;
