package com.ahmet.studentsystem.service;

import com.ahmet.studentsystem.repository.IStudentRepository;
import com.ahmet.studentsystem.repository.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements IStudentService{

    private final IStudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
