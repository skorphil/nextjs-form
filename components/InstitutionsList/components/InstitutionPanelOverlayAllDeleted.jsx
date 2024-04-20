import { InstitutionPanelOverlay } from "./InstitutionPanelOverlay";

export function InstitutionPanelOverlayAllDeleted() {
  return (
    <InstitutionPanelOverlay
      image="/empty.svg"
      headingText="No institutions left&nbsp;in&nbsp;the&nbsp;record"
      text="Add or restore institutions"
    />
  );
}
