package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.StudentDto;

public interface StudentService {
	StudentDto createStudent(StudentDto studentDto);
	
	StudentDto getStudentById(Long studentId);
	
	List<StudentDto> getAllStudents();
	
	StudentDto updateStudent(long studentId, StudentDto updatedStudentDto);
	
	void deleteStudent(Long studentId);
	
    StudentDto getStudentByContactNumber(String studentContactNumber);
	StudentDto getStudentByEmail(String studentEmail);
}
