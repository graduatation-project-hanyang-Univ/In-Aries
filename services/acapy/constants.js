const SCHEMA_PATH = {
  ROOT: '/schemas',
  GETS: 'created',
};

const CREDENTIAL_DEFINITION_PATH = {
  ROOT: '/credential-definitions',
  GETS: 'created',
};

const ISSUE_CREDENTIAL_PATH = {
  ROOT: '/issue-credential',
  CREATE: 'create',
  SEND_OFFER: 'send-offer',
};

const CONNECTION_PATH = {
  ROOT: '/connections',
  CREATE: 'create-invitation',
  RECEIVE: 'receive-invitation',
  ACCEPT: 'accept-invitation',
  ENDPOINTS: 'endpoints',
  METADATA: 'metadata',
};

module.exports = {
  SCHEMA_PATH,
  CREDENTIAL_DEFINITION_PATH,
  ISSUE_CREDENTIAL_PATH,
  CONNECTION_PATH,
};
