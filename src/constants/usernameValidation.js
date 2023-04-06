export default function userNameIsValid(username) {
  if (username.includes('_') || username.includes('@') || username.includes('.')) {
    return false;
  }
  return true;
}
