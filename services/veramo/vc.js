const { agent } = require('./agent');
const { getOrCreateVeramoDid } = require('./did');

/** createVerifiableCredential 함수가 아래와 같은 형태로 반환하며, 이 중 jwt 필드만 return하는 함수.
 {
  credentialSubject: { seat: 'r7' },
  issuer: {
    id: 'did:ethr:rinkeby:0x036171a54cf9d053717a92e344e3aeacbc6d0a31e218331d8f1699ae9d4e3a91dc'
  },
  type: [ 'VerifiableCredential' ],
  evidence: undefined,
  credentialStatus: undefined,
  termsOfUse: undefined,
  '@context': [ 'https://www.w3.org/2018/credentials/v1' ],
  issuanceDate: '2021-09-30T00:26:00.000Z',
  proof: {
    type: 'JwtProof2020',
    jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InNlYXQiOiJyNyJ9fSwibmJmIjoxNj
MyOTYxNTYwLCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDM2MTcxYTU0Y2Y5ZDA1MzcxN2E5MmUzNDRlM2FlYWNiYzZkMGEzMWUyMTgzMzFkOGYxNjk5YWU5ZDRlM2E5MWRjIn0.0XLsK_-ptWCQaBRTP2_clnzttRGEO_sb8545WewUZ_jfQ7kg6ZlNgxQfnSlOlPr8_P781dTeM8SUbBz4oA43jA'
  }
}
*/

async function makeVeramoVCJWT() {
  const id = await getOrCreateVeramoDid();

  const vc = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: id.did },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        name: 'concert name',
        company: ' company name',
        seat: 'seat info', // TODO 일단 하드코딩, 추후 변경 검토
        date: '1634520415',
      },
    },
    proofFormat: 'jwt',
    save: true,
  });

  console.log('생성된 VC :', JSON.stringify(vc, null, 2));

  return vc.proof.jwt;
}

module.exports = {
  makeVeramoVCJWT,
};
