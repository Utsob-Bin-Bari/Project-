package com.example.demo.mapper;


import com.example.demo.dto.StudentDto;
import com.example.demo.entity.Student;

public class StudentMapper {
	public static StudentDto mapToStudentDto(Student student)
	{
		return new StudentDto(
				student.getStudentId(),
				student.getStudentName(),
				student.getStudentGender(),
				student.getStudentContactNumber(),
				student.getStudentEmail(),
				student.getStudentPassword(),
				student.getStudentAddress(),
				student.getStudentArea(),
				student.getStudentInstitution(),
				student.getStudentGroup(),
				student.getStudentYear(),
				student.getStudentPreferance(),
				student.getStudentCariculam(),
				student.getNid()
				);
	}
	public static Student mapToStudent(StudentDto studentDto)
	{
		return new Student(
				studentDto.getStudentId(),
				studentDto.getStudentName(),
				studentDto.getStudentGender(),
				studentDto.getStudentContactNumber(),
				studentDto.getStudentEmail(),
				studentDto.getStudentPassword(),
				studentDto.getStudentAddress(),
				studentDto.getStudentArea(),
				studentDto.getStudentInstitution(),
				studentDto.getStudentGroup(),
				studentDto.getStudentYear(),
				studentDto.getStudentPreferance(),
				studentDto.getStudentCariculam(),
				studentDto.getNid()
				);
	}
	

}
