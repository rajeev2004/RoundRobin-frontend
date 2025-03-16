import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ClaimedCoupon(){
    const [claimedCoupons,setClaimedCoupons]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const backend=import.meta.env.VITE_API_BACKEND;
    useEffect(()=>{
        fetchClaimedCoupons();
    },[]);
    async function fetchClaimedCoupons(){
        setLoading(true);
        try{
            const response=await axios.get(`${backend}/claimedCoupons`,{withCredentials:true});
            setClaimedCoupons(response.data.coupons);
        }catch(err){
            setError(err.response?.data?.error || "Failed to load claimed coupons");
        }finally{
            setLoading(false);
        }
    }
    if(loading){
        return(<p>Loading...</p>)
    }
    return(
        <div className="claimedCoupons">
            <div className="name">
                <h2>Claimed Coupons</h2>
            </div>
            {error && <p className="error">{error}</p>}
            {!loading && !error && claimedCoupons.length === 0 && <p>No claimed coupons yet.</p>}
            {!loading && claimedCoupons.length > 0 && (
                <ul>
                    {claimedCoupons.map((coupon)=>(
                        <li key={coupon.id}>
                            <p><strong>ID: </strong>{coupon.id} | <strong>Code: </strong>{coupon.code} | <strong>Claimed At :</strong>{new Date(coupon.claim_time).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button type="button" onClick={()=>navigate("/adminPanel")}>Back to Dashboard</button>
        </div>
    );
}
export default ClaimedCoupon;
