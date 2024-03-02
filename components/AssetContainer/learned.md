## Formatting numbers like 1,000.0000
Issue: https://github.com/skorphil/nextjs-form/issues/38

For amount inputField I want numbers with thousands separator. In chakra formatting number can be achieved with:
```js
const format = (val) => {formatting logic here}
<NumberInput value={format(value)} />
```
[Chakra docs](https://chakra-ui.com/docs/components/number-input#formatting-and-parsing-the-value)

Adding thousands separator can be achieved with several approaches:
- Library for number formatting
    - [react-number-format](https://s-yadav.github.io/react-number-format/docs/props) I dont like nesting approach. To use input with props `<Input name="currency" placeholder="USD />` inside `<NumericFormat customInput={input}>` i need to create separate variable. At first glance it seems not optimal.
    - [numbrojs](https://numbrojs.com)
    - [numeraljs](http://numeraljs.com) (I used this one before and like it, but library seems very outdated)

- Vanilla js with `toLocaleString()`
  [stackoverflow](https://stackoverflow.com/a/48062039/15007541)

For RecordForm I sticked to vanilla JS, because seems easier and this way I reduce the number of dependencies.

```jsx
const [amount, setAmount] = useState(0);
const numFormat = (val) => val.toLocaleString();
const parse = (val) => Number(val.replace(/^\$/, "")); // val is string, so need to use Number() to make it work with .toLocaleString

<NumberInput // props go in chakra <NumberInput>, not <NumberInputField>
    onChange={(val) => setAmount(parse(val))} // val returns string
    value={numFormat(amount)}
    name="amount"
    px={2}
>
    <NumberInputField />
</NumberInput>
```

`Number("") === 0` so when i clear input i got 0. For now i decided to let this be

This will be changed later when used with *react-hook-form*

### react-number-format + react-hook-form
Previous approach doesn't work as expected in combination with `react-hook-form`:

It require `react-hook-form`'s `setValue()` and leads to carret jumping (https://github.com/orgs/react-hook-form/discussions/11538#discussioncomment-8650217)

so solved number formatting task with a more complex approach relying on `react-number-format`(because Mantine ui uses it under the hood):
https://codesandbox.io/p/devbox/2fr55p?migrateFrom=y8qpsq

```jsx
<Controller
    name={`${assetName}.amount`}
    render={({ field: { onChange, ...field } }) => (
    <Input
        as={NumericFormatWrapper}
        onChange={(e) => {
        onChange(parseFloat(e.target.value.replace(/[^0-9.]/g, "")));
        }}
        thousandSeparator=" "
        decimalSeparator="."
        {...field}
    />
    )}
/>
```

wrapper created to avoid:
```
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
Check the render method of `Styled(input)`.
at NumericFormat
```
But do not deeply understand how this works and it there any cleaner way to fix that error.

```jsx
import { NumericFormat } from "react-number-format";
import { forwardRef } from "react";

export const NumericFormatWrapper = forwardRef((props, ref) => {
  return <NumericFormat {...props} getInputRef={ref} />;
});
NumericFormatWrapper.displayName = "NumericFormatWrapper";
```