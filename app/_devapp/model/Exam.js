import axios from 'axios';

class Exam{

    async getExamLevell(courseName,time) {
        try {
            const examLevel = await axios.get('PHP/view/getExamLevel.php',{ params: {
                courseName,
                time
            }});
            this.listExamLevel = examLevel.data;
            console.log(this.listExamLevel);
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamLevel() {
        return this.listExamLevel;
    }

    async getExamCount(userID,courseName) {
        try {
            const examCount = await axios.get('PHP/view/getExamCount.php',{ params: {
                userID,
                courseName
            }});
            this.examCount = examCount.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamCount() {
        return this.examCount;
    }

    async getAllExamCount(courseID) {
        try {
            const allExamCount = await axios.get('PHP/view/getAllExamCount.php',{ params: {
                courseID
            }});
            this.listAllExamCount = allExamCount.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllExamCount() {
        return this.listAllExamCount;
    }
    
    async getExamDetailByExamId(examID) {
        try {
            const examDetailByExamId = await axios.get('PHP/view/getExamDetailByExamId.php',{ params: {
                examID
            }});
            this.examDetailByExamId = examDetailByExamId.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamDetailByExamId() {
        return this.examDetailByExamId;
    }
    
    async getExamDeTailByExamIdAndUser(examID, username) {
        try {
            const examDetailByExamIdAndUser = await axios.get('PHP/view/getExamDeTailByExamIdAndUser.php',{ params: {
                examID,
                username
            }});
            this.listExamDetailByExamIdAndUser = examDetailByExamIdAndUser.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamDetailByExamIdAndUser() {
        return this.listExamDetailByExamIdAndUser;
    }

    async updateExamDetail( content, a, b, c, d, examID, examDetailID ) {
        try {
            const data = { content, a, b, c, d, examID, examDetailID };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/updateExamDetail.php', data, { headers: headers } );
            this.command = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteExamDetail( examID, examDetailID ) {
        try {
            const data = { examID, examDetailID };
            const headers = { 'Content-Type': 'application/json' };
            const commandDelete = await axios.post('PHP/action/deleteExamDetail.php', data, { headers } );
            this.commandDelete = commandDelete.data;
        } catch (error) {
            console.log(error);
        }
    }

    async insertExam( examID, courseID, username, level, time ) {
        try {
            const data = { examID, courseID, username, level, time };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertExam.php', data, { headers });
            this.commandInsertExam = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async insertExamDetail( examDetailSQL ) {
        try {
            const data = { examDetailSQL };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertExamDetail.php', data, { headers });
            this.commandInsertExamDetail = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async checkExistExam( examID ) {
        try {
            const command = await axios.get('PHP/action/checkExistExam.php', { params: {
                examID
            }});
            this.isExistExam = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getExamID( time, level, courseID ) {
        try {
            const examID = await axios.get('PHP/view/getExamID.php',{ params: {
                time,
                level,
                courseID
            }});
            this.listExamID = examID.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamID() {
        return this.listExamID;
    }

    async getExamDeTailRandom( examIdSql, number ) {
        try {
            const examDeTailRandom = await axios.get('PHP/view/getExamDeTailRandom.php',{ params: {
                examIdSql,
                number
            }});
            this.listExamDeTailRandom = examDeTailRandom.data;
            console.log(this.listExamDeTailRandom)
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamDeTailRandom() {
        return this.listExamDeTailRandom;
    }

    async getExamDetailByEnrol(examID,courseID,time) {
        try {
            const examDetailByEnrol= await axios.get('PHP/view/getExamDeTailByEnrol.php',{ params: {
                examID,
                courseID,
                time
            }});
            this.listExamDetailByEnrol = examDetailByEnrol.data;
            console.log(this.listExamDetailByEnrol);
        } catch (error) {
            console.log(error);
        }
    }
    get getListExamDetailByEnrol() {
        return this.listExamDetailByEnrol;
    }
}

export default Exam;