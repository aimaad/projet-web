import {Link} from "react-router-dom"

export default function ArticleCard({article}) {
    return (
        <div className="rounded-lg shadow overflow-hidden">
            <img className="w-full h-32" src={article.image} />
            <div className="w-full px-4 py-2">
                <Link to={`/view/${article.id}`} className="font-semibold">{article.titre}</Link>
                <p className="text-slate-700">{article.contenu}</p>
            </div>
        </div>
    )
}
