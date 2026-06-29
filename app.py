from flask import Flask, render_template, jsonify

from config import Config

from database.mongo_connection import db

from routes.patient_routes import patient_bp
from routes.doctor_routes import doctor_bp
from routes.appointment_routes import appointment_bp
from routes.emergency_routes import emergency_bp
from routes.analytics_routes import analytics_bp
from routes.notification_routes import notification_bp

from utils.email_service import mail


app = Flask(__name__)

# CONFIG
app.config.from_object(Config)

# MAIL
mail.init_app(app)

# BLUEPRINTS
app.register_blueprint(patient_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(appointment_bp)
app.register_blueprint(emergency_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(notification_bp)


# =========================
# LOGIN PAGE
# =========================
@app.route('/')
def login():

    return render_template(
        'login.html'
    )


# =========================
# DASHBOARD
# =========================
@app.route('/dashboard')
def dashboard():

    return render_template(
        'dashboard.html'
    )


# =========================
# PATIENT PAGE
# =========================
@app.route('/patients-page')
def patients_page():

    return render_template(
        'patients.html'
    )


# =========================
# DOCTOR PAGE
# =========================
@app.route('/doctors-page')
def doctors_page():

    return render_template(
        'doctors.html'
    )


# =========================
# APPOINTMENTS PAGE
# =========================
@app.route('/appointments-page')
def appointments_page():

    return render_template(
        'appointments.html'
    )


# =========================
# EMERGENCY PAGE
# =========================
@app.route('/emergency-page')
def emergency_page():

    return render_template(
        'emergency.html'
    )


# =========================
# ANALYTICS PAGE
# =========================
@app.route('/analytics-page')
def analytics_page():

    return render_template(
        'analytics.html'
    )


# =========================
# DASHBOARD SUMMARY API
# =========================
@app.route('/dashboard-summary')
def dashboard_summary():

    total_patients = db.patients.count_documents({})

    total_doctors = db.doctors.count_documents({})

    total_appointments = db.appointments.count_documents({})

    total_emergency = db.emergency_cases.count_documents({})

    return jsonify({

        "total_patients": total_patients,

        "total_doctors": total_doctors,

        "total_appointments": total_appointments,

        "total_emergency": total_emergency
    })


# =========================
# RUN APP
# =========================
if __name__ == '__main__':

    app.run(
        debug=True,
        host='127.0.0.1',
        port=5000
    )