import PropTypes from 'prop-types';
import * as React from 'react';
import isSupported from './isSupported';

const FittedImg = React.forwardRef(function FittedImg(
  {
    alt = null,
    fit = 'fill',
    height = null,
    position = '50% 50%',
    src,
    style = null,
    width = null,
    ...rest
  },
  ref
) {
  return isSupported() ? (
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
  ) : (
    <span
      aria-label={alt}
      role="img"
      {...rest}
      ref={ref}
      style={{
        display: 'inline-block',
        height: height ?? `${height}px`,
        width: width ?? `${width}px`,
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

FittedImg.propTypes = {
  alt: PropTypes.string,
  fit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none']),
  height: PropTypes.number,
  position: PropTypes.string,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  width: PropTypes.number,
};

export default FittedImg;
