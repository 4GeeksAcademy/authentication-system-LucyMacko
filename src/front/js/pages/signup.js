import React, {useContext, useState} from "react"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const SignUp = () => {

    const { store, actions } = useContext(Context);

    const [newUser, setNewUser] = useState({email:"", password:""});   
    const navigate = useNavigate();

    const okInuput = () =>{
        if(newUser.email == "" || newUser.email == null) return false;
        if(newUser.password == "" || newUser.password == null) return false;
        return true;
    }

    const onSubmit = async() => {
        if ( okInuput()) {
            const contact = {
                "email": newUser.email,
                "password": newUser.password                
            }
            let resp = await actions.newUser(contact
                );
            if(resp){
                alert("The usert has been registered correctly! Well done for us!")
                navigate("/login");
            }
            else{
                alert("Oopsie, something bad has happened, try again please!")
            }
        }
        else {
            alert("Fill up all the fields, please!");
        }		
	}

    return (
        <div className="container-fluid mx-5">
            <div className="mx-5 my-5">
                <h1>Create your account</h1>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                type="email" 
                onChange={(e)=> {
                    setNewUser({...newUser, email: e.target.value});
                }} 
                className="form-control" 
                id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                type="password" 
                onChange={(e)=>{
                    setNewUser({...newUser, password: e.target.value});
                }} 
                className="form-control" id="exampleInputPassword1"/>
            </div>         
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={() => onSubmit()}
            >Submit</button>
        </div>
    )
}

export default SignUp