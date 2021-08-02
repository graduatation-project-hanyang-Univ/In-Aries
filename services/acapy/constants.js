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
  CREATE_OFFER: 'create-offer',
};

const CONNECTION_PATH = {
  ROOT: '/connections',
  CREATE: 'create-invitation',
  RECEIVE: 'receive-invitation',
  ACCEPT: 'accept-invitation',
  ENDPOINTS: 'endpoints',
  METADATA: 'metadata',
};

const BASIC_MESSAGE_PATH = {
  ROOT: '/connections',
  SEND: 'send-message',
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

module.exports = {
  SCHEMA_PATH,
  CREDENTIAL_DEFINITION_PATH,
  ISSUE_CREDENTIAL_PATH,
  CONNECTION_PATH,
  BASIC_MESSAGE_PATH,
  PREVIEW_ATTRIBUTES,
};
