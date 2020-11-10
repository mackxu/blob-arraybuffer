
// data:image/png;base64,xxxxx
// base64 -> ArrayBuffer -> blob
export function dataURItoBlob(dataURI) {
  // 解码base64
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export function saveFile(fileName, blob) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  console.log(link.href)
  link.download = fileName;
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
