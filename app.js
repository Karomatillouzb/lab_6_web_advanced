// A85204925069 
// 13.11.2026

const S = 5;
const K = 85;
const T = 50;
const C = "#2563eb";

const form = document.getElementById("registrationForm");

// PAGE 1: Registration
if (form) {

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const city = document.getElementById("city");
    const errors = document.getElementById("errors");
    const nameCount = document.getElementById("nameCount");
    const cityMessage = document.getElementById("cityMessage");

    const M = 30;
    const P = 8;

    const fields = [name, email, phone, password, confirmPassword, city];

    fields.forEach(function(field) {
        field.addEventListener("blur", function() {
            if (field.value.trim() === "") {
                field.classList.add("invalid");
            } else {
                field.classList.remove("invalid");
            }
        });
    });

    name.addEventListener("keyup", function() {
        nameCount.textContent =
            (M - name.value.length) + " characters left";
    });

    city.addEventListener("change", function() {
        cityMessage.textContent = "You chose " + city.value;
    });

    form.addEventListener("submit", function(event) {

        event.preventDefault();
        errors.textContent = "";

        let messages = [];

        if (name.value.trim() === "") {
            messages.push("Full name is required.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            messages.push("Enter a valid email.");
        }

        if (!/^\d{9}$/.test(phone.value)) {
            messages.push("Phone must contain exactly 9 digits.");
        }

        if (password.value.length < P) {
            messages.push("Password must have at least " + P + " characters.");
        }

        if (password.value !== confirmPassword.value) {
            messages.push("Passwords do not match.");
        }

        if (city.value === "") {
            messages.push("Please select a city.");
        }

        if (messages.length > 0) {

            messages.forEach(function(message) {
                const li = document.createElement("li");
                li.textContent = message;
                errors.appendChild(li);
            });

            return;
        }

        const answer = confirm("Register " + name.value + "?");

        if (answer) {
            window.location.href =
                "board.html?name=" + encodeURIComponent(name.value.trim());
        }

    });
}


// PAGE 2: Student Marks Board

const welcome = document.getElementById("welcome");

if (welcome) {

    const params = new URLSearchParams(window.location.search);
    const studentName = params.get("name");

    welcome.textContent = "Welcome, " + (studentName || "Student");

    // R6: Show page load time
    const loadTime = document.getElementById("loadTime");

    loadTime.textContent =
        "Page loaded at: " + new Date().toLocaleTimeString();

    // R10: Back button
    const backButton = document.getElementById("backButton");

    backButton.addEventListener("click", function() {
        history.back();
    });

    const studentBoard = document.getElementById("studentBoard");
    const errorMessage = document.getElementById("errorMessage");
    const sortSelect = document.getElementById("sortSelect");

    let students = [];

    // R9: Grade function
    function grade(marks) {

        if (marks < T) {
            return "Fail";
        }

        if (marks < 75) {
            return "Pass";
        }

        return "Distinction";
    }

    // R9: Create tables using createElement
    function displayStudents() {

        studentBoard.textContent = "";

        students.forEach(function(student) {

            const table = document.createElement("table");

            const heading = document.createElement("tr");

            const headers = ["Name", "Marks", "City", "Grade"];

            headers.forEach(function(header) {
                const th = document.createElement("th");
                th.textContent = header;
                heading.appendChild(th);
            });

            table.appendChild(heading);

            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = student.name;

            const marksCell = document.createElement("td");
            marksCell.textContent = student.marks;

            const cityCell = document.createElement("td");
            cityCell.textContent = student.city;

            const gradeCell = document.createElement("td");
            gradeCell.textContent = grade(student.marks);

            row.appendChild(nameCell);
            row.appendChild(marksCell);
            row.appendChild(cityCell);
            row.appendChild(gradeCell);

            table.appendChild(row);

            studentBoard.appendChild(table);

        });

    }

    // R7: Fetch JSON with async/await and try/catch
    async function loadStudents() {

        try {

            const response = await fetch("students.json");

            if (!response.ok) {
                throw new Error("Could not load students.json");
            }

            students = await response.json();

            if (students.length !== S) {
                throw new Error("Incorrect number of students.");
            }

            displayStudents();

        } catch (error) {

            errorMessage.textContent =
                "Error loading students. Please try again later.";

        }

    }

    // R10: Sort table
    sortSelect.addEventListener("change", function() {

        if (sortSelect.value === "name") {

            students.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

        } else if (sortSelect.value === "marks") {

            students.sort(function(a, b) {
                return b.marks - a.marks;
            });

        }

        displayStudents();

    });

    loadStudents();

}


console.log("A85204925069", "13.11.2026")
