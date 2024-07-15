import React, { useEffect, useState} from 'react'
import { addStudent, getStudent, updateStudent } from '../services/StudentService' 
import { useNavigate, useParams } from 'react-router-dom'

const StudentComponent = () => {
  const [nid,setNid]=useState()
  const [studentId, setStudentId] = useState()
  const [studentName,setStudentName] = useState('')
  const [studentGender,setStudentGender]=useState('')
  const [studentContactNumber, setStudentContactNumber] = useState('')
  const [studentEmail,setStudentEmail]=useState('')
  const [studentPassword, setStudentPassword]=useState('')
  const [studentAddress, setStudentAddress] = useState('')
  const [studentArea,setStudentArea]=useState('')
  const [studentInstitution,setStudentInstitution]=useState('')
  const [studentGroup,setStudentGroup] = useState('')
  const [studentYear, setStudentYear] = useState('')
  const [studentPreferance, setStudentPreferance] = useState('')
  const [studentCariculam,setStudentCariculam]=useState('')

  const [showPassword, setShowPassword] = useState('password')
  
  
    const {pathId} =useParams();
    const[errors, setErrors] = useState(
        {nid: '' ,studentId : '' ,studentName : '' ,studentGender : '',studentContactNumber : '',     
        studentEmail : '', studentPassword : '', studentAddress : '', studentArea : '', studentInstitution : '',
        studentGroup : '', studentYear : '', studentPreferance : '', studentCariculam : ''})

    const navigator = useNavigate();

    useEffect(() =>{
        if(pathId)
        {
            getStudent(pathId).then((response) =>{
                setNid(response.data.nid);
                setStudentId(response.data.studentId);
                setStudentName(response.data.studentName);
                setStudentGender(response.data.studentGender);
                setStudentContactNumber(response.data.studentContactNumber);
                setStudentEmail(response.data.studentEmail);
                setStudentPassword(response.data.studentPassword);
                setStudentAddress(response.data.studentAddress);
                setStudentArea(response.data.studentArea);
                setStudentInstitution(response.data.studentInstitution);
                setStudentGroup(response.data.studentGroup);
                setStudentYear(response.data.studentYear);
                setStudentPreferance(response.data.studentPreferance);
                setStudentCariculam(response.data.studentCariculam);
            }).catch(error =>{
                console.error(error);
            })
        }
    }, [pathId])

    function saveOrUpdateStudent(e)
    {
        e.preventDefault();
        if(validateForm())
        {
            const student = {nid,studentId ,studentName ,studentGender,studentContactNumber,     
                studentEmail, studentPassword, studentAddress, studentArea, studentInstitution,
                studentGroup, studentYear, studentPreferance, studentCariculam}
            console.log(student)

            if(pathId){
                updateStudent(pathId,student).then((response)=>{
                    console.log(response.data);
                    navigator('/students');
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                addStudent(student).then((response) => {    
                    console.log(response.data);
                    navigator('/students');    //returning to the list teacher page
                }).catch(error =>{
                    console.error(error);
                })
            }
        }
            
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}
        if(nid!==0){
            errorsCopy.nid='';
        }else{
            errorsCopy.nid = 'Guardian NId is required!';
            valid = false;
        }

        if(studentId!==0){
            errorsCopy.studentId='';
        }else{
            errorsCopy.studentId = 'Student Id is required!';
            valid = false;
        }

        if(studentName.trim()){
            errorsCopy.studentName='';
        }else{
            errorsCopy.studentName = 'Name is required!';
            valid = false;
        }

        if(studentGender.trim()){
            errorsCopy.studentGender='';
        }else{
            errorsCopy.studentGender = 'Gender is required!';
            valid = false;
        }

        if(studentContactNumber.trim()){
            errorsCopy.studentContactNumber='';
        }else{
            errorsCopy.studentContactNumber = 'Contact Number is required!';
            valid = false;
        }

        if(studentEmail.trim()){
            errorsCopy.studentEmail='';
        }else{
            errorsCopy.studentEmail = 'Email is required!';
            valid = false;
        }

        if(studentPassword.trim()){
            errorsCopy.studentPassword='';
        }else{
            errorsCopy.studentPassword = 'Password is required!';
            valid = false;
        }

        if(studentAddress.trim()){
            errorsCopy.studentAddress='';
        }else{
            errorsCopy.studentAddress = 'Address is required!';
            valid = false;
        }

        if(studentArea.trim()){
            errorsCopy.studentArea='';
        }else{
            errorsCopy.studentArea = 'Area is required!';
            valid = false;
        }

        if(studentInstitution.trim()){
            errorsCopy.studentInstitution='';
        }else{
            errorsCopy.studentInstitution = 'Institution is required!';
            valid = false;
        }

        if(studentGroup.trim()){
            errorsCopy.studentGroup='';
        }else{
            errorsCopy.studentGroup = 'Group is required!';
            valid = false;
        }

        if(studentYear.trim()){
            errorsCopy.studentYear='';
        }else{
            errorsCopy.studentYear = 'SSC Exam Year is required!';
            valid = false;
        }

        if(studentPreferance.trim()){
            errorsCopy.studentPreferance='';
        }else{
            errorsCopy.studentPreferance = 'Student Preference is required!';
            valid = false;
        }
        
        if(studentCariculam.trim()){
            errorsCopy.studentCariculam='';
        }else{
            errorsCopy.studentCariculam = 'Student Curriculam is required!';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(pathId){
            return <h2 className='text-center'>Update Student</h2>
        }
        else{
            return <h2 className='text-center'>Add Student</h2>
        }
    }
    
    

  return (
    <div className='container'>
        <br /> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                    

                        <div className='form-group mb-2'>
                            <label className='form-label'>Student Id:</label>
                            <input type='number' placeholder='Enter Student Id'
                                   name='studetnId' value={studentId}
                                   disabled={pathId !== undefined}
                                   className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                                   onChange={(e) => setStudentId(e.target.value)}>
                            </input> 
                            { errors.studentId && <div className='invalid-feedback'> {errors.studentId}</div>}       
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Name:</label>
                            <input type='text' placeholder='Enter Student Name'
                                   name='studentName' value={studentName}
                                   className={`form-control ${errors.studentName ? 'is-invalid' : ''}`} 
                                   onChange={(e) => setStudentName(e.target.value)}>
                            </input>
                            { errors.studentName && <div className='invalid-feedback'>{errors.studentName}</div>}        
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Gender:</label>
                            <input type='text' placeholder='Enter Student Gender'
                                   name='studentGender' value={studentGender}
                                   className={`form-control ${errors.studentGender ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentGender(e.target.value)}>
                            </input>
                            { errors.studentGender && <div className='invalid-feedback'> {errors.studentGender}</div>}        
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>Contact Number:</label>
                            <input type='text' placeholder='Enter Student Contact Number'
                                   name='studentContactNumber' value={studentContactNumber}
                                   className={`form-control ${errors.studentContactNumber ? 'is-invalid' : ''}`}
                                   onChange={(e) => setStudentContactNumber(e.target.value)}>
                            </input> 
                            { errors.studentContactNumber && <div className='invalid-feedback'> {errors.studentContactNumber}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input type='email' placeholder='Enter Student Email'
                                   name='studentEmail' value={studentEmail}
                                   className={`form-control ${errors.studentEmail ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentEmail(e.target.value)}>
                            </input>
                            { errors.studentEmail && <div className='invalid-feedback'> {errors.studentEmail}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Password:</label>
                            <input type={showPassword} 
                                   placeholder='Enter Student password'
                                   name='studentPassword' value={studentPassword}
                                   className={`form-control ${errors.studentPassword ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentPassword(e.target.value)}>
                            </input>
                            { errors.studentPassword && <div className='invalid-feedback'> {errors.studentPassword}</div>}        
                        </div>

                        <button
                            className='btn btn-secondary'
                            onClick={(e) => {
                                e.preventDefault(); // Prevent form submission
                                setShowPassword(
                                showPassword === 'password' ? 'text' : 'password'
                                );
                            }}
                            >
                            {showPassword === 'password' ? 'Show Password' : 'Hide Password'}
                        </button>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Address:</label>
                            <input type='text' placeholder='Enter Student Address'
                                   name='studentAddress' value={studentAddress}
                                   className={`form-control ${errors.studentAddress ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentAddress(e.target.value)}>
                            </input>
                            { errors.studentAddress && <div className='invalid-feedback'> {errors.studentAddress}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Area:</label>
                            <input type='text' placeholder='Enter Student Area'
                                   name='studentArea' value={studentArea}
                                   className={`form-control ${errors.studentArea ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentArea(e.target.value)}>
                            </input>
                            { errors.studentArea && <div className='invalid-feedback'> {errors.studentArea}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Institution:</label>
                            <input type='text' placeholder='Enter Student Institution'
                                   name='studentInstitution' value={studentInstitution}
                                   className={`form-control ${errors.studentInstitution ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentInstitution(e.target.value)}>
                            </input>
                            { errors.studentInstitution && <div className='invalid-feedback'> {errors.studentInstitution}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Group:</label>
                            <input type='text' placeholder='Enter Student Group'
                                   name='studentGroup' value={studentGroup}
                                   className={`form-control ${errors.studentGroup ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentGroup(e.target.value)}>
                            </input>
                            { errors.studentGroup && <div className='invalid-feedback'> {errors.studentGroup}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>SSC Year:</label>
                            <input type='text' placeholder='Enter Student SSC Exam Year'
                                   name='studentYear' value={studentYear}
                                   className={`form-control ${errors.studentYear ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentYear(e.target.value)}>
                            </input>
                            { errors.studentYear && <div className='invalid-feedback'> {errors.studentYear}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Student Preference:</label>
                            <input type='text' placeholder='Enter Student Preference'
                                   name='studentPreferance' value={studentPreferance}
                                   className={`form-control ${errors.studentPreferance ? 'is-invalid' : ''}`}
                                   onChange={(e) => setStudentPreferance(e.target.value)}>
                            </input> 
                            { errors.studentPreferance && <div className='invalid-feedback'> {errors.studentPreferance}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Student Curriculam:</label>
                            <input type='text' placeholder='Enter Student Curriculam'
                                   name='studentCariculam' value={studentCariculam}
                                   className={`form-control ${errors.studentCariculam ? 'is-invalid' : ''}`}
                                   onChange={(e) => setStudentCariculam(e.target.value)}>
                            </input> 
                            { errors.studentCariculam && <div className='invalid-feedback'> {errors.studentCariculam}</div>}       
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>NId:</label>
                            <input type='number' placeholder='Enter Guardian NId'
                                   name='nid' value={nid}
                                   className={`form-control ${errors.nid ? 'is-invalid' : ''}`}
                                   onChange={(e) => setNid(e.target.value)}>
                            </input> 
                            { errors.nid && <div className='invalid-feedback'> {errors.nid}</div>}       
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentComponent