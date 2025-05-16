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
  const math = parseInt(document.getElementById("mathScore").value);
  const english = parseInt(document.getElementById("englishScore").value);
  const handwriting = parseInt(document.getElementById("handwritingScore").value);
  const coloring = parseInt(document.getElementById("coloringScore").value);

  if (math > 25 || english > 25 || handwriting > 25 || coloring > 25) {
    alert("Each subject must not exceed 25 marks.");
    return;
  }

  const total = math + english + handwriting + coloring;

  records[currentClass].push({
    name, math, english, handwriting, coloring, total
  });

  renderRecords();
  this.reset();
});

function renderRecords() {
  recordsList.innerHTML = "";

  records[currentClass].forEach(({ name, math, english, handwriting, coloring, total }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="mb-2">
        <strong>${name}</strong><br />
        Maths: ${math}, English: ${english}, Handwriting: ${handwriting}, Coloring: ${coloring}, 
        <span class="font-medium">Total: ${total}</span>
      </div>
    `;
    recordsList.appendChild(li);
  });
}

document.querySelector('[data-class="pre-nursery"]').click();
