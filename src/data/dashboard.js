// Static dashboard data for Admin Dashboard
export const dashboardStats = {
  totalSchools: 5,
  totalStudents: 1245,
  totalTeachers: 86,
  totalStaff: 124,
  totalRevenue: 4825000,
  pendingFees: 834000,
  attendanceToday: 92.5,
  newAdmissions: 15,
};

export const monthlyRevenue = [
  { month: "Apr", revenue: 520000, collected: 480000 },
  { month: "May", revenue: 420000, collected: 410000 },
  { month: "Jun", revenue: 380000, collected: 350000 },
  { month: "Jul", revenue: 420000, collected: 400000 },
  { month: "Aug", revenue: 450000, collected: 430000 },
  { month: "Sep", revenue: 420000, collected: 395000 },
  { month: "Oct", revenue: 480000, collected: 460000 },
  { month: "Nov", revenue: 420000, collected: 400000 },
  { month: "Dec", revenue: 380000, collected: 360000 },
  { month: "Jan", revenue: 450000, collected: 440000 },
  { month: "Feb", revenue: 420000, collected: 400000 },
  { month: "Mar", revenue: 465000, collected: 300000 },
];

export const attendanceTrend = [
  { month: "Apr", percentage: 94 },
  { month: "May", percentage: 92 },
  { month: "Jun", percentage: 88 },
  { month: "Jul", percentage: 91 },
  { month: "Aug", percentage: 93 },
  { month: "Sep", percentage: 90 },
  { month: "Oct", percentage: 95 },
  { month: "Nov", percentage: 93 },
  { month: "Dec", percentage: 85 },
  { month: "Jan", percentage: 92 },
  { month: "Feb", percentage: 94 },
  { month: "Mar", percentage: 92.5 },
];

export const classWiseStudents = [
  { class: "Nursery", students: 45 },
  { class: "KG", students: 60 },
  { class: "Class 1", students: 80 },
  { class: "Class 2", students: 85 },
  { class: "Class 3", students: 90 },
  { class: "Class 4", students: 95 },
  { class: "Class 5", students: 110 },
  { class: "Class 6", students: 105 },
  { class: "Class 7", students: 100 },
  { class: "Class 8", students: 115 },
  { class: "Class 9", students: 120 },
  { class: "Class 10", students: 110 },
  { class: "Class 11", students: 70 },
  { class: "Class 12", students: 60 },
];

export const recentActivities = [
  { id: 1, type: "enrollment", message: "Karan Malhotra admitted to Class 5-B", time: "10 mins ago", icon: "student" },
  { id: 2, type: "fee", message: "Fee payment of Rs.12,500 received from Rahul Sharma", time: "25 mins ago", icon: "payment" },
  { id: 3, type: "attendance", message: "Class 8-A attendance submitted (38/40 present)", time: "1 hour ago", icon: "attendance" },
  { id: 4, type: "staff", message: "New teacher Pooja Mishra joined English Department", time: "2 hours ago", icon: "staff" },
  { id: 5, type: "exam", message: "Mid-Term exam schedule published for Class 9-12", time: "3 hours ago", icon: "exam" },
  { id: 6, type: "notification", message: "Fee reminder sent to 45 parents (7-day due)", time: "4 hours ago", icon: "notification" },
  { id: 7, type: "enrollment", message: "Sara Ali's application under review for Class 8", time: "5 hours ago", icon: "student" },
  { id: 8, type: "fee", message: "Daily collection report: Rs.85,000 collected today", time: "6 hours ago", icon: "payment" },
];

export const upcomingEvents = [
  { id: 1, title: "Mid-Term Exams Begin", date: "2026-03-25", type: "exam" },
  { id: 2, title: "Parent-Teacher Meeting", date: "2026-03-28", type: "meeting" },
  { id: 3, title: "Annual Sports Day", date: "2026-04-05", type: "event" },
  { id: 4, title: "Fee Due Date (April)", date: "2026-04-01", type: "fee" },
  { id: 5, title: "Summer Vacation Begins", date: "2026-05-15", type: "holiday" },
];

export const feeOverview = {
  totalDue: 5250000,
  totalCollected: 4416000,
  outstanding: 834000,
  collectionRate: "84.1%",
  defaulters: 42,
  advancePaid: 18,
};

export const todayAttendance = {
  totalStudents: 1245,
  present: 1152,
  absent: 78,
  late: 15,
  onLeave: 12,
  percentage: 92.5,
};

export const staffOverview = {
  totalStaff: 124,
  teachers: 86,
  administrative: 22,
  support: 16,
  presentToday: 118,
  onLeave: 6,
};

export const quickActions = [
  { id: 1, label: "New Admission", icon: "add_student", path: "/enrollment/new-inquiry" },
  { id: 2, label: "Collect Fee", icon: "payment", path: "/fees" },
  { id: 3, label: "Mark Attendance", icon: "attendance", path: "/attendance" },
  { id: 4, label: "Send Notification", icon: "notification", path: "/notifications" },
  { id: 5, label: "Add Staff", icon: "add_staff", path: "/staff/add" },
  { id: 6, label: "View Reports", icon: "reports", path: "/reports" },
];