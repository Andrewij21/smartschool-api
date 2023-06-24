function checkResponse(res, response) {
  if (!response.code || response.code > 500) {
    return res.status(400).json({ error: response.toString() });
  }
  res.status(response.code).json({ ...response });
}

module.exports = { checkResponse };
