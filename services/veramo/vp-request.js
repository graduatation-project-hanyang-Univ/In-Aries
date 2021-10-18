const { agent } = require('./agent');
const { getOrCreateVeramoDid } = require('./did');

/** 아래와 같은 JWT 반환
 eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE2MzI5NjE4NTIsInR5cGUiOiJzZHIiLCJjbGFpbXMiOlt7InJlYXNvbiI6IldlIG5lZWQgaXQiLCJjbGFpbVR5cGUiOiJzZWF0IiwiZXNzZW50aWFsIjp0cnVlfV0sImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHgwMzYxNzFhNTRjZjlkMDUz
 NzE3YTkyZTM0NGUzYWVhY2JjNmQwYTMxZTIxODMzMWQ4ZjE2OTlhZTlkNGUzYTkxZGMifQ.DRFMhQScSK_pLdlWCvllZeT4NPR1ETaf46E42BA9PCtdYqH58S7ibLhDC8ZuEpwPw0kjIvEUjlrTUN0YrwtdEw
 */

async function makeVeramoVPRequestJWT() {
  const id = await getOrCreateVeramoDid();

  const jwt = await agent.createSelectiveDisclosureRequest({
    data: {
      issuer: id.did,
      claims: [
        {
          reason: 'We need it',
          claimType: 'seat',
          essential: true,
        },
        {
          reason: 'We need it',
          claimType: 'name',
          essential: true,
        },
      ],
    },
  });
  console.log('생성된 VP Request JWT', jwt);

  return jwt;
}

module.exports = {
  makeVeramoVPRequestJWT,
};
