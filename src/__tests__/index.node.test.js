/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server';
import FittedImg from '..';

test('renders <img> element on server', () => {
  expect(renderToString(<FittedImg src="/test.jpeg" />)).toMatchInlineSnapshot(
    `"<img src=\\"/test.jpeg\\" style=\\"object-fit:fill;object-position:50% 50%\\"/>"`
  );
});
