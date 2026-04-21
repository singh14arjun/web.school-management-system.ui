import { Suspense, lazy } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

const Login = lazy(() => import("../features/auth/Login"));
const SchoolSetup = lazy(() => import("../pages/SchoolSetup"));
const SuperAdminLayout = lazy(
  () => import("../components/layout/SuperAdminLayout"),
);
const SuperAdminDashboard = lazy(
  () => import("../components/layout/SuperAdminDashboard"),
);

const SchoolSelector = lazy(() => import("../pages/SchoolSelector"));
const AdminDashboard = lazy(
  () => import("../components/layout/AdminDashboard"),
);
const School = lazy(() => import("../pages/School"));
const SchoolProfile = lazy(() => import("../pages/SchoolProfile"));
const Teachers = lazy(() => import("../pages/Teachers"));
const TimeTable = lazy(() => import("../pages/TimeTable"));

const EnrollmentDashboard = lazy(
  () => import("../pages/enrollment/EnrollmentDashboard"),
);
const NewInquiry = lazy(() => import("../pages/enrollment/NewInquiry"));
const ApplicationForm = lazy(
  () => import("../pages/enrollment/ApplicationForm"),
);
const ApplicationReview = lazy(
  () => import("../pages/enrollment/ApplicationReview"),
);

// Students
const StudentList = lazy(() => import("../pages/students/StudentList"));
const AddStudent = lazy(() => import("../pages/students/AddStudent"));
const EditStudent = lazy(() => import("../pages/students/EditStudent"));
const StudentProfile = lazy(() => import("../pages/students/StudentProfile"));
const StudentProfile2 = lazy(() => import("../pages/student/StudentProfile"));
const StudentsAttendance = lazy(() => import("../pages/students/Attendance"));
const StudentAttendance = lazy(
  () => import("../pages/student/StudentAttendence"),
);
const StudentDashboard = lazy(
  () => import("../pages/students/StudentDashboard"),
);
const StudentLayout = lazy(() => import("../pages/students/StudentLayout"));
const StudentAttendence = lazy(
  () => import("../pages/student/StudentAttendence"),
);
const StudentFees = lazy(() => import("../pages/student/StudentFees"));
const StudentTimeTable = lazy(
  () => import("../pages/student/StudentTimeTable"),
);
// Classes
const ClassList = lazy(() => import("../pages/classes/ClassList"));
const AddClass = lazy(() => import("../pages/classes/AddClass"));
const EditClass = lazy(() => import("../pages/classes/EditClass"));
const ClassProfile = lazy(() => import("../pages/classes/ClassProfile"));
const StudentResult = lazy(() => import("../pages/student/StudentResult"));

// Staff
const StaffLayout = lazy(() => import("../pages/staff/Stafflayout"));
const StaffDashboard = lazy(() => import("../pages/staff/StaffDashboard"));
const StaffList = lazy(() => import("../pages/staff/StaffList"));
const AddStaff = lazy(() => import("../pages/staff/AddStaff"));
const StaffProfile = lazy(() => import("../pages/staff/StaffProfile"));
const EditStaff = lazy(() => import("../pages/staff/EditStaff"));
const DeleteStaff = lazy(() => import("../pages/staff/DeleteStaff"));
const Salary = lazy(() => import("../pages/staff/Salary"));
const TeacherProfile = lazy(() => import("../pages/staff/TeacherProfile"));
const Assignment = lazy(() => import("../pages/staff/Assignement"));
const Timetable = lazy(() => import("../pages/staff/Timetable"));
const Result = lazy(() => import("../pages/staff/Result"));
const Attendance = lazy(() => import("../pages/staff/Attendance"));

// Animated loading spinner
const Loading = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-[#f0f4ff]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-blue-100" />
      <div
        className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400"
        style={{
          animation: "spinGlow 1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        }}
      />
    </div>
    <div className="flex gap-1.5 mt-5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-500"
          style={{
            animation: `dotPulse 1.4s ease-in-out ${i * 0.16}s infinite`,
          }}
        />
      ))}
    </div>
    <p className="mt-3 text-sm font-medium text-slate-400 animate-pulse">
      Loading...
    </p>
  </div>
);

// Page transition wrapper — animates on route change
const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-page">
      {children}
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PageTransition>
            <Login />
          </PageTransition>
        }
      />
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute>
            <PageTransition>
              <SuperAdminLayout />
            </PageTransition>
          </ProtectedRoute>
        }
      >
        <Route path="" element={<SuperAdminDashboard />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="schools" element={<SchoolSelector />} />
      </Route>
      <Route
        path="/setup"
        element={
          <ProtectedRoute>
            <PageTransition>
              <SchoolSetup />
            </PageTransition>
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/select-school"
        element={
          <ProtectedRoute>
            <PageTransition>
              <SchoolSelector />
            </PageTransition>
          </ProtectedRoute>
        }
      /> */}

      {/* Dashboard Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* <Route index element={<Navigate to="/select-school" replace />} /> */}
        <Route
          path="dashboard"
          element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          }
        />
        <Route
          path="school"
          element={
            <PageTransition>
              <School />
            </PageTransition>
          }
        />
        <Route
          path="school-profile/:id"
          element={
            <PageTransition>
              <SchoolProfile />
            </PageTransition>
          }
        />

        <Route
          path="timetable"
          element={
            <PageTransition>
              <TimeTable />
            </PageTransition>
          }
        />
        <Route
          path="teachers"
          element={
            <PageTransition>
              <Teachers />
            </PageTransition>
          }
        />

        {/* Enrollment */}
        <Route
          path="enrollment"
          element={
            <PageTransition>
              <EnrollmentDashboard />
            </PageTransition>
          }
        />
        <Route
          path="enrollment/new-inquiry"
          element={
            <PageTransition>
              <NewInquiry />
            </PageTransition>
          }
        />
        <Route
          path="enrollment/apply"
          element={
            <PageTransition>
              <ApplicationForm />
            </PageTransition>
          }
        />
        <Route
          path="enrollment/apply/:inquiryId"
          element={
            <PageTransition>
              <ApplicationForm />
            </PageTransition>
          }
        />
        <Route
          path="enrollment/review/:applicationId"
          element={
            <PageTransition>
              <ApplicationReview />
            </PageTransition>
          }
        />

        {/* Students */}
        <Route
          path="students"
          element={
            <PageTransition>
              <StudentList />
            </PageTransition>
          }
        />
        <Route
          path="students/add"
          element={
            <PageTransition>
              <AddStudent />
            </PageTransition>
          }
        />
        <Route
          path="students/edit/:studentId"
          element={
            <PageTransition>
              <EditStudent />
            </PageTransition>
          }
        />
        <Route
          path="students/attendance"
          element={
            <PageTransition>
              <StudentsAttendance />
            </PageTransition>
          }
        />
        <Route
          path="students/:studentId"
          element={
            <PageTransition>
              <StudentProfile />
            </PageTransition>
          }
        />

        {/* Classes */}
        <Route
          path="classes"
          element={
            <PageTransition>
              <ClassList />
            </PageTransition>
          }
        />
        <Route
          path="classes/add"
          element={
            <PageTransition>
              <AddClass />
            </PageTransition>
          }
        />
        <Route
          path="classes/edit/:classId"
          element={
            <PageTransition>
              <EditClass />
            </PageTransition>
          }
        />
        <Route
          path="classes/:classId"
          element={
            <PageTransition>
              <ClassProfile />
            </PageTransition>
          }
        />

        <Route
          path="staff"
          element={
            <PageTransition>
              <StaffList />
            </PageTransition>
          }
        />
        <Route
          path="staff/add"
          element={
            <PageTransition>
              <AddStaff />
            </PageTransition>
          }
        />
        <Route
          path="staff/:staffId"
          element={
            <PageTransition>
              <StaffProfile />
            </PageTransition>
          }
        />
        <Route
          path="staff/edit/:staffId"
          element={
            <PageTransition>
              <EditStaff />
            </PageTransition>
          }
        />
        <Route
          path="staff/delete/:staffId"
          element={
            <PageTransition>
              <DeleteStaff />
            </PageTransition>
          }
        />
      </Route>

      <Route
        path="/staff-dashboard"
        element={
          <ProtectedRoute>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <PageTransition>
              <StaffDashboard />
            </PageTransition>
          }
        />
        <Route
          path="profile"
          element={
            <PageTransition>
              <TeacherProfile />
            </PageTransition>
          }
        />
        <Route
          path="timetable"
          element={
            <PageTransition>
              <Timetable />
            </PageTransition>
          }
        />
        <Route
          path="assignments"
          element={
            <PageTransition>
              <Assignment />
            </PageTransition>
          }
        />

        <Route
          path="results"
          element={
            <PageTransition>
              <Result />
            </PageTransition>
          }
        />
        <Route
          path="salary"
          element={
            <PageTransition>
              <Salary />
            </PageTransition>
          }
        />
        <Route
          path="attendence"
          element={
            <PageTransition>
              <Attendance />
            </PageTransition>
          }
        />
      </Route>

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <PageTransition>
              <StudentDashboard />
            </PageTransition>
          }
        />
        <Route
          path="student-timetable"
          element={
            <PageTransition>
              <StudentTimeTable />
            </PageTransition>
          }
        />
        <Route
          path="student-attendance"
          element={
            <PageTransition>
              <StudentAttendance />
            </PageTransition>
          }
        />
        <Route
          path="student-fees"
          element={
            <PageTransition>
              <StudentFees />
            </PageTransition>
          }
        />
        <Route
          path="profile"
          element={
            <PageTransition>
              <StudentProfile2 />
            </PageTransition>
          }
        />
        <Route
          path="student-result"
          element={
            <PageTransition>
              <StudentResult />
            </PageTransition>
          }
        />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <AnimatedRoutes />
      </Suspense>
    </HashRouter>
  );
};

export default AppRoutes;
