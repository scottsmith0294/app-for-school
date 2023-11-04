// student class represent a Student

class Student {
    constructor (name, course, startDate, endDate, regNo){
      this.name = name
      this.course = course
      this.startDate = startDate
      this.endDate = endDate
      this.regNo = regNo
    }

}
// ui class represent ui task

class UI {
    static displayStudents(){
    const students = Store.getStudents()
    students.forEach( (student)=> UI.addStudent(student));
    }
    static addStudent(student){
      const list = document.getElementById('students')
      const row = document.createElement('tr')
      row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td>${student.startDate}</td>
      <td>${student.endDate}</td>
      <td>${student.regNo}</td>
      <td>${<a class='btn btn-danger btn-sm delete' href="#">x</a>}</td>`
      list.appendChild(row)
    }
    static deleteStudent(el) {
       if (el.classList.contains('delete')){
          el.parentElement.parentElement.removes()
          UI.showAlert('student deleted successfully', 'danger')
       }

    }
    static clearForm(){
        document.getElementById('name').value = ''
        document.getElementById('course').value = ''  
        document.getElementById('start_date').value = ''
        document.getElementById('end_date').value = ''
        document.getElementById('reg_no').value = ''
    }
    static showAlert(message, className){
        if(document.querySelector('.alert')){
            document.querySelector('.alert').remove()

        }
        const div = document.createElement('div')
          div.className = `alert alert - ${className}`
          div.appendChild(document.createTextNode(message))
          const container = document.querySelector('.container')
          const form = document.querySelector('#students-form')
          container.insertBefore(div, form)
          setTimeout(() =>{
            div.remove()
          }, 4000)
    }
}

// Stop class to handle storage in our db

class Store {
  static getStudents() {
    let students 
    if (localStorage.getItem('students') === null) {
      students = []
    } else  {
      students = JSON.parse(localStorage.getItem("students"))
    }
    return students
  }
  static addStudent(student) {
    const students = Store.getStudents()
    students.push(student)
    localStorage.setItem(('students', JSON.stringify(students)))

  } 
  static deleteStudent(name) {
    const students = Store.getStudents()
    students.map((student,index) => {
      if (student.regNo === name) {
        students.splice(index,1)
      }
    })
    localStorage.setItem(('students', JSON.stringify(students)))
  }
}

// Event display student

document.addEventListener('DOMContentLoaded', UI.displayStudents)

//Event add new students

document.getElementById('students-form').addEventListener('submit', (e) => {
  // prevent defualt form submmissiom
  e.preventDefault()
  const name = document.getElementById('name').value
  const course = document.getElementById('course').value
  const startDate = document.getElementById('start_date').value
  const endDate = document.getElementById('end_date').value
  const regNo = document.getElementById('reg_no').value

  if (name === '' || startDate === '' || course === '' || endDate === '' || regNo === '') {
     UI.showAlert('please fill in all fields', 'danger')
  }else {
    const student = new Student(name, course, startDate, endDate, regNo)
    UI.addStudent(student)
    Store.addStudent(student)
    UI.showAlert('student added sucessfully', 'sucess')
    UI.clearForm()
  }
})

// remove a student

document.getElementById('students').addEventListener('click', (e) => {
  UI.deleteStudent(e.target)
  //remove from Storage

  Store.deleteStudent(e.target.parentElement.previousElementSibling.textContent)
}) 


