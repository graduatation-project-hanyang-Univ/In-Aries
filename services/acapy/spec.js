const { getCredentials } = require('./credentials');
const { PREVIEW_ATTRIBUTES, PROOF_REQUEST } = require('./constants');
const { sendMessage } = require('./basic-message');
const { createSchema, getSchema, getSchemas } = require('./schema');
const { createCredentialDefinition, getCredentialDefinitions, getCredentialDefinition } = require('./credential-definition');
const {
  createInvitation,
  getConnection,
  getConnections,
  receiveInvitation,
  deleteConnection,
  acceptInvitation,
  acceptRequest,
  getConnectionEndpoints,
} = require('./connection');
const { sendProposal, sendCredential, getCredentialRecords, storeCredential } = require('./issue-credential-1.0');
const presentProof = require('./present-proof-1.0');

describe('테스트', () => {
  let schemaId;
  let credentialDefinitionId;
  describe('Schema 테스트', () => {
    test('Schema  생성 테스트', async () => {
      const res = await createSchema({
        schemaName: 'schema_tests3',
        schemaVersion: '5.0',
        attributes: ['age', 'sex', 'height', 'name'],
      });

      console.log(res);
    });

    test('Schema 조회 테스트', async () => {
      const res = await getSchemas();
      console.log(res);

      if (res.schema_ids.length > 0) {
        [schemaId] = res.schema_ids;
        const schema = await getSchema(schemaId);
        console.log(schema);
      }
    });
  });

  describe('Credential Definition 테스트', () => {
    test('Credential Definition 생성 테스트', async () => {
      const res = await createCredentialDefinition({
        schemaId,
        supportRevocation: true,
        revocationRegistrySize: 100,
        tag: 'test_tag_support_revocation',
      });
      console.log(res);
    });

    test('Credential Definition 조회 테스트', async () => {
      const res = await getCredentialDefinitions();
      console.log(res);

      if (res.credential_definition_ids.length > 0) {
        [credentialDefinitionId] = res.credential_definition_ids;
        const credentialDefinition = await getCredentialDefinition(credentialDefinitionId);
        console.log(credentialDefinition);
      }
    });
  });

  describe('Connection 테스트', () => {
    let invitationObj;
    test('create invitation', async () => {
      invitationObj = await createInvitation('Issuer test');
      console.log(invitationObj);
    });

    test('receive invitation', async () => {
      const res = await receiveInvitation(invitationObj.invitation, 'Holder test');
      console.log(res);
    });

    test('accept invitation', async () => {
      const res = await acceptInvitation('7cbd44c3-bfb6-4503-906d-bf92115f83e3');
      console.log(res);
    });

    test('accept request', async () => {
      const res = await acceptRequest('04d02ce5-7e14-4ca9-a766-a0c089c04b24');
      console.log(res);
    });

    test('getConnections', async () => {
      const res = await getConnections();
      console.log(res);
    });

    test('get connection endpoints', async () => {
      const res = await getConnectionEndpoints('7ae68d1b-68be-45ef-968a-7bd2d979c3c5');
      console.log(res);
    });

    test('getConnection', async () => {
      // const res = await getConnection(invitationObj.connection_id);
      const res = await getConnection('0fa55de9-5142-4680-ab74-e5af71891e6f');
      console.log(res);
    });

    test('delete connection', async () => {
      // const res = await deleteConnection(invitationObj.connection_id);
      const res = await deleteConnection('a1fb2f98-85bb-405f-940a-b04880dc549c');
      console.log(res);
    });
  });

  describe('Basic Message 테스트', () => {
    test('send message', async () => {
      const res = await sendMessage('7cbd44c3-bfb6-4503-906d-bf92115f83e3', 'Hi');

      console.log(res);
    });
  });

  describe('Issue Credential 1.0 테스트', () => {
    test('send proposal', async () => {
      const res = await sendProposal({
        connId: 'e62a4e3c-d7e2-4e2d-a422-ae23faf0bbfb',
        credentialProposal: {
          '@type': 'issue-credential/1.0/credential-preview',
          attributes: PREVIEW_ATTRIBUTES,
        },
      });
      console.log(res);
    });

    test('send credential', async () => {
      const res = await sendCredential({
        connId: '04d02ce5-7e14-4ca9-a766-a0c089c04b24',
        credentialProposal: {
          '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview',
          attributes: [
            { name: 'age', value: '25' },
            { name: 'sex', value: 'male' },
            { name: 'height', value: '180' },
            { name: 'name', value: 'taeyong' },
          ],
        },
      });

      console.log(res);
    });

    test('get credential records', async () => {
      const res = await getCredentialRecords();
      console.log(res);
    });

    test('store credential', async () => {
      const res = await storeCredential('23901078-5d4d-4d63-b360-16a152e3f2a9');
      console.log(res);
    });
  });

  describe('Credentials 테스트', () => {
    test('get credentials', async () => {
      const res = await getCredentials();
      console.log(res);
      console.log(res.results[0]);
    });
  });

  describe('Present Proof 1.0 테스트', () => {
    test('send request', async () => {
      const res = await presentProof.sendRequest({
        connId: '2d633a59-205e-4a27-a460-2b7fe0c61849',
        proofRequest: PROOF_REQUEST,
      });
      console.log(res);
    });
    test('verify presentation', async () => {
      await presentProof.verifyPresentation('ab7ac84e-38c3-486d-b667-ecbd333cdd6c');
    });
  });
});
