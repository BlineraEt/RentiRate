import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditGender(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(`/get_gender/${id}`)
            .then((res) => {
                setGender(res.data.gender);
            })
            .catch((err) => {
                setErrorMessage('Failed to fetch gender.');
                console.error(err);
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!gender) {
            setErrorMessage('Gender name is required.');
            return;
        }

        axios.post(`/edit_gender/${id}`, { gender })
            .then((res) => {
                if (res.data.success) {
                    navigate('/genders');
                } else {
                    setErrorMessage(res.data.error || 'Failed to edit gender.');
                }
            })
            .catch((err) => {
                setErrorMessage('Failed to edit gender.');
                console.error(err);
            })
    }

    return (
        <div>
            <h2>Edit Gender</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="gender">Gender Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/genders" className="btn btn-secondary ml-2">Cancel</Link>
            </form>
        </div>
    )
}

export default EditGender;