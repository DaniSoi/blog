const API_URL = process.env.NODE_ENV === 'development' ?
  'http://localhost:5000/api' :
  // 'http://192.168.68.101:5000/api' :
  '/api'
;

export default API_URL;
