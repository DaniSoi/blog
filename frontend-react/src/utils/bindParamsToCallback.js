const bindParamsToCallback = callback => (...params) => () =>
  callback(...params)
;

export default bindParamsToCallback;
