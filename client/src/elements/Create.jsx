import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Create(){
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [genders, setGenders] = useState([]);

    const initialValues = {
        name: '',
        surname: '',
        email: '',
        age: '',
        gender: '',
        gender_id: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        surname: Yup.string().required('Surname is required!'),
        email: Yup.string().email('Invalid email').required('Email is required!'),
        age: Yup.number().positive('Age must be a positive number').required('Age is required!'),
        gender: Yup.string().required('Gender is required!'),
    });    

    useEffect(() => {
        axios.get('/genders')
             .then((res) => {
                setGenders(res.data);
                console.log("Genders: ", res.data);
             })
             .catch((err) => console.log(err));
    }, []);
    
    function handleSubmit(values, { setSubmitting }) {
        const selectedGender = genders.find(gender => gender.gender === values.gender);

        const updatedValues = { ...values, gender_id: selectedGender.id };

        axios.post('/add_user', updatedValues)
             .then((res) => {
                if(res.data.error){
                    setErrorMessage(res.data.error);
                } else{
                    navigate('/');
                }
             })
             .catch((err) => console.log(err))
             .finally(() => {
                setSubmitting(false);
             });
    }

    //function handleSubmit(values, {setSubmitting}) {
    //    axios.post('/add_user', values)
    //         .then((res)=>{
    //            navigate('/');
    //            console.log(res);
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => {
    //            setSubmitting(false);
    //         })
    //}

    return (
        <div className='createBackground'>
            <div className='container'>
                <h3 className='addSeller'>Add Seller</h3>
                <div className='homeButton'>
                    <Link to = '/' class = 'btn btn-success createButton marginRight'>Home</Link>
                </div>
                {errorMessage && (
                    <div className='alert alert-danger' role="alert">
                        {errorMessage}
                    </div>
                )}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='details'>
                                <label htmlFor="name">Name:</label>
                                <Field type="text" name='name' placeholder='Name...' />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>
                            <div className='details'>
                                <label htmlFor="surname">Surname:</label>
                                <Field type="text" name='surname' placeholder='Surname...' />
                                <ErrorMessage name="surname" component="div" className="error" />
                            </div>
                            <div className='details'>
                                <label htmlFor="email">Email:</label>
                                <Field type="email" name='email' placeholder='Email...' />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div className='details'>
                                <label htmlFor="age">Age:</label>
                                <Field type="number" name='age' placeholder='Age...' />
                                <ErrorMessage name="age" component="div" className="error" />
                            </div>
                            <div className='details'>
                                <label htmlFor="gender">Gender:</label>
                                <Field as="select" name="gender">
                                    <option value="">Select Gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender.id} value={gender.gender}>{gender.gender}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="gender" component="div" className="error" />
                            </div>
                            <div className='saveButton'>
                                <button type='submit' className='btn btn-success createButton' disabled={isSubmitting}>Save</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default Create;