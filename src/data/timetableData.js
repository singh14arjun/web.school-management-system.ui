// timetableData.js

export const periods = [
    "8:00AM - 8:40AM",
    "8:40AM - 9:20AM",
    "9:20AM - 10:00AM",
    "10:00AM - 10:40AM",
    "10:40AM - 11:10AM",
    "11:10AM - 11:50AM",
    "11:50AM - 12:30PM",
    "12:30PM - 1:10PM",
];

export const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


const juniorSubjects = [
    "Mathematics",
    "English",
    "Hindi",
    "Computer Science",
    "GK",
    "Drawing",
    "Sports",
    "SST",
    "Science",
];


const seniorSubjects = [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "PE",
    "Library",
    "Hindi",
];

const rotateSubjects = (subjects, shift) => {
    return subjects.map((_, i) => subjects[(i + shift) % subjects.length]);
};

const generateTimetable = (subjects) => {
    return days.map((day, index) => {
        const rotated = rotateSubjects(subjects, index);

        return {
            day,
            subjects: rotated.map((sub, i) =>
                i === 4 ? "Break" : sub
            ),
        };
    });
};


export const timetableData = {
    1: generateTimetable(juniorSubjects),
    2: generateTimetable(juniorSubjects),
    3: generateTimetable(juniorSubjects),
    4: generateTimetable(juniorSubjects),
    5: generateTimetable(juniorSubjects),
    6: generateTimetable(juniorSubjects),
    7: generateTimetable(juniorSubjects),
    8: generateTimetable(juniorSubjects),

    9: generateTimetable(seniorSubjects),
    10: generateTimetable(seniorSubjects),
    11: generateTimetable(seniorSubjects),
    12: generateTimetable(seniorSubjects),
};