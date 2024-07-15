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
@Table(name = "student")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long studentId;
	
	@Column(name = "name")
	private String studentName;
	
	@Column(name = "gender")
	private String studentGender;
	
	@Column(name = "number",nullable = false, unique = true)
	private String studentContactNumber;

	@Column(name = "email", nullable = false, unique = true)
	private String studentEmail;
	
	@Column(name = "password",nullable = false)
	private String studentPassword;
	
	@Column(name = "adress")
	private String studentAddress;
	
	@Column(name = "area")
	private String studentArea;
	
	@Column(name = "institution")
	private String studentInstitution;
	
	@Column(name = "`group`")
	private String studentGroup;
	
	@Column(name = "ssc")
	private String studentYear;
	
	@Column(name = "preferance")
	private String studentPreferance;
	
	@Column(name = "cariculam")
	private String studentCariculam;
	
	@Column(name = "nid",nullable = false, unique = true)
	private long nid;
}
