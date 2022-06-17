const getPosterView01 = (qrcodeText) => {
  const poster01 = {
    "width": "256px",
    "height": "256px",
    "background": "#f8f8f8",
    "views": [{
      "type": "qrcode",
      "content": qrcodeText,
      "css": {
        "color": "#000000",
        "background": "#ffffff",
        "width": "256px",
        "height": "256px",
        "top": "0px",
        "left": "0px",
        "rotate": "0",
        "borderRadius": "0px"
      }
    }]
  }
  return poster01
}

module.exports = {
  getPosterView01: getPosterView01
}
