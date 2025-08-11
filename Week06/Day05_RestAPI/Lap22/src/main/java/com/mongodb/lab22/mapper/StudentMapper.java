package com.mongodb.lab22.mapper;

import com.mongodb.lab22.dto.StudentDto;
import com.mongodb.lab22.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    StudentDto toDto(Student student);

    Student toEntity(StudentDto studentDto);
}
