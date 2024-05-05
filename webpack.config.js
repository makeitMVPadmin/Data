const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "os": false,
      "path": false,
      "crypto": false
    }
  }
};
