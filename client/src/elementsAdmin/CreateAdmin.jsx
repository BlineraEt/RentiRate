
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    });

    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                axios.post('/add_admin', formData)
                    .then((response) => {
                        alert('Admin added successfully!');
                        navigate('/');
                    })
                    .catch((err) => {
                        alert('Failed to add admin. Please try again.');
                        console.error('Error adding user:', err);
                        setIsSubmitting(false);
                        setErrors({ submit: 'Failed to add admin. Please try again.' });
                    });
            })
            .catch((validationErrors) => {
                const errorsObj = {};
                validationErrors.inner.forEach(error => {
                    errorsObj[error.path] = error.message;
                });
                setErrors(errorsObj);
                setIsSubmitting(false);
            });
    };


    return (
        <div className='createBackground'>
            <div className='container'>
                <h3 className='addAdmin'>Add Admin</h3>
                <div className='homeButton'>
                    <Link to='/HomeAdmin' className='btn btn-success createButton marginRight'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='details'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Name...' required />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="surname">Surname:</label>
                        <input type="text" name='surname' value={formData.surname} onChange={handleChange} placeholder='Surname...' required />
                        {errors.surname && <div className="error">{errors.surname}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email...' required />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone...' required />
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="address">Address:</label>
                        <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder='Address...' required />
                        {errors.address && <div className="error">{errors.address}</div>}
                    </div>
                    <div className='saveButton'>
                        <button type='submit' className='btn btn-success createButton' disabled={isSubmitting}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
        
    
}
export default CreateAdmin;
