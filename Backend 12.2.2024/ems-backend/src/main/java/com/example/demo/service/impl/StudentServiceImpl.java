package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;


import com.example.demo.dto.StudentDto;
import com.example.demo.entity.Student;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.StudentMapper;
import com.example.demo.repository.StudentRepository;
import com.example.demo.service.StudentService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService{
    private StudentRepository studentRepository;
    
	@Override
	public StudentDto createStudent(StudentDto studentDto) {
		 if (studentRepository.existsById(studentDto.getStudentId())) {
		        throw new RuntimeException("Student with ID " + studentDto.getStudentId() + " already exists.");
		    }
		Student student = StudentMapper.mapToStudent(studentDto);
		Student savedStudent = studentRepository.save(student);
		return StudentMapper.mapToStudentDto(savedStudent);
	}

	@Override
	public StudentDto getStudentById(Long studentId) {
		Student student = studentRepository.findById(studentId)
		.orElseThrow(() -> new ResourceNotFoundException("Student is not exists with given id : " + studentId));
		return StudentMapper.mapToStudentDto(student);
	}

	@Override
	public List<StudentDto> getAllStudents() {
		List<Student> students = studentRepository.findAll();
		return students.stream().map((student) -> StudentMapper.mapToStudentDto(student)).collect(Collectors.toList());
	}

	@Override
	public StudentDto updateStudent(long studentId, StudentDto updatedStudent) {
		Student student = studentRepository.findById(studentId).orElseThrow(
				() -> new ResourceNotFoundException("Student is not exist with given Id: " + studentId));
		
		student.setStudentId(updatedStudent.getStudentId());
		student.setStudentName(updatedStudent.getStudentName());
		student.setStudentGender(updatedStudent.getStudentGender());
		student.setStudentContactNumber(updatedStudent.getStudentContactNumber());
		student.setStudentEmail(updatedStudent.getStudentEmail());
		student.setStudentPassword(updatedStudent.getStudentPassword());
		student.setStudentAddress(updatedStudent.getStudentAddress());
		student.setStudentArea(updatedStudent.getStudentArea());
		student.setStudentInstitution(updatedStudent.getStudentInstitution());
		student.setStudentGroup(updatedStudent.getStudentGroup());
		student.setStudentYear(updatedStudent.getStudentYear());
		student.setStudentPreferance(updatedStudent.getStudentPreferance());
		student.setStudentCariculam(updatedStudent.getStudentCariculam());
		student.setNid(updatedStudent.getNid());
        
		Student updatedStudentObj = studentRepository.save(student);
		
		return StudentMapper.mapToStudentDto(updatedStudentObj);
	}

	@Override
	public void deleteStudent(Long studentId) {
		studentRepository.findById(studentId).orElseThrow(
				() -> new ResourceNotFoundException("Student is not exist with given Id: " + studentId));
	
        studentRepository.deleteById(studentId);
	}
	
	@Override
	public StudentDto getStudentByContactNumber(String studentContactNumber) {
	    Optional<Student> student = studentRepository.findByStudentContactNumber(studentContactNumber);
	    if (student.isPresent()) {
	        return StudentMapper.mapToStudentDto(student.get());
	    } else {
	        throw new ResourceNotFoundException("Student not found with contact number: " + studentContactNumber);
	    }
	}
	
	@Override
	public StudentDto getStudentByEmail(String studentEmail) {
	    Optional<Student> student = studentRepository.findByStudentEmail(studentEmail);
	    if (student.isPresent()) {
	        return StudentMapper.mapToStudentDto(student.get());
	    } else {
	        throw new ResourceNotFoundException("Employee not found with contact number: " + studentEmail);
	    }
	}

// #Optional can't use .orElseThrow method.
//	@Override
//	public StudentDto getStudentByEmail(String studentEmail) {
//		Student student = studentRepository.findByStudentEmail(studentEmail)
//		.orElseThrow(() -> new ResourceNotFoundException("Student is not exists with given Email : " + studentEmail));
//		return StudentMapper.mapToStudentDto(student);
//	}

}
