# Functions Documentation

## Function Summary

| Function Name | Access Level | Operation Type | Input Validator                 | Description                                                                                                           |
| ------------- | ------------ | -------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| create        | Public       | Mutation       | accountValidator.create         | Creates an account using the provided input. Invokes `accountService.createAccount` with the validated input.         |
| get           | Public       | Query          | accountValidator.get            | Retrieves an account by its ID. Uses validated input to call `accountService.getAccountById`.                         |
| create        | Public       | Mutation       | authNotionValidator.createAuth  | Creates authentication using the provided input. Calls `authNotionService.createAuth` with the validated input.       |
| get           | Public       | Query          | authNotionValidator.get         | Retrieves a Notion client. Validates input and calls `authNotionService.getNotionClient`.                             |
| getDocument   | Public       | Query          | authNotionValidator.getDocument | Retrieves a document by IDs. Validates `notion_id` and `document_id`, then calls `authNotionService.getDocumentById`. |
| create        | Public       | Mutation       | chatbotValidator.create         | Creates a chatbot instance. Takes input and calls `chatbotService.createChatbot` with the validated input.            |
| get           | Public       | Query          | chatbotValidator.get            | Retrieves a chatbot by its ID. Validates input and calls `chatbotService.getChatbotById`.                             |
