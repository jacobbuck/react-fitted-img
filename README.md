# react-fitted-img

Lightweight component for fitting and positioning images with cross-browser support.

## Usage

```jsx
import FittedImg from 'react-fitted-img';

<FittedImg src="/path/to/image.png" alt="Thing" fit="cover" position="0 50%" />
```

### Props

- `src` **required** URL of the image you want to embed ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-src))
- `alt` _optional_ text description of the image ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-alt))
- `fit` _optional_ sets how the image should be resized to fit its container. Supports the [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit): `fill` (default), `contain`, `cover`, and `none`.
- `height` _optional_ the intrinsic height of the image in pixels. ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-height))
- `position` _optional_ the alignment of the image's contents within the element's box. Supports [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) values.
- `width` _optional_ the intrinsic width of the image in pixels. ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-width))

> :information_source: Additional props will be passed down.

## Limitations

For browsers that don't support [`object-fit`/`object-position`](https://caniuse.com/#feat=object-fit), the fallback doesn't support:

- Event handlers like `onError` and `onLoad`.
- Other [image attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes), such as `crossorigin`, `loading`, `sizes`, `srcset`, `usemap`, etc…
- CSS background images.
