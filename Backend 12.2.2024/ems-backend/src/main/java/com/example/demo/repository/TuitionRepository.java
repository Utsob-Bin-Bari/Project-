package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Tuition;
import java.util.List;

public interface TuitionRepository extends JpaRepository<Tuition, Long> {
    
	List<Tuition> findByStudentId(Long studentId);
	List<Tuition> findByTeacherId(Long teacherId);

}

