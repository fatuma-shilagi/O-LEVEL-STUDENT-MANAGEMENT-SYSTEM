function calculateLatestAverage(student) {
    if (!student.performance || student.performance.length === 0) {
        return "No Data";
    }
    const latest = student.performance[student.performance.length - 1];
    
    return calculateRecordAverage(latest) + "%";
}

function calculateRecordAverage(record) {
    const scores = Object.values(record.subjects);
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / scores.length).toFixed(1);
}

function getPassStatus(averageString) {
    if (averageString === "No Data") {
        return { text: "PENDING", color: "#7f8c8d" }; 
    }
    
    const numericAvg = parseFloat(averageString);
    
    if (numericAvg >= 50) {
        return { text: "PASS", color: "#27ae60" }; 
    } else {
        return { text: "FAIL", color: "#e74c3c" }; 
    }
}


function isValidStudentID(id) {
    const regex = /^S\d{3,}$/i; 
    return regex.test(id);
}

function getGrade(score) {
    if (score >= 75) return 'A';
    if (score >= 60) return 'B';
    if (score >= 45) return 'C';
    if (score >= 30) return 'D';
    return 'F';
}


function getCurrentDate() {
    return new Date().toLocaleDateString();

}
