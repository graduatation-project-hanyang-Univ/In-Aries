const { createSchema, getSchema, getSchemas } = require('./schema');
const { createCredentialDefinition, getCredentialDefinitions, getCredentialDefinition } = require('./credential-definition');
const { createInvitation, getConnection, getConnections, receiveInvitation } = require('./connection');

describe('테스트', () => {
  let schemaId;
  let credentialDefinitionId;
  describe('Schema 테스트', () => {
    test('Schema  생성 테스트', async () => {
      const res = await createSchema({
        schemaName: 'schema_tests',
        schemaVersion: '1.3',
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
      invitationObj = await createInvitation();
      console.log(invitationObj);
    });

    test('receive invitation', async () => {
      const res = await receiveInvitation(invitationObj.invitation);
      console.log(res);
    });

    test('getConnections', async () => {
      const res = await getConnections();
      console.log(res);
    });

    test('getConnection', async () => {
      const res = await getConnection(invitationObj.connection_id);
      console.log(res);
    });
  });
});
