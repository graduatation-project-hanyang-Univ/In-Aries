const express = require('express');

const router = express.Router();

const { makeVeramoVCJWT } = require('../services/veramo/vc');
const { makeVeramoVPRequestJWT, makeVeramoFailVPRequestJWT } = require('../services/veramo/vp-request');

router.post('/qr-code/issuance', async function (req, res, next) {
  console.log('veramo qr code issuance body', req.body);
  const jwt = await makeVeramoVCJWT(req.body);
  res.send(jwt);
});

router.post('/qr-code/verification', async function (req, res, next) {
  const { success } = req.body;

  let jwt;

  if (success) {
    jwt = await makeVeramoVPRequestJWT();
  } else {
    jwt = await makeVeramoFailVPRequestJWT();
  }

  res.send(jwt);
});

module.exports = router;
