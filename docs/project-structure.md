# Project Structure

```js
/app
    hooks.js // Custom hooks
    ChakraTheme.js // Extending default chakra ui theme (import *.chakra.js)
    providers.js
/components
    /Component
        index.js // enterance point with all neccecary exports
        Component.jsx
        Component.stories.jsx // Storybook stories
        Component.chakra.js // Chakra component styling
        Component.module.css // CSS module
        docs.md // component architecture overview (props, listeners, state diagram)
        learned.md // some learned stuff
/handlers // custom form handlers
/serverAction // Server actions, i.e to work with database
/utils // Some helper functions, i.e. mongoose scripts
/models // Mongoose models
/docs // Project documentation
```

## Inspiration
- [Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate)
- [bulletproof-react](https://github.com/alan2207/bulletproof-react) (Unfortunately not for nextJs)
