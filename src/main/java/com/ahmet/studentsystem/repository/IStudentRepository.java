package com.ahmet.studentsystem.repository;

import com.ahmet.studentsystem.repository.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudentRepository extends JpaRepository<Student,Integer> {



}
