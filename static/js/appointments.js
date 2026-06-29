let isAppointmentEditMode = false;

let selectedAppointmentId = null;


// APPOINTMENT TABLE
if (document.getElementById('appointmentTableBody')) {

    loadAppointments();
}


// APPOINTMENT BUTTON
const appointmentButton =
    document.getElementById('appointmentSubmitButton');

if (appointmentButton) {

    appointmentButton.addEventListener('click', async () => {

        if (isAppointmentEditMode) {

            await updateAppointment();

        } else {

            await addAppointment();
        }
    });
}

// ======================================
// ADD APPOINTMENT
// ======================================
async function addAppointment() {

    const appointmentData = {

        appointment_id:
            document.getElementById('appointmentId').value,

        patient_id:
            document.getElementById('patientId').value,

        patient_name:
            document.getElementById('patientName').value,

        doctor_id:
            document.getElementById('doctorId').value,

        doctor_name:
            document.getElementById('doctorName').value,

        department:
            document.getElementById('appointmentDepartment').value,

        date:
            document.getElementById('appointmentDate').value,

        time:
            document.getElementById('appointmentTime').value,

        status:
            document.getElementById('appointmentStatus').value
    };

    try {

        const response = await fetch('/add-appointment', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();

        alert(result.message);

        clearAppointmentForm();

        loadAppointments();
    }

    catch (error) {

        console.log("Appointment Error:", error);
    }
}


// ======================================
// LOAD APPOINTMENTS
// ======================================
async function loadAppointments() {

    try {

        const response =
            await fetch('/appointments');

        const appointments =
            await response.json();

        const tableBody =
            document.getElementById(
                'appointmentTableBody'
            );

        tableBody.innerHTML = "";

        appointments.forEach((appointment) => {

            const row =
                document.createElement('tr');

            row.innerHTML = `

                <td>${appointment.appointment_id}</td>

                <td>${appointment.patient_name}</td>

                <td>${appointment.doctor_name}</td>

                <td>${appointment.department}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>${appointment.status}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm me-2"
                        onclick="
                            editAppointment(
                                '${appointment.appointment_id}',
                                '${appointment.patient_id}',
                                '${appointment.patient_name}',
                                '${appointment.doctor_id}',
                                '${appointment.doctor_name}',
                                '${appointment.department}',
                                '${appointment.date}',
                                '${appointment.time}',
                                '${appointment.status}'
                            )
                        "
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="
                            deleteAppointment(
                                '${appointment.appointment_id}'
                            )
                        "
                    >
                        Delete
                    </button>

                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    catch (error) {

        console.log(
            "Load Appointment Error:",
            error
        );
    }
}


// ======================================
// EDIT APPOINTMENT
// ======================================
function editAppointment(
    id,
    patientId,
    patientName,
    doctorId,
    doctorName,
    department,
    date,
    time,
    status
) {

    selectedAppointmentId = id;

    document.getElementById('appointmentId').value = id;

    document.getElementById('appointmentId').readOnly =
        true;

    document.getElementById('patientId').value =
        patientId;

    document.getElementById('patientName').value =
        patientName;

    document.getElementById('doctorId').value =
        doctorId;

    document.getElementById('doctorName').value =
        doctorName;

    document.getElementById('appointmentDepartment').value =
        department;

    document.getElementById('appointmentDate').value =
        date;

    document.getElementById('appointmentTime').value =
        time;

    document.getElementById('appointmentStatus').value =
        status;

    isAppointmentEditMode = true;

    document.getElementById(
        'appointmentSubmitButton'
    ).innerText = "Update Appointment";
}


// ======================================
// UPDATE APPOINTMENT
// ======================================
async function updateAppointment() {

    const updatedData = {

        patient_id:
            document.getElementById('patientId').value,

        patient_name:
            document.getElementById('patientName').value,

        doctor_id:
            document.getElementById('doctorId').value,

        doctor_name:
            document.getElementById('doctorName').value,

        department:
            document.getElementById('appointmentDepartment').value,

        date:
            document.getElementById('appointmentDate').value,

        time:
            document.getElementById('appointmentTime').value,

        status:
            document.getElementById('appointmentStatus').value
    };

    try {

        const response = await fetch(

            `/update-appointment/${selectedAppointmentId}`,

            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(updatedData)
            }
        );

        const result = await response.json();

        alert(result.message);

        loadAppointments();

        clearAppointmentForm();
    }

    catch (error) {

        console.log(
            "Update Appointment Error:",
            error
        );
    }
}


// ======================================
// DELETE APPOINTMENT
// ======================================
async function deleteAppointment(appointmentId) {

    try {

        const response = await fetch(

            `/delete-appointment/${appointmentId}`,

            {
                method: 'DELETE'
            }
        );

        const result = await response.json();

        alert(result.message);

        loadAppointments();

        clearAppointmentForm();
    }

    catch (error) {

        console.log(
            "Delete Appointment Error:",
            error
        );
    }
}


// ======================================
// SEARCH APPOINTMENT
// ======================================
function searchAppointments() {

    const input =
        document.getElementById(
            'appointmentSearchInput'
        ).value.toLowerCase();

    const rows =
        document.querySelectorAll(
            '#appointmentTableBody tr'
        );

    rows.forEach((row) => {

        const text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(input)
            ? ''
            : 'none';
    });
}


// ======================================
// CLEAR FORM
// ======================================
function clearAppointmentForm() {

    selectedAppointmentId = null;

    isAppointmentEditMode = false;

    document.getElementById('appointmentId').readOnly =
        false;

    document.getElementById('appointmentId').value = "";

    document.getElementById('patientId').value = "";

    document.getElementById('patientName').value = "";

    document.getElementById('doctorId').value = "";

    document.getElementById('doctorName').value = "";

    document.getElementById('appointmentDepartment').value =
        "";

    document.getElementById('appointmentDate').value =
        "";

    document.getElementById('appointmentTime').value =
        "";

    document.getElementById('appointmentStatus').value =
        "";

    document.getElementById(
        'appointmentSubmitButton'
    ).innerText = "Add Appointment";
}

