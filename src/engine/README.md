# Frost Walker

Frost Walker is a template engine written for Frost project. This is a custom template engine that supports TypeScript, Markdown and more.
The final output from this engine is raw html which then is optimized by Frost for production.

## Info

Frost project uses `.frost` file extension and so does Frost Walker. This engine takes file or raw source code and converts it into regular html.
This engine also supports embedded JavaScript syntax. Unlike other template engines, Frost Walker uses html element syntax instead of special syntax like `{{}}`.
Here are the syntax used by Frost Walker:
- `<frost>...</frost>`
  This is a special syntax that renders the JavaScript output. Anything inside `<frost></frost>` tag will be executed and rendered.
  Example:

  ```html
  <h1>Hello, my name is <frost>name</frost>.</h1>
  ```

- `<frost embed>...</frost>`
  This is another syntax for frost that executes JavaScript but does not render the output. Example:

  ```html
  <frost embed>for (let i = 1; i <= 10; i++) {</frost>
  <h1>Current Count is <frost>i</frost></h1>
  <frost embed>}</frost>
  ```

- `<!-- ... -->`
  This syntax is used for writing comments.

- `#include "path"` or `#import "path"`
  This is another special syntax in frost which can be used to include another component to current file.
  The special thing about this is, if the file path ends with `.md`, the contents are treated as markdown and are rendered
  to HTML before executing JavaScript contents. If the file extension is something else, it just renders them as it is.
  This syntax can be used inside any file you would like. The file path must be in `"` instead of `'`. Example:

  ```m
  #include "./components/file.md"
  ```