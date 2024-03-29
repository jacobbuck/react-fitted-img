# Changelog

## v2.0.1 - 2022-04-12

### Changed

- Updated [@babel/runtime](https://www.npmjs.com/package/@babel/runtime) dependency to v7.17.9.
- Updated [prop-types](https://www.npmjs.com/package/prop-types) dependency to v15.8.1.
- Updated [react](https://www.npmjs.com/package/react) peer-dependency to support v18.

## v2.0.0 - 2021-01-01

### Changed

- **BREAKING** Changed CSS feature detection to happen only on component mount—using hooks!
- **BREAKING** Changed JSX transform to use new React JSX runtime.
- **BREAKING** Updated [react](https://www.npmjs.com/package/react) peer-dependency to support new React JSX runtime.
- Changed behaviour for server-side rendering to render supported `<img>` element.

### Removed

- **BREAKING** Removed handling `height` and `width` props as strings containing numbers.

## v1.7.0 - 2020-11-17

### Added

- Added source maps to build output.

### Changed

- Updated [@babel/runtime](https://www.npmjs.com/package/@babel/runtime) dependency to v7.12.5..
- Updated render function to a named function.
- Updated `propTypes` to only be defined in non-production environments.

### Removed

- Removed `defaultProps` in favour of default values in object destructuring.

## v1.6.0 - 2020-08-15

### Changed

- Allow `aria-label` and `role` props to be overwritten on fallback image.

## v1.5.0 - 2020-08-15

### Added

- Add ref forwarding to `FittedImg` component.

## v1.4.0 - 2020-07-10

### Added

- Added [@babel/runtime](https://www.npmjs.com/package/@babel/runtime) for Babel helpers.

## v1.3.2 - 2020-05-25

### Fixed

- Fixed a spelling mistake.

## v1.3.1 - 2020-05-25

### Changed

- Update `height` and `width` props to handle `null`.

## v1.3.0 - 2020-05-25

### Changed

- Update `height` and `width` default props.

## v1.2.0 - 2020-05-24

### Added

- Added `alt`, `height`, `style` and `width` default props.
- Added ES Module build.

## v1.1.2 - 2020-04-27

Maintenance release.

## v1.1.1 - 2019-06-22

### Changed

- Updated CSS supports detection to be lazy.

## v1.1.0 - 2019-02-24

### Changed

- Builds are now done with [Rollup](http://rollupjs.org).
- Updated [prop-types](https://www.npmjs.com/package/prop-types) dependency to v15.7.2.

## v1.0.3 - 2017-08-21

### Changed

- Updated [react](https://www.npmjs.com/package/react) peer-dependency to support React 16.

## v1.0.2 - 2017-06-22

### Changed

- Update `height` and `width` props to handle values with units, e.g. `width="100%"`.

## v1.0.1 - 2017-06-18

### Changed

- **BREAKING** Requires [react](https://www.npmjs.com/package/react) peer-dependency to be v15.6.0 or newer.
- Updated [prop-types](https://www.npmjs.com/package/prop-types) dependency to v15.6.0.

## v1.0.0 - 2017-06-18

### Added

- Initial public version!
