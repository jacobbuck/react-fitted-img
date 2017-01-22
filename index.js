'use strict';

var assign = require('lodash/assign');
var keys = require('lodash/keys');
var omit = require('lodash/omit');
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
		React.createElement('div', assign({}, restProps, {
			'aria-label': props.alt,
			role: 'img',
			style: assign({}, props.style, {
				backgroundImage: 'url("' + props.src + '")',
				backgroundPosition: props.position,
				backgroundSize: props.fit.replace('fill', '100% 100%').replace('none', 'auto'),
				height: props.height ? props.height + 'px' : null,
				width: props.width ? props.width + 'px' : null
			})
		}));
};

FittedImg.propTypes = {
	alt: React.PropTypes.string,
	fit: React.PropTypes.oneOf(['fill', 'contain', 'cover', 'none']),
	height: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	position: React.PropTypes.string,
	src: React.PropTypes.string.isRequired,
	style: React.PropTypes.object,
	width: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
  ]),
};

FittedImg.defaultProps = {
	fit: 'fill',
	position: '50% 50%'
};

module.exports = FittedImg;
