let isDoctorEditMode = false;

let selectedDoctorId = null;


document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('doctorTableBody')) {

        loadDoctors();
    }

    const doctorButton =
        document.getElementById(
            'doctorSubmitButton'
        );

    if (doctorButton) {

        doctorButton.addEventListener(
            'click',
            async () => {

                if (isDoctorEditMode) {

                    await updateDoctor();

                } else {

                    await addDoctor();
                }
            }
        );
    }
});


// LOAD DOCTORS
async function loadDoctors() {

    try {

        const response =
            await fetch('/doctors');

        const doctors =
            await response.json();

        const tableBody =
            document.getElementById(
                'doctorTableBody'
            );

        tableBody.innerHTML = '';

        doctors.forEach((doctor) => {

            tableBody.innerHTML += `

                <tr>

                    <td>${doctor.doctor_id}</td>
                    <td>${doctor.name}</td>
                    <td>${doctor.department}</td>
                    <td>${doctor.specialization}</td>
                    <td>${doctor.experience}</td>
                    <td>${doctor.qualification}</td>
                    <td>${doctor.timing}</td>
                    <td>${doctor.fees}</td>
                    <td>${doctor.phone}</td>
                    <td>${doctor.availability}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editDoctor(
                                '${doctor.doctor_id}',
                                '${doctor.name}',
                                '${doctor.department}',
                                '${doctor.specialization}',
                                '${doctor.experience}',
                                '${doctor.qualification}',
                                '${doctor.timing}',
                                '${doctor.fees}',
                                '${doctor.phone}',
                                '${doctor.availability}'
                            )"
                        >
                            Edit
                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteDoctor(
                                '${doctor.doctor_id}'
                            )"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.log(
            'Doctor Load Error:',
            error
        );
    }
}


// ADD DOCTOR
async function addDoctor() {

    const doctorData = {

        doctor_id:
            document.getElementById(
                'doctorId'
            ).value,

        name:
            document.getElementById(
                'doctorName'
            ).value,

        department:
            document.getElementById(
                'doctorDepartment'
            ).value,

        specialization:
            document.getElementById(
                'doctorSpecialization'
            ).value,

        experience:
            document.getElementById(
                'doctorExperience'
            ).value,

        qualification:
            document.getElementById(
                'doctorQualification'
            ).value,

        timing:
            document.getElementById(
                'doctorTiming'
            ).value,

        fees:
            document.getElementById(
                'doctorFees'
            ).value,

        phone:
            document.getElementById(
                'doctorPhone'
            ).value,

        availability:
            document.getElementById(
                'doctorAvailability'
            ).value
    };

    const response =
        await fetch('/add-doctor', {

            method: 'POST',

            headers: {

                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify(
                doctorData
            )
        });

    const result =
        await response.json();

    alert(result.message);

    clearDoctorForm();

    loadDoctors();
}


// EDIT
function editDoctor(
    id,
    name,
    department,
    specialization,
    experience,
    qualification,
    timing,
    fees,
    phone,
    availability
) {

    isDoctorEditMode = true;

    selectedDoctorId = id;

    document.getElementById(
        'doctorId'
    ).value = id;

    document.getElementById(
        'doctorId'
    ).readOnly = true;

    document.getElementById(
        'doctorName'
    ).value = name;

    document.getElementById(
        'doctorDepartment'
    ).value = department;

    document.getElementById(
        'doctorSpecialization'
    ).value = specialization;

    document.getElementById(
        'doctorExperience'
    ).value = experience;

    document.getElementById(
        'doctorQualification'
    ).value = qualification;

    document.getElementById(
        'doctorTiming'
    ).value = timing;

    document.getElementById(
        'doctorFees'
    ).value = fees;

    document.getElementById(
        'doctorPhone'
    ).value = phone;

    document.getElementById(
        'doctorAvailability'
    ).value = availability;

    document.getElementById(
        'doctorSubmitButton'
    ).innerText = 'Update Doctor';
}


// UPDATE
async function updateDoctor() {

    const updatedData = {

        name:
            document.getElementById(
                'doctorName'
            ).value,

        department:
            document.getElementById(
                'doctorDepartment'
            ).value,

        specialization:
            document.getElementById(
                'doctorSpecialization'
            ).value,

        experience:
            document.getElementById(
                'doctorExperience'
            ).value,

        qualification:
            document.getElementById(
                'doctorQualification'
            ).value,

        timing:
            document.getElementById(
                'doctorTiming'
            ).value,

        fees:
            document.getElementById(
                'doctorFees'
            ).value,

        phone:
            document.getElementById(
                'doctorPhone'
            ).value,

        availability:
            document.getElementById(
                'doctorAvailability'
            ).value
    };

    const response =
        await fetch(

            `/update-doctor/${selectedDoctorId}`,

            {

                method: 'PUT',

                headers: {

                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify(
                    updatedData
                )
            }
        );

    const result =
        await response.json();

    alert(result.message);

    clearDoctorForm();

    loadDoctors();
}


// DELETE
async function deleteDoctor(doctorId) {

    const response =
        await fetch(

            `/delete-doctor/${doctorId}`,

            {
                method: 'DELETE'
            }
        );

    const result =
        await response.json();

    alert(result.message);

    clearDoctorForm();

    loadDoctors();
}


// CLEAR
function clearDoctorForm() {

    isDoctorEditMode = false;

    selectedDoctorId = null;

    document.getElementById(
        'doctorId'
    ).readOnly = false;

    document.getElementById(
        'doctorId'
    ).value = '';

    document.getElementById(
        'doctorName'
    ).value = '';

    document.getElementById(
        'doctorDepartment'
    ).value = '';

    document.getElementById(
        'doctorSpecialization'
    ).value = '';

    document.getElementById(
        'doctorExperience'
    ).value = '';

    document.getElementById(
        'doctorQualification'
    ).value = '';

    document.getElementById(
        'doctorTiming'
    ).value = '';

    document.getElementById(
        'doctorFees'
    ).value = '';

    document.getElementById(
        'doctorPhone'
    ).value = '';

    document.getElementById(
        'doctorAvailability'
    ).value = '';

    document.getElementById(
        'doctorSubmitButton'
    ).innerText = 'Add Doctor';
}