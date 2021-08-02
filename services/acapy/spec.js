const { PREVIEW_ATTRIBUTES } = require('./constants');
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
const { sendOffer, createOffer } = require('./issue-credential-1.0');

describe('테스트', () => {
  let schemaId;
  let credentialDefinitionId;
  describe('Schema 테스트', () => {
    test('Schema  생성 테스트', async () => {
      const res = await createSchema({
        schemaName: 'schema_tests',
        schemaVersion: '2.0',
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
      const res = await acceptInvitation('0fa55de9-5142-4680-ab74-e5af71891e6f');
      console.log(res);
    });

    test('accept request', async () => {
      const res = await acceptRequest('6505c038-0810-4693-bf20-4be1ff34dee4');
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
      const res = await deleteConnection('dbfbd060-2396-46d6-95da-3d8fb85bec8a');
      console.log(res);
    });
  });

  describe('Basic Message 테스트', () => {
    test('send message', async () => {
      const res = await sendMessage('6505c038-0810-4693-bf20-4be1ff34dee4', 'Hi');

      console.log(res);
    });
  });

  describe('Issue Credential 1.0 테스트', () => {
    test('create offer', async () => {
      const res = await createOffer({
        credDefId: 'BnTQb7U3UEr357nE6bzWHu:3:CL:87222:test_tag_support_revocation',
        credentialPreview: {
          '@type': 'issue-credential/1.0/credential-preview',
          attributes: PREVIEW_ATTRIBUTES,
        },
      });
      console.log(res);
    });

    test('sendOffer', async () => {
      const res = await sendOffer({
        connectionId: '6505c038-0810-4693-bf20-4be1ff34dee4',
        credDefId: 'BnTQb7U3UEr357nE6bzWHu:3:CL:87222:test_tag_support_revocation',
        credentialPreview: {
          '@type': 'issue-credential/1.0/credential-preview',
          attributes: PREVIEW_ATTRIBUTES,
        },
      });
      console.log(res);
    });
  });
});
