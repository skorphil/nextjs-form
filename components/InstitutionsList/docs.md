## InstitutionsList
### Props
```diff
// Props
- isCompact (bool)
- isOpenedInstitution (bool)
- institutions (array)
+ isInstitutionOpen (bool)

// Context
+ selectedInstitution (int)
+ { institutionsFieldArray: {fields: institutions}, handlers } =
+    useFormContext();
```

### States
- selectedInstitutionId (number)

```mermaid
---
title: InstitutionsList
---
stateDiagram-v2
    direction LR

[*] --> compact
[*] --> expanded
compact --> openedInstitution : BUTTON_PRESS do / setIsOpenInstitution
compact --> expanded : window.visualViewport.height > 650px

expanded --> compact : window.visualViewport.height < 650px
openedInstitution --> compact : BUTTON_PRESS do / setIsOpenInstitution
```