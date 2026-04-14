import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MdCameraAlt,
  MdVisibility,
  MdVisibilityOff,
  MdClose,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Image upload
  const handleImageUpload = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // Remove image
  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full max-w-4xl  ">
        <Formik
          initialValues={{
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const finalData = {
              ...values,
              profileImage: file || null,
            };
            localStorage.setItem("token", "demo-token");
            toast.success("Account created! Let's set up your school.");
            navigate("/setup");
            console.log("Final Submit:", finalData);
            setSubmitting(false);
          }}
        >
          {({ handleChange, values, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-3">
                  PROFILE IDENTITY
                </p>

                <div className="flex items-center gap-4 animate-fade-in delay-1000">
                  <div className="relative">
                    <label className="w-20 h-20 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MdCameraAlt size={28} className="text-gray-400" />
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>

                    {preview && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <MdClose size={16} />
                      </button>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 bg-gray-100 rounded-xl p-4 text-sm text-gray-500">
                    Drag and drop or click to upload <br />
                    PNG, JPG up to 5MB (1:1 recommended)
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 delay-2000">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    FULL NAME
                  </p>
                  <Field
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border rounded-xl animate-fade-in"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    PHONE NUMBER
                  </p>
                  <Field
                    name="phone"
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 border rounded-xl animate-fade-in"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 10) {
                        handleChange({
                          target: { name: "phone", value: val },
                        });
                      }
                    }}
                    value={values.phone}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  PROFESSIONAL EMAIL
                </p>
                <Field
                  name="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border rounded-xl animate-fade-in"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 delay-1000">
                <div className="relative">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    PASSWORD
                  </p>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded-xl pr-10 animate-fade-in delay-1000"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="relative">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    CONFIRM PASSWORD
                  </p>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border rounded-xl pr-10 animate-fade-in"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </button>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer animate-fade-in delay-1000"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Register in...
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
