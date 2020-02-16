# bank-app

## Tech Stack
- Back-End:
  - Node.js
  - Express - REST API
  - GraphQL Apollo Client - GraphQL API
  - Mongoose - MongoDB Driver Wrapper
  - Redis - Cookie store

- Front-End:
  - Next.js - React based SSR framework
  - Apollo Client - GraphQL API connection
  - Formik - Form creation/controlling
  - SASS/SCSS - For page styling
  - Yup - Form validation

- Project
  - ESLint/Prettier - Code linting and formatting

## Folder Structure
```sh
app/
├─ server/	
│  └─ src/	
│     ├─ config/
│     │  ├─ db.js           # DB connection function
│     │  ├─ graphql.js      # GraphQL Server configs
│     │  ├─ redis.js        # Redis client configs
│     │  └─ rest.js         # REST Server configs
│     ├─ controllers/       # REST Server controllers
│     ├─ graphql/           # GraphQL Server schema and resolvers
│     ├─ models/            # Mongoose models
│     ├─ routes/            # REST API routes
│     ├─ util/              # Helper auth function and data validation schemas
│     ├─ helpers.js         # Data/Error formatting helper functions
│     └─ index.js           # DB Connection & Initiating the servers
│
└─ web/
   └─ src/	
      ├─ components/        # Reusable components
      ├─ context/           # React context for global state
      ├─ lib/               # Apollo client HOC component with helpers
      ├─ pages/             # Next.js pages
      ├─ requests/          # GraphQL requests/mutations
      └─ styles/            # Global app styles
```

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
`http://localhost:2000/graphql`

### REST API
`http://localhost:1000/`

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
