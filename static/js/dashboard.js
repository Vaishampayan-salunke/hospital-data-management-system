document.addEventListener(

    'DOMContentLoaded',

    () => {

        loadDashboardData();
    }
);

async function loadDashboardData() {

    try {

        const response =
            await fetch('/dashboard-summary');

        const data =
            await response.json();

        document.getElementById(
            'totalPatients'
        ).innerText =
            data.total_patients || 0;

        document.getElementById(
            'totalDoctors'
        ).innerText =
            data.total_doctors || 0;

        document.getElementById(
            'totalAppointments'
        ).innerText =
            data.total_appointments || 0;

        document.getElementById(
            'totalEmergency'
        ).innerText =
            data.total_emergency || 0;

    }

    catch (error) {

        console.log(
            'Dashboard Error:',
            error
        );
    }
}

document.addEventListener(
    'DOMContentLoaded',
    loadDashboardData
);