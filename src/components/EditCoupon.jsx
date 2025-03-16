import React,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
function EditCoupon(){
    const backend=import.meta.env.VITE_API_BACKEND;;
    const [coupon,setCoupon]=useState({code:"",claimed:false});
    const navigate=useNavigate();
    const location=useLocation();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    useEffect(()=>{
        setLoading(true);
        async function fetchCoupon(){
            try{
                const response=await axios.get(`${backend}/editingCoupon/${location.state.id}`);
                setCoupon(response.data.coupon);
            }catch(err){
                setError(err.response?.data?.error || err.message || 'error fetching coupon details');
            }finally{
                setLoading(false);
            }
        }
        fetchCoupon();
    }, []);
    function handleChange(event){
        const {name,value}=event.target;
        setCoupon((prevCoupon)=>({
            ...prevCoupon,
            [name]:name==="claimed"?value==="true":value,
        }));
    }
    async function handleSubmit(event){
        event.preventDefault();
        try {
            const updateResponse=await axios.put(`${backend}/updateCoupon/${location.state.id}`,coupon,{withCredentials:true});
            if(updateResponse.data.message==='coupon updates successfully'){
                alert('coupon updated');
                navigate("/adminPanel");
                console.log(updateResponse.data.coupon)
            }
        } catch(err){
            setError(err.response?.data?.error || err.message || 'Try Again');
        }
    }
    if(loading){
        return(<p>Loading...</p>)
    }
    return(
        <div className="editCoupon">
            <h2>Edit Coupon</h2>
            {error && <p className="message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Coupon Code:
                    <input
                        type="text"
                        name="code"
                        value={coupon.code}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Claimed:
                    <select name="claimed" value={coupon.claimed} onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </label>
                <button type="submit">Update Coupon</button>
            </form>
            <button onClick={()=>navigate("/adminPanel")}>Cancel</button>
        </div>
    );
}
export default EditCoupon;