'use strict'

const ClientError = require('./error')

class ConnectorClientError extends ClientError {
  constructor (errorMessage) {
    super(errorMessage)
    this.name = 'ConnectorClientError'
  }
}

module.exports = ConnectorClientError
