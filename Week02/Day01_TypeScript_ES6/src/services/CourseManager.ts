import { Course } from "../models/Course";

export class CourseManager {
  private courses: Course[] = [];
  private nextId: number = 1;

  addCourse(
    teacher: string = "Unknown",
    courseName: string = "Unknown Course",
    duration: number = 1
  ): void {
    const course = new Course(this.nextId++, teacher, courseName, duration);
    this.courses.push(course);
    console.log(`✅ Added: ${course.getInfo()}`);
  }

  getCourses(): Course[] {
    return [...this.courses]; // spread
  }

  updateCourseById(
    id: number,
    newData: Partial<Omit<Course, "id">>
  ): boolean {
    const course = this.courses.find((c) => c.id === id);
    if (!course) return false;

    const { teacher, courseName, duration } = newData;
    if (teacher !== undefined) course.teacher = teacher;
    if (courseName !== undefined) course.courseName = courseName;
    if (duration !== undefined) course.duration = duration;

    return true;
  }

deleteCourseById = (id: number): boolean => {
  const initialLength = this.courses.length;
  this.courses = this.courses.filter(course => course.id !== id); // array filter
  return this.courses.length < initialLength;
};

}
