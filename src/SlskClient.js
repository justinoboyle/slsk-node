import Promise from 'promise';
import RequestType from './type/RequestType';
import md5 from 'js-md5';
import VersionRegistry from './type/VersionRegistry';

export default class SlskClient {
  constructor() {
    this._state = {
      loggedIn: false
    };
  }

  login(params) {
    return _promise((resolve, reject) => {
      this._doRequest({
        req: [
          'Login',
          params.username._as(RequestType.string),
          params.password._as(RequestType.string),
          (params.majorVersion || VersionRegistry.major.museek)._as(RequestType.uint32),
          md5(params.username + params.password).hex()._as(RequestType.string),
          (params.minorVersion || VersionRegistry.minor['157 ns 13e'])._as(RequestType.uint32)
        ],
        responseTemplate: {
          success: [
            'success'._as(RequestType.uchar)._validate('1'._as(RequestType.uchar)),
            'greet'._as(RequestType.string),
            'ip'._as(RequestType.uint32),
            'passwordDigest'._as(RequestType.string)
          ],
          failure: [
            'success'._as(RequestType.uchar)._validate('0'._as(RequestType.uchar)),
            'reason'._as(RequestType.string)
          ]
        }}, (err, res) => {
        if(err)
          return reject(err);
        if(!res.success)
          return reject(res.ret.reason);
        this._state.loggedIn = true;
        return resolve(this);
      })
    }
  }
  _doRequest(req cb) {
    /* TODO implement */
  }
}
function _promise(c, doc) {
  let temp = new Promise(c);
  if(doc)
    temp.doc = doc;
  return temp;
}
