const API_URL = `https://698dd99db79d1c928ed6bf62.mockapi.io/api`

const studentsTableTbody = document.querySelector('#students-table tbody');
const addStudentForm = document.querySelector('#add-student-form');

addStudentForm.addEventListener('submit', addStudent);

// Функція для отримання всіх студентів
async function getStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        renderStudents(data);
    } catch (error) {
        console.error(error);
    }
}

// Функція для відображення студентів у таблиці
function renderStudents(students) {
    studentsTableTbody.innerHTML = '';

    students.forEach((student) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td>${student.skills}</td>
                <td>${student.email}</td>
                <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
                <td>
                    <button onclick="updateStudent('${student.id}')" style="background-color: orange;">Оновити</button>
                    <button onclick="deleteStudent('${student.id}')">Видалити</button>
                </td>
            `;
        studentsTableTbody.appendChild(tr);
    });
}

// Функція для додавання нового студента
async function addStudent(e) {
    try {
        e.preventDefault();
        console.log("Я працюю! Кнопку натиснуто.");

        const newStudent = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            course: document.getElementById('course').value,
            skills: document.getElementById('skills').value.split(', ') && document.getElementById('skills').value.split(','),
            email: document.getElementById('email').value,
            isEnrolled: document.getElementById('isEnrolled').checked
        };

        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        });
        const data = await response.json();
        console.log(data);
        getStudents();
        addStudentForm.reset();
    } catch (error) {
        console.error(error);
    }
}

async function updateStudent(id) {
    try {
        const newName = prompt("Введіть нове ім'я:");
        if (!newName) return;

        let newAgeInput = prompt("Введіть новий вік (тільки цифри):");

        if (!newAgeInput || isNaN(newAgeInput)) {
            alert("Помилка! Вік має бути числом.");
            return;
        }
        const newAge = Number(newAgeInput);

        const newCourse = prompt("Введіть новий курс:");
        if (!newCourse) return;
        const newSkills = prompt("Введіть навички через кому:");
        if (!newSkills) return;
        const newEmail = prompt("Введіть email:");
        if (!newEmail) return;
        const newStatus = prompt("Студент навчається? (true/false):");
        if (!newStatus) return;

        const updatedData = {
            name: newName,
            age: newAge,
            course: newCourse,
            skills: newSkills ? newSkills.split(',') : [],
            email: newEmail,
            isEnrolled: newStatus === 'true',
        };

        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        console.log(data);
        getStudents();
    } catch (error) {
        console.error(error);
    }
}

// Функція для видалення студента
async function deleteStudent(id) {
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
        getStudents();
    } catch (error) {
        console.error(error);
    };
}

window.deleteStudent = deleteStudent;
window.updateStudent = updateStudent;

getStudents();