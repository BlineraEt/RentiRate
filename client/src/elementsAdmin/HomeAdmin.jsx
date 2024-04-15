import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import '../App.css'

function HomeAdmin() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(()=>{
        if (deleted) {
            setDeleted(false)
            fetchData();
        }
    }, [deleted]);

    const fetchData = () =>{
        axios.get('/rentirate')
        .then((res)=>{
            setData(res.data);
        })
        .catch((err)=>console.log(err))
    }

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }

    return (
        <div className="blueGreenBackground">
            <h3 className="custom-color">Your Admins</h3>
            <div className="d-flex justify-content-between w-100 mb-3">
                <Link className='btn btn-success createButton' to='/CreateAdmin'>Add Admin+</Link>
            </div>
            <div className="table-wrapper"> 
                <div className="table-border"> 
                    <table className="table">
                        <thead className="tableHeader">
                            <tr>
                                <th className="tableCell">ID</th>
                                <th className="tableCell">Name</th>
                                <th className="tableCell">Surname</th>
                                <th className="tableCell">Email</th>
                                <th className="tableCell">Phone</th>
                                <th className="tableCell">Address</th>
                                <th className="tableCell smallColumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((admin, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{admin.id}</td>
                                            <td>{admin.name}</td>
                                            <td>{admin.surname}</td>
                                            <td>{admin.email}</td>
                                            <td>{admin.phone}</td>
                                            <td>{admin.address}</td>
                                            <td className="d-flex justify-content-center">
                                                <Link className="btn btn-success marginRight readButton" to={`/readAdmin/${admin.id}`}>Read</Link>
                                                <Link className="btn btn-primary marginRight editButton" to={`/editAdmin/${admin.id}`}>Edit</Link>
                                                <button onClick={() => handleDelete(admin.id)} className="btn btn-danger deleteButton">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
