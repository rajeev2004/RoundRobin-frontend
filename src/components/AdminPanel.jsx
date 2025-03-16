import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminPanel(){
    const backend=import.meta.env.VITE_API_BACKEND;
    const [coupons,setCoupons]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    const [newCouponCode,setNewCouponCode]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        setLoading(true);
        async function fetchCoupons(){
            try{
                const response=await axios.get(`${backend}/getAllCoupons`,{withCredentials:true});
                setCoupons(response.data.coupons);
                console.log(response.data.coupons);
            }catch(err){
                setError(err.response?.data?.error || err.message || 'could not fetch the coupons');
            }finally{
                setLoading(false);
            }
        }
        fetchCoupons();
    },[]);
    function editCoupon(id){
        navigate('/editCoupon',{
            state:{
                id
            }
        })
    }
    async function logout(){
        try {
            const logoutResponse=await axios.post(`${backend}/logout`,{},{withCredentials:true});
            if(logoutResponse.data.message==='logout successful'){
                alert("Logged out successfully!");
                navigate('/');
            }
        } catch (err) {
            console.error("Error logging out:", err);
        }
    }
    async function addCoupon(){
        if (!newCouponCode.trim()){
            alert("Coupon code cannot be empty!");
            return;
        }
        try{
            const response=await axios.post(`${backend}/addCoupon`,{code:newCouponCode},{withCredentials:true});
            setCoupons([response.data.newCoupon,...coupons]);
            setNewCouponCode('');
            alert('coupon added');
        }catch(err){
            setError(err.response?.data?.error || err.message || 'Could not add coupon');
        }
    }
    if(loading){
        return(<p>Loading...</p>)
    }
    return(
        <div className="adminPanel">
            <div className="buttonClass">
                <button type="button" onClick={()=>navigate('/showClaimedCoupon')}>Show Claimed Coupon</button>
                <button type="button" onClick={logout}>Logout</button>
            </div>
            {error && <p className="message">{error}</p>}
            <div className="addCoupon">
                <input 
                    type="text" 
                    placeholder="Enter new coupon code" 
                    value={newCouponCode} 
                    onChange={(e)=>setNewCouponCode(e.target.value)} 
                />
                <button type="button" onClick={addCoupon}>Add Coupon</button>
            </div>
            <div className="allCoupons">
                {coupons.length>0?
                    coupons.map((coupon,index)=>(
                        <div className="individualCoupon" key={coupon.id}>
                            <p>ID: {coupon.id}</p>
                            <p>Code: {coupon.code}</p>
                            <p>Claimed: {coupon.claimed?'Yes':'No'}</p>
                            <button type="button" onClick={()=>editCoupon(coupon.id)}>Edit</button>
                        </div>
                    )):(<p>No coupons Added yet...</p>)
                } 
            </div>
        </div>
    )
}
export default AdminPanel;