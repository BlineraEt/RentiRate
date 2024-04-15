import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditAdmin() {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`/get_admin/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id]);

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()

        axios.post(`/edit_admin/${id}`, data[0])
        .then((res)=>{
            
            navigate('/HomeAdmin')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>Admin {id}</h1>
            <Link to="/HomeAdmin" className="btn btn-success">Back</Link>
            {data.map((admin) =>{
                return (
                    <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input value={admin.name} type="text" name='name' required onChange={(e)=> setData([{...data[0], name: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='surname'>Surname</label>
                        <input value={admin.surname} type="text" name='surname' required onChange={(e)=> setData([{...data[0], surname: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='email'>Email</label>
                        <input value={admin.email} type="email" name='email' required onChange={(e)=> setData([{...data[0], email: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                    <label htmlFor='phone'>Phone</label>
                    <input value={admin.phone} type="text" name='phone' required onChange={(e)=> setData([{...data[0], phone: e.target.value}])} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='address'>Address</label>
                    <input value={admin.address} type="text" name='address' required onChange={(e)=> setData([{...data[0], address: e.target.value}])} />
                </div>

                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                    </div>
                </form>
                )
            })
            }
        </div>
    )
}

export default EditAdmin;