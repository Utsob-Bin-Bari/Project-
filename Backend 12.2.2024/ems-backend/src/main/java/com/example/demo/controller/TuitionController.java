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

import com.example.demo.dto.TuitionDto;
import com.example.demo.service.TuitionService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tuitions")
public class TuitionController {
	
     private TuitionService tuitionService;
	
	
	@PostMapping
	public ResponseEntity<TuitionDto> createTuition(@RequestBody TuitionDto tuitionDto)
	{
		TuitionDto savedTuition = tuitionService.createTuition(tuitionDto); 
		return new  ResponseEntity<> (savedTuition,HttpStatus.CREATED);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<TuitionDto> getTuitionById(@PathVariable("id") Long tuitionId)
	{
		TuitionDto tuitionDto = tuitionService.getTuitionById(tuitionId);
		return ResponseEntity.ok(tuitionDto);
	}
	
	@GetMapping
	public ResponseEntity<List<TuitionDto>> getAlltuitions()
	{
		List<TuitionDto> tuitions = tuitionService.getAllTuitions();
		return ResponseEntity.ok(tuitions);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<TuitionDto> updateTuition(@PathVariable("id") Long tuitionId, @RequestBody TuitionDto updatedTuition)
	{
		TuitionDto tuitionDto = tuitionService.updateTuition(tuitionId, updatedTuition);
		return ResponseEntity.ok(tuitionDto);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteTuition(@PathVariable("id") Long tuitionId)
	{
		tuitionService.deleteTuition(tuitionId);
		return ResponseEntity.ok("Student deleted successfully!");
	}
	
	@GetMapping("/studentId/{studentId}")
	public ResponseEntity<List<TuitionDto>> getTuitionsByStudentId(@PathVariable("studentId") Long studentId) {
	    List<TuitionDto> tuitions = tuitionService.getTuitionByStudentId(studentId);
	    return ResponseEntity.ok(tuitions);
	}
	@GetMapping("/teacherId/{teacherId}")
	public ResponseEntity<List<TuitionDto>> getTuitionsByTeacherId(@PathVariable("teacherId") Long teacherId) {
	    List<TuitionDto> tuitions = tuitionService.getTuitionByTeacherId(teacherId);
	    return ResponseEntity.ok(tuitions);
	}

}
