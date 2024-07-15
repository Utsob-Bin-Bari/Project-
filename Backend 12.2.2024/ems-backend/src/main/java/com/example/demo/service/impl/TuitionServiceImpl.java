package com.example.demo.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TuitionDto;
import com.example.demo.entity.Tuition;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.TuitionMapper;
import com.example.demo.repository.TuitionRepository;
import com.example.demo.service.TuitionService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TuitionServiceImpl implements TuitionService {
	 private TuitionRepository tuitionRepository;
	    
		@Override
		public TuitionDto createTuition(TuitionDto tuitionDto) {
			 if (tuitionRepository.existsById(tuitionDto.getTuitionId())) {
			        throw new RuntimeException("Tuition with ID " + tuitionDto.getTuitionId() + " already exists.");
			    }
			Tuition tuition = TuitionMapper.mapToTuition(tuitionDto);
			Tuition savedTuition = tuitionRepository.save(tuition);
			return TuitionMapper.mapToTuitionDto(savedTuition);
		}

		@Override
		public TuitionDto getTuitionById(Long tuitionId) {
			Tuition tuition = tuitionRepository.findById(tuitionId)
			.orElseThrow(() -> new ResourceNotFoundException("Tuition is not exists with given id : " + tuitionId));
			return TuitionMapper.mapToTuitionDto(tuition);
		}
		
		@Override
		public List<TuitionDto> getTuitionByStudentId(Long studentId) {
		    List<Tuition> tuitions = tuitionRepository.findByStudentId(studentId);
		    return tuitions.stream()
		        .map(TuitionMapper::mapToTuitionDto)
		        .collect(Collectors.toList());
		}
		
		@Override
		public List<TuitionDto> getTuitionByTeacherId(Long teacherId) {
		    List<Tuition> tuitions = tuitionRepository.findByTeacherId(teacherId);
		    return tuitions.stream()
		        .map(TuitionMapper::mapToTuitionDto)
		        .collect(Collectors.toList());
		}

		@Override
		public List<TuitionDto> getAllTuitions() {
			List<Tuition> tuitions = tuitionRepository.findAll();
			return tuitions.stream().map((tuition) -> TuitionMapper.mapToTuitionDto(tuition)).collect(Collectors.toList());
		}

		@Override
		public TuitionDto updateTuition(Long tuitionId, TuitionDto updatedTuition) {
			Tuition tuition = tuitionRepository.findById(tuitionId).orElseThrow(
					() -> new ResourceNotFoundException("Tuition is not exist with given Id: " + tuitionId));
			
			tuition.setTuitionId(updatedTuition.getTuitionId());
			tuition.setTeacherId(updatedTuition.getTeacherId());
			tuition.setStudentId(updatedTuition.getStudentId());
			tuition.setSubject(updatedTuition.getSubject());
			tuition.setDuration(updatedTuition.getDuration());
			tuition.setDaysPerWeek(updatedTuition.getDaysPerWeek());
			tuition.setPayment(updatedTuition.getPayment());
			tuition.setStudentNumber(updatedTuition.getStudentNumber());
			tuition.setDescription(updatedTuition.getDescription());
			tuition.setStudentAddress(updatedTuition.getStudentAddress());
			tuition.setStudentArea(updatedTuition.getStudentArea());
			tuition.setTuitionStart(updatedTuition.getTuitionStart());
			tuition.setInstitution(updatedTuition.getInstitution());
	        
			Tuition updatedTuitionObj = tuitionRepository.save(tuition);
			
			return TuitionMapper.mapToTuitionDto(updatedTuitionObj);
		}

		@Override
		public void deleteTuition(Long tuitionId) {
			tuitionRepository.findById(tuitionId).orElseThrow(
					() -> new ResourceNotFoundException("Tuition is not exist with given Id: " + tuitionId));
		
	        tuitionRepository.deleteById(tuitionId);
		}

		

}
