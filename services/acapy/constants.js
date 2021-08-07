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
    name: 'age',
    value: '25',
  },
  {
    name: 'sex',
    value: 'male',
  },
  {
    name: 'height',
    value: '180',
  },
  {
    name: 'name',
    value: 'taeyong',
  },
];

const PROOF_REQUEST = {
  name: 'test-proof-req',
  version: '1.0',
  requested_attributes: {
    attr1_referent: {
      name: 'name',
      non_revoked: {
        from: 0,
        to: 9999999999999,
      },
    },
  },
  requested_predicates: {
    predicate1_referent: {
      name: 'age',
      p_type: '>=',
      p_value: 18,
      non_revoked: {
        from: 0,
        to: 9999999999999,
      },
    },
  },
  non_revoked: {
    from: 0,
    to: 9999999999999,
  },
};

module.exports = {
  SCHEMA_PATH,
  CREDENTIAL_DEFINITION_PATH,
  ISSUE_CREDENTIAL_PATH,
  CONNECTION_PATH,
  BASIC_MESSAGE_PATH,
  PREVIEW_ATTRIBUTES,
  CREDENTIALS_PATH,
  PRESENT_PROOF_PATH,
  PROOF_REQUEST,
};
