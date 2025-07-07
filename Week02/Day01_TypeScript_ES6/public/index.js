"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var CourseManager_1 = require("./services/CourseManager");
var render_1 = require("./ui/render");
var readline = require("readline");
// Tạo trình quản lý khoá học
var manager = new CourseManager_1.CourseManager();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var ask = function (question) {
    return new Promise(function (resolve) { return rl.question(question, resolve); });
};
var mainMenu = function () { return __awaiter(void 0, void 0, void 0, function () {
    var choice, _a, teacher, name_1, durationStr, duration, idStr, id, teacher, name_2, durationStr, newData, updated, idStr, id, deleted;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!true) return [3 /*break*/, 17];
                console.log("\n======== MENU ========\n1. Th\u00EAm kho\u00E1 h\u1ECDc\n2. Hi\u1EC3n th\u1ECB danh s\u00E1ch kho\u00E1 h\u1ECDc\n3. C\u1EADp nh\u1EADt kho\u00E1 h\u1ECDc theo ID\n4. Xo\u00E1 kho\u00E1 h\u1ECDc theo ID\n5. Tho\u00E1t ch\u01B0\u01A1ng tr\u00ECnh\n=======================\n");
                return [4 /*yield*/, ask("Chọn chức năng (1-5): ")];
            case 1:
                choice = _b.sent();
                _a = choice;
                switch (_a) {
                    case "1": return [3 /*break*/, 2];
                    case "2": return [3 /*break*/, 6];
                    case "3": return [3 /*break*/, 7];
                    case "4": return [3 /*break*/, 12];
                    case "5": return [3 /*break*/, 14];
                }
                return [3 /*break*/, 15];
            case 2: return [4 /*yield*/, ask("Tên giảng viên: ")];
            case 3:
                teacher = _b.sent();
                return [4 /*yield*/, ask("Tên khoá học: ")];
            case 4:
                name_1 = _b.sent();
                return [4 /*yield*/, ask("Thời lượng (giờ): ")];
            case 5:
                durationStr = _b.sent();
                duration = parseInt(durationStr);
                manager.addCourse(teacher, name_1, isNaN(duration) ? 1 : duration);
                return [3 /*break*/, 16];
            case 6:
                (0, render_1.renderCourseList)(manager.getCourses());
                return [3 /*break*/, 16];
            case 7: return [4 /*yield*/, ask("Nhập ID khoá học cần cập nhật: ")];
            case 8:
                idStr = _b.sent();
                id = parseInt(idStr);
                return [4 /*yield*/, ask("Giảng viên mới (để trống nếu giữ nguyên): ")];
            case 9:
                teacher = _b.sent();
                return [4 /*yield*/, ask("Tên mới (để trống nếu giữ nguyên): ")];
            case 10:
                name_2 = _b.sent();
                return [4 /*yield*/, ask("Thời lượng mới (để trống nếu giữ nguyên): ")];
            case 11:
                durationStr = _b.sent();
                newData = {};
                if (teacher)
                    newData.teacher = teacher;
                if (name_2)
                    newData.courseName = name_2;
                if (durationStr)
                    newData.duration = parseInt(durationStr);
                updated = manager.updateCourseById(id, newData);
                console.log(updated ? "✅ Cập nhật thành công" : "❌ Không tìm thấy ID");
                return [3 /*break*/, 16];
            case 12: return [4 /*yield*/, ask("Nhập ID khoá học cần xoá: ")];
            case 13:
                idStr = _b.sent();
                id = parseInt(idStr);
                deleted = manager.deleteCourseById(id);
                console.log(deleted ? "🗑️ Đã xoá thành công." : "❌ Không tìm thấy ID.");
                return [3 /*break*/, 16];
            case 14:
                console.log("👋 Thoát chương trình.");
                rl.close();
                return [2 /*return*/];
            case 15:
                console.log("⚠️ Lựa chọn không hợp lệ. Vui lòng chọn từ 1 đến 5.");
                _b.label = 16;
            case 16: return [3 /*break*/, 0];
            case 17: return [2 /*return*/];
        }
    });
}); };
mainMenu();
