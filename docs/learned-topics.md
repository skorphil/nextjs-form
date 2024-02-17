# Learned Topics

## Mermaid diagrams
[Mermaid](https://mermaid.js.org) has simpler syntax than *plantuml* and supported by github in markdown files.
\
[Flow chart](https://mermaid.js.org/syntax/flowchart.html) can be used for *component tree* visualistaions

## Debug arrow functions
Arrow functions not perform as usual functions in devtools. I cant see their arguments value and output value.

![devtools screenshot demonstrating arrow function](img/debug-arrow-func.png)


## Chromatic storybook
Free and simple solution to publish storybook to web

[Github Action Chromatic](https://www.chromatic.com/docs/github-actions/)


## Layout based on software keyboard
Related issues:
- https://github.com/skorphil/nextjs-form/issues/13
- https://github.com/skorphil/nextjs-form/issues/31
- https://github.com/skorphil/nextjs-form/issues/26

By default, software keyboard changes `visualViewport`, not affecting `window.innerHeight`.


### Chrome Android
It is possible to alter default behavior with meta tag:
```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,interactive-widget=resizes-content"
/>
```


### Safari
No support of `interactive-widget=resizes-content`, so only default behavior supported


