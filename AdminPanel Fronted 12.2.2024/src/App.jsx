import './App.css'
import ListTeacherComponent from './components/ListTeacherComponent'
import ListStudentComponent from './components/ListStudentComponent'
import ListTuitionComponent from './components/ListTuitionComponent'
import TeacherComponent from './components/TeacherComponent'
import StudentComponent from './components/StudentComponenet'
import TuitionComponent from './components/TuitionComponent'

import HeaderComponent from './components/HeaderComponent'
//import FooterComponent from './components/FooterComponent'
import {BrowserRouter ,Routes, Route} from 'react-router-dom' 
        //Like navigator through link



function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            {/* http://localhost:3000 */}
            <Route path='/' element = { <ListTeacherComponent/>}></Route>
            {/* http:localhost:3000/teachers */}
            <Route path='/teachers' element = { <ListTeacherComponent/>}></Route>
            {/* http:localhost:3000/students */}
            <Route path='/students' element = { <ListStudentComponent/>}></Route>
            {/* http:localhost:3000/tuitions */}
            <Route path='/tuitions' element = { <ListTuitionComponent/>}></Route>
            {/* http:localhost:3000/add-teacher */}
            <Route path='/add-teacher' element= {<TeacherComponent/>}></Route>
            {/* http:localhost:3000/add-student */}
            <Route path='/add-student' element= {<StudentComponent/>}></Route>
             {/* http:localhost:3000/add-tuition */}
             <Route path='/add-tuition' element= {<TuitionComponent/>}></Route>
            {/* http:localhost:3000/edit-teacher/id */}
            <Route path='/edit-teacher/:pathId' element = {<TeacherComponent/>}></Route>
            {/* http:localhost:3000/edit-student/id */}
            <Route path='/edit-student/:pathId' element = {<StudentComponent/>}></Route>
            {/* http:localhost:3000/edit-tuition/id */}
            <Route path='/edit-tuition/:pathId' element = {<TuitionComponent/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
