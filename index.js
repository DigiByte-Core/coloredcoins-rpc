'use strict'

var request = require('request')
// var qs = require('qs')

function DigiAssets (daPath) {
  this.daPath = daPath
}

function handleResponse (err, response, body, cb) {
  if (err) return cb(err)
  if (response.statusCode === 204) return cb({code: 204, message: 'no content'})
  if (response.statusCode === 404) return cb({code: 404, message: 'no such func'})
  if (response.statusCode !== 200) return cb(body)
  if (body && typeof body === 'string') {
    body = JSON.parse(body)
  }
  cb(null, body)
}

function buildPathParamsString (params) {
  params = params || []
  var str = params.reduce(function (str, param) {
    str += '/' + param
    return str
  }, '')
  return str
}

function buildQueryParamsString (params) {
  var str = ''
  if (params && Object.keys(params).length) {
    str += '?'
    var firstOptional = true
    Object.keys(params).forEach(function (key) {
      var value = params[key]
      if (!firstOptional) {
        str += '&'
      }
      str += (key + '=' + value)
      firstOptional = false
    })
  }
  return str
}

DigiAssets.prototype.get = function (method, pathParams, queryParams, cb) {
  if (typeof queryParams === 'function') {
    cb = queryParams
    queryParams = null
  }

  var params_string = buildPathParamsString(pathParams)
  params_string += buildQueryParamsString(queryParams)
  var path = this.daPath + '/' + method + params_string
  request.get(path, function (err, response, body) {
    handleResponse(err, response, body, cb)
  })
}

DigiAssets.prototype.post = function (method, params, cb) {
  var path = this.daPath + '/' + method
  request.post(path, {json: params}, function (err, response, body) {
    handleResponse(err, response, body, cb)
  })
}

module.exports = DigiAssets
