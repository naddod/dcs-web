const TokenKey = 'auth_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
