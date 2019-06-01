import axios from 'axios';

class Course{
    
    //for search.
    async getCourseByName(search) {
        try {
            const courseSearch = await axios.get('PHP/view/getCourseByName.php',{ params: {
                search
            }});
            this.listCourseByName = courseSearch.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListCourseByName() {
        return this.listCourseByName;
    }

    async getCourseById(id) {
        try {
            const courseById = await axios.get('PHP/view/getCourseById.php',{ params: {
                id: id
            }});
            this.courseById = courseById.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListCourseById() {
        return this.courseById;
    }

    async getAllCourse() {
        try {
            const allCourse = await axios.get('PHP/view/getAllCourse.php');
            this.allCourse = allCourse.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllCourse() {
        return this.allCourse;
    }

    async getAllCourseForBasis() {
        try {
            const allCourseForBasis = await axios.get('PHP/view/getAllCourseForBasis.php');
            this.listAllCourseForBasis = allCourseForBasis.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListAllCourseForBasis() {
        return this.listAllCourseForBasis;
    }

    async getCourseByUserName( username ) {
        try {
            const courseByUserName = await axios.get('PHP/view/getCourseUser.php',{ params: {
                username
            }});
            this.courseByUserName = courseByUserName.data;
        } catch (error) {
            console.log(error);
        }
    }
    get getListCourseByUserName() {
        return this.courseByUserName;
    }
}

export default Course;