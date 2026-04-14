export const classes = [
  { id: "CLS-001", className: "1st", section: "A", classTeacher: "Mrs. Sunita Verma", totalStudents: 35, room: "101", schedule: "8:00 AM - 2:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-002", className: "1st", section: "B", classTeacher: "Mrs. Rina Sharma", totalStudents: 32, room: "102", schedule: "8:00 AM - 2:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-003", className: "2nd", section: "A", classTeacher: "Mr. Anil Kumar", totalStudents: 38, room: "103", schedule: "8:00 AM - 2:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-004", className: "2nd", section: "B", classTeacher: "Mrs. Priya Singh", totalStudents: 36, room: "104", schedule: "8:00 AM - 2:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-005", className: "3rd", section: "A", classTeacher: "Mr. Rajesh Gupta", totalStudents: 40, room: "201", schedule: "8:00 AM - 2:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-006", className: "4th", section: "A", classTeacher: "Mrs. Kavita Nair", totalStudents: 37, room: "202", schedule: "8:00 AM - 2:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-007", className: "5th", section: "A", classTeacher: "Mr. Deepak Joshi", totalStudents: 34, room: "203", schedule: "8:00 AM - 2:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-008", className: "5th", section: "C", classTeacher: "Mrs. Neha Patel", totalStudents: 30, room: "204", schedule: "8:00 AM - 2:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-009", className: "6th", section: "B", classTeacher: "Mr. Vikram Reddy", totalStudents: 42, room: "301", schedule: "8:00 AM - 3:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-010", className: "7th", section: "A", classTeacher: "Mrs. Lakshmi Iyer", totalStudents: 39, room: "302", schedule: "8:00 AM - 3:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-011", className: "7th", section: "C", classTeacher: "Mr. Suresh Menon", totalStudents: 33, room: "303", schedule: "8:00 AM - 3:00 PM", status: "Active", schoolId: "1002" },
  { id: "CLS-012", className: "8th", section: "A", classTeacher: "Mrs. Anjali Das", totalStudents: 41, room: "304", schedule: "8:00 AM - 3:00 PM", status: "Active", schoolId: "1002" },
  { id: "CLS-013", className: "8th", section: "B", classTeacher: "Mr. Mohan Pillai", totalStudents: 36, room: "305", schedule: "8:00 AM - 3:00 PM", status: "Active", schoolId: "1002" },
  { id: "CLS-014", className: "9th", section: "A", classTeacher: "Mr. Krishna Rao", totalStudents: 44, room: "401", schedule: "7:30 AM - 3:00 PM", status: "Active", schoolId: "1003" },
  { id: "CLS-015", className: "9th", section: "B", classTeacher: "Mrs. Padma Krishnan", totalStudents: 38, room: "402", schedule: "7:30 AM - 3:00 PM", status: "Active", schoolId: "1003" },
  { id: "CLS-016", className: "10th", section: "A", classTeacher: "Mr. Ramesh Tiwari", totalStudents: 45, room: "403", schedule: "7:30 AM - 3:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-017", className: "10th", section: "B", classTeacher: "Mrs. Shalini Kapoor", totalStudents: 43, room: "404", schedule: "7:30 AM - 3:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-018", className: "Nursery", section: "A", classTeacher: "Mrs. Meera Jain", totalStudents: 25, room: "G01", schedule: "9:00 AM - 12:30 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-019", className: "LKG", section: "A", classTeacher: "Mrs. Pooja Agarwal", totalStudents: 28, room: "G02", schedule: "9:00 AM - 1:00 PM", status: "Active", schoolId: "1001" },
  { id: "CLS-020", className: "UKG", section: "A", classTeacher: "Mrs. Divya Saxena", totalStudents: 27, room: "G03", schedule: "9:00 AM - 1:00 PM", status: "Inactive", schoolId: "1001" },
];

export const getClassesBySchool = (schoolId) => classes.filter((c) => c.schoolId === schoolId);
export const getClassesByName = (className) => classes.filter((c) => c.className === className);
