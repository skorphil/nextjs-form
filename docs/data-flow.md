## Initial Data Flow

- [App Architecture](app-architecture.md)
- Data Flow
![Data Flow](img/data-flow.png)


## AssetContainer
### Props
- isCompact (bool)
- Asset (array)
- onDeleteAsset (function)

### Listeners
- deleteButton onClick
- inputs onChange

### States
```mermaid
---
title: AssetContainer
---
stateDiagram-v2
    direction LR

[*] --> expanded
[*] --> compact
expanded --> compact : prop iscompact changed
compact --> expanded : prop iscompact changed
```


## InstitutionsList
### Props
- isCompact (bool)
- isOpenedInstitution (bool)
- institutions (array)

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


## FormHeader
### Props
- text
- buttons

### States
```mermaid
---
title: FormHeader
---
stateDiagram-v2
direction LR
[*] --> textOnly
[*] --> textWithButtons : prop rightButtons provided
```


## InstitutionTab
### Props
- isNew
- isDeleted
- isUpdated
- text
- onRestore

### Listeners
- restoreButton click

### States
```mermaid
---
title: InstitutionTab
---
stateDiagram-v2
    direction LR

[*] --> existing
existing --> updated : prop changed
updated --> existing : prop changed
updated --> deleted : prop changed
existing --> deleted : prop changed
deleted --> updated : BUTTON_PRESS <br/> Do / setState
deleted --> existing : BUTTON_PRESS <br/> Do / setState
[*] --> new
```

## InstitutionsTabsList
### Props
- isCompact (bool)
- Institutions (array)
- onCreate (function)
- selectedInstitutionId (number)

### Listeners
- restoreButton click

### States
```mermaid
---
title: InstitutionsTabsList
---
stateDiagram-v2
direction LR

[*] --> expanded
[*] --> compact
expanded --> compact : prop iscompact changed
compact --> compact : prop iscompact changed
```


## InstitutionContainer
### Props
- isFullScreen (bool)
- Institution (object)
---
- onEdit (function)
- onCollapse (function)
- onDelete (function)
- onReset (function)
- onAddAsset (function)

### Listeners
- editButton onClick
- collapseButton onClick
- addAssetButton onClick
- deleteButton onClick
- resetButton onClick
---
- nameInput onChange
- countryInput onChange

### States
```mermaid
---
title: InstitutionContainer
---
stateDiagram-v2
    direction LR

[*] --> fullScreen
[*] --> compact
fullScreen --> compact : BUTTON_PRESS do / onEdit
compact --> fullScreen : BUTTON_PRESS do / onCollapse
```


## RecordForm
### Server actions
- fetch previousRecord

### Listeners
- saveButton onClick
- cancelButton onClick

### States
- InstitutionsState (array)
- isOpenedInstitution (bool)
- useForm
```mermaid
---
title: RecordForm
---
stateDiagram-v2
    direction LR

[*] --> loadingState
loadingState --> preFilled : fetched previousRecord
loadingState --> empty : fetched previousRecord == null
preFilled --> openedInstitution : BUTTON_PRESS
empty --> openedInstitution : BUTTON_PRESS
openedInstitution --> empty : BUTTON_PRESS
openedInstitution --> preFilled : BUTTON_PRESS
```