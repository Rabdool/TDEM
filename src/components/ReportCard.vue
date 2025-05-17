<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <BackToHome />

    <h2 class="text-3xl font-bold mb-2 text-center">Report Card for {{ studentName }}</h2>
    <p class="text-center mb-6">
      Class: <strong>{{ studentClass }}</strong> |
      Teacher: <strong>{{ teacherName }}</strong>
    </p>

    <table class="w-full table-auto border-collapse border border-gray-300 mb-6">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 p-2">Subject</th>
          <th class="border border-gray-300 p-2">Test (40)</th>
          <th class="border border-gray-300 p-2">Exam (60)</th>
          <th class="border border-gray-300 p-2">Total (100)</th>
          <th class="border border-gray-300 p-2">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in subjects" :key="subject.name">
          <td class="border border-gray-300 p-2">{{ subject.name }}</td>
          <td class="border border-gray-300 p-2">
            <input
              type="number"
              v-model.number="subject.test"
              min="0"
              max="40"
              class="w-full p-1 border rounded"
              @input="autoSave"
            />
          </td>
          <td class="border border-gray-300 p-2">
            <input
              type="number"
              v-model.number="subject.exam"
              min="0"
              max="60"
              class="w-full p-1 border rounded"
              @input="autoSave"
            />
          </td>
          <td class="border border-gray-300 p-2 text-center font-semibold">
            {{ subjectTotal(subject) }}
          </td>
          <td class="border border-gray-300 p-2 text-center font-semibold">
            {{ subjectRating(subject) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between">
      <button @click="$router.back()" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        ← Back
      </button>
      <button @click="saveReport" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        💾 Save
      </button>
    </div>
  </div>
</template>

<script>
import BackToHome from './BackToHome.vue';

export default {
  props: ['studentName'],
  components: { BackToHome },
  data() {
    return {
      subjects: [
        { name: 'Maths', test: 0, exam: 0 },
        { name: 'English', test: 0, exam: 0 },
        { name: 'Handwriting', test: 0, exam: 0 },
        { name: 'Coloring', test: 0, exam: 0 },
      ],
      studentClass: 'N/A',
      teacherName: 'N/A',
    };
  },
  mounted() {
    this.studentClass = this.$route.query.class || 'N/A';
    this.teacherName = this.$route.query.teacher || 'N/A';

    const allReports = JSON.parse(localStorage.getItem('allReports')) || [];
    const existingReport = allReports.find(
      (r) => r.name === this.studentName
    );
    if (existingReport) {
      this.studentClass = existingReport.class;
      this.teacherName = existingReport.teacher;
      this.subjects = existingReport.subjects;
    }
  },
  methods: {
    subjectTotal(subject) {
      return subject.test + subject.exam;
    },
    subjectRating(subject) {
      const total = this.subjectTotal(subject);
      if (total >= 80) return 'A';
      if (total >= 70) return 'B';
      if (total >= 60) return 'C';
      if (total >= 50) return 'D';
      return 'E';
    },
    saveReport() {
      const report = {
        name: this.studentName,
        class: this.studentClass,
        teacher: this.teacherName,
        subjects: this.subjects,
      };

      const allReports = JSON.parse(localStorage.getItem('allReports')) || [];

      const index = allReports.findIndex((r) => r.name === this.studentName);
      if (index !== -1) {
        allReports[index] = report;
      } else {
        allReports.push(report);
      }

      localStorage.setItem('allReports', JSON.stringify(allReports));
      alert('Report saved!');
    },
    autoSave() {
      const report = {
        name: this.studentName,
        class: this.studentClass,
        teacher: this.teacherName,
        subjects: this.subjects,
      };

      const allReports = JSON.parse(localStorage.getItem('allReports')) || [];

      const index = allReports.findIndex((r) => r.name === this.studentName);
      if (index !== -1) {
        allReports[index] = report;
      } else {
        allReports.push(report);
      }

      localStorage.setItem('allReports', JSON.stringify(allReports));
    },
  },
};
</script>
