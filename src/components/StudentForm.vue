<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-semibold mb-6 text-center">Enter Student Info</h2>
    <form @submit.prevent="generateReport">
      <label class="block mb-2 font-semibold">Select Class</label>
      <select v-model="studentClass" required class="w-full mb-4 p-2 border rounded">
        <option disabled value="">-- Choose Class --</option>
        <option>Pre-Nursery</option>
        <option>Nursery 1</option>
        <option>Nursery 2</option>
      </select>

      <label class="block mb-2 font-semibold">Teacher Name</label>
      <input
        v-model="teacherName"
        required
        class="w-full mb-4 p-2 border rounded"
        placeholder="Enter teacher's name"
      />

      <label class="block mb-2 font-semibold">Student Name</label>
      <input
        v-model="studentName"
        required
        class="w-full mb-6 p-2 border rounded"
        placeholder="Enter student name"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Generate Report
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentClass: '',
      teacherName: '',
      studentName: '',
    };
  },
  methods: {
    generateReport() {
      if (!this.studentClass || !this.teacherName || !this.studentName) {
        alert('Please fill in all fields.');
        return;
      }
      this.$router.push({ name: 'ReportCard', params: { studentName: this.studentName } });
    },
  },
};
</script>
