package com.mongodb.lab22.controller;

import com.mongodb.lab22.dto.StudentDto;
import com.mongodb.lab22.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{studentCode}")
    public ResponseEntity<StudentDto> getStudentByCode(@PathVariable String studentCode) {
        StudentDto student = studentService.getStudentByCode(studentCode);
        return ResponseEntity.ok(student);
    }

    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto) {
        StudentDto createdStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @PutMapping("/{studentCode}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable String studentCode, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudent = studentService.updateStudent(studentCode, studentDto);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{studentCode}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentCode) {
        studentService.deleteStudent(studentCode);
        return ResponseEntity.noContent().build();
    }
}
