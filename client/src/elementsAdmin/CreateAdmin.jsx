
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!').matches(/^[a-zA-Z]+$/, 'Name should have only letters'),
    surname: Yup.string().required('Surname is required!').matches(/^[a-zA-Z]+$/, 'Surname should have only letters'),
    email: Yup.string().required('Email is required!').email('Invalid email format'),
    phone: Yup.string().required('Phone number is required!').matches(/^[0-9]+$/, 'Phone number should only contain numbers').test('max-length', 'Phone number must be at most 12 characters', value => value && value.length <= 12),
    address: Yup.string().required('Address is required!'),
});

function CreateAdmin() {
    const navigate = useNavigate();
<<<<<<< Updated upstream
    const [errorMessage, setErrorMessage] = useState('');
        
        const initialValues = {
=======
    const [formData, setFormData] = useState({
>>>>>>> Stashed changes
        id: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    };

    /*
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };*/

    

<<<<<<< Updated upstream
    function handleSubmit(values, { setSubmitting }) {
        axios.post('/add_user', values)
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
             })
    }


        return (
            <div className='createBackground'>
                <div className='container'>
                    <h3 className='addAdmin'>Add Admin</h3>
                    <div className='homeButton'>
                        <Link to='/HomeAdmin' className='btn btn-success createButton marginRight'>Home</Link>
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
                                    <label htmlFor="phone">Phone:</label>
                                    <Field type="tel" name='phone' placeholder='Phone...' />
                                    <ErrorMessage name="phone" component="div" className="error" />
                                </div>
                                <div className='details'>
                                    <label htmlFor="address">Address:</label>
                                    <Field type="text" name='address' placeholder='Address...' />
                                    <ErrorMessage name="address" component="div" className="error" />
                                </div>
                                <div className='saveButton'>
                                    <button type='submit' className='btn btn-success createButton' disabled={isSubmitting}>Save</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
=======
    return (
        <div className='createBackground'>
            <div className='container'>
                <h3 className='addAdmin'>Add Admin</h3>
                <div className='homeButton'>
                    <Link to='/homeAdmin' className='btn btn-success createButton marginRight'>Home</Link>
>>>>>>> Stashed changes
                </div>
            </div>
        )
        
    }
export default CreateAdmin;
