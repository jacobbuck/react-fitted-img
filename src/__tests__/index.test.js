import { render } from '@testing-library/react';
import FittedImg from '../';

describe('when object-fit and object-position is supported', () => {
  beforeAll(() => {
    window.CSS = { supports: jest.fn(() => true) };
  });

  afterAll(() => {
    delete window.CSS;
  });

  test('renders <img> element', () => {
    const { getByRole } = render(<FittedImg src="/test.jpeg" />);
    expect(getByRole('img')).toHaveAttribute('src', '/test.jpeg');
    expect(getByRole('img')).toHaveStyle(`
      object-fit: fill;
      object-position: 50% 50%;
    `);
  });

  test('handles fit and position props', () => {
    const { getByRole } = render(
      <FittedImg src="/test.jpeg" fit="cover" position="25% 75%" />
    );
    expect(getByRole('img')).toHaveStyle(`
      object-fit: cover;
      object-position: 25% 75%;
    `);
  });

  test('handles alt prop', () => {
    const { getByRole } = render(
      <FittedImg src="/test.jpeg" alt="Test image" />
    );
    expect(getByRole('img')).toHaveAttribute('alt', 'Test image');
  });

  test('handles style prop', () => {
    const { getByRole } = render(
      <FittedImg
        src="/test.jpeg"
        style={{
          display: 'block',
          width: '100%',
          opacity: '0.5',
          margin: '10px',
        }}
      />
    );
    expect(getByRole('img')).toHaveStyle(`
      display: block;
      width: 100%;
      opacity: 0.5;
      margin: 10px;
    `);
  });

  test('handles width and height props', () => {
    const { getByRole } = render(
      <FittedImg src="/test.jpeg" width={400} height={300} />
    );
    expect(getByRole('img')).toHaveAttribute('width', '400');
    expect(getByRole('img')).toHaveAttribute('height', '300');
  });
});

describe('when object-fit and object-position is not supported', () => {
  beforeAll(() => {
    expect(window).not.toHaveProperty(['CSS', 'supports']);
  });

  test('renders <span> fallback element', () => {
    const { getByRole } = render(<FittedImg src="/test.jpeg" />);
    expect(getByRole('img')).toHaveAttribute('role', 'img');
    expect(getByRole('img')).toHaveStyle(`
      background-image: url("/test.jpeg");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: inline-block;
    `);
  });

  describe('handles fit and position props', () => {
    test('passes to background-postion and background-size styles', () => {
      const { getByRole } = render(
        <FittedImg src="/test.jpeg" fit="cover" position="25% 75%" />
      );
      expect(getByRole('img')).toHaveStyle(`
        background-position: 25% 75%;
        background-size: cover;
      `);
    });

    test('replaces "fill" with "100% 100%" for background-size style', () => {
      const { getByRole } = render(<FittedImg src="/test.jpeg" fit="fill" />);
      expect(getByRole('img')).toHaveStyle('background-size: 100% 100%');
    });

    test('replaces "none" with "auto" for background-size style', () => {
      const { getByRole } = render(<FittedImg src="/test.jpeg" fit="none" />);
      expect(getByRole('img')).toHaveStyle('background-size: auto');
    });
  });

  test('passes alt prop to aria-label', () => {
    const { getByRole } = render(
      <FittedImg src="/test.jpeg" alt="Test image" />
    );
    expect(getByRole('img')).toHaveAttribute('aria-label', 'Test image');
  });

  test('handles style prop', () => {
    const { getByRole } = render(
      <FittedImg
        src="/test.jpeg"
        style={{
          display: 'block',
          width: '100%',
          opacity: '0.5',
          margin: '10px',
        }}
      />
    );
    expect(getByRole('img')).toHaveStyle(`
      display: block;
      width: 100%;
      opacity: 0.5;
      margin: 10px;
    `);
  });

  test('handles width and height props', () => {
    const { getByRole } = render(
      <FittedImg src="/test.jpeg" width={400} height={300} />
    );
    expect(getByRole('img')).toHaveStyle(`
      width: 400px;
      height: 300px;
    `);
  });
});
