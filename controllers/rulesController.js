const fs = require('fs');
const rules = JSON.parse(fs.readFileSync('./databases/rules.json', 'utf-8'))

module.exports = {
  getRules: (req, res, next) => {
    res.json(rules);
  }
};
