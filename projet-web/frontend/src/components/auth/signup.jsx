import {useState} from "react"
import axios from "../axios-instance"
import Background from "./background"
import {useNavigate} from "react-router-dom"


const FIELDS = [
{
    name : "nom",
    placeholder : "Nom d'utilisateur",
    icon : <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
}, {
    name : "email",
    placeholder : "Email",
    icon : <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}, {
    name : "password1",
    placeholder : "Password",
    icon : <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
}, {
    name: "password2",
    placeholder : "Confirm password",
    icon : <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
}
]

export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        nom : "",
        email : "",
        password1 : "",
        password2 : ""
    });

    function handleChange(event) {
        const {name} = event.target;

        setForm({...form, [name] : event.target.value});
    }

    function submitForm() {
        try {

            // check if all fields are filled
            for(const [fieldName, value] of Object.entries(form)) {
                if(!value) {
                    throw new Error(`The field ${fieldName} must not be empty`)
                }
            }

            if(form.password1 != form.password2) {
                throw new Error("Passwords do not match");
            }

            axios.post("/register", form)
            .then(res => navigate('/'))
            .catch(err => setError('Error ocurred'))

        }catch(err) {
            console.error(err)
            setError(err)
        }
    }


    return (
        <Background>
        <div className="w-[380px] h-[500px] bg-white border rounded-md shadow px-6 flex flex-col justify-between">
            <div className="w-full centered-layout p-4">
                {/*<img className="w-32" src={logo} />*/}
            </div>

            <div className="w-full space-y-6">
                {/*<p className="text-gray-800 text-lg">Login to your classroom</p>*/}
                <div className="w-full space-y-[15px]">

                {
                    FIELDS.map((field, index) => (
                        <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                            {field.icon}
                            <input
                                className="w-full border-0 focus:outline-none text-gray-700"
                                placeholder={field.placeholder}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                />
                        </div>
                    ))
                }
                    {/*password
                    <div className="w-full flex items-center space-x-2 ml-1">
                        <input type="checkbox" />
                        <label className="text-gray-400">Remember me</label>
                    </div>
                    */}
                </div>

                {/*login button*/}
                <button onClick={submitForm} className="shadow w-full py-1.5 rounded primary-btn">
                    Create account
                </button>
            </div>

            <div className="w-full flex items-center justify-center mb-6">
                <p className="text-gray-500">Already have account? <a href="/auth/login" className="text-gradient">login</a></p>
            </div>
        </div>
        </Background>
    )
}
