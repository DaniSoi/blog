export default function filterObject (obj = {}, filterObj = {}) {
  let result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && !filterObj[key]) {
      result[key] = obj[key];
    }
  }

  return result;
}
