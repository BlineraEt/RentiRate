import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ReadAdmin() {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`/get_admin/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id])

    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>Admin {id}</h1>
            <Link to="/HomeAdmin" className="btn btn-success">Back</Link>
            {data.map((admin) =>{
                return (
                    <ul className="list-group">
                        <li className="list-group-item">
                            <b>ID: </b>
                            {admin["id"]}
                        </li>
                        <li className="list-group-item">
                            <b>Name: </b>
                            {admin["name"]}
                        </li>
                        <li className="list-group-item">
                            <b>Surname: </b>
                            {admin["surname"]}
                        </li>
                        <li className="list-group-item">
                            <b>Email: </b>
                            {admin["email"]}
                        </li>
                        <li className="list-group-item">
                            <b>Phone: </b>
                            {admin["phone"]}
                        </li>
                        <li className="list-group-item">
                            <b>Address: </b>
                            {admin["address"]}
                        </li>
                    </ul>
                )
            })
            }
        </div>
    )
}

export default ReadAdmin;