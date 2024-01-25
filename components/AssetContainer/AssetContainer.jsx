"use client";

import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function AssetContainer({ asset, isExpanded }) {
  const [amount, setAmount] = useState(0);
  const numFormat = (val) => val.toLocaleString();
  const parse = (val) => Number(val.replace(/^\$/, ""));

  // TODO what is better way to structur component with 2 very different ui states?
  const amountInput = (
    <HStack align="end" spacing={1} flex={1}>
      <FormControl>
        {isExpanded && <FormLabel>Amount</FormLabel>}
        <NumberInput
          onChange={(val) => setAmount(parse(val))}
          value={numFormat(asset.amount)}
          name="amount"
        >
          <NumberInputField px={2} />
        </NumberInput>
      </FormControl>
      <Input
        name="currency"
        value={asset?.currency ?? ""}
        placeholder="USD"
        flexShrink={0}
        w={14}
        px={2}
      />
    </HStack>
  );

  return (
    <VStack align="start" spacing={3} w="100%">
      <HStack w="100%" align="end" spacing={4}>
        {amountInput}
        {isExpanded && (
          <Checkbox
            defaultChecked={asset?.isEarning ?? false}
            name="isEarning"
            h={10}
            size="lg"
          >
            Earning
          </Checkbox>
        )}
        <IconButton
          variant="ghost"
          aria-label="Delete asset"
          icon={<DeleteIcon />}
        />
      </HStack>
      {isExpanded && (
        <FormControl>
          <FormLabel value={asset?.description ?? ""} name="description">
            Description
          </FormLabel>
          <Input px={2} />
        </FormControl>
      )}
    </VStack>
  );
}
