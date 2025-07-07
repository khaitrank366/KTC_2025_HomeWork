import { CourseManager } from "./services/CourseManager";
import { renderCourseList } from "./ui/render";
import * as readline from "readline";

// Tạo trình quản lý khoá học
const manager = new CourseManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve));

const mainMenu = async () => {
  while (true) {
    console.log(`
======== MENU ========
1. Thêm khoá học
2. Hiển thị danh sách khoá học
3. Cập nhật khoá học theo ID
4. Xoá khoá học theo ID
5. Thoát chương trình
=======================
`);

    const choice = await ask("Chọn chức năng (1-5): ");

    switch (choice) {
      case "1": {
        const teacher = await ask("Tên giảng viên: ");
        const name = await ask("Tên khoá học: ");
        const durationStr = await ask("Thời lượng (giờ): ");
        const duration = parseInt(durationStr);
        manager.addCourse(teacher, name, isNaN(duration) ? 1 : duration);
        break;
      }

      case "2":
        renderCourseList(manager.getCourses());
        break;

      case "3": {
        const idStr = await ask("Nhập ID khoá học cần cập nhật: ");
        const id = parseInt(idStr);
        const teacher = await ask("Giảng viên mới (để trống nếu giữ nguyên): ");
        const name = await ask("Tên mới (để trống nếu giữ nguyên): ");
        const durationStr = await ask(
          "Thời lượng mới (để trống nếu giữ nguyên): "
        );

        const newData: any = {};
        if (teacher) newData.teacher = teacher;
        if (name) newData.courseName = name;
        if (durationStr) newData.duration = parseInt(durationStr);

        const updated = manager.updateCourseById(id, newData);
        console.log(
          updated ? "✅ Cập nhật thành công" : "❌ Không tìm thấy ID"
        );
        break;
      }

      case "4": {
        const idStr = await ask("Nhập ID khoá học cần xoá: ");
        const id = parseInt(idStr);
        const deleted = manager.deleteCourseById(id);
        console.log(
          deleted ? "🗑️ Đã xoá thành công." : "❌ Không tìm thấy ID."
        );
        break;
      }

      case "5":
        console.log("👋 Thoát chương trình.");
        rl.close();
        return;

      default:
        console.log("⚠️ Lựa chọn không hợp lệ. Vui lòng chọn từ 1 đến 5.");
    }
  }
};

mainMenu();
