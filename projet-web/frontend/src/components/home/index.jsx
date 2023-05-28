import {useState, useEffect} from "react"
import Header from "../header"
import Categories from "./categories"
import axios from "../axios-instance"
import ArticleCard from "./article-card"

export default function Home()  {
    const [categorId, setCategoryId] = useState(-1);
    const [articles, setArticles] = useState([])


    useEffect(() => {
        const url = categorId == -1 ? "/articles" : `/articles/category/${categorId}`;
        console.log(url)
        axios.get(`${url}?page=1&limit=5`)
        .then(res => {
            console.log(res.data.articles)
            setArticles(res.data.articles || [])
        })
        .catch(err => {
            console.log(err)
        })
    }, [categorId,])

    function handleCategoryChange(id) {
        setCategoryId(id)
    }

    return (
        <div>
            <Header />

            <div className="w-full flex mt-10 px-8 md:px-24 space-x-6">
                <div className="w-full space-y-4">
                    <h1 className="text-lg font-semibold text-gray-800">Articles</h1>
                    <div className="w-full grid grid-cols-3 gap-2">
                    {
                        articles.map((article, index) => (
                            <ArticleCard article={article} key={index} />
                        ))
                    }
                    </div>
                </div>

                {/* categories */}
                <div className="w-[30%] bg-teal-50 rounded-lg shadow">
                    <Categories onChange={handleCategoryChange} />
                </div>
            </div>
        </div>
    )
}
