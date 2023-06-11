const log = require('../utils/logger');

const validateResource = (schema) => async (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      log.error(error);
      return res.status(400).send(error.errors);
    }
  };
  

module.exports = validateResource;