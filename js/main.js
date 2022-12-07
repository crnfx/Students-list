import Student from "./student.js";


// Массив студентов
const students = [
    new Student('Роман', 'Шарапов', 'Алексеевич', new Date(1996, 11, 3), 2020, 'Технология лесозаготовительных и деревоперерабатывающих производств', 2024),
    new Student('Степан', 'Викторов', 'Сергеевич', new Date(1995, 1, 17), 2022, 'Противодействие техническим разведкам', 2026),
    new Student('Александр', 'Фарулёв', 'Валерьевич', new Date(1995, 5, 12), 2019, 'Ландшафтная архитектура', 2023),
    new Student('Игорь', 'Летов', 'Федорович', new Date(1964, 1, 19), 2021, 'Гражданская оборона', 2025),
    new Student('Курт', 'Кобейн', 'Дональд', new Date(1967, 3, 5), 2019, 'Гранж', 2023),
    new Student('Реакт', 'Реактов', 'Реактович', new Date(2013, 4, 29), 2021, 'Информационные технологии', 2025),
    new Student('Керри', 'Кинг', 'Рэй', new Date(1964, 5, 3), 2019, 'SLAYER', 2023),
    new Student('Леонардо', 'Ди-Каприо', 'Вильгельм', new Date(1974, 10, 11), 2018, 'Актёрское мастерство', 2022),
];

const $studentsList = document.getElementById('students__list'),
    $studentsListTHAll = document.querySelectorAll('.students__table th')

// Условия сортировки по умолчанию
let column = 'fio',
    columnDir = true

// Создание таблицы студентов
function newStudentTR(student) {
    const $studentTR = document.createElement('tr'),
        $fioTD = document.createElement('td'),
        $birthDateTD = document.createElement('td'),
        $startEducationTD = document.createElement('td'),
        $endEducationTD = document.createElement('td'),
        $facultyTD = document.createElement('td')


    $fioTD.textContent = student.fio;
    $birthDateTD.textContent = student.getBirthDateString() + ' (' + student.getAge() + ' лет)';
    $startEducationTD.textContent = student.startEducation + ' (' + student.getEducationPeriod() + ' курс)';
    if (student.startEducation === 2022) {
        $startEducationTD.textContent = student.startEducation + ' (1 курс)';
    }
    if (student.startEducation === 2021) {
        $startEducationTD.textContent = student.startEducation + ' (2 курс)';
    }
    if (student.startEducation === 2020) {
        $startEducationTD.textContent = student.startEducation + ' (3 курс)';
    }
    if (student.startEducation === 2019) {
        $startEducationTD.textContent = student.startEducation + ' (4 курс)';
    }
    if (student.startEducation === 2018) {
        $startEducationTD.textContent = 'Закончил обучение';
    }
    /*if(student.startEducation === 0) {
        $startEducationTD.textContent = 'Планирует поступать';
    }*/
    $endEducationTD.textContent = student.getEndEducationYear();
    $facultyTD.textContent = student.getFaculty();



    $studentTR.append($fioTD)
    $studentTR.append($birthDateTD)
    $studentTR.append($startEducationTD)
    $studentTR.append($endEducationTD)
    $studentTR.append($facultyTD)

    return $studentTR;
}

// Функция сортировки студентов
function getSortedStudents(prop, dir) {
    const studentsCopy = [...students];
    return studentsCopy.sort(function (studentA, studentB) {
        if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
            return -1;
    })
}

// Функция фильтрации студентов
function getFilteredStudents(arr, prop, value) {
    let result = [],
        copy = [...arr];

    for (const item of copy) {
        if (String(item[prop]).trim().toLowerCase().includes(value) == true) {
            result.push(item)
        }
    }
    return result;
}


// Функция работы сортировки и фильтрации по массиву
function render() {
    let studentsCopy = [...students];

    studentsCopy = getSortedStudents(column, columnDir)

    const inputFio = document.getElementById('filter-name').value.trim().toLowerCase()
    const inputFaculty = document.getElementById('filter-faculty').value.trim().toLowerCase()
    const inputStartEducation = document.getElementById('filter-start').value.trim().toLowerCase()
    const inputEndEducation = document.getElementById('filter-end').value.trim().toLowerCase()

    if (inputFio !== '') studentsCopy = getFilteredStudents(studentsCopy, 'fio', inputFio)
    if (inputFaculty !== '') studentsCopy = getFilteredStudents(studentsCopy, 'faculty', inputFaculty)
    if (inputStartEducation !== '') studentsCopy = getFilteredStudents(studentsCopy, 'startEducation', inputStartEducation)
    if (inputEndEducation !== '') studentsCopy = getFilteredStudents(studentsCopy, 'endEducation', inputEndEducation)


    $studentsList.innerHTML = ''
    for (const student of studentsCopy) {
        $studentsList.append(newStudentTR(student))
    }
}

document.getElementById('students__filter').addEventListener('submit', function (event) {
    event.preventDefault()
    render()
})

$studentsListTHAll.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
})


// Функция валидации формы добавления нового студента
function formValidate() {
    const validation = new JustValidate('#students__add');

    validation

    .addField('#input-surname', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели фамилию студента'
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Минимум 2 символа'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Максимум 50 символов'
        },
      ])

      .addField('#input-name', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели имя студента'
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Минимум 2 символа'
        },
        {
          rule: 'maxLength',
          value: 30,
          errorMessage: 'Максимум 30 символов'
        },
      ])

      .addField('#input-middlename', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели отчество студента'
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Минимум 2 символа'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Максимум 50 символов'
        },
      ])

      .addField('#input-birthdate', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели дату рождения студента'
        },
      ])

      .addField('#input-start', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели год начала обучения студента'
        },
      ])

      .addField('#input-faculty', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели факультет студента'
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Вы не ввели факультет студента'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Вы не ввели факультет студента'
        },
      ]).onSuccess((e) => {
        e.preventDefault();
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

} formValidate()

// Добавление нового студента
/*document.getElementById('students__add').addEventListener('submit', function (event) {
    event.preventDefault()
    students.push(new Student(
        document.getElementById('input-name').value,
        document.getElementById('input-surname').value,
        document.getElementById('input-middlename').value,
        new Date(document.getElementById('input-birthdate').value),
        Number(document.getElementById('input-start').value),
        document.getElementById('input-faculty').value,
    ))
    render()
})*/

render()




