import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'

function Home() {
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
        const confirmDelete = window.confirm('Are you sure you want to delete this seller?');
        if (confirmDelete) {
            axios.delete(`/delete/${id}`)
            .then((res)=>{
                setDeleted(true)
            })
            .catch((err)=> console.log(err))
        }
    }

    return (
        <div className="blueGreenBackground">
            <h3 className="custom-color">Sellers</h3>
            <div className="divCreate">
                <Link className='btn btn-success createButton' to='/create'>Create+</Link>
            </div>
            <div className="table-wrapper">
                <table className="table">
                    <thead className="tableHeader">
                        <tr>
                            <th className="tableCell">ID</th>
                            <th className="tableCell">Name</th>
                            <th className="tableCell">Surname</th>
                            <th className="tableCell">Email</th>
                            <th className="tableCell">Age</th>
                            <th className="tableCell">Gender</th>
                            <th className="tableCell smallColumn">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((seller)=>{
                                return (
                                    <tr key={seller.id}>
                                        <td>{seller.id}</td>
                                        <td>{seller.name}</td>
                                        <td>{seller.surname}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.age}</td>
                                        <td>{seller.gender}</td>
                                        <td className="d-flex justify-content-center">
                                            <Link className="btn btn-success marginRight readButton" to={`/read/${seller.id}`}>Read</Link>
                                            <Link className="btn btn-primary marginRight editButton" to={`/edit/${seller.id}`}>Edit</Link>
                                            <button onClick={() => handleDelete(seller.id)} className="btn btn-danger deleteButton">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
