import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '/',
    html: 'dist/html'
  },
  page: {
    title: {
      base: 'Frost Documentation'
    }
  },
  misc: {
    github: {
      user: 'cesiumlabs',
      repo: 'frost',
    }
  }
});
