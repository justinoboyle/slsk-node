let types = {
  string: 'string',
  uint32: 'uint32',
  uchar: 'uchar',
  ip: 'ip'
};

export default types;

let guesses = {
  object: types.string,
  string: types.string,
  number: types.uint32
}

Object.defineProperty(Object.prototype, 'stype', {
    get: function() {
        if(!!this['_stype'])
          return this['_stype'];
        return guessType(this);
    },
    set: function(type) {
      this['_stype'] = type;
    }
});

Object.prototype._as = function (as) {
  this.stype = as;
  return this;
}

function guessType(obj) {
  return guesses[typeof(obj)] || types.string
}
