# Hospital Management System

A full-featured hospital management web application built with Flask and MongoDB. This system helps hospitals and clinics manage patients, doctors, appointments, emergency cases, analytics, and communication alerts from a single dashboard.

## Overview

This project is designed to simplify day-to-day hospital operations by providing a web-based interface for administrative staff. It allows users to maintain patient records, manage doctor information, schedule appointments, handle emergency cases, and monitor hospital performance through analytics.

## Key Features

- Patient management:
  - Add, view, update, and delete patient records
  - Store patient details such as name, age, gender, phone number, and disease information

- Doctor management:
  - Maintain doctor profiles with department, specialization, qualification, experience, fees, timing, and availability
  - Search doctors by specialization

- Appointment management:
  - Book and manage appointments
  - Track appointment status such as Pending, Completed, or Cancelled
  - Filter appointments by doctor or status

- Emergency case management:
  - Record emergency incidents with priority levels and ambulance status
  - Track emergency contacts and case progress

- Analytics dashboard:
  - View summary statistics for patients, doctors, appointments, and emergency cases
  - Display appointment and emergency trends using charts

- Notifications:
  - Send email notifications using Flask-Mail
  - Send SMS alerts using Twilio

## Technology Stack

- Backend: Flask
- Database: MongoDB with PyMongo
- Frontend: HTML, CSS, JavaScript, Jinja2 templates
- Charts: Chart.js
- Notifications: Flask-Mail and Twilio
- Environment configuration: python-dotenv

## Project Structure

- app.py: Main Flask application and route definitions
- config.py: Application configuration and environment variables
- routes/: Contains route handlers for patients, doctors, appointments, emergency cases, analytics, and notifications
- models/: Database interaction logic for each module
- templates/: HTML pages for the web interface
- static/: CSS, JavaScript, images, and chart assets
- utils/: Email and SMS helper services
- database/: MongoDB connection setup

## Prerequisites

Before running the project, make sure you have:

- Python 3.8+ installed
- MongoDB running locally or a MongoDB Atlas connection string
- A valid email account for SMTP configuration
- Twilio account credentials if SMS notifications will be used

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Hospital-management-system
   ```

2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables
   Create a `.env` file in the project root with values such as:

   ```env
   MONGO_URI=your_mongodb_connection_string
   DATABASE_NAME=hospital_db
   SECRET_KEY=your_secret_key
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

## Running the Application

Start the Flask app with:

```bash
python app.py
```

Then open your browser and visit:

```text
http://127.0.0.1:5000/
```

## Main Pages

- Login page
- Dashboard
- Patients page
- Doctors page
- Appointments page
- Emergency page
- Analytics page

## Use Case

This system is suitable for small to medium-sized hospitals, clinics, and healthcare centers that need a simple but effective digital workflow for managing core operations without a heavy enterprise software setup.

## Future Enhancements

Possible improvements include:

- User authentication and role-based access control
- Invoice and billing management
- Advanced reporting and export options
- Appointment reminders and calendar integration
- Mobile-friendly UI enhancements
