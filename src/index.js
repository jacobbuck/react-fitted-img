import PropTypes from 'prop-types';
import { forwardRef, useLayoutEffect, useState } from 'react';

const FittedImg = forwardRef(function FittedImg(
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
  // Assume the browser supports CSS.supports() API and CSS3 object-fit/object-position.
  const [supported, setSupported] = useState(true);

  if (typeof window !== 'undefined') {
    // Once mounted, we’ll properly check for browser support.
    useLayoutEffect(() => {
      setSupported(
        typeof CSS !== 'undefined' &&
          CSS.supports &&
          CSS.supports('object-fit', 'cover') &&
          CSS.supports('object-position', '0 0')
      );
    }, []);
  }

  return supported ? (
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
        height: Number.isFinite(height) ? `${height}px` : null,
        width: Number.isFinite(width) ? `${width}px` : null,
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
