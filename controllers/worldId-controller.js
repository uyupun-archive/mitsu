const { validationResult } = require('express-validator');
const { customAlphabet } = require('nanoid');
const worldStates = require('../libs/world-states');

class WorldIdController {
  generateWorldId(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({msg: 'ぼしゅうにしっぱいしました'});
    }

    const worldId = this._generateNanoid(6);
    const token = this._generateNanoid(12);

    worldStates.set(worldId, {
      '1': req.query.recruit == 2 ? token : null,
      '2': req.query.recruit == 1 ? token : null,
    });

    return res.status(200).json({
      worldId: worldId,
      token: token,
    });
  }

  checkWorldId(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({msg: 'さんかにしっぱいしました'});
    }

    let payload = {
      validity: false,
      token: null,
    };
    worldStates.get(req.query.worldId)
      .then((obj) => {
        const token = this._generateNanoid(12);
        if (obj.worldId) {
          worldStates.set(obj.worldId, {
            '1': obj.tokens['1'] == null ? token : obj.tokens['1'],
            '2': obj.tokens['2'] == null ? token : obj.tokens['2'],
          });
          payload.validity = true;
          payload.token = token;
        }
        return res.status(200).json(payload);
      })
      .catch((err) => {
        return res.status(200).json(payload);
      });
  }

  _generateNanoid(len) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const nanoid = customAlphabet(alphabet, len);
    return nanoid();
  }
};

module.exports = new WorldIdController();
