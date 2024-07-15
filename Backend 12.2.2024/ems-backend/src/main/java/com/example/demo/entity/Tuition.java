package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Tuition {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long tuitionId;
	
	@Column(name = "teacher_id")
	private long teacherId;
	
	@Column(name = "student_id")
	private long studentId;
	
	@Column(name = "subject")
	private String subject;
	
	@Column(name = "duration")
	private String duration;
	
	@Column(name = "days_per_week")
	private String daysPerWeek;
	
	@Column(name = "payment")
	private String payment;

	@Column(name = "number_of_student")
	private String studentNumber;
	
	@Column(name = "description")
	private String description;	
	
	@Column(name ="student_address")
	private String studentAddress;
	
	@Column(name ="student_area")
	private String studentArea;
	
	@Column(name ="tuition_start")
	private String tuitionStart;
	
	@Column(name ="institution")
	private String institution;
	
	
}
