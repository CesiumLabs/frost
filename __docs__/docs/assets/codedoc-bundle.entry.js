import { getRenderer } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/transport/renderer.js';
import { initJssCs } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/transport/setup-jss.js';initJssCs();
import { installTheme } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/content/theme.ts';installTheme();
import { codeSelection } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/selection.js';codeSelection();
import { sameLineLengthInCodes } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/same-line-length.js';sameLineLengthInCodes();
import { initHintBox } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-hint/index.js';initHintBox();
import { initCodeLineRef } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-ref/index.js';initCodeLineRef();
import { initSmartCopy } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/smart-copy.js';initSmartCopy();
import { copyHeadings } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/heading/copy-headings.js';copyHeadings();
import { contentNavHighlight } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/contentnav/highlight.js';contentNavHighlight();
import { loadDeferredIFrames } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/transport/deferred-iframe.js';loadDeferredIFrames();
import { smoothLoading } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/transport/smooth-loading.js';smoothLoading();
import { tocHighlight } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/toc-highlight.js';tocHighlight();
import { postNavSearch } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/search/post-nav/index.js';postNavSearch();
import { copyLineLinks } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-links/copy-line-link.js';copyLineLinks();
import { gatherFootnotes } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/footnote/gather-footnotes.js';gatherFootnotes();
import { reloadOnChange } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/serve/reload.js';reloadOnChange();
import { ToCPrevNext } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/prevnext/index.js';
import { GithubSearch } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/misc/github/search.js';
import { ToCToggle } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/toggle/index.js';
import { DarkModeSwitch } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/darkmode/index.js';
import { ConfigTransport } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/transport/config.js';
import { TabSelector } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/tabs/selector.js';
import { CollapseControl } from '/home/shreyas/Desktop/pgs/frost/frost/__docs__/.codedoc/node_modules/@codedoc/core/dist/es6/components/collapse/collapse-control.js';

const components = {
  '/MLasxltaMWahnsLCtSG1w==': ToCPrevNext,
  'USnea6y4NUQsltYDHKmv3g==': GithubSearch,
  'ZBTo/2vb9J3XycqPocViqQ==': ToCToggle,
  'bfvtZhKCLAQTitGC/nQrvw==': DarkModeSwitch,
  'FnXlYIKc4lCw8cOWFiGmUQ==': ConfigTransport,
  'Pjq1h6x1v/TTD62+83a6lA==': TabSelector,
  'bqeWaNqrZ/bnEb8nZnzSyA==': CollapseControl
};

const renderer = getRenderer();
const ogtransport = window.__sdh_transport;
window.__sdh_transport = function(id, hash, props) {
  if (hash in components) {
    const target = document.getElementById(id);
    renderer.render(renderer.create(components[hash], props)).after(target);
    target.remove();
  }
  else if (ogtransport) ogtransport(id, hash, props);
}
