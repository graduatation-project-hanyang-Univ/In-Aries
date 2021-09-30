const express = require('express');

const router = express.Router();

const { makeVeramoVCJWT } = require('../services/veramo/vc');
const { makeVeramoVPRequestJWT } = require('../services/veramo/vp-request');

router.post('/qr-code/issuance', async function (req, res, next) {
  const jwt = await makeVeramoVCJWT();
  res.send(jwt);
});

router.post('/qr-code/verification', async function (req, res, next) {
  const jwt = await makeVeramoVPRequestJWT();
  res.send(jwt);
});

module.exports = router;
