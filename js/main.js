import Student from "./student.js";

const students = [
    new Student('Роман', 'Шарапов', 'Алексеевич', new Date(1996, 11, 3), 2020, 'Технология лесозаготовительных и деревоперерабатывающих производств'),
    new Student('Степан', 'Викторов', 'Сергеевич', new Date(1995, 1, 17), 2022, 'Противодействие техническим разведкам'),
    new Student('Александр', 'Фарулёв', 'Валерьевич', new Date(1995, 5, 12), 2019, 'Ландшафтная архитектура')
];

const $studentsList = document.getElementById('students__list'),
    $studentsListTHAll = document.querySelectorAll('.students__table th')

let column = 'fio',
    columnDir = true


function newStudentTR(student) {
    const $studentTR = document.createElement('tr'),
            $fioTD = document.createElement('td'),
            $birthDateTD = document.createElement('td'),
            $startEducationTD = document.createElement('td'),
            $facultyTD = document.createElement('td')

            $fioTD.textContent = student.fio;
            $birthDateTD.textContent = student.getBirthDateString() + ' (' + student.getAge() + ' лет)';
            $startEducationTD.textContent = student.startEducation + ' (' + student.getEducationPeriod() + ' курс)';
            if (student.getEducationPeriod() === 0) {
                $startEducationTD.textContent = student.startEducation + ' (1 курс)';
            }
            $facultyTD.textContent = student.getFaculty();
           

    $studentTR.append($fioTD)
    $studentTR.append($birthDateTD)
    $studentTR.append($startEducationTD)
    $studentTR.append($facultyTD)

    return $studentTR;
}

function getSortedStudents(prop, dir) {
    const studentsCopy = [...students];
    return studentsCopy.sort(function(studentA, studentB) {
        if((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
        return -1;
    })
}

function render() {
    let studentsCopy = [...students];

    studentsCopy = getSortedStudents(column, columnDir)
    
    $studentsList.innerHTML = ''
    for (const student of studentsCopy) {
        $studentsList.append(newStudentTR(student))
    }
}

$studentsListTHAll.forEach(element => {
    element.addEventListener('click', function() {
        column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
})

document.getElementById('students__add').addEventListener('submit', function(event) {
    event.preventDefault();
    students.push(new Student(
        document.getElementById('input-name').value,
        document.getElementById('input-surname').value,
        document.getElementById('input-middlename').value,
        new Date(document.getElementById('input-birthdate').value),
        Number(document.getElementById('input-start').value),
        document.getElementById('input-faculty').value,
    ))

    render()
})

render()
