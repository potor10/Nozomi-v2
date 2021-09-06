// Manages Error Handling

class ApiException {
  constructor(status_code=500, message='') {
    this._REQUEST_CODE = {
      400: 'BadRequestException',
      401: 'UnauthorizedException',
      402: 'ForbiddenException',
      403: 'NotFoundException',
      409: 'ConflictException',
      500: 'InternalServerErrorException',
      503: 'ServiceUnavailableException'
    }

    this._status_code = status_code
    this._message = message
  }

  getError() {
    let e = {
      status_code: this._status_code,
      error: this._REQUEST_CODE[this._status_code]
    }

    return e
  }

  getStatus() {
    return this._status_code
  }

  getErrorMessage() {
    return this._message
  }
}

export default ApiException
