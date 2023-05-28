import {useEffect, useState} from "react"
import axios from "../axios-instance"
import {Navigate} from "react-router-dom"
import ErrorDialog from "../dialogs/error-dialog"
import GlobalLoader from "../dialogs/global-loader"

const STATES = {
    LOGGED_IN : "logged_in",
    LOADING : "loading",
    NOT_LOGGED_IN : "not_logged_in",
    ERROR : 'error'
}

export default function LoginRequired({children}) {
    // state = logged_in || loading || not_logged_in
    const [state, setState] = useState(STATES.LOADING)

    useEffect(() => {
        axios.get("/auth/get-logged-user")
        .then((res) => {
            const user = res.data.user;
            if(!user.isAuthenticated) {
                setState(STATES.NOT_LOGGED_IN)
            } else {
                setState(STATES.LOGGED_IN)
            }
        })
        .catch((error) => {
            console.log(error)
            setState(STATES.ERROR)
        })
    }, [])

    switch(state) {
        case STATES.LOADING :
            return <GlobalLoader />;
        case STATES.ERROR :
            return <ErrorDialog message="Make sure that you are connected to the internet" />;
        case STATES.NOT_LOGGED_IN:
            return <Navigate to='/login' replace />;
        case STATES.LOGGED_IN:
            return <>{children}</>;
        default:
            return <></>;
    }

    return <></>
}
