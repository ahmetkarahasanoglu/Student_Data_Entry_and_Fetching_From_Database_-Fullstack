package com.ahmet.studentsystem.controller;

import com.ahmet.studentsystem.repository.entity.Student;
import com.ahmet.studentsystem.service.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {

    private final IStudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New student has been added.";
    }

    @PostMapping("/getall")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

}
