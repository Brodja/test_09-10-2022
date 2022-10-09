1. Переименовать файл ".env copy" на ".env".
2. У файле .env задать параметры подключения к БД в  MONGO_URI.
3. Токен для конвертации валют я оставлю активный.
4. npm i 
5. Для создания пользователей запустить команду npm run import
6. Запуск npm run start

Для id использовал свои поля, так вроде удобнее тестить.

Проверка баланса:
http://localhost:5000/api/balance/1

Проверка баланса с конвертацией:
http://localhost:5000/api/balance/1/UAH

Операция с балансом пользователя: 
http://localhost:5000/api/balance/balance_change
```javascript
{
    "id": 1,
    "value": 10,
    "income": true
}
```
id - ид юзера
value - сумма операции
income - true/false - прибавать/отнять

Перевод с баланса  на баланс:
http://localhost:5000/api/balance/transfer
```javascript
{
    "id_from": 1,
    "id_to": 3,
    "value": 2,
    "description": "dassadsdadsads"
}
```
id_from - ид с какого юзера
id_to - ид которому юзеру
value - сумма
description - описание перевода 

История операций по ид юзера:
http://localhost:5000/api/story/1
```javascript
[
    {
        "result": "To my balance from user with id 3",
        "value": 2,
        "description": "dassadsdadsads",
        "date": "2022-10-09T16:27:17.979Z"
    },
    {
        "result": "From my balance to user with id 1",
        "value": 2,
        "description": "dassadsdadsads",
        "date": "2022-10-09T16:27:29.979Z"
    }
]
```
result - логический вывод
value - сумма
description - описание
date - дата и время.