function bodyValidation(schema, req) {
  const { error, value } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(" ");
    return errorMessage;
  }

  req.body = value;
}

function paramsValidation(schema, req) {
  const { error } = schema.validate(req.params);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return null;
}

function queryValidation(schema, req) {
  const { error } = schema.validate(req.query);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return null;
}

module.exports = { bodyValidation, paramsValidation, queryValidation };
