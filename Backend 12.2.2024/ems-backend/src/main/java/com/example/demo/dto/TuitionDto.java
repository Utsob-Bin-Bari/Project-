package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TuitionDto {
	private long tuitionId;
	private long teacherId;
	private long studentId;
	private String subject;
	private String duration;
	private String daysPerWeek;
	private String payment;
	private String studentNumber;
	private String description;	
	private String studentAddress;
	private String studentArea;
	private String tuitionStart;
	private String institution;

}
