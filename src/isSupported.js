const supports = (window.CSS && window.CSS.supports) || (() => false);

let cache;
const isSupported = () => {
  if (typeof cache === 'undefined') {
    cache =
      supports('object-fit', 'cover') && supports('object-position', '0 0');
  }
  return cache;
};

export default isSupported;
