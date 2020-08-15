import PropTypes from 'prop-types';
import React from 'react';
import appendPx from './appendPx';
import isSupported from './isSupported';

const FittedImg = React.forwardRef((props, ref) => {
  const { alt, fit, height, position, src, style, width, ...rest } = props;

  if (isSupported()) {
    return (
      <img
        {...rest}
        alt={alt}
        height={height}
        ref={ref}
        src={src}
        style={{
          ...style,
          objectFit: fit,
          objectPosition: position,
        }}
        width={width}
      />
    );
  }

  return (
    <span
      aria-label={alt}
      role="img"
      {...rest}
      ref={ref}
      style={{
        display: 'inline-block',
        height: appendPx(height),
        width: appendPx(width),
        ...style,
        backgroundImage: `url("${src}")`,
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        backgroundSize: fit
          .replace('fill', '100% 100%')
          .replace('none', 'auto'),
      }}
    />
  );
});

FittedImg.defaultProps = {
  alt: null,
  fit: 'fill',
  height: null,
  position: '50% 50%',
  style: null,
  width: null,
};

FittedImg.propTypes = {
  alt: PropTypes.string,
  fit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.string,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FittedImg;
