import {useState} from "react"
import Background from "./background"
import axios from "../axios-instance"
import {useNavigate} from "react-router-dom"
// import {AnimateScaleY} from "../animation"
// import logo from "../images/logo.svg"

export default function Login({next}) {
    const navigate = useNavigate()
    const [form, setForm] = useState({email : "", password : ""});
    const [error, setError] = useState("")

    function handleChange(e) {
        const {name, value} = e.target;
        setForm({...form, [name] : value});
    }

    function submitForm() {
        if(!form.password || !form.email) {
            setError("Make sure that you have entered both email and password!")
            return;
        }

        axios.post("/auth/login", form)
        .then(res => {
            console.log(res)
            if(res.status == 200) {
                navigate(next || "/")
            }
        })
        .catch(err => {
            // error
            if(err.response.status < 500)
                setError(err.response.data.message)
            else
                setError("Error occurred!")
        })
    }

    return (
        <Background>
            <div className="w-[350px] h-[500px] bg-white border rounded-md shadow px-4 flex flex-col justify-between">
                <div className="w-full centered-layout p-4">
                    {/*<img className="w-32" src={logo} />*/}
                </div>

                <div className="w-full space-y-6">
                    {/* Error  */}
                    {
                        error &&
                        <div className="w-full bg-red-100 text-red-500 p-2 rounded">{error}</div>
                    }
                    {/*<p className="text-gray-800 text-lg">Login to your classroom</p>*/}
                    <div className="w-full space-y-[15px]">
                        {/*Email*/}
                        <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <input value={form.email} onChange={handleChange} name="email" className="w-full border-0 focus:outline-none text-gray-700" placeholder="Email"  />
                        </div>

                        {/*password*/}
                        <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <input value={form.password} onChange={handleChange} name="password" type="password" className="w-full border-0 focus:outline-none text-gray-700" placeholder="Password"  />
                        </div>

                        {/*password*/}
                        <div className="w-full flex items-center space-x-2 ml-1">
                            <input type="checkbox" />
                            <label className="text-gray-400">Remember me</label>
                        </div>
                    </div>

                    {/*login button*/}
                    <button onClick={submitForm} className="shadow w-full py-1.5 rounded primary-btn">
                        Login
                    </button>
                </div>

                <div className="w-full flex items-center justify-center mb-6">
                    <p className="text-gray-500">You don't have account? <a href="/signup" className="text-gradient">create one</a></p>
                </div>
            </div>
        </Background>
    )
}
