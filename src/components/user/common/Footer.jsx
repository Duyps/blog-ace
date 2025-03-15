import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../firebaseConfig';
import './footer.css'

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubcribe = async (e) => {
        e.preventDefault();
        if (!email.includes('@')){
            setMessage("Vui lòng nhập email hợp lệ!");
            return;
        }
        try{
            await addDoc(collection(db, "subscribers"), {
                email: email,
                createdAt: serverTimestamp(),
            });
            setMessage("Đăng kí thành công!");
            setEmail("");
        }  catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            setMessage("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };
  return (
    
    <div className="footer">
        <img src="https://cdn.prod.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51087113a1e6_sergei-primo-_jd-Z8XzbBc-unsplash%20(3).jpg" alt="" className='footer-hero'/>

        <div className="contact">
            <img src="https://cdn.prod.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51794a13a15f_elsa-tonkinwise-3N8NOvgJIc4-unsplash.jpg" alt="" className='contact-img'/>
            <div className="message">
                <h2>STAY IN THE LOOP!</h2>
                <p>Subscribe to our weekly update.</p>
                <form action="" onSubmit={handleSubcribe}>
                    <input type="email" placeholder='name@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    <button type='submit'>SUBMIT</button>
                </form>
                {message && <p className='subscribe-message'>{message}</p>}
                <div className="social">
                    <a href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://X.com"><i class="fa-brands fa-x-twitter"></i></a>
                </div>
            </div>
        </div>
    </div>
    
    
  )
}

export default Footer