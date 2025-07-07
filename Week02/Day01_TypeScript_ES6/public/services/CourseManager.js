"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseManager = void 0;
var Course_1 = require("../models/Course");
var CourseManager = /** @class */ (function () {
    function CourseManager() {
        var _this = this;
        this.courses = [];
        this.nextId = 1;
        // Xóa khoá học theo ID
        this.deleteCourseById = function (id) {
            var initialLength = _this.courses.length;
            _this.courses = _this.courses.filter(function (course) { return course.id !== id; }); // dùng array filter
            return _this.courses.length < initialLength;
        };
    }
    CourseManager.prototype.addCourse = function (teacher, courseName, duration) {
        if (teacher === void 0) { teacher = "Unknown"; }
        if (courseName === void 0) { courseName = "Unknown Course"; }
        if (duration === void 0) { duration = 1; }
        var course = new Course_1.Course(this.nextId++, teacher, courseName, duration);
        this.courses.push(course);
        console.log("\u2705 Added: ".concat(course.getInfo()));
    };
    CourseManager.prototype.getCourses = function () {
        return __spreadArray([], this.courses, true); // spread
    };
    CourseManager.prototype.updateCourseById = function (id, newData) {
        var course = this.courses.find(function (c) { return c.id === id; });
        if (!course)
            return false;
        var teacher = newData.teacher, courseName = newData.courseName, duration = newData.duration;
        if (teacher !== undefined)
            course.teacher = teacher;
        if (courseName !== undefined)
            course.courseName = courseName;
        if (duration !== undefined)
            course.duration = duration;
        return true;
    };
    return CourseManager;
}());
exports.CourseManager = CourseManager;
