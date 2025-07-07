import { Course } from "../models/Course";

export const renderCourseList = (courses: Course[]): void => {
  console.log("📚 Danh sách khoá học:");
  courses.forEach((course, index) => {
    const { teacher, courseName, duration } = course;
    console.log(
      `${index + 1}. ${courseName} - taught by ${teacher} (${duration} ${
        duration > 1 ? "hours" : "hour"
      })`
    );
  });
};
