document.addEventListener("DOMContentLoaded", () => {
  const classSelect = document.getElementById("classSelect");
  const studentNameInput = document.getElementById("studentName");
  const teacherInput = document.getElementById("teacherName");
  const attendanceInput = document.getElementById("attendance");

  const subjects = ["Maths", "English", "Handwriting", "Coloring"];
  const subjectInputs = {};

  subjects.forEach(subject => {
    subjectInputs[subject] = document.getElementById(`${subject.toLowerCase()}Rating`);
  });

  const saveBtn = document.getElementById("saveRecord");
  const recordList = document.getElementById("studentRecords");

  const records = {
    "Pre-Nursery": [],
    "Nursery 1": [],
    "Nursery 2": []
  };

  function renderRecords() {
    const currentClass = classSelect.value;
    const entries = records[currentClass];

    recordList.innerHTML = entries.map(record => {
      const subjectRatings = subjects.map(sub => `${sub}: ${record.ratings[sub]}`).join(", ");
      return `<li><strong>${record.name}</strong> - ${subjectRatings}</li>`;
    }).join("");
  }

  saveBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const teacher = teacherInput.value.trim();
    const attendance = attendanceInput.value.trim();
    const currentClass = classSelect.value;

    if (!name) {
      alert("Please enter student name.");
      return;
    }

    const ratings = {};
    for (const subject of subjects) {
      const rating = subjectInputs[subject].value.toUpperCase();
      if (!["A", "B", "C", "D", "E"].includes(rating)) {
        alert(`Please enter a valid rating (A–E) for ${subject}.`);
        return;
      }
      ratings[subject] = rating;
    }

    records[currentClass].push({
      name,
      ratings,
      teacher,
      attendance
    });

    studentNameInput.value = "";
    subjects.forEach(subject => subjectInputs[subject].value = "");
    renderRecords();
  });

  classSelect.addEventListener("change", renderRecords);
});
