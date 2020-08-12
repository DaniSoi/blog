function compareImages () {
  var a = new Image(),
    b = new Image();
  a.src = 'chrome://favicon/' + url_a;
  b.src = 'chrome://favicon/' + url_b;

// might need to wait until a and b have actually loaded, ignoring this for now
  var a_base64 = getBase64Image(a),
    b_base64 = getBase64Image(b);

  if (a_base64 === b_base64)
  {
    // they are identical
  }
  else
  {
    // you can probably guess what this means
  }
}
