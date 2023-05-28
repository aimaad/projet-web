
import axios from "../axios-instance"
import {useEffect, useState} from "react"

export default function useLoggedUser() {
    const [user, setUser] = useState({isAuthenticated : () => false});

    useEffect(() => {
        axios.get("/auth/get-logged-user")
        .then((res) => {
            setUser({...res.data.user, isAuthenticated : () => res.data.user.isAuthenticated});
        }) 
        .catch((err) => {
            console.log(err)
        })
    }, []);

    return {user};
}