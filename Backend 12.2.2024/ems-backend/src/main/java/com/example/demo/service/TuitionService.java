package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.TuitionDto;

public interface TuitionService {
	TuitionDto createTuition(TuitionDto tuitionDto);
	
	TuitionDto getTuitionById(Long tuitionId);
	
	List<TuitionDto> getAllTuitions();
	
	TuitionDto updateTuition(Long tuitionId, TuitionDto updatedTuition);
	
	void deleteTuition(Long tuitionId);
	
	List<TuitionDto> getTuitionByStudentId(Long studentId);
	
    List<TuitionDto> getTuitionByTeacherId(Long teacherId);

}
