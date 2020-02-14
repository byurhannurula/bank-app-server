# bank-app

## User
- id
- firstName
-	lastName
-	EGN
-	email
-	address
-	phoneNumber
- createdAt
- updatedAt

## Account
-	IBAN (ПК) – първите 3 (за щастие) символа ще бъдат ид на банката (BRB - Бурканбанк). BRB010101
-	Owner
-	balance
-	currency
-	accountType
- status
- createdAt
- updatedAt

## Payments
-	IBAN_sender_
-	IBAN_beneficiary_
-	value
-	currency
-	paymentReason
-	userStatus
-	serverStatus
 
Описание на API-то.

`GET /api/payments/` - връща списък на всички плащания в банката

`GET /api/payments/<search_string>` - връща списък на всички плащания, отговарящи на критерия за търсене.

Отговор:

```json
[
  {
  "IBAN_sender": "IBAN на наредителя",
  "IBAN_beneficiary": "IBAN на бенефициента",
  "Amount": float,
  "Currency": "BGN/EUR/USD",
  "Reason": "основание за плащане",
  "Date": "дата на плащане",
  "Status": "потребителския статус на транзакцията"
  },
  ...
]
```

JSON за обратна връзка
```json
{
  "Status": "OK/Fail",
  "Code": integer (код на грешката),
  "Message": "Съобщение за грешка"
}
```

`POST /api/payments/` - добавя ново плащане

Заявка:
```json
{
  "IBAN_sender": "IBAN на наредителя",
  "IBAN_beneficiary": "IBAN на бенефициента",
  "Amount": float,
  "Currency": "BGN/EUR/USD",
  "Reason": "основание за плащане"
}
```

Отговор при успешно изпълнена заявка:
```json
{
  "Status": "OK",
  "Code": 200,
  "Message": "Успешно изпълнена транзакция"
}
```
При грешка: виж по-горе (json-а за обратна връзка или грешки).

Проверка за валидност на сметка (всяка банка проверява само в себе си)

`GET /api/accounts/<IBAN>` - проверява дали банковата сметка съществува
```json
{
	"valid": true/false
}
```

Заявки към централния възел (банков регистър)
Банката наредител праща заявка до централния

`GET /centralAPI/bank/<IBAN>` - връща адреса на банката бенефициент, ако сметката е валидна ИЛИ грешка за невалидна сметка на бенефициента.

Отговор (при валидна сметка):
```json
{
  "serviceUrl": "адрес на банката бенефициент",
  "bankName": "Име на банката бенефициент"
}
```
Отговор (при грешка): виж по-горе (json-а за обратна връзка или грешки).
