<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-3xl font-bold mb-2 text-center">Report Card for {{ studentName }}</h2>
    <p class="text-center mb-6">
        Class: <strong>{{ studentClass }}</strong> |
        Teacher: <strong>{{ teacherName }}</strong>
    </p>

    <table class="w-full table-auto border-collapse border border-gray-300">
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
            />
          </td>
          <td class="border border-gray-300 p-2">
            <input
              type="number"
              v-model.number="subject.exam"
              min="0"
              max="60"
              class="w-full p-1 border rounded"
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
  </div>
</template>

<script>
export default {
  props: ['studentName'],
  computed: {
    studentClass() {
      return this.$route.query.class || 'N/A';
    },
    teacherName() {
      return this.$route.query.teacher || 'N/A';
    },
  },
  data() {
    return {
      subjects: [
        { name: 'Maths', test: 0, exam: 0 },
        { name: 'English', test: 0, exam: 0 },
        { name: 'Handwriting', test: 0, exam: 0 },
        { name: 'Coloring', test: 0, exam: 0 },
      ],
    };
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
  },
};
</script>
