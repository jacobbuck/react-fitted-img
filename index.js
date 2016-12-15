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
			src: props.src,
			style: assign({}, props.style, {
				objectFit: props.fit,
				objectPosition: props.position
			})
		})) :
		React.createElement('div', assign({}, restProps, {
			'aria-label': props.alt,
			role: 'img',
			style: assign({}, props.style, {
				backgroundImage: 'url("' + props.src + '")',
				backgroundPosition: props.position,
				backgroundSize: props.fit.replace('fill', '100% 100%').replace('none', 'auto')
			})
		}));
};

FittedImg.propTypes = {
	alt: React.PropTypes.string,
	fit: React.PropTypes.oneOf(['fill', 'contain', 'cover', 'none']),
	position: React.PropTypes.string,
	src: React.PropTypes.string.isRequired,
	style: React.PropTypes.object
};

FittedImg.defaultProps = {
	fit: 'fill',
	position: '50% 50%'
};

module.exports = FittedImg;
