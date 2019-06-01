import axios from 'axios';

class Student {
    
    async getStudentByTeacher(classID,username) {
        try {
            const studentByT = await axios.get('PHP/view/getStudentByTeacher.php',{ params: {
                classID,
                username
            }});
            this.listStudentByTeacher = studentByT.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListStudentByTeacher() {
        return this.listStudentByTeacher;
    }

    async getStudentByClassID(classID) {
        try {
            const studentByClassID = await axios.get('PHP/view/getStudentByClassID.php',{ params: {
                classID
            }});
            this.listStudentByClassID = studentByClassID.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListStudentByClassID() {
        return this.listStudentByClassID;
    }

    async checkExistStudent(studentID) {
        try {
            const student = await axios.get('PHP/action/checkExistStudent.php',{ params: {
                studentID
            }});
            this.isExistStudent = student.data;
        } catch (error) {
            console.log(error);
        }
    }

    async insertStudent( studentID, classID, firstName, lastName, birth, address ) {
        try {
            const data = { studentID, classID, firstName, lastName, birth, address };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertStudent.php', data, headers );
            this.commandInsert = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateStudent( firstName, lastName, address, birth, studentID  ) {
        try {
            const data = { firstName, lastName, address, birth, studentID };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/updateStudent.php', data, {headers});
            this.commandUpdate = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getStudentByID(studentID) {
        try {
            const studentByID = await axios.get('PHP/view/getStudentById.php',{ params: {
                studentID
            }});
            this.listStudentByID = studentByID.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListStudentByID() {
        return this.listStudentByID;
    }
}

export default Student;