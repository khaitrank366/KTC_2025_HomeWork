"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCourseList = void 0;
var renderCourseList = function (courses) {
    console.log("📚 Danh sách khoá học:");
    courses.forEach(function (course, index) {
        var teacher = course.teacher, courseName = course.courseName, duration = course.duration;
        console.log("".concat(index + 1, ". ").concat(courseName, " - taught by ").concat(teacher, " (").concat(duration, " ").concat(duration > 1 ? "hours" : "hour", ")"));
    });
};
exports.renderCourseList = renderCourseList;
