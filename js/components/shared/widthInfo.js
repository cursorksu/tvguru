export { widthInfo };

function widthInfo() {
  return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
};
