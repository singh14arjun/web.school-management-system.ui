import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const steps = ["Basic Info", "School Details"];

import imageCompression from "browser-image-compression";

const compressFile = async (file) => {
    const options = {
        maxSizeMB: 0.02,
        maxWidthOrHeight: 500,
        useWebWorker: true
    };
    return await imageCompression(file, options);
};
const MAX_SIZE = 1 * 1024 * 1024; // 1MB

const formatSize = (size) => (size / 1024 / 1024).toFixed(2) + " MB";

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
const validationSchemas = [
    yup.object({
        schoolName: yup.string().required("School name is required"),
        schoolCode: yup.string().required("School code is required"),
        affiliationId: yup.string().required("Affiliation id is required"),
        schoolPhone: yup
            .string()
            .matches(/^[0-9]{10}$/, "School phone must be 10 digits")
            .required("School phone is required"),
        schoolEmail: yup.string().email().required("School email is required"),
        label: yup.string().required("School label is required"),
        medium: yup.string().required("School medium is required"),
        type: yup.string().required("School type is required")
    }),

    yup.object({
        address: yup.object({
            street: yup.string().required("Street is required"),
            city: yup.string().required("City is required"),
            state: yup.string().required("State is required"),
            pincode: yup
                .string()
                .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
                .required("Pincode is required")
        }),
        // schoolLogo: yup.mixed().required("School logo is required"),
        // schoolImages: yup
        // .array()
        // .min(1, "At least one image is required")
    })
];

const AddSchools = () => {
    const navigate = useNavigate();
    const [pincodeTimer, setPincodeTimer] = useState(null);
    const [postOffices, setPostOffices] = useState([]);
    const [pinError, setPinError] = useState("");

    const [activeStep, setActiveStep] = useState(0);
    const [schoolConfig, setSchoolConfig] = useState({
        labels: [],
        mediums: [],
        types: []
    });

    useEffect(() => {
        axios.get("http://localhost:3000/schoolConfig")
            .then(res => setSchoolConfig(res.data));
    }, []);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <Box sx={{ maxWidth: 500, margin: "auto" }}>
            <Typography variant="h5">Add School</Typography>

            <Stepper activeStep={activeStep} sx={{ my: 2 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Formik
                initialValues={{
                    schoolName: "",
                    schoolCode: "",
                    affiliationId: "",
                    schoolPhone: "",
                    schoolEmail: "",
                    label: "",
                    medium: "",
                    type: "",
                    address: {
                        street: "",
                        area: "",
                        city: "",
                        state: "",
                        pincode: ""
                    },
                    schoolLogo: null,
                    schoolImages: []
                }}
                validationSchema={validationSchemas[activeStep]}
                onSubmit={async (values, { setSubmitting }) => {
                    try {

                        let logoBase64 = null;
                        let imagesBase64 = [];

                        // ✅ Only compress if logo exists
                        if (values.schoolLogo && values.schoolLogo instanceof File) {
                            const compressedLogo = await compressFile(values.schoolLogo);
                            logoBase64 = await toBase64(compressedLogo);
                        }

                        // ✅ Only process images if exist
                        if (values.schoolImages && values.schoolImages.length > 0) {
                            const compressedImages = await Promise.all(
                                values.schoolImages.map(file => compressFile(file))
                            );

                            imagesBase64 = await Promise.all(
                                compressedImages.map(file => toBase64(file))
                            );
                        }

                        const finalData = {
                            ...values,
                            isActive: true,
                            schoolLogo: logoBase64,   // can be null ✅
                            schoolImages: imagesBase64 // can be [] ✅
                        };

                        await axios.post("http://localhost:3000/schools", finalData);

                        toast.success("School Added Successfully");
                        navigate("/admin");

                    } catch (error) {
                        console.error("Submission error:", error);
                        toast.error("Error adding school");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, handleChange, setFieldValue, errors, touched, isValid, validateForm, setTouched, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>

                        {activeStep === 0 && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="School Name"
                                    name="schoolName"
                                    onChange={handleChange}
                                    value={values?.schoolName}
                                    error={touched?.schoolName && Boolean(errors?.schoolName)}
                                    helperText={touched?.schoolName && errors?.schoolName}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="School Code"
                                    name="schoolCode"
                                    onChange={handleChange}
                                    value={values?.schoolCode}
                                    error={touched?.schoolCode && Boolean(errors?.schoolCode)}
                                    helperText={touched?.schoolCode && errors?.schoolCode}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Affiliation ID"
                                    name="affiliationId"
                                    onChange={handleChange}
                                    value={values?.affiliationId}
                                    error={touched?.affiliationId && Boolean(errors?.affiliationId)}
                                    helperText={touched?.affiliationId && errors?.affiliationId}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Phone"
                                    name="schoolPhone"
                                    value={values?.schoolPhone}

                                    slotProps={{ maxLength: 10 }}   // ✅ limits length
                                    onChange={(e) => {
                                        let value = e?.target?.value;

                                        // ✅ remove non-numeric characters
                                        value = value.replace(/\D/g, "");

                                        // ✅ limit to 10 digits
                                        if (value.length <= 10) {
                                            handleChange({
                                                target: {
                                                    name: "schoolPhone",
                                                    value
                                                }
                                            });
                                        }
                                    }}
                                    onPaste={(e) => {
                                        const paste = e?.clipboardData?.getData("text");
                                        if (!/^\d+$/.test(paste)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    error={touched?.schoolPhone && Boolean(errors?.schoolPhone)}
                                    helperText={touched?.schoolPhone && errors?.schoolPhone}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    name="schoolEmail"
                                    onChange={handleChange}
                                    value={values?.schoolEmail}
                                    error={touched?.schoolEmail && Boolean(errors?.schoolEmail)}
                                    helperText={touched?.schoolEmail && errors?.schoolEmail}
                                />

                                <TextField
                                    select
                                    fullWidth
                                    margin="normal"
                                    label="Educational Label"
                                    name="label"
                                    onChange={handleChange}
                                    value={values?.label}
                                    error={touched?.label && Boolean(errors?.label)}
                                    helperText={touched?.label && errors?.label}
                                >
                                    {schoolConfig.labels.map((item, i) => (
                                        <MenuItem key={i} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    margin="normal"
                                    label="Medium of Instruction"
                                    name="medium"
                                    onChange={handleChange}
                                    value={values?.medium}
                                    error={touched?.medium && Boolean(errors?.medium)}
                                    helperText={touched?.medium && errors?.medium}
                                >
                                    {schoolConfig.mediums.map((item, i) => (
                                        <MenuItem key={i} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    margin="normal"
                                    label="School Type"
                                    name="type"
                                    onChange={handleChange}
                                    value={values?.type}
                                    error={touched?.type && Boolean(errors?.type)}
                                    helperText={touched?.type && errors?.type}
                                >
                                    {schoolConfig.types.map((item, i) => (
                                        <MenuItem key={i} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>
                            </>
                        )}

                        {activeStep === 1 && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Pincode"
                                    name="address.pincode"
                                    value={values?.address?.pincode}
                                    error={touched?.address?.pincode && Boolean(errors?.address?.pincode)}
                                    helperText={touched?.address?.pincode && errors?.address?.pincode}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, "");

                                        if (value.length <= 6) {
                                            handleChange({
                                                target: {
                                                    name: "address.pincode",
                                                    value
                                                }
                                            });
                                        }

                                        if (pincodeTimer) clearTimeout(pincodeTimer);

                                        const timer = setTimeout(async () => {
                                            if (value?.length === 6) {
                                                try {
                                                    const res = await axios.get(
                                                        `https://api.postalpincode.in/pincode/${value}`
                                                    );

                                                    if (res.data[0].Status === "Success") {
                                                        setPostOffices(res.data[0]?.PostOffice);
                                                        setPinError("");
                                                    } else {
                                                        setPostOffices([]);
                                                        setPinError("Invalid Pincode");
                                                    }
                                                } catch {
                                                    setPinError("Error fetching pincode");
                                                }
                                            }
                                        }, 500);

                                        setPincodeTimer(timer);
                                    }}
                                // error={Boolean(pinError)}
                                // helperText={pinError}
                                />

                                {postOffices.length > 0 && (
                                    <TextField
                                        select
                                        fullWidth
                                        margin="normal"
                                        label="Select Area"
                                        onChange={(e) => {
                                            const selected = postOffices[e?.target?.value];

                                            setFieldValue("address.city", selected?.District);
                                            setFieldValue("address.state", selected?.State);
                                            setFieldValue("address.area", selected?.Name); // ✅ area
                                        }}
                                    >
                                        {postOffices.map((po, index) => (
                                            <MenuItem key={index} value={index}>
                                                {po?.Name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Street"
                                    name="address.street"
                                    value={values?.address?.street}
                                    onChange={handleChange}
                                    error={touched?.address?.street && Boolean(errors?.address?.street)}
                                    helperText={touched?.address?.street && errors?.address?.street}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="City"
                                    name="address.city"
                                    value={values?.address?.city}
                                    onChange={handleChange}
                                    error={touched?.address?.city && Boolean(errors?.address?.city)}
                                    helperText={touched?.address?.city && errors?.address?.city}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="State"
                                    name="address.state"
                                    value={values?.address?.state}
                                    onChange={handleChange}
                                    error={touched?.address?.state && Boolean(errors?.address?.state)}
                                    helperText={touched?.address?.state && errors?.address?.state}
                                />


                                {/* School Logo */}
                                <Box mt={2} className="mt-2 border-2 border-gray-200 rounded-lg p-2 flex flex-col">
                                    <label>School Logo</label>
                                    <input
                                        className="border-2 border-gray-200 rounded-lg p-2 bg-blue-500 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.currentTarget.files[0];

                                            if (!file) return;

                                            if (file.size > MAX_SIZE) {
                                                toast.error("Logo must be less than 1MB");
                                                return;
                                            }

                                            setFieldValue("schoolLogo", file);
                                        }}
                                    />
                                    {touched.schoolLogo && errors.schoolLogo && (
                                        <div style={{ color: "red" }}>{errors.schoolLogo}</div>
                                    )}
                                    {values.schoolLogo && (
                                        <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
                                            <img
                                                src={URL.createObjectURL(values.schoolLogo)}
                                                width="60"
                                                alt="logo"
                                            />

                                            <Typography variant="caption">
                                                {formatSize(values.schoolLogo.size)}
                                            </Typography>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => setFieldValue("schoolLogo", null)}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    )}
                                </Box>


                                <Box mt={2} className="mt-2 border-2 border-gray-200 rounded-lg p-2 flex flex-col gap-2">
                                    <label>School Images</label>
                                    <input
                                        className="border-2 border-gray-200 rounded-lg p-2 bg-blue-500 cursor-pointer"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            const files = Array.from(e.currentTarget.files);

                                            const validFiles = [];
                                            const rejected = [];

                                            files.forEach(file => {
                                                if (file.size <= MAX_SIZE) {
                                                    validFiles.push(file);
                                                } else {
                                                    rejected.push(file);
                                                }
                                            });

                                            if (rejected.length > 0) {
                                                toast.error("Some images exceed 1MB and were removed");
                                            }

                                            setFieldValue("schoolImages", validFiles);
                                        }}
                                    />
                                    {errors.schoolImages && typeof errors.schoolImages === 'string' && (
                                        <div style={{ color: "red" }}>{errors.schoolImages}</div>
                                    )}
                                </Box>


                                <Box display="flex" gap={2} flexWrap="wrap">
                                    {values.schoolImages.map((file, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                border: "1px solid #ccc",
                                                p: 1,
                                                borderRadius: 2
                                            }}
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                width="80"
                                                alt="preview"
                                                className="rounded-lg"
                                            />

                                            <Typography variant="caption" display="block">
                                                {formatSize(file.size)}
                                            </Typography>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => {
                                                    const updated = values.schoolImages.filter((_, index) => index !== i);
                                                    setFieldValue("schoolImages", updated);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}

                        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                            {activeStep > 0 && (
                                <Button type="button" variant="outlined" onClick={handleBack}>Back</Button>
                            )}

                            {activeStep < steps.length - 1 ? (
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={async () => {
                                        const errors = await validateForm();

                                        // ✅ Mark ALL step 1 fields as touched
                                        setTouched({
                                            schoolName: true,
                                            schoolCode: true,
                                            affiliationId: true,
                                            schoolPhone: true,
                                            schoolEmail: true,
                                            label: true,
                                            medium: true,
                                            type: true
                                        });

                                        // ✅ Only go next if no errors
                                        if (Object.keys(errors).length === 0) {
                                            handleNext();
                                        }
                                    }}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    startIcon={isSubmitting && <CircularProgress size={20} />}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            )}
                        </Box>

                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddSchools;