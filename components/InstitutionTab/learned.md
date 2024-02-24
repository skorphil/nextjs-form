## Altering components style in chakra ui
[Build your own design system with chakraui | Youtube](https://youtu.be/epJuxo8FKFA?si=UEmVtkfPLerimLkN&t=1210)

The fundamental approach:
1. Create components style file, according to Chakra style API
2. Use methods `definePartsStyle`, `defineMultiStyleConfig`
3. extend chacra's `theme` appending component styles with `extendTheme` ([theme.js](app/ChakraTheme.js))
4. pass `theme` as prop to `ChakraProvider`


Tabs is a multipart component - [chackra docs | styling-multipart-components](https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components) and require `definePartsStyle`, `defineMultiStyleConfig` methods


- [ ] How to use props do be passed to styles?

Chakra tab custom styles
```js
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(["tablist", "tab"]);

export const tabsTheme = defineMultiStyleConfig({
  variants: {
    grid: {
      tab: {
        borderRadius: "base",
        _selected: {
          bg: "black",
        },

        justifyContent: "flex-start",
      },
      tablist: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px,1fr))",
        gap: "3",
        w: "100%",
      },
    },
  },
});
```


ChakraTheme.js
```js
import { tabsTheme } from "../components/InstitutionTab/Tabs.chakra";
...
const theme = extendTheme({
  config,
  components: {
    Tabs: tabsTheme,
  },
});

export default theme;
```


## ForwardRef to extend component
`forwardRef` https://chakra-ui.com/community/recipes/as-prop#option-1-using-forwardref-from-chakra-uireact

Seems to work

```js
const IntitutionTab = forwardRef((props, ref) => (
  <Tab px="4" py="5" rounded="sm" shadow="lg" ref={ref} {...props}>
    Custom Tab
  </Tab>
));
...
<IntitutionTab bg="red" />
```

```js
const IntitutionTab = forwardRef(
  (
    { name = "Unnamed institution", isDeleted = false, state = null, ...props },
    ref
  ) => {
...
<Tab
        isDisabled={isDeleted}
        paddingRight={rightSection && 1}
        className={`${classes.tab} ${isDeleted && classes.deleted}`}
        ref={ref}
        {...props}
      >
```