import {minify} from 'html-minifier';

export default (text: string, compressionLevel: number): string => minify(text, {
  html5: true,
  collapseInlineTagWhitespace: compressionLevel >= 3,
  removeComments: compressionLevel >= 1,
  removeRedundantAttributes: compressionLevel >= 1,
  removeTagWhitespace: compressionLevel >= 3,
  collapseWhitespace: compressionLevel >= 2
});