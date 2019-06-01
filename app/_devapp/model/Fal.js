import axios from 'axios';

class Fal {
    
    async getAllFal() {
        try {
            const allFal = await axios.get('PHP/view/getAllFal.php');
            this.listAllFal = allFal.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllFal() {
        return this.listAllFal;
    }
}

export default Fal;