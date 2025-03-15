import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const [user, setUser] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser){
                navigation("/admin");
            } else {
                setUser(currentUser);
            }
        });
        return () => unsubcribe();
    }, [navigation]);

    if (!user){
        return <p>Đang kiểm tra đăng nhập...</p>;
    }
    return children;
  
}

export default ProtectedRoute