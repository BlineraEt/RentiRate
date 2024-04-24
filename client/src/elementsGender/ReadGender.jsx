import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReadGender(){
    const [genders, setGenders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/genders')
            .then((res) => {
                setGenders(res.data);
            })
            .catch((err) => {
                setError('Failed to fetch genders.');
                console.error(err);
            })
    }, [])

    return (
        <div>
            <h2>Genders</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Link to="/createGender" className="btn btn-primary mb-3">Add Gender</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {genders.map((gender) => (
                        <tr key={gender.id}>
                            <td>{gender.id}</td>
                            <td>{gender.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default ReadGender;