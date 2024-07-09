# Hospital Appointmnet Scheduler

## Content
1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [API Documentation](#api-documentation)<br>
4.1 [Endpoint api/patients](#)<br>
4.2 [Endpoint api/doctors](#)<br>
4.3 [Endpoint api/hospitals](#)<br>
4.4 [Endpoint api/appointments](#)
5. [Database Diagram](#database-diagram)
6. [Install](#install)
7. [Run](#run)


## Description
This project is for a hospital appointment scheduling system where users can login as patients and schedule medical appointments. Once the user logs in, they can choose a specialization or symptoms, and the system recommends the closest available appoitments date with a suggested doctor and hospital. Also each patient can see all their appointments scheduled and the corresponding information about it.

This documentation covers all the endpoints, request and response, and other technical details related to the database and how to integrate and use the API.


## Technical requirements
- Programming Language: Javascript
- Enviroment and server: Node/Express
- Database managment: mySQL
- Security and authentication: bcryptjs/jsonwebtoken
- Containerize App: Docker

## Base Url
`http://localhost:3000`


## API Documentation

### 1. Endpoint `api/patients`:
#### `GET` - `api/patients`
Retrieves a list with all patients.
- Status code 200 and all patients records.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found. 

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

### `GET` - `api/patients/{patient_id}`
Retrieves one specific patient by unique id.
- Status code 200 if id exists and patient record.
- Status code 400 if query parameters are invalid.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| patient_id | integer | Yes | Unique ID to search for a patient. |

Request:
```
curl -X 'GET'
'api/users/2'
```
Response:
```
{
  "id": 2,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 30,
}
```

### `POST` - `/api/patients`
Create new record about a patient in database. The request body must contain some required information to be successful.
- Status code 201 if resource has been created successfully.
- Status code 400 and corresponding message if request body does not contain required fields.
- Status code 409 and corresponding message if request body already exists.

Request:
```
curl -X 'POST'
'api/patients'
-d '{
  "id": 5,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 25,
}'
```
Response:
```
{
  "id": 5,
  "name": "string",
  "email": "string",
  "password": "string",
  "age": 25,
}
```

### `DELETE` - `api/patients/{patient_id}`
Delete patient record by unique id.
- Status code 200 and message if id found record and deleted.
- Status code 404 if id not found.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| patient_id | integer | Yes | Unique ID to delete a patient. |

Request:
```
curl -X 'DELETE'
'api/patients/2'
```
Response:
```
{
  "message": "The resource has been deleted successfully."
}
```

### 2. Endpoint `api/doctors`:
#### `GET` - `api/doctors`
Retrieves a list with all doctors.
- Status code 200 and all doctors records.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found. 

Request:
```
curl -X 'GET'
'api/doctors'
```
Response:
```
[{
  "id": 1,
  "name": "string",
  "specialization": "string",
  "start_time": "8:00:00",
  "end_time": "17:00:00",
  "availability": {
    "monday": {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
    "wednesday": {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
    "friday": {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
  },
  "hospital": {
    "name":"string",
    "location": "string"
  }
}]
```

#### `GET` - `api/doctors/{doctor_id}`
Retrieves one specific doctor by unique id.
- Status code 200 if id exists and doctor record.
- Status code 400 if query parameters are invalid.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| doctor_id | integer | Yes | Unique ID to search for a doctor. |

Request:
```
curl -X 'GET'
'api/doctor/1'
```
Response:
```
{
  "id": 1,
  "name": "string",
  "specialization": "Cardiology",
  "start_time": "8:00:00",
  "end_time": "17:00:00",
  "availability": {
    "monday": {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
    "wednesday": {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
    "friday": {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
  },
  "hospital": {
    "name":"Evergreen Health Hospital",
    "location": "14570 Alanna Mountains, New Erickaton, ND 66081"
  }
}
```

### `POST` - `api/doctors`
Create new record about a doctor in database. The request body must contain some required information to be successful.
- Status code 201 if resource has been created successfully.
- Status code 400 and corresponding message if request body does not contain required fields.
- Status code 409 and corresponding message if request body already exists.

Request:
```
curl -X 'POST'
'api/doctors'
-d '{
  "name": "string",
  "specialization": "string",
  "start_time": '11:00:00',
  "end_time": '19:00:00',
  "availability": {
  "monday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "tuesday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "wednesday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "thursday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "friday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  }
},
"hospital": {
  "name": "string",
  "location": "string"
  }
}'
```
Response:
```
{
  "name": "string",
  "specialization": "string",
  "start_time": '11:00:00',
  "end_time": '19:00:00',
  "availability": {
  "monday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "tuesday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "wednesday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "thursday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  },
  "friday": {
    "availability_time": [
      '11:00:00',
      '13:00:00',
      '15:00:00',
      '17:00:00',
    ]
  }
},
"hospital": {
  "name": "string",
  "location": "string"
  }
}
```

### `DELETE` - `api/doctors/{doctor_id}`
Delete doctor record by unique id.
- Status code 200 and message if id found record and deleted.
- Status code 404 if id not found.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| doctor_id | integer | Yes | Unique ID to delete a doctor. |

Request:
```
curl -X 'DELETE'
'api/doctors/2'
```
Response:
```
{
  "message": "The resource has been deleted successfully."
}
```

#### 3. Endpoint `api/hospitals`:
#### `GET` - `api/hospitals`
Retrieves a list with all hospitals.
- Status code 200 and all hospitals records.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found.

Request:
```
curl -X 'GET'
'api/hospitals'
```
Response:
```
[{
  "id": 1
  "name": "Harmony Medical Clinic",
  "location": "Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700"
}, {
  "id": 2
  "name": "Evergreen Health Hospital",
  "location": "14570 Alanna Mountains, New Erickaton, ND 66081"
}, {
  "id": 3
  "name": "Hopewell Medical Center",
  "location": "3253 Rafael Throughway, Delsieberg, WI 56782-7248"
}]
```

#### `GET` - `api/hospitals/{hospital_id}`
Retrieves one specific hospital by unique id.
- Status code 200 if id exists and hospital record.
- Status code 400 if query parameters are invalid.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| doctor_id | integer | Yes | Unique ID to search for a doctor. |

```
curl -X 'GET'
'api/hospitals/3'
```
Response:
```
{
  "id": 3
  "name": "Hopewell Medical Center",
  "location": "3253 Rafael Throughway, Delsieberg, WI 56782-7248"
}
```

#### 4. Endpoint `api/appointments`:
### `GET` - `api/appointments`
Retrieves a list of all appointments.
- Status code 200 and all appointments records.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found.

Request:
```
curl -X 'GET'
'api/appointments'
```
Response:
```
[{
  "id": 1,
  "patientId": 2,
  "hospital": "string",
  "doctorId": 4,
  "appointment_date": "Tue Jun 11 2024 13:21:08",
  "start_time": "08:00:00",
  "end_time": "10:00:00"
}, {
  "id": 2,
  "patientId": 1,
  "hospital": "string",
  "doctorId": 3,
  "appointment_date": "Tue Jun 11 2024 13:21:08",
  "start_time": "08:00:00",
  "end_time": "10:00:00"
}]
```

### `GET` - `api/appointments/{appointment_id}`
Retrieves one specific appointment by unique id.
- Status code 200 if id exists and appointment record.
- Status code 400 if query parameters are invalid.
- Status code 401 if user is not authenticated. 
- Status code 404 if requested resource is not found.

Request:
```
curl -X 'GET'
'api/appointments/2'
```
Response:
```
{
  "id": 2,
  "patientId": 1,
  "hospital": "string",
  "doctorId": 3,
  "appointment_date": "Tue Jun 11 2024 13:21:08",
  "start_time": "08:00:00",
  "end_time": "10:00:00"
}
```

### `POST` - `api/appointments`
Create new record about an appointment in database. The request body must contain some required information to be successful.
- Status code 201 if resource has been created successfully.
- Status code 400 and corresponding message if request body does not contain required fields.
- Status code 409 and corresponding message if request body already exists.

Request:
```
curl -X 'POST'
'api/appointments'
-d '{
  "id": 2,
  "patientId": 1,
  "hospital": "string",
  "doctorId": 3,
  "appointment_date": "Tue Jun 11 2024 13:21:08",
  "start_time": "08:00:00",
  "end_time": "10:00:00"
}'
```
Response:
```
{
  "id": 2,
  "patientId": 1,
  "hospital": "string",
  "doctorId": 3,
  "appointment_date": "Tue Jun 11 2024 13:21:08",
  "start_time": "08:00:00",
  "end_time": "10:00:00"
}
```

### `DELETE` - `api/appointments/{appointment_id}`
Delete appointment record by unique id.
- Status code 200 and message if id found record and deleted.
- Status code  if id found and record deleted but has no response.
- Status code 404 if id not found.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| appointment_id | integer | Yes | Unique ID to delete an appointment. |

Request:
```
curl -X 'DELETE'
'api/appointments/2'
```
Response:
```
{
  "message": "The resource has been deleted successfully."
}
```

#### 5. Endpoint `api/specializations`:



## Database diagram and relations
[![image.png](https://i.postimg.cc/ncYbMDY2/image.png)](https://postimg.cc/GH2S59fT)

- Patients entity represents each user registered and can have one, many or none appointments.
- Doctors entity represents each doctor, and they can have one specialization and one hospital where they work.
- Hospitals entity represents each hospital with name and location, and has no foreing keys.
- Specializations entity represent each specialization. Can have many doctors who practice it and the respective symptoms it can treat.
- Appointments entity represents each appointment generated by users, and should have one patient, one hospital and one doctor. Also the date and start time depending on Doctor availability.

## Install
To install application in local.
1. Clone repository:
```
git clone https://github.com/JMSafadi/hospital-appointment-scheduler-backend
```
2. Go to folder:
```
cd .\hospital-appointment-scheduler-backend
```
3. Install dependencies:
```
npm install
```

## Run with Docker container
To run application with Docker you must have Docker installed in your machine.<br>
[Download Docker](https://www.docker.com/products/docker-desktop/)

Run app:
```
docker compose up
```
Stop app:
```
docker compose down
```