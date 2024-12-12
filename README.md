# Final Project Peer Review
This is my working version of the GPA calculator web application. It does not include login features.

## About the GPA calculator
My goal for this project is to create a fully functioning GPA calculator application that allows users to calculate their GPA based on their course grades and credit hours. 

### Intended Features
- User login

### Current Features
- Index and About page
- User input fields
- Input course details (course name, grades, credit hours)
- Calculate GPA based on input data
- Store course information in MySQL database

## How to run 
Note: You may need to navigate to the server.js folder and change the database login to the one you use.
1. Clone repository by downloading .zip file or by using git commands
```
git clone https://github.com/ashlyfarrar/gpa-calculator-app
```
2. Create gpa_calc database
```
CREATE DATABASE gpa_calc;

USE gpa_calc;

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL,
    grade DECIMAL(3, 2) NOT NULL
);
```
3. Navigate to project
```
cd gpa-calculator-app
```
4. Install npm
```
npm install express mysql body-parser cors dotenv
```
5. Run db server
```
node server/server.js
```
6. Open another command prompt instance, navigate to project, then run the web server
```
cd gpa-calculator-app
node server/index.js
```
7. Open your browser of choice then open the web app
```
http://localhost:4000
```

