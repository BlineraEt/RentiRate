import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

function Edit() {
    const [seller, setSeller] = useState(null);
    const [genders, setGenders] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_seller/${id}`)
            .then((res) => {
                setSeller(res.data[0]);
            })
            .catch((err) => console.log(err));

        axios
            .get('/genders')
            .then((res) => {
                setGenders(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required!"),
        surname: Yup.string().required("Surname is required!"),
        email: Yup.string().email("Invalid email").required("Email is required!"),
        age: Yup.number().positive("Age must be a positive number").required("Age is required!"),
        gender_id: Yup.string().required("Gender ID is required!"),
    });

    function handleSubmit(values, { setSubmitting }) {
        axios.post(`/edit_user/${id}`, values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <div className="editBackground">
            <div className="editContainer">
                <h1 className="editTitle">Edit User {id}</h1>
                <Link to="/" className="btn btn-success editBackButton">Back</Link>
                {seller && (
                    <Formik
                        initialValues={{
                            name: seller.name || '',
                            surname: seller.surname || '',
                            email: seller.email || '',
                            age: seller.age || '',
                            gender_id: seller.gender_id || '',
                            gender: seller.gender || '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="editDetails">
                                    <label htmlFor="name">Name:</label>
                                    <Field type="text" name="name" placeholder="Name..." />
                                    <ErrorMessage name="name" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="surname">Surname:</label>
                                    <Field type="text" name="surname" placeholder="Surname..." />
                                    <ErrorMessage name="surname" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="email">Email:</label>
                                    <Field type="email" name="email" placeholder="Email..." />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="age">Age:</label>
                                    <Field type="number" name="age" placeholder="Age..." />
                                    <ErrorMessage name="age" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="gender_id">Gender:</label>
                                    <Field as="select" name="gender_id" onChange={(e) => {
                                        setFieldValue('gender_id', e.target.value);
                                        setFieldValue('gender', e.target.options[e.target.selectedIndex].text);
                                    }}>
                                        <option value="">Select Gender</option>
                                        {genders.map((gender) => (
                                            <option key={gender.id} value={gender.id}>{gender.gender}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="gender_id" component="div" className="error" />
                                </div>
                                <div className="form-group my-3">
                                    <button type="submit" className="btn btn-success editButton editSaveButton" disabled={isSubmitting}>Save</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    )
}

export default Edit;