import { extendTheme } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

import { institutionTabStyle } from "../components/InstitutionTab";
import { institutionsTabsListStyle } from "../components/InstitutionsTabsList";
import { institutionsListStyle } from "../components/InstitutionsList";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(["tablist", "tab", "root"]);

const tabsVariant = defineMultiStyleConfig({
  variants: {
    grid: {
      tab: institutionTabStyle,
      tablist: institutionsTabsListStyle,
      root: institutionsListStyle,
    },
  },
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      "chakra-body-bg": {
        _dark: "gray.900",
      },
    },
  },
  components: {
    Tabs: tabsVariant,
  },
});
// console.log(theme);
export default theme;
