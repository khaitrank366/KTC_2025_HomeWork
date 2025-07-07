export class Course {
  constructor(
    public id: number,
    public teacher: string = "Unknown",
    public courseName: string = "Unknown Course",
    public duration: number = 1
  ) {}

  getInfo(): string {
    return `${this.courseName} - taught by ${this.teacher} (${this.duration} ${this.duration > 1 ? "hours" : "hour"})`;
  }
}
