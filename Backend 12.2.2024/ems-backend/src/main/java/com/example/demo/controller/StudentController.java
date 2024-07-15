package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.dto.StudentDto;
import com.example.demo.service.StudentService;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {
	private StudentService studentService;
	
	
	@PostMapping
	public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto)
	{
		StudentDto savedStudent = studentService.createStudent(studentDto); 
		return new  ResponseEntity<> (savedStudent,HttpStatus.CREATED);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long studentId)
	{
		StudentDto studentDto = studentService.getStudentById(studentId);
		return ResponseEntity.ok(studentDto);
	}
	
	@GetMapping
	public ResponseEntity<List<StudentDto>> getAllStudents()
	{
		List<StudentDto> students = studentService.getAllStudents();
		return ResponseEntity.ok(students);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId, @RequestBody StudentDto updatedStudent)
	{
		StudentDto studentDto = studentService.updateStudent(studentId, updatedStudent);
		return ResponseEntity.ok(studentDto);
	}
	
	@DeleteMapping("{id}")
	
	public ResponseEntity<String> deleteStudent(@PathVariable("id") Long studentId)
	{
		studentService.deleteStudent(studentId);
		return ResponseEntity.ok("Student deleted successfully!");
	}
	
	@GetMapping("/contactNumber/{studentContactNumber}")
	public ResponseEntity<StudentDto> getStudentByPhoneNumber(@PathVariable("studentContactNumber") String studentContactNumber) {
	    StudentDto students = studentService.getStudentByContactNumber(studentContactNumber);
	    return ResponseEntity.ok(students);
	}
	
	@GetMapping("/email/{studentEmail}")
	public ResponseEntity<StudentDto> getStudentByEmail(@PathVariable("studentEmail") String studentEmail) {
	    StudentDto students = studentService.getStudentByEmail(studentEmail);
	    return ResponseEntity.ok(students);
	}

}
