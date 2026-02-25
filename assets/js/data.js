let students = JSON.parse(localStorage.getItem('studentManagementData')) || [];

function saveToLocalStorage() {
    localStorage.setItem('studentManagementData', JSON.stringify(students));
}

function addStudent(studentObj) {
    const exists = students.some(s => s.id === studentObj.id);
    
    if (exists) {
        alert("Error: A student with this ID already exists.");
        return false;
    }

    students.push(studentObj);
    saveToLocalStorage(); 
    return true;
}

function deleteStudent(studentId) {
    students = students.filter(student => student.id !== studentId);
    saveToLocalStorage(); // PERSIST
}

function addPerformance(studentId, subjectScores) {
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        const existingRecord = student.performance.find(rec => rec.form === student.form);

        if (existingRecord) {
            existingRecord.subjects = {
                math: subjectScores.math,
                english: subjectScores.english,
                science: subjectScores.science,
                social: subjectScores.social
            };
            alert(`Results UPDATED for ${student.name} (Form ${student.form})`);
        } else {
            const newRecord = {
                form: student.form,
                subjects: {
                    math: subjectScores.math,
                    english: subjectScores.english,
                    science: subjectScores.science,
                    social: subjectScores.social
                }
            };
            student.performance.push(newRecord);
            alert(`Results ADDED for ${student.name} (Form ${student.form})`);
        }

        saveToLocalStorage(); 
    }
}
function promoteStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        if (student.form < 4) {
            student.form += 1;
            saveToLocalStorage(); 
            alert(`${student.name} promoted to Form ${student.form}`);
            return true;
        } else {
            alert("Student has already completed Form 4 (O-Level Graduate).");
            return false;
        }
    }
    return false;
}

function clearAllData() {
    if (confirm("Warning: This will delete ALL student records permanently.")) {
        students = [];
        localStorage.removeItem('studentManagementData');
        location.reload();
    }

}
