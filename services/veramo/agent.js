// Core interfaces
const { createAgent } = require('@veramo/core');

// Core identity manager plugin
const { DIDManager } = require('@veramo/did-manager');

// Ethr did identity provider
const { EthrDIDProvider } = require('@veramo/did-provider-ethr');

// Web did identity provider
const { WebDIDProvider } = require('@veramo/did-provider-web');

// Core key manager plugin
const { KeyManager } = require('@veramo/key-manager');

// Custom key management system for RN
const { KeyManagementSystem, SecretBox } = require('@veramo/kms-local');

// Custom resolvers
const { DIDResolverPlugin } = require('@veramo/did-resolver');
const { Resolver } = require('did-resolver');
const { getResolver: ethrDidResolver } = require('ethr-did-resolver');
const { getResolver: webDidResolver } = require('web-did-resolver');

// Storage plugin using TypeOrm
const { Entities, KeyStore, DIDStore, PrivateKeyStore, DataStore, DataStoreORM, migrations } = require('@veramo/data-store');

// TypeORM is installed with `@veramo/data-store`

const { createConnection } = require('typeorm');
const { MessageHandler } = require('@veramo/message-handler');
const { DIDComm, DIDCommHttpTransport, DIDCommMessageHandler } = require('@veramo/did-comm');
const { JwtMessageHandler } = require('@veramo/did-jwt');
const { CredentialIssuer, W3cMessageHandler } = require('@veramo/credential-w3c');
const { SdrMessageHandler, SelectiveDisclosure } = require('@veramo/selective-disclosure');

require('dotenv').config();

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite';

const secretKey = process.env.VERAMO_SECRET_KEY;

const dbConnection = createConnection({
  name: 'test',
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  logging: ['error', 'info', 'warn'],
  migrations,
  migrationsRun: true,
  entities: Entities,
});

const agent = createAgent({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(secretKey))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr:rinkeby',
      providers: {
        'did:ethr:rinkeby': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'rinkeby',
          rpcUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
          gas: 1000001,
          ttl: 60 * 60 * 24 * 30 * 12 + 1,
        }),
        'did:web': new WebDIDProvider({
          defaultKms: 'local',
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: process.env.INFURA_PROJECT_ID }),
        ...webDidResolver(),
      }),
    }),
    new DataStore(dbConnection),
    new DataStoreORM(dbConnection),
    new MessageHandler({
      messageHandlers: [new DIDCommMessageHandler(), new JwtMessageHandler(), new W3cMessageHandler(), new SdrMessageHandler()],
    }),
    new DIDComm([new DIDCommHttpTransport()]),
    new CredentialIssuer(),
    new SelectiveDisclosure(),
  ],
});

module.exports = {
  agent,
};
