const path = require('path');

const HTML_DIR = path.join(__dirname, '../../frontend/src/html');

function handleGetIndex(req, res) {
  if (req.signedCookies['token']) {
    res.redirect('/postsView');
  } else {
    res.redirect('/login');
  }
}

function handleGetFavicon(req, res) {
  res.sendFile(path.join(HTML_DIR , '../imgs/favicon.ico'));
}

function handleGetFeed(req, res) {
  res.sendFile(path.join(HTML_DIR + '/postsView.html'));
}

function handleGetLogin(req, res) {
  res.sendFile(path.join(HTML_DIR + '/login.html'));
}

function handleGetRegistration(req, res) {
  res.sendFile(path.join(HTML_DIR + '/register.html'));
}

module.exports = {
  handleGetIndex,
  handleGetFavicon,
  handleGetFeed,
  handleGetLogin,
  handleGetRegistration
};
