## Formatting numbers like 1,000.0000
For amount inputField I want numbers with thousands separator. It can be achieved with:
```js
const format = (val) => {formatting logic here}

<NumberInput value={format(value)} />
```
[Chakra docs](https://chakra-ui.com/docs/components/number-input#formatting-and-parsing-the-value)

It can be achieved with several approaches:
- Library for number formatting
    - [react-number-format](https://s-yadav.github.io/react-number-format/docs/props) I dont like nesting approach. To use input with props `<Input name="currency" placeholder="USD />` inside `<NumericFormat customInput={input}>` i need to create separate variable. At first glance it seems not optimal.
    - [numbrojs](https://numbrojs.com)
    - [numeraljs](http://numeraljs.com) (I used this one before and like it, but library seems very outdated)

- Vanilla js with `toLocalString`
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