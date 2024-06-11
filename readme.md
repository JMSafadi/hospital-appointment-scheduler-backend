# Hospital Appointmnet Scheduler

**Content**
1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [Api Documentation](#api-documentation)<br>
4.1 [Endpoint api/v2/patients](#)<br>
4.2 [Endpoint api/v2/doctors](#)<br>
4.3 [Endpoint api/v2/hospitals](#)<br>
4.4 [Endpoint api/v2/appointments](#)
5. [Database Diagram](#database-diagram)
6. [Install](#install)
7. [Run](#run)


## Description
This project is a hospital appointment scheduling system where users can login as patients and schedule medical appointments. Once the user logs in, they can choose a specialization and symptoms, and the system recommends the closest available appoitments date with a suggested doctor and hospital. Also each patient can see all their appointments scheduled and the corresponding information about it.


## Technical requirements
- Programming Language: Javascript
- Enviroment and server: Node/Express
- Database managment: mySQL
- Security and authentication: bcryptjs/jsonwebtoken
- Containerize App: Docker

## Base Url
`http://localhost:3000`


## API Documentation

### 1. Endpoint `api/v2/patients`:
#### `GET` - all patients - api/patients
- Status code 200 and get all users

Request:
```
curl -X 'GET'
'api/patients'
```
Response:
```
[{
  "id": 1,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 20,
}, {
  "id": 2,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 30,
}]
```

### `GET` - one patient - api/patients/{patient_id}
- Status code 200 and record if id exists
- Status code 404 and message if id doesn't exists.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| patient_id | integer | Yes | Unique ID to search for an user. |

Request:
```
curl -X 'GET'
'api/users/2'
```
Response:
```
[{
  "id": 2,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 30,
}]
```
### `POST` - one new patient - /api/patients
Create new record about a patient in databae. The request body must contain some required information to be successful.
- Status code 201 if has led to the creation of a resource.
- Status code 400 and corresponding message if request body does not contain required fields

Request:
```
curl -X 'POST'
'api/patients'
```
Response:
```
[{
  "id": 1,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 20,
}, {
  "id": 2,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 30,
}]
```

#### 2. Endpoint `api/v2/doctors`:

#### 3. Endpoint `api/v2/hospitals`:

#### 4. Endpoint `api/v2/appointments`:

#### 5. Endpoint `api/v2/specializations`:



## Database Diagram
[![image.png](https://i.postimg.cc/ncYbMDY2/image.png)](https://postimg.cc/GH2S59fT)

## Install
To install application in local
1. Clone repository
```
git clone https://github.com/JMSafadi/hospital-appointment-scheduler-backend
```
2. Go to folder
```
cd .\hospital-appointment-scheduler-backend
```
3. Install dependencies
```
npm install
```

## Run with Docker container
To run application with Docker you must have Docker installed in your machine.<br>
[Download Docker](https://www.docker.com/products/docker-desktop/)

Run app
```
docker compose up
```
Stop app
```
docker compose down
```