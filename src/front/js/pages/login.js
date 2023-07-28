import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [validation, setValidation] = useState({ email:"", password:""})

    useEffect(() =>{
        if (store.token)
        navigate("/private")
    }, [store.token])

    const startSession = async () => {
        console.log(validation);
        let respond = await actions.login(validation);
        console.log(respond);
        if (respond) {
        alert("Welcome, you are logged in!");
        }
        else {
        alert("Ooopsss! An error has occurred... Try again, please!");
        setValidation({...validation, email: "", password: ""
        });
        }
    }

    return (
        <div className="container-fluid">
            <div>
                <h1>Welcome Back 😃</h1>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                value={validation.email}
                onChange={e => {
                    setValidation({...validation, email:e.target.value});
                }}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" 
                className="form-control" 
                id="exampleInputPassword1"
                value={validation.password}
                onChange={e => {
                    setValidation({...validation, password:e.target.value});
                }}
                />
            </div>         
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={()=>startSession()} 
                >Log In</button>
        </div>
    )
}

export default LogIn