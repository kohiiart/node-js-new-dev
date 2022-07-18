const fieldValidator = (body = {}, requiredFields = []) => {
  const attrs = Object.keys(body);

  const invalidFields = [];
  attrs.forEach(attr => {
    if (!requiredFields.includes(attr)) {
      invalidFields.push(attr)
    }
  });

  return invalidFields;
}

module.exports = fieldValidator;