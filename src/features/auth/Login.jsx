import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoSchool } from "react-icons/io5";
import { MdEmail, MdLock, MdPerson, MdPhone, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { userData } from "../../data/userData";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password is required"),
  role: Yup.string().required("Role is required"),
});

const InputField = ({ icon, type = "text", name, placeholder, showToggle, onToggle, showPassword }) => (
  <div className="relative group animate-fade-in">
    <Field
      type={showToggle ? (showPassword ? "text" : "password") : type}
      name={name}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 peer"
    />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-blue-500 transition-colors">
      {showToggle ? (
        <button type="button" onClick={onToggle} className="cursor-pointer text-slate-400 hover:text-slate-600">
          {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
        </button>
      ) : (
        icon
      )}
    </div>
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1 ml-1" />
  </div>
);

// SVG School Illustration
const SchoolIllustration = () => (
  <svg viewBox="0 0 500 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-fade-in">
    {/* Background leaves/foliage */}
    <ellipse cx="120" cy="350" rx="100" ry="60" fill="#e8f5e9" opacity="0.5" />
    <ellipse cx="400" cy="320" rx="80" ry="50" fill="#e8f5e9" opacity="0.4" />
    <path d="M60 300c20-40 10-80 40-100s50 10 40 50-30 60-50 70-40 20-30-20z" fill="#c8e6c9" opacity="0.6" />
    <path d="M420 250c-15-35 5-70 30-85s40 15 30 50-25 55-40 60-30 10-20-25z" fill="#c8e6c9" opacity="0.5" />

    {/* School building - main body */}
    <rect x="140" y="120" width="200" height="230" rx="4" fill="#FFF3E0" stroke="#E65100" strokeWidth="2" />

    {/* Roof */}
    <polygon points="130,120 240,50 350,120" fill="#D32F2F" stroke="#B71C1C" strokeWidth="2" />
    <rect x="220" y="60" width="40" height="30" rx="2" fill="#FFCDD2" stroke="#D32F2F" strokeWidth="1.5" />

    {/* Windows - row 1 */}
    <rect x="160" y="140" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
    <rect x="205" y="140" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
    <rect x="250" y="140" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
    <rect x="295" y="140" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />

    {/* Window cross bars - row 1 */}
    <line x1="177.5" y1="140" x2="177.5" y2="180" stroke="#0D47A1" strokeWidth="1" />
    <line x1="160" y1="160" x2="195" y2="160" stroke="#0D47A1" strokeWidth="1" />
    <line x1="222.5" y1="140" x2="222.5" y2="180" stroke="#0D47A1" strokeWidth="1" />
    <line x1="205" y1="160" x2="240" y2="160" stroke="#0D47A1" strokeWidth="1" />
    <line x1="267.5" y1="140" x2="267.5" y2="180" stroke="#0D47A1" strokeWidth="1" />
    <line x1="250" y1="160" x2="285" y2="160" stroke="#0D47A1" strokeWidth="1" />
    <line x1="312.5" y1="140" x2="312.5" y2="180" stroke="#0D47A1" strokeWidth="1" />
    <line x1="295" y1="160" x2="330" y2="160" stroke="#0D47A1" strokeWidth="1" />

    {/* Windows - row 2 */}
    <rect x="160" y="200" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
    <rect x="205" y="200" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
    <rect x="250" y="200" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
    <rect x="295" y="200" width="35" height="40" rx="3" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />

    {/* Window cross bars - row 2 */}
    <line x1="177.5" y1="200" x2="177.5" y2="240" stroke="#0D47A1" strokeWidth="1" />
    <line x1="160" y1="220" x2="195" y2="220" stroke="#0D47A1" strokeWidth="1" />
    <line x1="222.5" y1="200" x2="222.5" y2="240" stroke="#0D47A1" strokeWidth="1" />
    <line x1="205" y1="220" x2="240" y2="220" stroke="#0D47A1" strokeWidth="1" />
    <line x1="267.5" y1="200" x2="267.5" y2="240" stroke="#0D47A1" strokeWidth="1" />
    <line x1="250" y1="220" x2="285" y2="220" stroke="#0D47A1" strokeWidth="1" />
    <line x1="312.5" y1="200" x2="312.5" y2="240" stroke="#0D47A1" strokeWidth="1" />
    <line x1="295" y1="220" x2="330" y2="220" stroke="#0D47A1" strokeWidth="1" />

    {/* Door */}
    <rect x="215" y="280" width="50" height="70" rx="25" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
    <circle cx="255" cy="318" r="3" fill="#FFD54F" />

    {/* Steps */}
    <rect x="200" y="350" width="80" height="8" rx="2" fill="#FFCCBC" stroke="#E65100" strokeWidth="1" />
    <rect x="195" y="356" width="90" height="8" rx="2" fill="#FFCCBC" stroke="#E65100" strokeWidth="1" />

    {/* Flag pole */}
    <line x1="240" y1="50" x2="240" y2="20" stroke="#616161" strokeWidth="2" />
    <rect x="242" y="20" width="30" height="18" rx="2" fill="#1565C0" />

    {/* Star rating bubble */}
    <rect x="320" y="70" width="110" height="45" rx="10" fill="white" stroke="#E0E0E0" strokeWidth="1.5" />
    <text x="335" y="88" fontSize="14" fill="#FF8F00">&#9733;&#9733;&#9733;&#9733;&#9733;</text>
    <rect x="335" y="96" width="80" height="6" rx="3" fill="#1565C0" />
    <polygon points="370,115 375,120 365,120" fill="white" stroke="#E0E0E0" strokeWidth="1" />

    {/* Thumbs up bubble */}
    <circle cx="380" cy="170" r="25" fill="white" stroke="#E0E0E0" strokeWidth="1.5" />
    <text x="370" y="177" fontSize="20">&#128077;</text>

    {/* Person sitting */}
    <circle cx="370" cy="290" r="18" fill="#FFCCBC" />
    <path d="M360 308c0 0-10 5-15 30s-5 30 5 30h50c10 0 5-20 0-30s-15-30-15-30" fill="#1565C0" />
    <path d="M345 368h10l5-20" stroke="#1565C0" strokeWidth="3" fill="none" />
    <path d="M390 368h10l-5-20" stroke="#1565C0" strokeWidth="3" fill="none" />
    <ellipse cx="370" cy="283" rx="6" ry="4" fill="#3E2723" />
    <path d="M355 275c0-15 10-22 20-20s15 12 15 20" fill="#3E2723" />

    {/* Backpack */}
    <rect x="395" y="320" width="30" height="40" rx="8" fill="#FF8F00" stroke="#E65100" strokeWidth="1.5" />
    <rect x="400" y="330" width="20" height="12" rx="3" fill="#FFB74D" />
    <line x1="410" y1="315" x2="410" y2="320" stroke="#E65100" strokeWidth="2" />

    {/* Books */}
    <rect x="90" y="330" width="40" height="8" rx="2" fill="#1565C0" />
    <rect x="93" y="322" width="35" height="8" rx="2" fill="#D32F2F" />
    <rect x="96" y="314" width="30" height="8" rx="2" fill="#FF8F00" />

    {/* Pencil */}
    <line x1="85" y1="310" x2="70" y2="280" stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" />
    <polygon points="70,280 67,270 73,270" fill="#3E2723" />

    {/* Ground line */}
    <line x1="50" y1="370" x2="450" y2="370" stroke="#A5D6A7" strokeWidth="3" strokeDasharray="8,4" />

    {/* Small clouds */}
    <ellipse cx="80" cy="80" rx="30" ry="15" fill="#E3F2FD" />
    <ellipse cx="430" cy="60" rx="25" ry="12" fill="#E3F2FD" />

    {/* "SCHOOL" text on building */}
    <text x="200" y="270" fontSize="16" fontWeight="bold" fill="#E65100" letterSpacing="3">SCHOOL</text>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#fafbff] items-center justify-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-green-100/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-[85%] h-[80%] flex items-center justify-center animate-slide-up">
          <SchoolIllustration />
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
              <IoSchool className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Welcome to <span className="text-blue-600">SMS</span></h1>
              <p className="text-xs text-slate-400">School Management System</p>
            </div>
          </div>

          {/* Toggle link */}
          <p className="text-sm text-slate-500 mb-1">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline cursor-pointer"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            {isSignup ? "Sign up" : "Sign in"}
          </h2>

          {/* Login Form */}
          {!isSignup && (
            <Formik
              initialValues={{ email: "", password: "", role: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  localStorage.setItem("token", "demo-token");
                  const isNewUser = !localStorage.getItem("schoolSetupDone");
                  const user = userData.find((user) => user.email === values.email && user.password === values.password && user.role === values.role);
                  if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    toast.success("Login Successful!");
                    navigate(user.role === "Admin" ? "/dashboard" : user.role === "School Admin" ? "/school-admin" : user.role === "Teacher" ? "/teacher" : "/student");
                  } else {
                    toast.error("Invalid email or password or role");
                  }
                }, 600);
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4 animate-fade-in">
                  <InputField icon={<MdEmail size={20} />} type="email" name="email" placeholder="Email*" />
                  <InputField
                    icon={<MdLock size={20} />} type="password" name="password" placeholder="Password*"
                    showToggle onToggle={() => setShowPassword(!showPassword)} showPassword={showPassword}
                  />
                  <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                      Role
                    </label>

                    <Autocomplete
                      options={userData.map((user) => user.role)}
                      value={values.role}
                      onChange={(e, value) => setFieldValue("role", value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Role" />
                      )}
                    />

                    <ErrorMessage name='role' component='div' className='text-red-500 text-xs mt-1' />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200 accent-blue-600" />
                      <span className="text-slate-500">Remember me</span>
                    </label>
                    <button type="button" className="text-blue-600 font-medium hover:underline cursor-pointer">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </span>
                    ) : "Sign In"}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {isSignup && (
            <Formik
              initialValues={{ fullName: "", email: "", phone: "", password: "", confirmPassword: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  localStorage.setItem("token", "demo-token");
                  toast.success("Account created! Let's set up your school.");
                  navigate("/setup");
                }, 600);
              }}
            >
              {({ isSubmitting, handleChange, values }) => (
                <Form className="space-y-4 animate-fade-in">
                  <InputField icon={<MdPerson size={20} />} name="fullName" placeholder="Full Name*" />
                  <InputField icon={<MdEmail size={20} />} type="email" name="email" placeholder="Email*" />
                  <div className="relative group animate-fade-in">
                    <Field
                      type="text" name="phone" placeholder="Phone Number*"
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 peer"
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) handleChange({ target: { name: "phone", value: val } });
                      }}
                      value={values.phone}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-blue-500 transition-colors">
                      <MdPhone size={20} />
                    </div>
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 ml-1" />
                  </div>
                  <InputField
                    icon={<MdLock size={20} />} type="password" name="password" placeholder="Password*"
                    showToggle onToggle={() => setShowPassword(!showPassword)} showPassword={showPassword}
                  />
                  <InputField
                    icon={<MdLock size={20} />} type="password" name="confirmPassword" placeholder="Confirm Password*"
                    showToggle onToggle={() => setShowConfirmPassword(!showConfirmPassword)} showPassword={showConfirmPassword}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account...
                      </span>
                    ) : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Social Login Icons */}
          <div className="flex justify-center gap-4">
            <button className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50 hover:scale-110 transition-all duration-200 cursor-pointer">
              <FaGoogle size={18} />
            </button>
            <button className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-200 cursor-pointer">
              <FaFacebookF size={18} />
            </button>
            <button className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-500 hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50 hover:scale-110 transition-all duration-200 cursor-pointer">
              <FaTwitter size={18} />
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-8">
            By continuing, you agree to our <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;