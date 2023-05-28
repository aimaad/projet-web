import {useState, useEffect} from "react"
import axios from "./axios-instance"
import {Link, useNavigate} from "react-router-dom"

function LogoutBtn() {

    function logout() {
        axios.post("/auth/logout")
        .then(res => {
            window.location.reload();
        })
        .catch((err) => {
            alert("Could not logout");
        })
    }

    return (
        <button onClick={logout} className="dark-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span>Logout</span>
        </button>
    )
}


export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false)

    useEffect(() => {
        axios.get("/auth/get-logged-user")
        .then((res) => {
            const user = res.data.user;
            if(!user.isAuthenticated) {
                setIsAuthenticated(false)
            } else {
                setIsAuthenticated(true)
            }
        })
        .catch((error) => {
            setIsAuthenticated(false)
        })
    }, [])

    return (
        <div className="w-full">
        {/* The medium view */}
            <div className="w-full flex items-center justify-between px-8 md:px-24 py-3">
                <div className="flex items-center space-x-6">
                    <legend className="text-slate-500 text-lg font-semibold">
                        Imad<span className="rounded bg-teal-500 text-white p-[3px] mx-[1px]">Blog</span>
                    </legend>

                    <div className="flex items-end space-x-3 text-slate-500">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                    </div>
                </div>

                {/* if the user is not logged */}
                <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                    <LogoutBtn />
                ) :
                    (<>
                        <Link to="/login" className="secondary-btn">Login</Link>
                        <Link to="/signup" className="primary-btn">Signup</Link>
                    </>)
                }
                </div>
            </div>
        </div>
    )
}
