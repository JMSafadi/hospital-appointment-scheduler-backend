# Hospital Appointment Scheduler

## Content
1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [Database Diagram](#database-diagram)
5. [Install](#install)
6. [Enviroment config](#enviroment-config)
7. [Run](#run-with-docker-containers)<br>
8. [Testing](#testing)<br>
9. [API Documentation](#api-documentation)<br>
  9.1 [api/v1/](#)<br>
  9.2  [api/v1/signin](#)<br>
  9.3  [api/v1/login](#)<br>
  9.4  [api/v1/patients](#)<br>
  9.5  [api/v1/doctors](#)<br>
  9.6  [api/v1/hospitals](#)<br>
  9.7  [api/v1/appointments](#)<br>
  9.8  [api/v1/specializations](#)<br>
  9.9  [api/v1/availabilities](#)<br>



## Description
API for hospital appointment scheduling application where users can login as patients and schedule medical appointments. Once the user logs in, they can choose a doctor and availability, and schedule an appointment. Also each patient can see all their appointments scheduled and the corresponding information about it like date, patient, hospital or doctor.

This documentation covers all the endpoints, request and response, and other technical details related to the database and how to integrate and use the API.


## Technical requirements
- Programming Language: Javascript
- Enviroment and server: Node/Express
- Database managment: postgreSQL
- Containerize App: Docker
- Testing: Jest


## Base Url
`http://localhost:3000/api/v1`


## Database diagram
[![image.png](https://i.postimg.cc/RZ3hLLPm/image.png)](https://postimg.cc/dhYJqrPN)

- Patients entity represents each user registered and has no foreign keys.
- Doctors entity represents each doctor, and it has one specialization and one hospital as foreign keys.
- Hospitals entity represents each hospital and has no foreign keys.
- Specializations entity represent each specialization, has no foreign keys.
- Availabilities entity represents each availability and has one doctor as foreign key.
- Appointments entity represents each appointment generated by patient, and it has one patient, hospital, doctor and availability (appointment date time).

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

## Enviroment config
For the application to work properly, you need to configure a .env file in the root project with the following enviroments variables.
Ensure to replace example values.
```
# Development enviroment
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=example_password
DB_NAME=example_db_name
JWT_SECRET=your_secret_key

# Test enviroment
TEST_DB_NAME=test_hospital_scheduler_db
TEST_DB_USER=test_user
TEST_DB_PASS=test_pass
TEST_DB_HOST=test-db
TEST_DB_DIALECT=postgres
TEST_DB_PORT=5432
```

## Run with Docker containers
To run application with Docker you must have Docker installed in your machine.<br>
[Download Docker](https://www.docker.com/products/docker-desktop/)

Create containers:
```
docker-compose create
```

Run application:
```
docker-compose up
```

Stop running app:
```
docker-compose stop
```

Delete containers and volumes:
```
docker-compose down -v
```

## Testing
To execute all tests in the services defined on Docker, run the following command:
```
docker-compose exec test npm test
```
Make sure all the necessary containers are up and running before running the tests.

## API Documentation
### 1. Endpoint `api/v1/`:
#### `GET` - `api/v1/`
Main app endpoint. 
Only returns a message if the server is working correctly.
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
  "message": "Welcome to Hospital Appointment Scheduler API"
}
```

#### `POST` - `api/v1/`
Main app endpoint to initialize database, tables, relations and static data. From this point, user must be authenticated sending token from headers.
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
  "message": "Database Initialized succesfully."
}
```

#### `DELETE` - `api/v1/`
Delete all database.
- Status code 200 if all delete succesfully.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 500 if server error.

Request:
```
curl -X 'DELETE'
'api/v1/'
```
Response:
```
{
  "message": "All tables deleted."
}
```

### 2. Endpoint `api/v1/signin`:
#### `POST` - `api/v1/signin`
Register on app with name, email and password. Mandatory step to use app.
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
  "message": 'Patient added successfully.'
}
```

### 3. Endpoint `api/v1/login`:
#### `POST` - `api/v1/login`
Log in user. Mandatory step to generate token and use app.
- Status code 200 if logged succesfully.
- Status code 401 if if email or password invalid. 
- Status code 500 if server error.

Request:
```
curl -X 'POST'
'api/login'
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
[{
  "id": 1
  "name": "Julian Safadi",
  "email": "julianmatiassafadi@gmail.com",
  "password": "_pass123"
}]
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
[{
  "id": 1,
  "name": "Dr. Braden Ashley",
  "specialization": "Cardiology",
  "hospital": "Harmony Medical Clinic",
  "patient_load": 3
},
{
  "id": 4,
  "name": "Dra. David Miller",
  "specialization": "Pediatrics",
  "hospital": "Evergreen Health Hospital",
  "patient_load": 0
}]
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
  "hospital": "Harmony Medical Clinic",
  "patient_load": 3
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
| hospital_id | integer | Yes | Unique ID to search for a hospital. |

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
  "id": 1,
  "patient": "Julian Safadi",
  "date": "2024-09-12 18:40:00",
  "hospital": "Hopewell Medical Center",
  "doctor": "Dra. Isabella Flores"
},
{
  "id": 2,
  "patient": "Julian Safadi",
  "date": "2024-09-15 11:30:00",
  "hospital": "Hopewell Medical Center",
  "doctor": "Dra. Evelyn Rodriguez"
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
  "appointment_date": "2024-07-05 10:00:00",
  "patient": "Julian Safadi",
  "hospital": "Hopewell Medical Center",
  "doctor": "Dr. Braden Ashley",
}
```

### `POST` - `api/v1/appointments/search`
Search for an availability by request. 
The request body must contain a specialization, or symptoms information to be successful. Returns availabilities in order by nearest. Then must execute /appointments/create to create the appointment with the selected id.
- Status code 201 if if there are availabilities available for patient request.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if no availability matches.
- Status code 500 if server error.

Request examples:
```
curl -X 'POST'
'api/v1/appointments/search'
-d 
{
  "symptoms": ["Loss of coordination", "Severe headaches"],
  "specialization": "Neurology"
}
```
```
curl -X 'POST'
'api/v1/appointments/search'
-d 
{
  "symptoms": ["Loss of coordination", "Severe headaches"],
}
```
```
curl -X 'POST'
'api/v1/appointments/search'
-d 
{
  "specialization": "Neurology"
}
```
Response:
```
[
  "availabilities": [
    {
      "id": 1,
      "date": "2024-08-05 10:00:00",
      "doctor": "Dra. Olivia Garcia",
      "hospital": "Hopewell Medical Center",
      "specialization": "Neurology"
    }
    {
      "id": 2,
      "date": "2024-08-05 12:00:00",
      "doctor": "Dra. Isabella Flores",
      "hospital": "Hopewell Medical Center",
      "specialization": "Neurology"
    }
  ]
]
```

### `POST` - `api/v1/appointments/create`
Create new record about an appointment in database. 
The request body must contain the id of choosen appointment availability.
- Status code 201 if appointment has been created successfully.
- Status code 401 if user is not authenticated.
- Status code 403 if invalid token.
- Status code 404 if requested resource is not found.
- Status code 500 if server error.


Request examples:
```
curl -X 'POST'
'api/v1/appointments/create'
-d 
{
  "availabilityId": 2
}
```

Response:
```
{
  "message": "Appointment created succesfully for patient Julian Safadi",
  "date": "2024-08-05 12:00:00",
  "hospital": "Hopewell Medical Center",
  "doctor": "Dra. Isabella Flores"
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
| specialization_id | integer | Yes | Unique ID to search for a specialization. |

```
curl -X 'GET'
'api/v1/specializations/3'
```
Response:
```
{
  "id": 3,
  "name": "Pediatrics",
  "symtomps": "'{"Fever", "Persistent cough"}'"
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
    "doctor": "Dr. Braden Ashley",
    "availability_time": "2020-06-22 19:10:25"
  },
  {
    "id": 2,
    "doctor": "Dr. Braden Ashley",
    "availability_time": "2020-06-22 19:10:25"
  },
  {
    "id": 3,
    "doctor": "Dr. Braden Ashley",
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
| availability_id | integer | Yes | Unique ID to search for a availability. |

Request:
```
curl -X 'GET'
'api/v1/availabilities/2'
```
Response:
```
{
  "id": 2,
  "doctor": "Dr. Braden Ashley",
  "availability_time": "2020-06-22 19:10:25"
}
```
