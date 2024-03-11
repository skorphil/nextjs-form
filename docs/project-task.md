# Project Task
Build an updated nested form for the finance tracker

## Design (simplified)
### Mobile view
Decided to make mobile view, because it looks more complex - components have more UI states, than in a desktop version

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
    date": unix,
    quotes: [
      {
          baseCurrency: "usd", 
          rates:[
               {currency: "brl", rate: 4.94543198},
               {currency: "amd", rate: 401.94591125},
          ] 
      }
  ]
  }
  "institutions": [
    {
      "name": "str",
      "country": "str",
      "assets": [
        {
          "currency": "str",
          "amount": number,
          "isEarning": boolean,
          "description": "str"
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
