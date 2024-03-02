/* 
wrapper created to avoid:

Warning: Function components cannot be given refs. Attempts to access this ref will fail.
Did you mean to use React.forwardRef()?
Check the render method of `Styled(input)`.
at NumericFormat  */
"use client";

import { NumericFormat } from "react-number-format";
import { forwardRef } from "react";

export const NumericFormatWrapper = forwardRef((props, ref) => {
  return <NumericFormat {...props} getInputRef={ref} />;
});
NumericFormatWrapper.displayName = "NumericFormatWrapper";
