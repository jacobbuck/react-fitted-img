'use strict';

var assign = require('lodash/assign');
var keys = require('lodash/keys');
var omit = require('lodash/omit');
var PropTypes = require('prop-types');
var React = require('react');

var supports = window.CSS &&
  CSS.supports &&
  CSS.supports('object-fit', 'cover') &&
  CSS.supports('object-position', '0 0');

function FittedImg(props) {
  var restProps = omit(props, keys(FittedImg.propTypes));

  return supports ?
    React.createElement('img', assign({}, restProps, {
      alt: props.alt,
      height: props.height,
      src: props.src,
      style: assign({}, props.style, {
        objectFit: props.fit,
        objectPosition: props.position
      }),
      width: props.width
    })) :
    React.createElement('span', assign({}, restProps, {
      'aria-label': props.alt,
      role: 'img',
      style: assign({}, props.style, {
        backgroundImage: 'url("' + props.src + '")',
        backgroundPosition: props.position,
        backgroundSize: props.fit.replace('fill', '100% 100%').replace('none', 'auto'),
        display: 'inline-block',
        height: props.height ? props.height + 'px' : null,
        width: props.width ? props.width + 'px' : null
      })
    }));
};

FittedImg.propTypes = {
  alt: PropTypes.string,
  fit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none']),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  position: PropTypes.string,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

FittedImg.defaultProps = {
  fit: 'fill',
  position: '50% 50%'
};

module.exports = FittedImg;
