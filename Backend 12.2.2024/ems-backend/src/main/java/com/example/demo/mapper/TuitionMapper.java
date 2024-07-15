package com.example.demo.mapper;



import com.example.demo.dto.TuitionDto;
import com.example.demo.entity.Tuition;

public class TuitionMapper {
	public static TuitionDto mapToTuitionDto(Tuition tuition)
	{
		return new TuitionDto(
				tuition.getTuitionId(),
				tuition.getTeacherId(),
				tuition.getStudentId(),
				tuition.getSubject(),
				tuition.getDuration(),
				tuition.getDaysPerWeek(),
				tuition.getPayment(),
				tuition.getStudentNumber(),
				tuition.getDescription(),
				tuition.getStudentAddress(),
				tuition.getStudentArea(),
				tuition.getTuitionStart(),
				tuition.getInstitution()
				);
	}
	public static Tuition mapToTuition(TuitionDto tuitionDto)
	{
		return new Tuition(
				tuitionDto.getTuitionId(),
				tuitionDto.getTeacherId(),
				tuitionDto.getStudentId(),
				tuitionDto.getSubject(),
				tuitionDto.getDuration(),
				tuitionDto.getDaysPerWeek(),
				tuitionDto.getPayment(),
				tuitionDto.getStudentNumber(),
				tuitionDto.getDescription(),
				tuitionDto.getStudentAddress(),
				tuitionDto.getStudentArea(),
				tuitionDto.getTuitionStart(),
				tuitionDto.getInstitution()
				);
	}
	

}


