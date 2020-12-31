import TestRenderer from 'react-test-renderer';
import FittedImg from '../';

describe('when object-fit and object-position is supported', () => {
  beforeAll(() => {
    window.CSS = { supports: jest.fn(() => true) };
  });

  afterAll(() => {
    delete window.CSS;
  });

  test('renders <img> element', () => {
    const testRenderer = TestRenderer.create(<FittedImg src="/test.jpeg" />);
    expect(testRenderer.toJSON()).toMatchInlineSnapshot(`
      <img
        alt={null}
        height={null}
        src="/test.jpeg"
        style={
          Object {
            "objectFit": "fill",
            "objectPosition": "50% 50%",
          }
        }
        width={null}
      />
    `);
  });

  test('handles fit and position props', () => {
    const testRenderer = TestRenderer.create(
      <FittedImg src="/test.jpeg" fit="cover" position="25% 75%" />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('img').props).toHaveProperty('style', {
      objectFit: 'cover',
      objectPosition: '25% 75%',
    });
  });

  test('handles alt prop', () => {
    const testRenderer = TestRenderer.create(
      <FittedImg src="/test.jpeg" alt="Test image" />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('img').props).toHaveProperty(
      'alt',
      'Test image'
    );
  });

  test('handles style prop', () => {
    const testRenderer = TestRenderer.create(
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
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('img').props).toHaveProperty(
      'style',
      expect.objectContaining({
        display: 'block',
        width: '100%',
        opacity: '0.5',
        margin: '10px',
      })
    );
  });

  test('handles width and height props', () => {
    const testRenderer = TestRenderer.create(
      <FittedImg src="/test.jpeg" width={400} height={300} />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('img').props).toMatchObject({
      width: 400,
      height: 300,
    });
  });
});

describe('when object-fit and object-position is not supported', () => {
  beforeAll(() => {
    window.CSS = { supports: jest.fn(() => false) };
  });

  afterAll(() => {
    delete window.CSS;
  });

  test('renders <span> fallback element', () => {
    const testRenderer = TestRenderer.create(<FittedImg src="/test.jpeg" />);
    expect(testRenderer.toJSON()).toMatchInlineSnapshot(`
      <span
        aria-label={null}
        role="img"
        style={
          Object {
            "backgroundImage": "url(\\"/test.jpeg\\")",
            "backgroundPosition": "50% 50%",
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "100% 100%",
            "display": "inline-block",
            "height": null,
            "width": null,
          }
        }
      />
    `);
  });

  describe('handles fit and position props', () => {
    test('passes to backgroundPostion and backgroundSize styles', () => {
      const testRenderer = TestRenderer.create(
        <FittedImg src="/test.jpeg" fit="cover" position="25% 75%" />
      );
      const testInstance = testRenderer.root;
      expect(testInstance.findByType('span').props).toHaveProperty(
        'style',
        expect.objectContaining({
          backgroundPosition: '25% 75%',
          backgroundSize: 'cover',
        })
      );
    });

    test('replaces "fill" with "100% 100%"', () => {
      const testRenderer = TestRenderer.create(
        <FittedImg src="/test.jpeg" fit="fill" />
      );
      const testInstance = testRenderer.root;
      expect(testInstance.findByType('span').props).toHaveProperty(
        'style',
        expect.objectContaining({
          backgroundSize: '100% 100%',
        })
      );
    });

    test('replaces "none" with auto', () => {
      const testRenderer = TestRenderer.create(
        <FittedImg src="/test.jpeg" fit="none" />
      );
      const testInstance = testRenderer.root;
      expect(testInstance.findByType('span').props).toHaveProperty(
        'style',
        expect.objectContaining({
          backgroundSize: 'auto',
        })
      );
    });
  });

  test('passes alt to aria-label', () => {
    const testRenderer = TestRenderer.create(
      <FittedImg src="/test.jpeg" alt="Test image" />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('span').props).toHaveProperty(
      'aria-label',
      'Test image'
    );
    expect(testInstance.findByType('span').props).not.toHaveProperty('alt');
  });

  test('handles style prop', () => {
    const testRenderer = TestRenderer.create(
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
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('span').props).toHaveProperty(
      'style',
      expect.objectContaining({
        display: 'block',
        width: '100%',
        opacity: '0.5',
        margin: '10px',
      })
    );
  });

  test('handles width and height props', () => {
    const testRenderer = TestRenderer.create(
      <FittedImg src="/test.jpeg" width={400} height={300} />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType('span').props).toHaveProperty(
      'style',
      expect.objectContaining({
        width: '400px',
        height: '300px',
      })
    );
  });
});
