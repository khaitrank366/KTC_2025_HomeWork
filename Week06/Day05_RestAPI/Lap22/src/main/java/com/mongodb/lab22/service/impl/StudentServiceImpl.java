package com.mongodb.lab22.service.impl;

import com.mongodb.lab22.dto.StudentDto;
import com.mongodb.lab22.entity.Student;
import com.mongodb.lab22.exception.ResourceNotFoundException;
import com.mongodb.lab22.mapper.StudentMapper;
import com.mongodb.lab22.repository.StudentRepository;
import com.mongodb.lab22.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private static final String STUDENT_NOT_FOUND_MSG = "Student not found with code: ";


    @Override
    @Transactional(readOnly = true)
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(studentMapper::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDto getStudentByCode(String studentCode) {
        Student student = studentRepository.findByStudentCode(studentCode)
                .orElseThrow(() -> new ResourceNotFoundException(STUDENT_NOT_FOUND_MSG + studentCode));
        return studentMapper.toDto(student);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDto createStudent(StudentDto studentDto) {
        studentRepository.findByStudentCode(studentDto.getStudentCode()).ifPresent(s -> {
            throw new IllegalArgumentException("Student with code " + studentDto.getStudentCode() + " already exists.");
        });

        Student student = studentMapper.toEntity(studentDto);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.toDto(savedStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDto updateStudent(String studentCode, StudentDto studentDto) {
        Student existingStudent = studentRepository.findByStudentCode(studentCode)
                .orElseThrow(() -> new ResourceNotFoundException(STUDENT_NOT_FOUND_MSG + studentCode));

        // Cập nhật thông tin
        existingStudent.setName(studentDto.getName());
        existingStudent.setPhone(studentDto.getPhone());
        existingStudent.setEmail(studentDto.getEmail());
        existingStudent.setAddress(studentDto.getAddress());

        Student updatedStudent = studentRepository.save(existingStudent);
        return studentMapper.toDto(updatedStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public void deleteStudent(String studentCode) {
        Student student = studentRepository.findByStudentCode(studentCode)
                .orElseThrow(() -> new ResourceNotFoundException(STUDENT_NOT_FOUND_MSG + studentCode));
        studentRepository.delete(student);
    }
}
