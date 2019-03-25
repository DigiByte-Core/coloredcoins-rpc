/* eslint-env mocha */
var DigiAssetsRpc = require('..')
var da = new DigiAssetsRpc('https://api.digiassets.net')
var assert = require('assert')

describe('Test digiassets-rpc', function () {
  it('get', function (done) {
    this.timeout(10000)
    var assetId = 'Ua3Kt8WJtsx61VC8DUJiRmseQ45NfW2dwLbG6s'
    var utxo = '661380f92f9094786657dc35753a51db4dba04526b57b799385ee401293860fd:1'
    var params = [assetId, utxo]
    da.get('assetmetadata', params, function (err, metadata) {
      assert.ifError(err)
      assert(metadata)
      done()
    })
  })

  it('get 404', function (done) {
    this.timeout(10000)
    da.get('notExistingEndpoint', [], function (err, result) {
      assert(err)
      assert(err.code, 404)
      done()
    })
  })

  it('post', function (done) {
    this.timeout(10000)
    var body = {
      fee: 5000,
      from: ['2N4xEAFiHSRRG2MyNHasZ3XnpxUPVCLsDBZ'],
      to: [{
        address: '2MsGWRWnAmP2LLPc2QXB93zyZPybKQX1YxP',
        amount: 1,
        assetId: 'LaAKV1pyBqHEKqKYs5pSivLjiD4HkNxDRywmgm'
      }]
    }
    da.post('sendAsset', body, function (err, result) {
      assert.ifError(err)
      assert(result)
      done()
    })
  })
})

