/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import FittedImg from '../';

describe('when object-fit and object-position is supported', () => {
  beforeAll(() => {
    window.CSS = { supports: jest.fn(() => true) };
  });

  afterAll(() => {
    delete window.CSS;
  });

  test('renders <img> element', () => {
    render(<FittedImg src="/test.jpeg" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpeg');
    expect(screen.getByRole('img')).toHaveProperty('tagName', 'IMG');
    expect(screen.getByRole('img')).toHaveStyle(`
      object-fit: fill;
      object-position: 50% 50%;
    `);
  });

  test('handles fit and position props', () => {
    render(<FittedImg src="/test.jpeg" fit="cover" position="25% 75%" />);
    expect(screen.getByRole('img')).toHaveStyle(`
      object-fit: cover;
      object-position: 25% 75%;
    `);
  });

  test('handles alt prop', () => {
    render(<FittedImg src="/test.jpeg" alt="Test image" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test image');
  });

  test('handles style prop', () => {
    render(
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
    expect(screen.getByRole('img')).toHaveStyle(`
      display: block;
      width: 100%;
      opacity: 0.5;
      margin: 10px;
    `);
  });

  test('handles width and height props', () => {
    render(<FittedImg src="/test.jpeg" width={400} height={300} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '400');
    expect(screen.getByRole('img')).toHaveAttribute('height', '300');
  });
});

describe('when object-fit and object-position is not supported', () => {
  beforeAll(() => {
    expect(window).not.toHaveProperty(['CSS', 'supports']);
  });

  test('renders <span> fallback element', () => {
    render(<FittedImg src="/test.jpeg" />);
    expect(screen.getByRole('img')).toHaveAttribute('role', 'img');
    expect(screen.getByRole('img')).toHaveProperty('tagName', 'SPAN');
    expect(screen.getByRole('img')).toHaveStyle(`
      background-image: url("/test.jpeg");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: inline-block;
    `);
  });

  describe('handles fit and position props', () => {
    test('passes to background-postion and background-size styles', () => {
      render(<FittedImg src="/test.jpeg" fit="cover" position="25% 75%" />);
      expect(screen.getByRole('img')).toHaveStyle(`
        background-position: 25% 75%;
        background-size: cover;
      `);
    });

    test('replaces "fill" with "100% 100%" for background-size style', () => {
      render(<FittedImg src="/test.jpeg" fit="fill" />);
      expect(screen.getByRole('img')).toHaveStyle('background-size: 100% 100%');
    });

    test('replaces "none" with "auto" for background-size style', () => {
      render(<FittedImg src="/test.jpeg" fit="none" />);
      expect(screen.getByRole('img')).toHaveStyle('background-size: auto');
    });
  });

  test('passes alt prop to aria-label', () => {
    render(<FittedImg src="/test.jpeg" alt="Test image" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Test image');
  });

  test('handles style prop', () => {
    render(
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
    expect(screen.getByRole('img')).toHaveStyle(`
      display: block;
      width: 100%;
      opacity: 0.5;
      margin: 10px;
    `);
  });

  test('handles width and height props', () => {
    render(<FittedImg src="/test.jpeg" width={400} height={300} />);
    expect(screen.getByRole('img')).toHaveStyle(`
      width: 400px;
      height: 300px;
    `);
  });
});
