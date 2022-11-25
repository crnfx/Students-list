export default class Student {
    constructor(name, surname, middleName, birthDate, startEducation, faculty) {
        this.name = name
        this.surname = surname
        this.middleName = middleName
        this.birthDate = birthDate
        this.startEducation = startEducation
        this.faculty = faculty
    }

    get fio() {
        return this.surname + ' ' + this.name + ' ' + this.middleName;
    }

    getEducationPeriod() {
        const currentTime = new Date();
        return currentTime.getFullYear() - this.startEducation;
    }

    getBirthDateString() {
        const yyyy = this.birthDate.getFullYear();
        let mm = this.birthDate.getMonth() + 1;
        let dd = this.birthDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + yyyy;
    }

    getAge() {
        let now = new Date();
        let diffInMilliseconds = now.getTime() - this.birthDate.getTime();
        return Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24 / 365.25);
    }

    getFaculty() {
        return this.faculty;
    }
}














