import { InstitutionPanelOverlay } from "./InstitutionPanelOverlay";

export function InstitutionPanelOverlayInstitutionsLoaded() {
  return (
    <InstitutionPanelOverlay
      image="/institutions-loaded.svg"
      headingText="Institutions loaded from latest&nbsp;record"
      text="Edit institutions to reflect asset updates"
    />
  );
}
