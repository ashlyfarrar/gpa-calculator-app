const courseForm = document.getElementById('course-form');
const coursesTable = document.getElementById('courses-table').querySelector('tbody');
const gpaDisplay = document.getElementById('gpa');

let courses = [];

const fetchCourses = async () => {
    const response = await fetch('http://localhost:3000/courses');
    courses = await response.json();
    renderCourses();
    updateGPA();
};

const addCourse = async (course) => {
    await fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
    });
    fetchCourses();
};

const deleteCourse = async (id) => {
    await fetch(`http://localhost:3000/courses/${id}`, { method: 'DELETE' });
    fetchCourses();
};

const renderCourses = () => {
    coursesTable.innerHTML = '';
    courses.forEach(({ id, course_name, credit_hours, grade }) => {
        const gradePoints = (credit_hours * grade).toFixed(2);
        const row = `
            <tr>
                <td>${course_name}</td>
                <td>${credit_hours}</td>
                <td>${grade.toFixed(1)}</td>
                <td>${gradePoints}</td>
                <td><button onclick="deleteCourse(${id})">Delete</button></td>
            </tr>
        `;
        coursesTable.innerHTML += row;
    });
};

const updateGPA = () => {
    const totalCredits = courses.reduce((sum, c) => sum + c.credit_hours, 0);
    const totalGradePoints = courses.reduce((sum, c) => sum + c.credit_hours * c.grade, 0);
    const gpa = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    gpaDisplay.textContent = gpa;
};

courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const courseName = document.getElementById('course-name').value;
    const creditHours = parseInt(document.getElementById('credit-hours').value);
    const grade = parseFloat(document.getElementById('grade').value);

    addCourse({ courseName, creditHours, grade });
    courseForm.reset();
});

fetchCourses();
