import PropTypes from "prop-types";
import React from "react";

const supports =
  window.CSS &&
  CSS.supports &&
  CSS.supports("object-fit", "cover") &&
  CSS.supports("object-position", "0 0");

const FittedImg = ({
  alt,
  fit,
  height,
  position,
  src,
  style,
  width,
  ...restProps
}) =>
  supports
    ? <img
        {...restProps}
        alt={alt}
        height={height}
        src={src}
        style={{
          ...style,
          objectFit: fit,
          objectPosition: position,
        }}
        width={width}
      />
    : <span
        {...restProps}
        aria-label={alt}
        role="img"
        style={{
          display: "inline-block",
          height: isFinite(height) ? `${height}px` : height,
          width: isFinite(width) ? `${width}px` : width,
          ...style,
          backgroundImage: `url("${src}")`,
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
          backgroundSize: fit
            .replace("fill", "100% 100%")
            .replace("none", "auto"),
        }}
      />;

FittedImg.propTypes = {
  alt: PropTypes.string,
  fit: PropTypes.oneOf(["fill", "contain", "cover", "none"]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.string,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FittedImg.defaultProps = {
  fit: "fill",
  position: "50% 50%",
};

export default FittedImg;
