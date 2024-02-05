import { extendTheme } from "@chakra-ui/react";

import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(["tablist", "tab"]);
import { institutionTabStyle } from "../components/InstitutionTab";
import { InstitutionsTabsListStyle } from "../components/InstitutionsTabsList/InstitutionTabsList.chakra";

const tabsVariant = defineMultiStyleConfig({
  variants: {
    grid: {
      tab: institutionTabStyle,
      tablist: InstitutionsTabsListStyle,
    },
  },
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Tabs: tabsVariant,
  },
});
// console.log(theme);
export default theme;
