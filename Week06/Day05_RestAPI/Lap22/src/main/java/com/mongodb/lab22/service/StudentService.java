package com.mongodb.lab22.service;

import com.mongodb.lab22.dto.StudentDto;

import java.util.List;

public interface StudentService {
    List<StudentDto> getAllStudents();
    StudentDto getStudentByCode(String studentCode);
    StudentDto createStudent(StudentDto studentDto);
    StudentDto updateStudent(String studentCode, StudentDto studentDto);
    void deleteStudent(String studentCode);
}
