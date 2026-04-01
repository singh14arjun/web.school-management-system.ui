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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const steps = ["Basic Info", "School Details"];

const compressFile = async (file) => {
    if (!file || typeof file === "string") return file;
    const options = {
        maxSizeMB: 0.02,
        maxWidthOrHeight: 500,
        useWebWorker: true
    };
    return await imageCompression(file, options);
};

// const imagesBase64 = await Promise.all(
//     values.schoolImages.map(async (file) => {

//         if (typeof file === "string") return file;

//         const compressed = await compressFile(file);
//         return await toBase64(compressed);
//     })
// );

const toBase64 = (file) => {
    if (!file) return null;

    if (typeof file === "string") return Promise.resolve(file);

    if (!(file instanceof Blob)) {
        console.error("Invalid file type:", file);
        return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
};

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
        schoolImages: yup
            .array()
            .min(1, "At least one image is required")
    })
];

const EditSchool = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [school, setSchool] = useState(null);

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

        axios.get(`http://localhost:3000/schools/${id}`)
            .then(response => {
                setSchool(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching school:", error);
                toast.error("Failed to load school data");
            });
    }, [id]);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    if (!school) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", pb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Edit School</Typography>

            <Stepper activeStep={activeStep} sx={{ my: 2 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Formik
                enableReinitialize
                initialValues={{
                    schoolName: school.schoolName || "",
                    schoolCode: school.schoolCode || "",
                    affiliationId: school.affiliationId || "",
                    schoolPhone: school.schoolPhone || "",
                    schoolEmail: school.schoolEmail || "",
                    label: school.label || "",
                    medium: school.medium || "",
                    type: school.type || "",
                    address: {
                        street: school.address?.street || "",
                        area: school.address?.area || "",
                        city: school.address?.city || "",
                        state: school.address?.state || "",
                        pincode: school.address?.pincode || ""
                    },
                    schoolLogo: school.schoolLogo || null,
                    schoolImages: school.schoolImages || []
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={validationSchemas[activeStep]}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        let logoBase64 = values.schoolLogo;

                        if (values.schoolLogo && typeof values.schoolLogo !== "string") {
                            const compressedLogo = await compressFile(values.schoolLogo);
                            logoBase64 = await toBase64(compressedLogo);
                        }
                        const compressedImages = await Promise.all(
                            values.schoolImages.map(file => compressFile(file))
                        );
                        const imagesBase64 = await Promise.all(
                            compressedImages.map(file => toBase64(file))
                        );

                        const finalData = {
                            ...values,
                            isActive: school.isActive !== undefined ? school.isActive : true,
                            schoolLogo: logoBase64,
                            schoolImages: imagesBase64
                        };

                        await axios.put(`http://localhost:3000/schools/${id}`, finalData);

                        toast.success("School Updated Successfully");
                        navigate("/admin");
                    } catch (error) {
                        console.error("Submission error:", error);
                        toast.error("Error updating school");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, handleChange, setFieldValue, errors, touched, isValid, validateForm, setTouched, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} onKeyDown={(e) => e.key === "Enter" && handleNext()} >

                        {activeStep === 0 && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="School Name"
                                    name="schoolName"
                                    onChange={handleChange}
                                    value={values.schoolName}
                                    error={touched.schoolName && Boolean(errors.schoolName)}
                                    helperText={touched.schoolName && errors.schoolName}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="School Code"
                                    name="schoolCode"
                                    onChange={handleChange}
                                    value={values.schoolCode}
                                    error={touched.schoolCode && Boolean(errors.schoolCode)}
                                    helperText={touched.schoolCode && errors.schoolCode}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Affiliation ID"
                                    name="affiliationId"
                                    onChange={handleChange}
                                    value={values.affiliationId}
                                    error={touched.affiliationId && Boolean(errors.affiliationId)}
                                    helperText={touched.affiliationId && errors.affiliationId}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Phone"
                                    name="schoolPhone"
                                    value={values.schoolPhone}
                                    slotProps={{ htmlInput: { maxLength: 10 } }}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, "");
                                        if (value.length <= 10) {
                                            handleChange({ target: { name: "schoolPhone", value } });
                                        }
                                    }}
                                    onPaste={(e) => {
                                        const paste = e.clipboardData.getData("text");
                                        if (!/^\d+$/.test(paste)) e.preventDefault();
                                    }}
                                    error={touched.schoolPhone && Boolean(errors.schoolPhone)}
                                    helperText={touched.schoolPhone && errors.schoolPhone}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    name="schoolEmail"
                                    onChange={handleChange}
                                    value={values.schoolEmail}
                                    error={touched.schoolEmail && Boolean(errors.schoolEmail)}
                                    helperText={touched.schoolEmail && errors.schoolEmail}
                                />

                                <TextField
                                    select
                                    fullWidth
                                    margin="normal"
                                    label="Educational Label"
                                    name="label"
                                    onChange={handleChange}
                                    value={values.label}
                                    error={touched.label && Boolean(errors.label)}
                                    helperText={touched.label && errors.label}
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
                                    value={values.medium}
                                    error={touched.medium && Boolean(errors.medium)}
                                    helperText={touched.medium && errors.medium}
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
                                    value={values.type}
                                    error={touched.type && Boolean(errors.type)}
                                    helperText={touched.type && errors.type}
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
                                    value={values.address?.pincode}
                                    error={touched.address?.pincode && Boolean(errors.address?.pincode)}
                                    helperText={touched.address?.pincode && errors.address?.pincode}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, "");
                                        if (value.length <= 6) {
                                            handleChange({ target: { name: "address.pincode", value } });
                                        }

                                        if (pincodeTimer) clearTimeout(pincodeTimer);

                                        const timer = setTimeout(async () => {
                                            if (value.length === 6) {
                                                try {
                                                    const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
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
                                />

                                {postOffices.length > 0 && (
                                    <TextField
                                        select
                                        fullWidth
                                        margin="normal"
                                        label="Select Area"
                                        onChange={(e) => {
                                            const selected = postOffices[e.target.value];
                                            setFieldValue("address.city", selected?.District);
                                            setFieldValue("address.state", selected?.State);
                                            setFieldValue("address.area", selected?.Name);
                                        }}
                                        defaultValue=""
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
                                    value={values.address?.street}
                                    onChange={handleChange}
                                    error={touched.address?.street && Boolean(errors.address?.street)}
                                    helperText={touched.address?.street && errors.address?.street}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="City"
                                    name="address.city"
                                    value={values.address?.city}
                                    onChange={handleChange}
                                    error={touched.address?.city && Boolean(errors.address?.city)}
                                    helperText={touched.address?.city && errors.address?.city}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="State"
                                    name="address.state"
                                    value={values.address?.state}
                                    onChange={handleChange}
                                    error={touched.address?.state && Boolean(errors.address?.state)}
                                    helperText={touched.address?.state && errors.address?.state}
                                />

                                {/* School Logo */}
                                <Box mt={2} className="mt-2 border-2 border-gray-200 rounded-lg p-2 flex flex-col">
                                    <label>School Logo</label>
                                    <input
                                        className="border-2 border-gray-200 rounded-lg p-2 bg-blue-500 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setFieldValue("schoolLogo", e.currentTarget.files[0]);
                                        }}
                                    />
                                    {touched.schoolLogo && errors.schoolLogo && (
                                        <div style={{ color: "red" }}>{errors.schoolLogo}</div>
                                    )}
                                    {values.schoolLogo && (
                                        <img
                                            src={typeof values.schoolLogo === "string" ? values.schoolLogo : URL.createObjectURL(values.schoolLogo)}
                                            width="50"
                                            alt="logo"
                                            className="rounded-lg mt-2"
                                        />
                                    )}
                                </Box>

                                {/* School Images */}
                                <Box mt={2} className="mt-2 border-2 border-gray-200 rounded-lg p-2 flex flex-col gap-2">
                                    <label>School Images</label>
                                    <input
                                        className="border-2 border-gray-200 rounded-lg p-2 bg-blue-500 cursor-pointer"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            const files = Array.from(e.currentTarget.files);
                                            setFieldValue("schoolImages", files);
                                        }}
                                    />
                                    {errors.schoolImages && typeof errors.schoolImages === 'string' && (
                                        <div style={{ color: "red" }}>{errors.schoolImages}</div>
                                    )}
                                </Box>

                                {/* Images Preview */}
                                <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                                    {Array.isArray(values.schoolImages) && values.schoolImages.map((file, i) => (
                                        <img
                                            key={i}
                                            src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                            width="80"
                                            alt="preview"
                                            className="rounded-lg"
                                        />
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
                                    onClick={handleNext}
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
                                    {isSubmitting ? "Updating..." : "Submit"}
                                </Button>
                            )}
                        </Box>

                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default EditSchool;