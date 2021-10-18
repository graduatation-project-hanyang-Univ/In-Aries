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
  SEND: 'send',
  RECORDS: 'records',
  STORE: 'store',
  SEND_PROPOSAL: 'send-proposal',
};

const PRESENT_PROOF_PATH = {
  ROOT: '/present-proof',
  RECORDS: 'records',
  SEND_REQUEST: 'send-request',
  VERIFY: 'verify-presentation',
};

const CONNECTION_PATH = {
  ROOT: '/connections',
  CREATE: 'create-invitation',
  RECEIVE: 'receive-invitation',
  ACCEPT_INVITATION: 'accept-invitation',
  ACCEPT_REQUEST: 'accept-request',
  ENDPOINTS: 'endpoints',
  METADATA: 'metadata',
};

const BASIC_MESSAGE_PATH = {
  ROOT: '/connections',
  SEND: 'send-message',
};

const CREDENTIALS_PATH = {
  ROOT: '/credentials',
};

const PREVIEW_ATTRIBUTES = [
  {
    name: 'name',
    value: 'concert name',
  },
  {
    name: 'company',
    value: 'company name',
  },
  {
    name: 'seat',
    value: 'seat info',
  },
  {
    name: 'date',
    value: '1634520415',
  },
];

module.exports = {
  SCHEMA_PATH,
  CREDENTIAL_DEFINITION_PATH,
  ISSUE_CREDENTIAL_PATH,
  CONNECTION_PATH,
  BASIC_MESSAGE_PATH,
  PREVIEW_ATTRIBUTES,
  CREDENTIALS_PATH,
  PRESENT_PROOF_PATH,
};
