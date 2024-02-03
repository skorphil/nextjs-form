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
        justifyContent: "space-between",
        _disabled: {
          opacity: "1",
        },
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
