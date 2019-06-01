import axios from 'axios';

class Teacher {
    
    async getAllTeacher() {
        try {
            const allTeacher = await axios.get('PHP/view/getAllTeacher.php');
            this.listAllTeacher = allTeacher.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllTeacher() {
        return this.listAllTeacher;
    }

    async getTeacherByID( teacherID ) {
        try {
            const teacher = await axios.get('PHP/view/getTeacherByID.php', { params: {
                teacherID
            }});
            this.listTeacherByID2 = teacher.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListTeacherByID2() {
        return this.listTeacherByID2;
    }

    async searchTeacherByID( teacherID ) {
        try {
            const teacher = await axios.get('PHP/view/searchTeacherByID.php', { params: {
                teacherID
            }});
            this.listTeacherByID = teacher.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListTeacherByID() {
        return this.listTeacherByID;
    }

    async searchTeacherByFalID( falID ) {
        try {
            const teacher = await axios.get('PHP/view/searchTeacherByFalID.php', { params: {
                falID
            }});
            this.listTeacherByfalID = teacher.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListTeacherByfalID() {
        return this.listTeacherByfalID;
    }

    async searchTeacherByD( d ) {
        try {
            const teacher = await axios.get('PHP/view/searchTeacherByD.php', { params: {
                d
            }});
            this.listTeacherByD = teacher.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListTeacherByD() {
        return this.listTeacherByD;
    }

    async searchTeacherByName( name1, name2 ) {
        try {
            const teacher = await axios.get('PHP/view/searchTeacherByName.php', { params: {
                name1,
                name2,
            }});
            this.listTeacherByName = teacher.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListTeacherByName() {
        return this.listTeacherByName;
    }

    async updateTeacher(  firstName, lastName, d, teacherID ) {
        try {
            const data = { firstName, lastName, d, teacherID };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/updateTeacher.php', data, { headers });
            this.commandUpdate = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async insertTeacher( teacherID, firstName, lastName, d, falID ){
        try{
            const data = { teacherID, firstName, lastName, d, falID };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertTeacher.php', data, { headers });
            this.commandInsert = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async checkExistTeacher( teacherID ) {
        try {
            const checkExistTeacher = await axios.get('PHP/action/checkExistTeacher.php',{ params: {
                teacherID
            }});
            this.isExistTeacher = checkExistTeacher.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default Teacher;