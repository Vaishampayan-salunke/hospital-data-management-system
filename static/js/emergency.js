let isEmergencyEditMode = false;

let selectedEmergencyId = null;


// =====================================
// EMERGENCY MODULE
// =====================================
// LOAD EMERGENCY CASES
async function loadEmergencyCases() {

    try {

        const response = await fetch(
            '/emergency-cases'
        );

        const emergencyCases =
            await response.json();

        const tableBody =
            document.getElementById(
                'emergencyTableBody'
            );

        tableBody.innerHTML = '';

        emergencyCases.forEach((emergency) => {

            let priorityBadge = '';

            if (
                emergency.priority ===
                'Critical'
            ) {

                priorityBadge =
                    '<span class="badge bg-danger">Critical</span>';

            } else if (
                emergency.priority ===
                'High'
            ) {

                priorityBadge =
                    '<span class="badge bg-warning text-dark">High</span>';

            } else if (
                emergency.priority ===
                'Medium'
            ) {

                priorityBadge =
                    '<span class="badge bg-primary">Medium</span>';

            } else {

                priorityBadge =
                    '<span class="badge bg-success">Low</span>';
            }

            tableBody.innerHTML += `

                <tr>

                    <td>${emergency.emergency_id}</td>

                    <td>${emergency.patient_name}</td>

                    <td>${emergency.age}</td>

                    <td>${emergency.condition}</td>

                    <td>${priorityBadge}</td>

                    <td>${emergency.ambulance_status}</td>

                    <td>${emergency.emergency_contact}</td>

                    <td>${emergency.case_status}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editEmergency(
                                '${emergency.emergency_id}',
                                '${emergency.patient_name}',
                                '${emergency.age}',
                                '${emergency.condition}',
                                '${emergency.priority}',
                                '${emergency.ambulance_status}',
                                '${emergency.emergency_contact}',
                                '${emergency.case_status}'
                            )"
                        >
                            Edit
                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteEmergency(
                                '${emergency.emergency_id}'
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
            'Load Emergency Error:',
            error
        );
    }
}


// ADD EMERGENCY
async function addEmergency() {

    try {

        const emergencyData = {

            emergency_id:
                document.getElementById(
                    'emergencyId'
                ).value,

            patient_name:
                document.getElementById(
                    'emergencyPatientName'
                ).value,

            age:
                document.getElementById(
                    'emergencyAge'
                ).value,

            condition:
                document.getElementById(
                    'emergencyCondition'
                ).value,

            priority:
                document.getElementById(
                    'emergencyPriority'
                ).value,

            ambulance_status:
                document.getElementById(
                    'ambulanceStatus'
                ).value,

            emergency_contact:
                document.getElementById(
                    'emergencyContact'
                ).value,

            case_status:
                document.getElementById(
                    'caseStatus'
                ).value
        };

        const response = await fetch(
            '/add-emergency',
            {

                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify(
                    emergencyData
                )
            }
        );

        const result =
            await response.json();

        alert(result.message);

        clearEmergencyForm();

        loadEmergencyCases();

    } catch (error) {

        console.log(
            'Add Emergency Error:',
            error
        );
    }
}


// EDIT EMERGENCY
function editEmergency(
    id,
    patientName,
    age,
    condition,
    priority,
    ambulanceStatus,
    emergencyContact,
    caseStatus
) {

    isEmergencyEditMode = true;

    selectedEmergencyId = id;

    document.getElementById(
        'emergencyId'
    ).value = id;

    document.getElementById(
        'emergencyPatientName'
    ).value = patientName;

    document.getElementById(
        'emergencyAge'
    ).value = age;

    document.getElementById(
        'emergencyCondition'
    ).value = condition;

    document.getElementById(
        'emergencyPriority'
    ).value = priority;

    document.getElementById(
        'ambulanceStatus'
    ).value = ambulanceStatus;

    document.getElementById(
        'emergencyContact'
    ).value = emergencyContact;

    document.getElementById(
        'caseStatus'
    ).value = caseStatus;

    document.getElementById(
        'emergencySubmitButton'
    ).innerText =
        'Update Emergency Case';
}


// UPDATE EMERGENCY
async function updateEmergency() {

    try {

        const updatedData = {

            patient_name:
                document.getElementById(
                    'emergencyPatientName'
                ).value,

            age:
                document.getElementById(
                    'emergencyAge'
                ).value,

            condition:
                document.getElementById(
                    'emergencyCondition'
                ).value,

            priority:
                document.getElementById(
                    'emergencyPriority'
                ).value,

            ambulance_status:
                document.getElementById(
                    'ambulanceStatus'
                ).value,

            emergency_contact:
                document.getElementById(
                    'emergencyContact'
                ).value,

            case_status:
                document.getElementById(
                    'caseStatus'
                ).value
        };

        const response = await fetch(

            `/update-emergency/${selectedEmergencyId}`,

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

        clearEmergencyForm();

        await loadEmergencyCases();

    }

    catch (error) {

        console.log(
            'Update Emergency Error:',
            error
        );
    }
}


// DELETE EMERGENCY
async function deleteEmergency(
    emergencyId
) {

    try {

        const response = await fetch(

            `/delete-emergency/${emergencyId}`,

            {
                method: 'DELETE'
            }
        );

        const result =
            await response.json();

        alert(result.message);

        clearEmergencyForm();

        await loadEmergencyCases();

    }

    catch (error) {

        console.log(
            'Delete Emergency Error:',
            error
        );
    }
}


// SEARCH EMERGENCY
function searchEmergency() {

    const input =
        document.getElementById(
            'emergencySearchInput'
        ).value.toLowerCase();

    const rows =
        document.querySelectorAll(
            '#emergencyTableBody tr'
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


// CLEAR FORM
function clearEmergencyForm() {

    isEmergencyEditMode = false;

    selectedEmergencyId = null;

    document.getElementById(
        'emergencyId'
    ).value = '';

    document.getElementById(
        'emergencyPatientName'
    ).value = '';

    document.getElementById(
        'emergencyAge'
    ).value = '';

    document.getElementById(
        'emergencyCondition'
    ).value = '';

    document.getElementById(
        'emergencyPriority'
    ).value = '';

    document.getElementById(
        'ambulanceStatus'
    ).value = '';

    document.getElementById(
        'emergencyContact'
    ).value = '';

    document.getElementById(
        'caseStatus'
    ).value = '';

    document.getElementById(
        'emergencySubmitButton'
    ).innerText =
        'Add Emergency Case';
}

document.addEventListener(

    'DOMContentLoaded',

    () => {

        if (

            document.getElementById(
                'emergencyTableBody'
            )

        ) {

            loadEmergencyCases();
        }

        const emergencyButton =

            document.getElementById(
                'emergencySubmitButton'
            );

        if (emergencyButton) {

            emergencyButton.addEventListener(

                'click',

                async () => {

                    if (
                        isEmergencyEditMode
                    ) {

                        await updateEmergency();

                    } else {

                        await addEmergency();
                    }
                }
            );
        }
    }
);