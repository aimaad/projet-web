import {useEffect, useState} from "react"
import Header from "../header"
import axios from "../axios-instance"
import {useParams} from "react-router-dom"
import ErrorDialog from "../dialogs/error-dialog"
import Comments from "./comments"

export default function ViewArticle() {
    const {articleId} = useParams();
    const [article, setArticle] = useState({})

    useEffect(() => {
        axios.get(`/articles/${articleId}`)
        .then((res) => {
            setArticle(res.data.article)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    if(!article)
        return <ErrorDialog message="Error: Could not get the article from the server" />

    return (
        <div className="w-screen h-screen">
            <Header />

            <div className="flex px-24 mt-4 space-x-8">

                {/* article content */}
                <div className="w-full space-y-12">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-semibold text-slate-800">{article.titre}</h1>
                        <p className="text-slate-500">{article.contenu}</p>
                    </div>

                    <Comments articleId={articleId} />

                </div>

                {/* article image */}
                <div className="w-[30%] rounded-md overflow-hidden shadow">
                    <img className="w-full h-48 object-cover" src={article.image} />

                    <div className="w-full px-3 py-1">
                        <div className="flex py-0.5">
                            <p className="w-24 text-slate-700">Auteur</p>
                            <p>{article.auteur ? article.auteur.nom : "Unknown"}</p>
                        </div>

                        <div className="flex py-0.5">
                            <p className="w-24 text-slate-700">Created at</p>
                            <p>{(new Date(article.createdAt)).toLocaleDateString()}</p>
                        </div>

                        <div className="flex py-0.5">
                            <p className="w-24 text-slate-700">Updated at</p>
                            <p>{(new Date(article.updatedAt)).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
