import axios from 'axios';

class Register {
    
    async getRegisterTime( classID, subjectID ) {
        try {
            const registerTime = await axios.get('PHP/view/getRegisterTime.php',{ params: {
                classID,
                subjectID,
            }});
            this.listRegisterTime = registerTime.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListRegisterTime() {
        return this.listRegisterTime;
    }

    async insertRegister( username, classID, subjectID, level, datetime, turn, count, duration ) {
        try {
            const data = { username, classID, subjectID, level, datetime, turn, count, duration };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertRegister.php', data, { headers });
            this.command = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getRegisterByUsername( username ) {
        try {
            const registerByUsername = await axios.get('PHP/view/getRegisterByUsername.php',{ params: {
                username
            }});
            this.listRegisterByUsername = registerByUsername.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListRegisterByUsername() {
        return this.listRegisterByUsername;
    }

    async getAllRegister() {
        try {
            const allRegister = await axios.get('PHP/view/getAllRegister.php');
            this.listAllRegister = allRegister.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllRegister() {
        return this.listAllRegister;
    }

    async deleteRegister( classID, subjectID, time ) {
        try {
            const data = { classID, subjectID, time };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/deleteRegister.php', data, { headers });
            this.commandDelete = command.data;
            console.log(this.commandDelete);
        } catch (error) {
            console.log(error);
        }
    }

    async searchRegister( username, subjectID ) {
        try {
            const searchRegister = await axios.get('PHP/view/searchRegister.php',{ params: {
                username,
                subjectID
            }});
            this.listSearchRegister = searchRegister.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListsearchRegister() {
        return this.listSearchRegister;
    }

    async searchRegisterByClassID( classID ) {
        try {
            const searchRegister = await axios.get('PHP/view/searchRegisterByClassID.php',{ params: {
                classID
            }});
            this.listSearchRegisterByClassID = searchRegister.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListSearchRegisterByClassID() {
        return this.listSearchRegisterByClassID;
    }

    async searchRegisterBySubjectName( subjectName ) {
        try {
            const searchRegister = await axios.get('PHP/view/searchRegisterBySubjectName.php',{ params: {
                subjectName
            }});
            this.listSearchRegisterBySubjectName = searchRegister.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListSearchRegisterBySubjectName() {
        return this.listSearchRegisterBySubjectName;
    }

    async searchRegisterByDate( date) {
        try {
            const searchRegister = await axios.get('PHP/view/searchRegisterByDate.php',{ params: {
                date
            }});
            this.listSearchRegisterByDate = searchRegister.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListSearchRegisterByDate() {
        return this.listSearchRegisterByDate;
    }
}

export default Register;