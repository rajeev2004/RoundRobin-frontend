import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function UserDashboard(){
    const navigate=useNavigate();
    const backend=import.meta.env.VITE_API_BACKEND;
    const [message,setMessage]=useState("");
    const [DashboardLoading,setDashboardLoading]=useState(true);
    const [coupon,setCoupon]=useState(null);
    const [coolDownTime,setCoolDownTime]=useState(null);
    const [claimLoading,setClaimLoading]=useState(false);
    useEffect(()=>{
        const coolDown=localStorage.getItem('coolDown');
        if(coolDown){
            const remainingTime=parseInt(coolDown)-Date.now();
            if(remainingTime>0){
                setCoolDownTime(remainingTime);
            }else{
                localStorage.removeItem('coolDown');
            }
        }
        fetchCoupon();
    },[]);
    async function fetchCoupon(){
        setDashboardLoading(true);
        try{
            const coupon=await axios.get(`${backend}/getCoupon`);
            if(coupon.data.coupon){
                setCoupon(coupon.data.coupon);
            }
        }catch(err){
            setMessage(err.response?.data?.error || err.message || 'No coupon available...');
        }finally{
            setDashboardLoading(false);
        }
    }
    useEffect(()=>{
        if(coolDownTime>0){
            const timer=setInterval(()=>{
                setCoolDownTime(prev=>{
                    if(prev<=1000){
                        clearInterval(timer);
                        setMessage("You can claim the coupon now!");
                        return null;
                    }
                    return prev-1000;
                });
            },1000)
            return ()=>clearInterval(timer);
        }
    },[coolDownTime]);
    async function claimCoupon(){
        setClaimLoading(true);
        if(coolDownTime>0){
            setMessage('You have already claimed a Coupon wait 1 hour to claim another one');
            return;
        }
        setClaimLoading(true);
        try{
            const response=await axios.post(`${backend}/claimCoupon/${coupon.id}`,{},{withCredentials:true});
            if(response.data.message==='successful'){
                const NewCoolDownTime=Date.now()+60*1000;
                localStorage.setItem('coolDown',NewCoolDownTime);
                setCoupon(null);
                setMessage('Coupon Claimed Successfully. Next coupon can be claimed after 1 minute');
                fetchCoupon();
                setCoolDownTime(60*1000);
            }else{
                setMessage('Coupon did not get claimed');
            }
        }catch(err){
            setMessage(err.response?.data?.error || err.message);
        }finally{
            setClaimLoading(false);
        }
    }
    function formatTime(ms){
        const totalSeconds=Math.floor(ms/1000);
        const minutes=Math.floor(totalSeconds/60);
        const seconds=totalSeconds%60;
        return `${minutes}m ${seconds}s`;
    }

    if(DashboardLoading){
        return(<p>Loading...</p>);
    }
    return(
        <div className="userDashboard">
            <div className="name">
                <p>Claim Your Coupon</p>
            </div>
            {coolDownTime>0 && (
                <div className="cooldown-timer">
                    <p>Cooldown active: <strong>{formatTime(coolDownTime)}</strong></p>
                </div>
            )}
            {coupon && (
                <div className="next-coupon">
                    <p>Available Coupon:</p>
                    <h3>ID: {coupon.id}</h3>
                    <h3>Code: {coupon.code}</h3>
                    <button onClick={claimCoupon} disabled={claimLoading || coolDownTime>0}>
                        {claimLoading?"Claiming...":"Claim Coupon"}
                    </button>
                </div>
            )}
            {message && <p className="message">{message}</p>}
            <div className="buttonClass">
                <button type="button" onClick={()=>navigate('/adminLogin')}>Admin Login</button>
                <button type="button" onClick={()=>navigate('/adminSignIn')}>Admin Sign Up</button>
            </div>
        </div>
    )
}
export default UserDashboard;