# bank-app

### User
- id
- firstName
-	lastName
-	ssn
-	email
-	address
-	phoneNumber
- createdAt
- updatedAt

### Account
- id
-	IBAN - First 3 letter => Bank ID
-	Owner
-	balance
-	currency
-	accountType
- status
- createdAt
- updatedAt

### Payments
- id
-	IBAN_sender
-	IBAN_beneficiary
-	value
-	currency
-	reason
-	status
- createdAt
- updatedAt

### Cards
- id
- type
- status
- number
- cvc
- holder
- account
- validUntil
- createdAt
- updatedAt
 
## API:

### GraphQL API
`http://localhost:1000/graphql`

### REST API
`http://localhost:2000/`

`GET /api/payments/` - Get all the payments

`GET /api/payments/<search_string>` - Get all payments containing the query string

Result:

```json
[
  {
  "IBAN_sender": "IBAN на наредителя",
  "IBAN_beneficiary": "IBAN на бенефициента",
  "amount": float,
  "currency": "BGN/EUR/USD",
  "reason": "основание за плащане",
  "date": "дата на плащане",
  "status": "потребителския статус на транзакцията"
  },
]
```

JSON response for query status
```json
{
  "status": "OK/Fail",
  "code": "Message code",
  "message": "Message"
}
```

`POST /api/payment/` - Add new payment

Request:
```json
{
  "IBAN_sender": "",
  "IBAN_beneficiary": "",
  "amount": float,
  "currency": "BGN/EUR/USD",
  "reason": ""
}
```

Response for successful query:
```json
{
  "status": "OK",
  "code": 200,
  "message": "Успешно изпълнена транзакция"
}
```

`GET /api/accounts/<IBAN>` - Checks if the account is valid

Response:
```json
{
	"valid": true/false
}
```

Queries for BankManagement:
Bank sender sends query to the bank manager:

`GET /centralAPI/bank/<IBAN>` - Returns address of bank beneficiary if the address is valid otherwise error response for invalid address.

Response for valid address:
```json
{
  "serviceUrl": "Bank beneficiary endpoint",
  "bankName": "Bank name"
}
```
