import axios from 'axios';

class User {

    async getUser() {
        try {
            const user = await axios.get('PHP/action/getUser.php');
            this.userInfo = user.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserLoginName() {
        try {
            const user = await axios.get('PHP/action/getUserLoginName.php');
            this.userLoginName = user.data;
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            await axios.get('PHP/action/logout.php');
        } catch (error) {
            console.log(error);
        }
    }

    async checkExistLoginName( loginname ) {
        try {
            const user = await axios.get('PHP/action/checkExistLoginName.php', { params: {
                loginname
            }});
            this.isExistLoginname = user.data;
        } catch (error) {
            console.log(error);
        }
    }

    async checkExistUserName( username ) {
        try {
            const user = await axios.get('PHP/action/checkExistUserName.php', { params: {
                username
            }});
            this.isExistUsername = user.data;
        } catch (error) {
            console.log(error);
        }
    }

    async createAccount( loginname, password, username, role ) {
        try {
            const data = { loginname, password, username, role };
            const headers = { 'Content-Type': 'application/json' };
            const user = await axios.post('PHP/action/createAccount.php', data, { headers });
            this.commandInsert = user.data;
            console.log(this.commandInsert);
        } catch (error) {
            console.log(error);
        }
    }
}

export default User;