const express = require('express');

const router = express.Router();
const { createUportIssuanceQRCode, issueVC, createUportVerificationQRCode, verifyVP } = require('../services/uport/index');

router.post('/qr-code/issuance', async function (req, res, next) {
  const qrCode = await createUportIssuanceQRCode();
  res.send(qrCode);
});

router.post('/qr-code/verification', async function (req, res, next) {
  const qrCode = await createUportVerificationQRCode();
  res.send(qrCode);
});

router.post('/webhooks/issuance', async function (req, res, next) {
  const { access_token: jwt } = req.body;

  console.log(jwt);

  await issueVC(jwt);

  res.status(200).end();
});

router.post('/webhooks/verification', async function (req, res, next) {
  const { access_token: jwt } = req.body;

  await verifyVP(jwt);
  res.status(200).end();
});

module.exports = router;
