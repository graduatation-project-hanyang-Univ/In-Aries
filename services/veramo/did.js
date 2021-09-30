const { agent } = require('./agent');

/** 이 형태로 반환
{
  did: 'did:ethr:rinkeby:0x036171a54cf9d053717a92e344e3aeacbc6d0a31e218331d8f1699ae9d4e3a91dc',
  controllerKeyId: '046171a54cf9d053717a92e344e3aeacbc6d0a31e218331d8f1699ae9d4e3a91dc3cf49dccd0cdaec3d3b37b89bc9ca448081a3f6624538b382ca69235f1d53433',
  provider: 'did:ethr:rinkeby',
  services: [],
  keys: [
    {
      kid: '046171a54cf9d053717a92e344e3aeacbc6d0a31e218331d8f1699ae9d4e3a91dc3cf49dccd0cdaec3d3b37b89bc9ca448081a3f6624538b382ca69235f1d53433',
      type: 'Secp256k1',
      kms: 'local',
      publicKeyHex: '046171a54cf9d053717a92e344e3aeacbc6d0a31e218331d8f1699ae9d4e3a91dc3cf49dccd0cdaec3d3b37b89bc9ca448081a3f6624538b382ca69235f1d53433',
      meta: [Object]
    }
  ],
  alias: 'default'
}
*/
async function getOrCreateVeramoDid() {
  const id = await agent.didManagerGetOrCreate({
    alias: 'default',
  });

  console.log('생성 or 가져온 DID 관련 정보 :', id);

  return id;
}

module.exports = {
  getOrCreateVeramoDid,
};
