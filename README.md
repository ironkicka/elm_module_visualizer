## What is elm_module_visualizer?
This tool helps you understand module structure of your elm code using d3.js

## How to use
1. Run elm_parser.js
```
node  elm_parser.js
```
This gives you a JSON file which contains a hierarchical structure of your elm code.
```json
{"name":"App.elm","children":[{ "name": "Foo1.elm", "children": [] }, { "name": "Foo2.elm", "children": [] }, { "name": "Foo3.elm", "children": [] }]}

```
2. Open elm_parser.html (or test.html which is still in progress) on your browser.
![example](https://user-images.githubusercontent.com/42676382/87843173-3a59f600-c8ed-11ea-82d0-1ed1061fd6eb.png)


