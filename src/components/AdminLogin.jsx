import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function AdminLogin(){
    const backend=import.meta.env.VITE_API_BACKEND;
    const navigate=useNavigate();
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    const [adminKey,setAdminKey]=useState("");
    const [error,setError]=useState("");
    async function formSubmit(e){
        e.preventDefault();
        try{
            const isLoggedIn=await axios.post(`${backend}/adminLogin`,{email,password,adminKey},{withCredentials:true});
            if(isLoggedIn.data.login){
                navigate('/adminPanel');
            }else{
                setError('Try again');
            }
        }catch(err){
            setError(err.response?.data?.error || err.message || 'Try Again');
        }
    }
    return(
        <div className="adminLogin">
            <form className="form" onSubmit={formSubmit}>
                <div className="formComponents">
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} required />
                </div>
                <div className="formComponents">
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <div className="formComponents">
                    <label>Private Key: </label>
                    <input type="text" value={adminKey} onChange={(e)=>setAdminKey(e.target.value)} required />
                </div>
                {error && <p className="message">{error}</p>}
                <div className="formComponents">
                    <label></label>
                    <div className="buttonClass">
                        <button type="submit">Login</button>
                        <button type="button" onClick={()=>navigate('/')}>User DashBoard</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AdminLogin;