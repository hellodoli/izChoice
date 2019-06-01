import axios from 'axios';

class Class {
    
    async getClassByUserName(username) {
        try {
            const classByUserName = await axios.get('PHP/view/getClassByUser.php',{ params: {
                username
            }});
            this.listClassByUser = classByUserName.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListClassByUserName() {
        return this.listClassByUser;
    }

    async getAllClass() {
        try {
            const allClass = await axios.get('PHP/view/getAllClass.php');
            this.listAllClass = allClass.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllClass() {
        return this.listAllClass;
    }

    async getClassByID( classID ) {
        try {
            const classByID = await axios.get('PHP/view/getClassByID.php',{ params: {
                classID
            }});
            this.listClassByID2 = classByID.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListClassByID2() {
        return this.listClassByID2;
    }

    async searchClassByID( classID ) {
        try {
            const classByID = await axios.get('PHP/view/searchClassByID.php',{ params: {
                classID
            }});
            this.listClassByID = classByID.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListClassByID() {
        return this.listClassByID;
    }

    async searchClassByName( className ) {
        try {
            const classByName = await axios.get('PHP/view/searchClassByName.php',{ params: {
                className
            }});
            this.listClassByName = classByName.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListClassByName() {
        return this.listClassByName;
    }
    
    async updateClass( className, classID ) {
        try {
            const data = { className, classID };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/updateClass.php', data, { headers });
            this.commandUpdate = command.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    async insertClass( classID, className, falID ) {
        try {
            const data = { classID, className, falID };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertClass.php', data, { headers });
            this.commandInsert = command.data;
        } catch (error) {
            console.log(error);
        }
    }

    async checkExistClass( classID ) {
        try {
            const checkExistClass = await axios.get('PHP/action/checkExistClass.php',{ params: {
                classID
            }});
            this.isExistClass = checkExistClass.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListCheckExistClass() {
        return this.isExistClass;
    }
}

export default Class;