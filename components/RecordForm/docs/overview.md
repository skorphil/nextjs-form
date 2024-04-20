## RecordForm
### Server actions
- appendRecord
- getLatestRecord

### Listeners
- saveButton onClick
- cancelButton onClick

### States
- selectedInstitutionIndex (number)
- isInstitutionOpen (bool)
- useForm
- useFieldArray

```mermaid
---
title: RecordForm
---
stateDiagram-v2
    direction LR

[*] --> loadingState
loadingState --> preFilled : fetched previousRecord
loadingState --> empty : fetched previousRecord == null
loadingState --> errorFetching
preFilled --> openedInstitution : BUTTON_PRESS
empty --> openedInstitution : BUTTON_PRESS
openedInstitution --> empty : BUTTON_PRESS
openedInstitution --> preFilled : BUTTON_PRESS
empty --> edited
preFilled --> edited
edited --> errorSubmitting
```

## See also
- [next.js/examples/next-forms at canary · vercel/next.js · GitHub](https://github.com/vercel/next.js/tree/canary/examples/next-forms)
- [Data Fetching: Server Actions and Mutations | Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms)
- https://react-hook-form.com/docs/usefieldarray