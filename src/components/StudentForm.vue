<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-semibold mb-6 text-center">Enter Student Info</h2>
    <form @submit.prevent="generateReport">
      <label class="block mb-2 font-semibold">Select Class</label>
      <select v-model="studentClass" class="w-full mb-4 p-2 border rounded">
        <option disabled value="">-- Choose Class --</option>
        <option>Pre-Nursery</option>
        <option>Nursery 1</option>
        <option>Nursery 2</option>
      </select>

      <label class="block mb-2 font-semibold">Teacher Name</label>
      <input
        v-model="teacherName"
        class="w-full mb-4 p-2 border rounded"
        placeholder="Enter teacher's name"
      />

      <label class="block mb-2 font-semibold">Student Name</label>
      <input
        v-model="studentName"
        class="w-full mb-6 p-2 border rounded"
        placeholder="Enter student name"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Generate Report
      </button>

      <p v-if="showError" class="mt-4 text-red-600 font-semibold text-center">
        Please fill in all fields.
      </p>

      <p v-if="duplicateError" class="mt-4 text-red-600 font-semibold text-center">
        A report for this student in this class already exists.
      </p>

      <router-link
        to="/reports"
        class="block text-center mt-6 text-blue-600 hover:underline"
      >
        View All Reports
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'StudentForm',
  data() {
    return {
      studentClass: '',
      teacherName: '',
      studentName: '',
      showError: false,
      duplicateError: false,
    };
  },
  methods: {
    generateReport() {
      this.showError = false;
      this.duplicateError = false;

      if (!this.studentClass || !this.teacherName || !this.studentName) {
        this.showError = true;
        return;
      }

      const allReports = JSON.parse(localStorage.getItem('allReports')) || [];

      const duplicate = allReports.find(
        (r) =>
          r.name.toLowerCase() === this.studentName.toLowerCase() &&
          r.class === this.studentClass
      );

      if (duplicate) {
        this.duplicateError = true;
        return;
      }

      const newReport = {
        name: this.studentName,
        class: this.studentClass,
        teacher: this.teacherName,
        subjects: [
          { name: 'Maths', test: 0, exam: 0 },
          { name: 'English', test: 0, exam: 0 },
          { name: 'Handwriting', test: 0, exam: 0 },
          { name: 'Coloring', test: 0, exam: 0 },
        ],
      };

      allReports.push(newReport);
      localStorage.setItem('allReports', JSON.stringify(allReports));

      this.$router.push({
        name: 'ReportCard',
        params: {
          studentName: this.studentName,
        },
        query: {
          class: this.studentClass,
          teacher: this.teacherName,
        },
      });
    },
  },
};
</script>
