import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function CreateGender() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [existingGenders, setExistingGenders] = useState([]);

    const initialValues = {
        gender: ''
    };

    useEffect(() => {
        axios.get('/genders')
            .then((res) => {
                setExistingGenders(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    function handleSubmit(values, { setSubmitting }) {
        const isGenderExists = existingGenders.some(gender => gender.gender === values.gender);

        if (isGenderExists) {
            setErrorMessage('This gender already exists!');
            setSubmitting(false);
            return;
        }

        axios.post('/add_gender', { gender: values.gender })
            .then((res) => {
                if (res.data.success) {
                    navigate('/create');
                } else {
                    setErrorMessage(res.data.error || 'Failed to add gender!');
                }
            })
            .catch((err) => {
                setErrorMessage('Failed to add gender!');
                console.error(err);
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <div>
            <h2>Create Gender</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="gender">Gender Name:</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="gender"
                                name="gender"
                                placeholder="Gender Name..."
                            />
                            <ErrorMessage name="gender" component="div" className="error" />
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                        <Link to="/genders" className="btn btn-secondary ml-2">Cancel</Link>
                    </Form>
                )}
            </Formik>
        </div>
    )

}

export default CreateGender;