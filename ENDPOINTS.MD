# Functions Documentation

## 1. Create Auth Function

### Function Name

- `create`

### Access Level

- Public

### Operation Type

- Mutation

### Input

- Uses `authNotionValidator.createAuth` for input validation.

### Description

- This function is responsible for creating authentication. It takes the input, validates it using `authNotionValidator.createAuth`, and then calls the `authNotionService.createAuth` method with the validated input. It returns the result of this service call.

---

## 2. Get Notion Client Function

### Function Name

- `get`

### Access Level

- Public

### Operation Type

- Query

### Input

- Uses `authNotionValidator.get` for input validation.

### Description

- This function is used to retrieve a Notion client. It validates the input with `authNotionValidator.get` and then calls the `authNotionService.getNotionClient` method with the validated input. The result of this service method is returned.

---

## 3. Get Document Function

### Function Name

- `getDocument`

### Access Level

- Public

### Operation Type

- Query

### Input

- Uses `authNotionValidator.getDocument` for input validation.
- Requires `notion_id` and `document_id`.

### Description

- This function retrieves a specific document by its ID. It takes an input object containing `notion_id` and `document_id`, validates this input using `authNotionValidator.getDocument`, and then calls `authNotionService.getDocumentById` with the notion ID and document ID. The function returns the document corresponding to the provided IDs.
