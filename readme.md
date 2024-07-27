# Hospital Appointment Scheduler

## Content
1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [API Documentation](#api-documentation)<br>
4.1 [api/v1/signin](#)<br>
4.2 [api/v1/login](#)<br>
4.3 [api/v1/](#)<br>
4.4 [api/v1/patients](#)<br>
4.5 [api/v1/doctors](#)<br>
4.6 [api/v1/hospitals](#)<br>
4.7 [api/v1/appointments](#)<br>
4.8 [api/v1/specializations](#)<br>
4.9 [api/v1/availabilities](#)<br>
5. [Database Diagram](#database-diagram)
6. [Install](#install)
7. [Run](#run)


## Description
This project is for a hospital appointment scheduling system where users can login as patients and schedule medical appointments. Once the user logs in, they can choose a doctor and availability, and schedule an appointment. Also each patient can see all their appointments scheduled and the corresponding information about it like date, patient, hospital or doctor.

This documentation covers all the endpoints, request and response, and other technical details related to the database and how to integrate and use the API.

## Technical requirements
- Programming Language: Javascript
- Enviroment and server: Node/Express
- Database managment: postgreSQL
- Containerize App: Docker

## Base Url
`http://localhost:3000/api/v1`


## API Documentation

### 1. Endpoint `api/v1/signin`:
#### `POST` - `api/v1/signin`
Register on app with name, email and password.
- Status code 201 if user added succesfully.
- Status code 401 if email already exists.
- Status code 500 if server error.

Request:
```
curl -X 'POST'
'api/v1/signin'
-d
{
  "name": "Julian Safadi"
  "email": "julianmatiassafadi@gmail.com",
  "password": "_pass123"
}
```
Response:
```
{
  message: 'Patient added successfully.'
}
```

### 2. Endpoint `api/v1/login`:
#### `POST` - `api/v1/login`
Log in user.
- Status code 200 if logged succesfully.
- Status code 401 if if email or password invalid. 
- Status code 500 if server error.

Request:
```
curl -X 'POST'
'api/patients'
-d 
{
  "email": "julianmatiassafadi@gmail.com",
  "password": "_pass123"
}
```
Response:
```
{
  message: 'Logged in successfully.', 
  jwt: token 
}
```

### 3. Endpoint `api/v1/`:
#### `GET` - `api/v1/`
- Status code 200 if server OK.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/'
```
Response:
```
{
" message:" "Welcome to Hospital Appointment Scheduler API"
}
```

#### `POST` - `api/v1/` - Initialize database, tables, relations and static data.
- Status code 200 if db initialize succesfully.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'POST'
'api/v1/'
```
Response:
```
{
  "message": 'Database Initialized succesfully.'
}
```

### 4. Endpoint `api/v1/patients`:
#### `GET` - `api/v1/patients`
Retrieves a list with all patients.
- Status code 200 and all patients records.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/patients'
```
Response:
```
{
  "id": 1
  "name": "Julian Safadi",
  "email": "julianmatiassafadi@gmail.com",
  "password": "_pass123"
}
```

#### `GET` - `api/v1/patients/{patient_id}`
Retrieves one specific patient by unique id.
- Status code 200 if id exists and patient record.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if id not found.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| patient_id | integer | Yes | Unique ID to search for a patient. |

Request:
```
curl -X 'GET'
'api/v1/patients/1'
```
Response:
```
{
  "id": 1
  "name": "Julian Safadi",
  "email": "julianmatiassafadi@gmail.com",
  "password": "_pass123"
}
```

### `DELETE` - `api/v1/patients/{patient_id}`
Delete patient record by unique id.
- Status code 200 if id exists and delete patient.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if patient not exists.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| patient_id | integer | Yes | Unique ID to delete a patient. |

Request:
```
curl -X 'DELETE'
'api/V1/patients/4'
```
Response:
```
{
  "message": 'Patient deleted successfully.'
}
```

### 5. Endpoint `api/v1/doctors`:
#### `GET` - `api/v1/doctors`
Retrieves a list with all doctors.
- Status code 200 and all doctors records.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/doctors'
```
Response:
```
{
  "id": 1,
  "name": "Dr. Braden Ashley",
  "specialization": "Cardiology",
  "hospital": "Harmony Medical Clinic"
}
```

#### `GET` - `api/doctors/{doctor_id}`
Retrieves one specific doctor by unique id.
- Status code 200 if id exists and one doctor record.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if doctor id not found.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| doctor_id | integer | Yes | Unique ID to search for a doctor. |

Request:
```
curl -X 'GET'
'api/v1/doctors/1'
```
Response:
```
{
  "id": 1,
  "name": "Dr. Braden Ashley",
  "specialization": "Cardiology",
  "hospital": "Harmony Medical Clinic"
}
```

### 6. Endpoint `api/v1/hospitals`:
#### `GET` - `api/v1/hospitals`
Retrieves a list with all hospitals.
- Status code 200 and all hospitals records.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/hospitals'
```
Response:
```
[
  {
    "id": 1,
    "name": "Evergreen Health Hospital",
    "location": "14570 Alanna Mountains, New Erickaton, ND 66081"
  },
  {
    "id": 2,
    "name": "Harmony Medical Clinic",
    "location": "Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700"
  },
  {
    "id": 3,
    "name": "Hopewell Medical Center",
    "location": "3253 Rafael Throughway, Delsieberg, WI 56782-7248"
  }
]
```

#### `GET` - `api/v1/hospitals/{hospital_id}`
Retrieves one specific hospital by unique id.
- Status code 200 if id exists and hospital record.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if hospital id not found.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| doctor_id | integer | Yes | Unique ID to search for a doctor. |

```
curl -X 'GET'
'api/v1/hospitals/3'
```
Response:
```
{
  "id": 3,
  "name": "Hopewell Medical Center",
  "location": "3253 Rafael Throughway, Delsieberg, WI 56782-7248"
}
```

### 7. Endpoint `api/v1/appointments`:
#### `GET` - `api/v1/appointments`
Retrieves a list with all appointments.
- Status code 200 and all appointments records.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/appointments'
```
Response:
```
[{
  "appointment_date": "2024-07-05 10:00:00.000",
  "patient_id": "Julian Safadi",
  "hospital_id": "Hopewell Medical Center",
  "doctor_id": ""Dr. Braden Ashley"",
}]
```

### `GET` - `api/v1/appointments/{appointment_id}`
Retrieves one specific appointment by unique id.
- Status code 200 if id exists and appointment record.
- Status code 400 if query parameters are invalid.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if requested resource is not found.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/appointments/2'
```
Response:
```
{
  "id": 2,
  "appointment_date": "2024-07-05 10:00:00.000",
  "patient": "Julian Safadi",
  "hospital": "Hopewell Medical Center",
  "doctor": ""Dr. Braden Ashley"",
}
```

### `POST` - `api/v1/appointments`
Create new record about an appointment in database. The request body must contain some required information to be successful.
- Status code 201 if appointment has been created successfully.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if some requested resource is not found.
- Status code 500 if server error.

Request:
```
curl -X 'POST'
'api/v1/appointments'
-d '{
  "id": 1,
  "appointment_date": "2024-07-05 10:00:00.000",
  "patient": "Julian Safadi",
  "hospital": "Hopewell Medical Center",
  "doctor": ""Dr. Braden Ashley"",
}'
```
Response:
```
{
  "message": 'Appointment created successfully.'
}
```

### `DELETE` - `api/v1/appointments/{appointment_id}`
Delete appointment record by unique id.
- Status code 200 if id exists and delete appointment.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if appointment not exists.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| appointment_id | integer | Yes | Unique ID to delete an appointment. |

Request:
```
curl -X 'DELETE'
'api/v1/appointments/2'
```
Response:
```
{
  "message": "The appointment has been deleted successfully."
}
```

### 8. Endpoint `api/v1/specializations`:
#### `GET` - `api/v1/specializations`
Retrieves a list with all specializations.
- Status code 200 and all specializations records.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/specializations'
```
Response:
```
[
  {
    "id": 1,
    "name": "Cardiology",
    "symtomps": "'{"Chest pain", "Shortness of breath"}'"
  },
  {
    "id": 2,
    "name": "Neurology",
    "symtomps": "'{"Loss of coordination", "Severe headaches"}'"
  },
  {
    "id": 3,
    "name": "Pediatrics",
    "symtomps": "'{"Fever", "Persistent cough"}'"
  }
]
```

#### `GET` - `api/v1/specializations/{specialization_id}`
Retrieves one specific specialization by unique id.
- Status code 200 if id exists and specialization record.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if specialization id not found.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| specialization_id | integer | Yes | Unique ID to search for a doctor. |

```
curl -X 'GET'
'api/v1/specializations/3'
```
Response:
```
{
  "id": 3,
  "name": "Pediatrics",
  "symtomps": "3253 Rafael Throughway, Delsieberg, WI 56782-7248"
}
```


### 9. Endpoint `api/v1/availabilities`:
#### `GET` - `api/v1/availabilities`
Retrieves a list with all availabilities.
- Status code 200 and all availabilities records.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'GET'
'api/v1/availabilities'
```
Response:
```
[
  {
    "id": 1,
    "doctor_id": "Dr. Braden Ashley",
    "availability_time": "2020-06-22 19:10:25"
  },
  {
    "id": 2,
    "doctor_id": "Dr. Braden Ashley",
    "availability_time": "2020-06-22 19:10:25"
  },
  {
    "id": 3,
    "doctor_id": "Dr. Braden Ashley",
    "availability_time": "2020-06-22 19:10:25"
  }
]
```

#### `GET` - `api/v1/availabilities/{availability_id}`
Retrieves one specific availability by unique id.
- Status code 200 if id exists and availability record.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if availability id not found.
- Status code 500 if server error.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| availability_id | integer | Yes | Unique ID to search for a doctor. |

```
curl -X 'GET'
'api/v1/availabilities/2'
```
Response:
```
{
  "id": 2,
  "doctor_id": "Dr. Braden Ashley",
  "availability_time": "2020-06-22 19:10:25"
}
```

## Database diagram with relations
[![image.png](https://i.postimg.cc/rwd4WM3s/image.png)](https://postimg.cc/sMr1CdVC)

- Patients entity represents each user registered and can have one, many or none appointments.
- Doctors entity represents each doctor, and they can have one specialization and one hospital where they work.
- Hospitals entity represents each hospital with name and location, and has no foreing keys.
- Specializations entity represent each specialization. Has only name and symptoms, and no foreing keys.
- Availabilities entity represents each availability and has one, many or none doctors as foreing keys.
- Appointments entity represents each appointment generated by patient, and should have one patient, one hospital, one doctor and one availability (appointment date time).

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

## Run with Docker containers
To run application with Docker you must have Docker installed in your machine.<br>
[Download Docker](https://www.docker.com/products/docker-desktop/)

Create containers and run app:
```
docker-compose up --build
```

Stop running app:
```
docker-compose stop
```

Delete containers and volumes:
```
docker-compose down -v
```
