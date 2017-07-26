function isEmptyString(value) {
  if (typeof value != 'string' || !value.length) {
    return true;
  }

  return false;
}

function isValidEmail(email) {
  let localPart;
  let hostPart;

  if (isEmptyString(email) || email.length > 254) {
    return false;
  }

  const emailParts = email.split('@');

  if (emailParts.length > 2) {
    return false;
  }

  [ localPart, hostPart ] = emailParts;

  if (isEmptyString(localPart) || localPart.length > 64) {
    return false;
  }

  if (isEmptyString(hostPart) || hostPart > 255) {
    return false;
  }

  return true;
}

module.exports = {
  isEmptyString,
  isValidEmail
};
