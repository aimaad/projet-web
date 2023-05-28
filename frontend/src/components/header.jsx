import {useState, useEffect} from "react"
import axios from "./axios-instance"
import {Link, useNavigate} from "react-router-dom"
import useLoggedUser from "./auth/use-logged-user"

function LogoutBtn() {

    function logout() {
        
        axios.post("/auth/logout")
        .then(res => {
            console.log(res)
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
            <span>Se déconnecter</span>
        </button>
    )
}

function SearchBar() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        if(!search) {
            return;
        }

        const timer = setTimeout(() => {
            console.log("Executed ")
            axios.post("/articles/search", {search})
            .then((res) => { console.log(res.data)
                setResult(res.data.articles);
            })
            .catch(err => {
                console.log(err);
            })
        }, 250);

        return () => clearTimeout(timer);
    }, [search])

    function handleChange(e) {
        setSearch(e.target.value)
    }

    return (
        <div className="w-[300px] rounded-full border border-slate-300 text-slate-500">
            <div className="flex items-center px-3 py-1.5 space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                <input value={search} onChange={handleChange} className="focus:outline-none w-full" placeholder="Search..." />
            </div>

            { search &&
                <div className="relative w-full">
                    <div className="rounded-lg absolute inset-x-0 top-1 bg-white shadow-xl py-1">
                        {result.length > 0 ?
                            result.map((article, index) => (
                                <div key={index}   className="w-full hover:bg-slate-50 text-slate-900">
                                <Link to={`/view/${article.id}`} className="px-3 p-1.5" >
                                    {article.titre}
                                </Link>
                                </div>
                            )) : (
                                <div className="w-full px-3 p-1.5 text-slate-500">
                                    No article found
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false)
    const {user} = useLoggedUser();

    return (
        <div className="w-full">
        {/* The medium view */}
            <div className="w-full flex items-center justify-between px-8 md:px-24 py-3">
                <div className="flex items-center space-x-6">
                    <legend className="text-slate-500 text-lg font-semibold">
                     <Link to="http://localhost:3000/">  Imad<span className="rounded bg-teal-500 text-white p-[3px] mx-[1px]">Blog</span></Link>
                    </legend>

                    <div className="flex items-end space-x-3 text-slate-500">
                        <Link to="/">accueil</Link>
                        

                    </div>
                </div>

                {/* Search bar */}
                <SearchBar />

                {/* if the user is not logged */}
                <div className="flex items-center space-x-2">
                {user.isAuthenticated() ? (
                   <div className="flex items-center space-x-3">
                        <LogoutBtn />
                        <Link to="/add-article" className="primary-btn" >Ajouter un article</Link>
                    </div>
                ) : (<>
                        <Link to="/login" className="secondary-btn">Connexion</Link>
                        <Link to="/signup" className="primary-btn">S'inscrire</Link>
                    </>)
                }
                </div>
            </div>
        </div>
    )
}
