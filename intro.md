### Configuration

To configure frost, by default you use `frost.json` as the configuration file in the **root** of your project.
To overwrite the custom configuration file, you can use `--config {file}.json` as a CLI Option, while serving or building the website.

 Here is the default schema used by frost

 ```json
 
 {
    "srcDir": "source",
    "buildDir": "build",
    "staticDir": "static",
    "HTMLcompressionLevel": 2
 }

 ```
  
`srcDir` - It is the source directory of the project where all the templates/pages are stored.
`buildDir` - Specifies the export directory on build.
`staticDir` - Directory where the static files are stored.
`HTMLcompressionLevel` - The amount of compression you want the build to incurr


### Metadata

By default the metadata file for frost is `frost.metadata.json`, containing all the metadata/variables required in your project.
It can be overwritten using the CLI at anytimes.

**Example**

Here's an example usage: 

`frost.metadata.json`

```json
{
    "author": "rhydderchc"
}

```

`index.frost`

```html

<body>
    <p> The Author is:</p>
    <p>
        <frost>author</frost>
    </p>
</body>

```

   **output( on build )**

```html

<body>
    <p> The Author is:</p>
    <p>
        rhydderchc
    </p>
</body>

```

### Templating with the frost engine

Frost has it's own built-in **[templating engine](/engine)**, using a html-like syntax with added features.

- Rendering Markdown
Yes, with the frost engine you can render markdown with ease.

```html

<p>
    <frost markdown> # This is a template </frost>
</p>
```

  - Including an external markdown file

    ```html

    <p>
        #include "./mark.md"
    </p>
    ```

- Using TypeScript
With frost's engine, using typescript is a piece of cake.

```html
<p>
    <frost typescript> let a: string = "Hello World"</frost>
    <frost> a </frost>
</p>
```

  - Including Typescript Files

  ```html
   <p>
       #include "./hello.ts"
   </p>
   ```
