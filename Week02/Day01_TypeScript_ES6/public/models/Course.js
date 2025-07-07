"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
var Course = /** @class */ (function () {
    function Course(id, teacher, courseName, duration) {
        if (teacher === void 0) { teacher = "Unknown"; }
        if (courseName === void 0) { courseName = "Unknown Course"; }
        if (duration === void 0) { duration = 1; }
        this.id = id;
        this.teacher = teacher;
        this.courseName = courseName;
        this.duration = duration;
    }
    Course.prototype.getInfo = function () {
        return "".concat(this.courseName, " - taught by ").concat(this.teacher, " (").concat(this.duration, " ").concat(this.duration > 1 ? "hours" : "hour", ")");
    };
    return Course;
}());
exports.Course = Course;
