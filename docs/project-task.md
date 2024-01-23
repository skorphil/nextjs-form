# Project Task
Build updated nested form for finance tracker

## Design (simplified)
### Mobile view
Decided to make mobile view, because it looks more complex - components has more UI states, then in desctop

Form contains:
- *Header*
- *Institution Container*: Represents Institution entity, which containes several *assets*. Has *collapsed* and *expanded* view.
- *Asset Container*: Represents savings entity. Has *collapsed* and *expanded* view.
- *Tabs List*: Has *collapsed* (when mobile keyboard is opened) and *expanded* view.

![Form design](/docs/img/Form%20states.png)

## Data structure
Single record:
```
{
  "recordDate": unix,
  "recordQuotes": {
    "QUTENAME": number,
    ...
  }
  "recordInstitutions": [
    {
      "institutionName": "str",
      "institutionCountry": "str",
      "institutionAssets": [
        {
          "assetCurrency": "str",
          "assetAmount": number,
          "isAsset": boolean,
          "assetDescription": "str"
        },
        {...},
      ]
    },
    {...},
  ]
}
```

## Scenario
1. Initial data is fetched from an API. (Previous record. If no previous record, than form is empty)
2. Initial data used to fill form inputs
3. User can edit formData(CRUD institutions, assets)
4. FormData sent to an API.
5. Form closed if success