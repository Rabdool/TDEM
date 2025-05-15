let td = "Teachers Data";

document.getElementById('recordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const classLevel = document.getElementById('classLevel').value;
    const name = document.getElementById('studentName').value.trim();
    const test = parseInt(document.getElementById('testScore').value);
    const exam = parseInt(document.getElementById('examScore').value);

    const record = `${name} - Class: ${classLevel}, Test: ${test}, Exam: ${exam}`;
    
    const li = document.createElement('li');
    li.textContent = record;
    document.getElementById('recordsList').appendChild(li);

    this.reset();
});
