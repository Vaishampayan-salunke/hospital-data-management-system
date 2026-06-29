// ======================================
// ANALYTICS DASHBOARD
// ======================================

if (
    document.getElementById(
        'appointmentChart'
    )
) {

    loadAnalytics();
}


async function loadAnalytics() {

    try {

        const response =
            await fetch(
                '/analytics-data'
            );

        const data =
            await response.json();

        // CARDS
        document.getElementById(
            'analyticsPatients'
        ).innerText =
            data.total_patients;

        document.getElementById(
            'analyticsDoctors'
        ).innerText =
            data.total_doctors;

        document.getElementById(
            'analyticsAppointments'
        ).innerText =
            data.total_appointments;

        document.getElementById(
            'analyticsEmergency'
        ).innerText =
            data.total_emergency;

        // =========================
        // APPOINTMENT BAR CHART
        // =========================
        new Chart(

            document.getElementById(
                'appointmentChart'
            ),

            {

                type: 'bar',

                data: {

                    labels: Object.keys(
                        data.appointment_stats
                    ),

                    datasets: [{

                        label:
                            'Appointments',

                        data: Object.values(
                            data.appointment_stats
                        ),

                        backgroundColor: [

                            '#0d6efd',
                            '#198754',
                            '#dc3545'
                        ]
                    }]
                }
            }
        );

        // =========================
        // EMERGENCY PIE CHART
        // =========================
        new Chart(

            document.getElementById(
                'emergencyChart'
            ),

            {

                type: 'pie',

                data: {

                    labels: Object.keys(
                        data.emergency_stats
                    ),

                    datasets: [{

                        data: Object.values(
                            data.emergency_stats
                        ),

                        backgroundColor: [

                            '#dc3545',
                            '#fd7e14',
                            '#0d6efd',
                            '#198754'
                        ]
                    }]
                }
            }
        );

        // =========================
        // PATIENT VS DOCTOR
        // =========================
        new Chart(

            document.getElementById(
                'patientDoctorChart'
            ),

            {

                type: 'doughnut',

                data: {

                    labels: [
                        'Patients',
                        'Doctors'
                    ],

                    datasets: [{

                        data: [

                            data.total_patients,

                            data.total_doctors
                        ],

                        backgroundColor: [

                            '#0d6efd',
                            '#198754'
                        ]
                    }]
                }
            }
        );

        // =========================
        // HOSPITAL DISTRIBUTION
        // =========================
        new Chart(

            document.getElementById(
                'hospitalPieChart'
            ),

            {

                type: 'polarArea',

                data: {

                    labels: [

                        'Patients',
                        'Doctors',
                        'Appointments',
                        'Emergency'
                    ],

                    datasets: [{

                        data: [

                            data.total_patients,
                            data.total_doctors,
                            data.total_appointments,
                            data.total_emergency
                        ],

                        backgroundColor: [

                            '#0d6efd',
                            '#198754',
                            '#ffc107',
                            '#dc3545'
                        ]
                    }]
                }
            }
        );

    }

    catch (error) {

        console.log(
            'Analytics Error:',
            error
        );
    }
}