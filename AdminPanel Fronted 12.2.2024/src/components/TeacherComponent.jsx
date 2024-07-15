import React, { useEffect, useState } from 'react'
import { addTeacher,getTeacher, updateTeacher } from '../services/TeacherService' 
import { useNavigate, useParams } from 'react-router-dom'

const TeacherComponent = () => {
    const [id,setId]=useState()
    const [name,setName] = useState('')
    const [gender,setGender]=useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [address, setAddress] = useState('')
    const [area, setArea]=useState('')
    const [institution,setInstitution]=useState('')
    const [department,setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [preferance, setPreferance] = useState('')
    const [cariculam,setCariculam]=useState('') 

    const [showPassword,setShowPassword]=useState('password')
  
    const {pathId} =useParams();
    const[errors, setErrors] = useState(
        {id : '' ,name : '' ,gender : '',contactNumber : '',     
            email : '', password : '', address : '', area : '', institution : '',
            department : '', year : '', preferance : '', cariculam : ''})

    const navigator = useNavigate();

    useEffect(() =>{
        if(pathId)
        {
            getTeacher(pathId).then((response) =>{
                setId(response.data.id);
                setName(response.data.name);
                setGender(response.data.gender);
                setContactNumber(response.data.contactNumber);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setAddress(response.data.address);
                setArea(response.data.area);
                setInstitution(response.data.institution);
                setDepartment(response.data.department);
                setYear(response.data.year);
                setPreferance(response.data.preferance);
                setCariculam(response.data.cariculam);
            }).catch(error =>{
                console.error(error);
            })
        }
    }, [pathId])

    function saveOrUpdateTeacher(e)
    {
        e.preventDefault();
        if(validateForm())
        {
            const teacher = {id ,name ,gender,contactNumber,     
                email, password, address, area, institution,
                department, year, preferance, cariculam}
            console.log(teacher)

            if(pathId){
                updateTeacher(pathId,teacher).then((response)=>{
                    console.log(response.data);
                    navigator('/teachers');
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                addTeacher(teacher).then((response) => {    //calling post api
                    console.log(response.data);
                    navigator('/teachers');    //returning to the list teacher page
                }).catch(error =>{
                    console.error(error);
                })
            }
        }
            
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}
        
        if(id!==0){
            errorsCopy.id='';
        }else{
            errorsCopy.id = 'Id is required!';
            valid = false;
        }

        if(name.trim()){
            errorsCopy.name='';
        }else{
            errorsCopy.name = 'Name is required!';
            valid = false;
        }

        if(gender.trim()){
            errorsCopy.gender='';
        }else{
            errorsCopy.gender = 'Gender is required!';
            valid = false;
        }

        if(contactNumber.trim()){
            errorsCopy.contactNumber='';
        }else{
            errorsCopy.contactNumber = 'Contact Number is required!';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email = 'Email is required!';
            valid = false;
        }

        if(password.trim()){
            errorsCopy.password='';
        }else{
            errorsCopy.password = 'Password is required!';
            valid = false;
        }

        if(address.trim()){
            errorsCopy.address='';
        }else{
            errorsCopy.address = 'Address is required!';
            valid = false;
        }

        if(area.trim()){
            errorsCopy.area='';
        }else{
            errorsCopy.area = 'Area is required!';
            valid = false;
        }

        if(institution.trim()){
            errorsCopy.institution='';
        }else{
            errorsCopy.institution = 'Institution is required!';
            valid = false;
        }

        if(department.trim()){
            errorsCopy.department='';
        }else{
            errorsCopy.department = 'Department is required!';
            valid = false;
        }

        if(year.trim()){
            errorsCopy.year='';
        }else{
            errorsCopy.year = 'HSC Passing Year is required!';
            valid = false;
        }

        if(preferance.trim()){
            errorsCopy.preferance='';
        }else{
            errorsCopy.preferance = 'Teaching Preference is required!';
            valid = false;
        }
        
        if(cariculam.trim()){
            errorsCopy.cariculam='';
        }else{
            errorsCopy.cariculam = ' Teaacher Curriculam is required!';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(pathId){
            return <h2 className='text-center'>Update Teacher</h2>
        }
        else{
            return <h2 className='text-center'>Add Teacher</h2>
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
                            <input type='number' placeholder='Enter Teacher Student Id'
                                   name='id' value={id}
                                   disabled={pathId !== undefined}
                                   className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                                   onChange={(e) => setId(e.target.value)}>
                            </input> 
                            { errors.id && <div className='invalid-feedback'> {errors.id}</div>}       
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Name:</label>
                            <input type='text' placeholder='Enter Teacher Name'
                                   name='name' value={name}
                                   className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                   onChange={(e) => setName(e.target.value)}>
                            </input>
                            { errors.name && <div className='invalid-feedback'> 
                            {errors.name}</div>}        
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Gender:</label>
                            <input type='text' placeholder='Enter Teacher Gender'
                                   name='gender' value={gender}
                                   className={`form-control ${errors.gender ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setGender(e.target.value)}>
                            </input>
                            { errors.gender && <div className='invalid-feedback'> {errors.gender}</div>}        
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>Contact Number:</label>
                            <input type='text' placeholder='Enter Teacher Contact Number'
                                   name='contactNumber' value={contactNumber}
                                   className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                                   onChange={(e) => setContactNumber(e.target.value)}>
                            </input> 
                            { errors.contactNumber && <div className='invalid-feedback'> {errors.contactNumber}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input type='email' placeholder='Enter Teacher Email'
                                   name='email' value={email}
                                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setEmail(e.target.value)}>
                            </input>
                            { errors.email && <div className='invalid-feedback'> {errors.email}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Password:</label>
                            <input type={showPassword} placeholder='Enter Teacher password'
                                   name='password' value={password}
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setPassword(e.target.value)}>
                            </input>
                            { errors.password && <div className='invalid-feedback'> {errors.password}</div>}        
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
                            <input type='text' placeholder='Enter Teacher Address'
                                   name='address' value={address}
                                   className={`form-control ${errors.address ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setAddress(e.target.value)}>
                            </input>
                            { errors.address && <div className='invalid-feedback'> {errors.address}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Area:</label>
                            <input type='text' placeholder='Enter Teacher Area'
                                   name='area' value={area}
                                   className={`form-control ${errors.area ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setArea(e.target.value)}>
                            </input>
                            { errors.area && <div className='invalid-feedback'> {errors.area}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Institution:</label>
                            <input type='text' placeholder='Enter Teacher Institution'
                                   name='institution' value={institution}
                                   className={`form-control ${errors.institution ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setInstitution(e.target.value)}>
                            </input>
                            { errors.institution && <div className='invalid-feedback'> {errors.institution}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Department:</label>
                            <input type='text' placeholder='Enter Teacher Department'
                                   name='department' value={department}
                                   className={`form-control ${errors.department ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setDepartment(e.target.value)}>
                            </input>
                            { errors.department && <div className='invalid-feedback'> {errors.department}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>HSC Year:</label>
                            <input type='text' placeholder='Enter Teacher HSC Passing Year'
                                   name='year' value={year}
                                   className={`form-control ${errors.year ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setYear(e.target.value)}>
                            </input>
                            { errors.year && <div className='invalid-feedback'> {errors.year}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Teaching Preference:</label>
                            <input type='text' placeholder='Enter Teacher Preference'
                                   name='preferance' value={preferance}
                                   className={`form-control ${errors.preferance ? 'is-invalid' : ''}`}
                                   onChange={(e) => setPreferance(e.target.value)}>
                            </input> 
                            { errors.preferance && <div className='invalid-feedback'> {errors.preferance}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Teacher Curriculam:</label>
                            <input type='text' placeholder='Enter Teacher Curriculam'
                                   name='cariculam' value={cariculam}
                                   className={`form-control ${errors.cariculam ? 'is-invalid' : ''}`}
                                   onChange={(e) => setCariculam(e.target.value)}>
                            </input> 
                            { errors.cariculam && <div className='invalid-feedback'> {errors.cariculam}</div>}       
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateTeacher}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TeacherComponent