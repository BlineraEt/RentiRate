import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    status: Yup.string().required('Status is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      status: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.status === 'admin') {
        setRedirectToHome(true);
      } else {
        console.log('Login logic for', values.status);
      }
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.status === 'seller') {
        setRedirectToHome(true);
      } else {
        console.log('Login logic for', values.status);
      }
    },
 
   
  

  });

  

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-form">
      <h1 className="addSeller">Login</h1>
      <form onSubmit={formik.handleSubmit} className="container">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value="">Select Status</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="error">{formik.errors.status}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
