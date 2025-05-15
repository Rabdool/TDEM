let currentClass = "pre-nursery";
const records = {
    "pre-nursery": [],
    "nursery-1": [],
    "nursery-2": []
};

const recordForm = document.getElementById("recordForm");
const recordsList = document.getElementById("recordsList");

document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentClass = button.getAttribute("data-class");
        renderRecords();
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("bg-blue-500", "text-white"));
        button.classList.add("bg-blue-500", "text-white");
    });
});

recordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const test = parseInt(document.getElementById("testScore").value);
    const exam = parseInt(document.getElementById("examScore").value);

    if (test > 40 || exam > 60) {
        alert("Test max is 40, Exam max is 60.");
        return;
    }

    const total = test + exam;
    const percentage = ((total / 100) * 100).toFixed(1);

    records[currentClass].push({ name, test, exam, total, percentage });
    renderRecords();

    this.reset();
});

function renderRecords() {
    recordsList.innerHTML = "";
    records[currentClass].forEach(({ name, test, exam, total }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="font-medium">${name}</span> - 
            Test: ${test}, Exam: ${exam}, Total: ${total}
        `;
        recordsList.appendChild(li);
    });
}

document.querySelector('[data-class="pre-nursery"]').click();
