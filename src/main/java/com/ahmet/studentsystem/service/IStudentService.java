package com.ahmet.studentsystem.service;

import com.ahmet.studentsystem.repository.entity.Student;

import java.util.List;

public interface IStudentService {

    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
