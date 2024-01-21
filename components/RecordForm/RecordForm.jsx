"use client";

import { Input, Button, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

export default function RecordForm({ submitHandle }) {
  const isClient = typeof window !== "undefined";
  const [value, setValue] = useState("defaultState");
  const handleChange = (ev) => {
    console.log(ev.currentTarget);
    setValue(ev.currentTarget.value);
  };

  return (
    <>
      <p>{isClient ? "form client" : "form server"}</p>
      <form action={submitHandle}>
        <Input name="group1[query]" onChange={handleChange} value={value} />
        <Checkbox name="group1[isAsset]" defaultChecked>
          Checkbox
        </Checkbox>
        <Input name="group2[query]" value="initial value" />
        <Checkbox name="group2[isAsset]" defaultChecked>
          Checkbox
        </Checkbox>
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
