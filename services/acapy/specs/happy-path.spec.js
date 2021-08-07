const presentProof = require('../present-proof-1.0');
const { PREVIEW_ATTRIBUTES } = require('../constants');
const { sendProposal } = require('../issue-credential-1.0');
const { receiveInvitation, createInvitation } = require('../connection');
const { createCredentialDefinition } = require('../credential-definition');
const { createSchema } = require('../schema');

function makeRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  // eslint-disable-next-line no-empty
  while (Date.now() < wakeUpTime) {}
}

function makeTestProofRequest(schemaId) {
  return {
    name: 'test-proof-req',
    version: '1.0',
    requested_attributes: {
      attribute1_referent: {
        name: 'name',
        restrictions: [
          {
            schema_id: schemaId,
          },
        ],
      },
    },
    requested_predicates: {
      predicate1_referent: {
        name: 'age',
        p_type: '>=',
        p_value: 18,
        restrictions: [
          {
            schema_id: schemaId,
          },
        ],
      },
    },
  };
}

/*
해당 테스트를 통과하기 위해선
1. 웹훅 서버가 켜져 있어야 한다.
2. acapy가 실행되어 있어야 하는데, 이 경우 auto 옵션의 대부분이 활성화되어 있어야 한다.
 */

describe('Happy Path 테스트', () => {
  const randomNum = makeRandom(0, 100000);
  let schemaId;
  // eslint-disable-next-line no-unused-vars
  let credentialDefinitionId;
  let invitationObj;
  // eslint-disable-next-line no-unused-vars
  let issuerConnId;
  let verifierConnId;
  let holderConnId;

  test('Schema  생성', async () => {
    const res = await createSchema({
      schemaName: `schema_tests_${randomNum}`,
      schemaVersion: '1.0',
      attributes: ['age', 'sex', 'height', 'name'],
    });
    schemaId = res.schema_id;

    console.log(res);
  });

  test('Credential Definition 생성', async () => {
    const res = await createCredentialDefinition({
      schemaId,
      supportRevocation: true,
      revocationRegistrySize: 100,
      tag: 'test_tag_support_revocation',
    });
    console.log(res);
    credentialDefinitionId = res.credential_definition_id;
  });

  test('create invitation', async () => {
    invitationObj = await createInvitation(`Issuer test ${randomNum}`);
    console.log(invitationObj);
    issuerConnId = invitationObj.connection_id;
    verifierConnId = invitationObj.connection_id;
  });

  test('receive invitation', async () => {
    const res = await receiveInvitation(invitationObj.invitation, `Holder test ${randomNum}`);
    console.log(res);
    holderConnId = res.connection_id;
  });

  test('send proposal (Credential 1.0)', async () => {
    const res = await sendProposal({
      connId: holderConnId,
      credentialProposal: {
        '@type': 'issue-credential/1.0/credential-preview',
        attributes: PREVIEW_ATTRIBUTES,
      },
    });
    console.log(res);
    sleep(3000);
  });

  test('send request (Present Proof 1.0)', async () => {
    const res = await presentProof.sendRequest({
      connId: verifierConnId,
      proofRequest: makeTestProofRequest(schemaId),
    });
    console.log(res);
  });
});
