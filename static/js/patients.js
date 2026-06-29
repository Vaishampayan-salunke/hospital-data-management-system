let isEditMode = false;

let selectedPatientId = null;


// =========================
// LOAD PATIENTS
// =========================
async function loadPatients() {

    try {

        const response = await fetch('/patients');

        const patients = await response.json();

        const tableBody =
            document.getElementById('patientTableBody');

        tableBody.innerHTML = "";

        patients.forEach(patient => {

            const row = document.createElement('tr');

            row.innerHTML = `

                <td>${patient.patient_id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone}</td>
                <td>${patient.disease}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm me-2 edit-btn"
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm delete-btn"
                    >
                        Delete
                    </button>

                </td>
            `;

            // EDIT
            row.querySelector('.edit-btn')
                .addEventListener('click', () => {

                editPatient(
                    patient.patient_id,
                    patient.name,
                    patient.age,
                    patient.gender,
                    patient.phone,
                    patient.disease
                );
            });

            // DELETE
            row.querySelector('.delete-btn')
                .addEventListener('click', () => {

                deletePatient(patient.patient_id);
            });

            tableBody.appendChild(row);
        });

    }

    catch (error) {

        console.log("Patient Load Error:", error);
    }
}


// =========================
// ADD PATIENT
// =========================
async function addPatient() {

    const patientId =
        document.getElementById('patientId').value.trim();

    if (!patientId) {

        alert("Patient ID is required");

        return;
    }

    const patientData = {

        patient_id: patientId,

        name:
            document.getElementById('patientName').value,

        age:
            document.getElementById('patientAge').value,

        gender:
            document.getElementById('patientGender').value,

        phone:
            document.getElementById('patientPhone').value,

        disease:
            document.getElementById('patientDisease').value
    };

    try {

        const response = await fetch('/add-patient', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(patientData)
        });

        const result = await response.json();

        alert(result.message);

        await loadPatients();

        clearPatientForm();

    }

    catch (error) {

        console.log("Add Patient Error:", error);
    }
}


// =========================
// EDIT PATIENT
// =========================
function editPatient(id, name, age, gender, phone, disease) {

    selectedPatientId = id;

    document.getElementById('patientId').value = id;

    document.getElementById('patientId').readOnly = true;

    document.getElementById('patientName').value = name;

    document.getElementById('patientAge').value = age;

    document.getElementById('patientGender').value = gender;

    document.getElementById('patientPhone').value = phone;

    document.getElementById('patientDisease').value = disease;

    isEditMode = true;

    document.getElementById('patientSubmitButton').innerText =
        "Update Patient";
}


// =========================
// UPDATE PATIENT
// =========================
async function updatePatient() {

    if (!selectedPatientId) {

        alert("No patient selected");

        return;
    }

    const updatedData = {

        name:
            document.getElementById('patientName').value,

        age:
            document.getElementById('patientAge').value,

        gender:
            document.getElementById('patientGender').value,

        phone:
            document.getElementById('patientPhone').value,

        disease:
            document.getElementById('patientDisease').value
    };

    try {

        const response = await fetch(

            `/update-patient/${selectedPatientId}`,

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

        await loadPatients();

        clearPatientForm();

    }

    catch (error) {

        console.log("Update Error:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('patientTableBody')) {

        loadPatients();
    }

    const patientButton =
        document.getElementById(
            'patientSubmitButton'
        );

    if (patientButton) {

        patientButton.addEventListener(
            'click',
            async () => {

                if (isEditMode) {

                    await updatePatient();

                } else {

                    await addPatient();
                }
            }
        );
    }
});

// delete patient
async function deletePatient(patientId) {

    try {

        const response = await fetch(

            `/delete-patient/${patientId}`,

            {
                method: 'DELETE'
            }
        );

        const result =
            await response.json();

        alert(result.message);

        clearPatientForm();

        await loadPatients();

    }

    catch (error) {

        console.log(
            'Delete Patient Error:',
            error
        );
    }
}

function clearPatientForm() {

    document.getElementById(
        'patientId'
    ).value = '';

    document.getElementById(
        'patientName'
    ).value = '';

    document.getElementById(
        'patientAge'
    ).value = '';

    document.getElementById(
        'patientGender'
    ).value = '';

    document.getElementById(
        'patientPhone'
    ).value = '';

    document.getElementById(
        'patientDisease'
    ).value = '';

    selectedPatientId = null;

    isPatientEditMode = false;

    const button =

        document.getElementById(
            'patientSubmitButton'
        );

    if (button) {

        button.innerText =
            'Add Patient';
    }
}