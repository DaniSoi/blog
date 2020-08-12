export default function bufferToBase64 (buff) {
  return btoa(buff.reduce((data, byte) =>
    data + String.fromCharCode(byte),
    '')
  );
}
