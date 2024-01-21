# Functions Documentation

## Function Summary

| Function Name | Access Level | Operation Type | Input Validator               | Description                                                      |
|---------------|--------------|----------------|-------------------------------|------------------------------------------------------------------|
| create        | Public       | Mutation       | authNotionValidator.createAuth| Creates authentication using the provided input. Calls `authNotionService.createAuth` with the validated input. |
| get           | Public       | Query          | authNotionValidator.get       | Retrieves a Notion client. Validates input and calls `authNotionService.getNotionClient`.                              |
| getDocument   | Public       | Query          | authNotionValidator.getDocument| Retrieves a document by IDs. Validates `notion_id` and `document_id`, then calls `authNotionService.getDocumentById`. |

