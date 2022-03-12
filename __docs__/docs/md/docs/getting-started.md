# Getting Started

Assuming you've already seen this [page](/docs/installation) page, you're ready to start using Frost. 💪

To get you started with Frost, we'll be creating a simple project called `frost-starter`.

Frost has a starter boilerplate that we'll be using to get you started.

```bash

frost --init // --> cotains a template for a new project

```
Here's the directory structure of the project we just created.

```
starter 
├── .gitignore
├── package.json
├── README.md
├── src
│   ├── index.frost
│   └── components
│       ├── description.md
├── public 
│   └── frost.png
├── frost.json
├── frost.metadata.json
└── .git

```

The first thing that might come to your mind is `index.frost`.
This is the file that is going to be built into html by frost.

This is basically the **frost templating engine**.

If you open up `src/index.frost` you might see this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="./frost.png" type="image/png">
    <title><frost>pageTitle</frost></title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

        * {
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #232323;
            color: #FFFFFF;
            margin-top: 8rem;
            font-family: 'Poppins', sans-serif;
        }

        main {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        img {
            height: 15rem;
            width: 15rem;
            border-radius: 50%;
            user-select: none;
            margin-bottom: 2rem;
        }

        a {
            padding: 1rem;
            cursor: pointer;
            border: none;
            background-color: #00a5a5;
            color: white;
            border-radius: 0.3rem;
            width: 10%;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
        }

        a:hover {
            background-color: #008080;
        }

        h1 {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 3rem;
        }

        p {
            font-size: 1.3rem;
        }
    </style>
</head>
<body>
    <main>
        <img draggable="false" src="./frost.png" alt="icon">
        #include "./components/description.md"  <!--> This is where we import our markdown element. The element renders itself in the exact place it is being imported -->
    </main>
    <div class="buttons">
        <a href="https://frost.js.org" target="_blank">Documentation</a>
        <a href="https://github.com/DevSnowflake/frost" target="_blank">GitHub</a>
    </div>

    <frost typescript>  <!--> Frost compiles Typescript to JS(with an inbuilt typechecker!) -->
        const titleElm = document.querySelector("h1");
        
        if (titleElm) {
            const colorGen = (): string => {
                return `#${(Math.floor(Math.random() * 0xFFFFFF) + 1).toString(16)}`;
            };
            
            setInterval(() => {
                titleElm.style.color = colorGen();
            }, 2e3);
        }
    </frost>
</body>
</html>
```
Through the whole file, it is evident that the frost templating engine is just simple **HTML** with an added amount of features.

`<frost>pageTitle<frost>` - This is the variable that will be replaced with the title of the page.

The variable is contained in `frost.metadata.json`.

```json
{
    "pageTitle": "Hello Frost" // --> The metadata may contain a numerous amount of other variables.
}
```

The `frost.json` file contains the configurations for the project.

> :ToCPrevNext