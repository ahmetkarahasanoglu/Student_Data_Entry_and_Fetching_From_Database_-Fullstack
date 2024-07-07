import * as React from 'react';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

const theme = createTheme();

const Root = styled('div')(({ theme }) => ({
    '& > *': {
        margin: theme.spacing(1),
    },
}));

export default function Student() {
  const paperStyle={padding:"50px 20px", width:600, margin:"20px auto"}
  const[name, setName] = useState('');
  const[address, setAddress] = useState('');
  const[countForTriggeringUseEffect, setCountForTriggeringUseEffect] = useState(0);
  const[students, setStudents] = useState([]); // this state of array is to show the list of students retrieved from database (which will be shown at the bottom of browser page).

  const handleClick = (e) => {
    e.preventDefault()
    const student = {name, address}
    console.log(student) // to take a look
    fetch('http://localhost:8080/student/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student)
    }).then(()=>{
        console.log("new student added")
    }).then(()=>{
        setCountForTriggeringUseEffect(countForTriggeringUseEffect + 1)
    }).catch((error)=>{
        console.error("Error is: ", error)
    })
  }

  useEffect(()=>{  // for showing list of students (at the bottom part of the browser page) when there is a change in the 'countForTriggeringUseEffect'
    fetch("http://localhost:8080/student/getall", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then((result) => {
        setStudents(result);
    })
  }, [countForTriggeringUseEffect])
  
  return (
    <ThemeProvider theme={theme}>
        <Container>
          <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>
            <Root>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        sx={{ mb: 2}} // added "margin bottom"
                    />
                    <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth 
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                        sx={{ mb: 2}} // added "margin bottom"
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
            </Root>
          </Paper>

          {/* --- SHOWING LIST OF STUDENTS THAT ARE RETRIEVED FROM DATABASE: --- */}
          <h1>Students:</h1>

          <Paper elevation={3} style={paperStyle}>
            {students.map(student=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                    Id: {student.id}  <br />
                    Name: {student.name}  <br />
                    Address: {student.address}
                </Paper>
            ))}

          </Paper>
        </Container>
    </ThemeProvider>
    
  );
}
