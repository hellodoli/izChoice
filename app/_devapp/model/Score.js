import axios from 'axios';

class Score {
    
    async insertScore( username, subjectID, examID, time, datetime, scoreReal, content ) {
        try {
            const data = { username, subjectID, examID, time, datetime, scoreReal, content };
            const headers = { 'Content-Type': 'application/json' };
            const command = await axios.post('PHP/action/insertScore.php', data, { headers });
            this.command = command.data;
            console.log(this.command);
        } catch (error) {
            console.log(error);
        }
    }

    async checkExistTime( username, subjectID ) {
        try {
            const checkExistTime = await axios.get('PHP/action/checkExistTime.php',{ params: {
                username,
                subjectID
            }});
            this.listCheckExistTime = checkExistTime.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListCheckExistTime() {
        return this.listCheckExistTime;
    }

    async getSubjectScore() {
        try {
            const subjectScore = await axios.get('PHP/view/getSubjectScore.php');
            this.listSubjectScore = subjectScore.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListSubjectScore() {
        return this.listSubjectScore;
    }

    async getClassScore( subjectID ) {
        try {
            const subjectClass = await axios.get('PHP/view/getClassScore.php',{ params: {
                subjectID
            }});
            this.listClassScore = subjectClass.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListClassScore() {
        return this.listClassScore;
    }

    async getCountScore( subjectID, classID ) {
        try {
            const subjectCount = await axios.get('PHP/view/getCountScore.php',{ params: {
                subjectID, 
                classID
            }});
            this.listCountScore = subjectCount.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListCountScore() {
        return this.listCountScore;
    }

    async getScoreByBy( subjectID, classID, count ) {
        try {
            const subjectBy = await axios.get('PHP/view/getScoreByBy.php',{ params: {
                subjectID,
                classID,
                count
            }});
            this.listScoreBy = subjectBy.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListScoreBy() {
        return this.listScoreBy;
    }
}

export default Score;