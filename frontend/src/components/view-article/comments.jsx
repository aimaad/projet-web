import {useEffect, useState} from "react"
import Comment from "./comment"
import axios from "../axios-instance"

export default function Comments({articleId}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    useEffect(() => {
        axios.get("/commentaires/article/" + articleId)
        .then((res) => {
            console.log(res.data.commentaires)
            setComments(res.data.commentaires)
        })
        .catch((err) => console.error(err))
    }, [])

    function submitComment() {
        axios.post(`/commentaires/add/${articleId}`, {contenu : comment})
        .then(res => {
            alert("Comment added successfully")
            
        })
        .catch(err => {
            alert("Could not add the comment")
        })
    }

    if(comments.length === 0)
        return <></>;

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-800 py-1">21 Commentaires</h3>
            <hr className="w-full" />

            <div className="w-full mt-2 p-3 rounded border text-slate-500 flex justify-between">
                <input onChange={(e) => setComment(e.target.value)} value={comment} className="w-full focus:outline-none text-slate-700" placeholder="Ajouter un commentaire..." />
                <button onClick={submitComment} className="bg-transparent hover:text-teal-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>

            <div className="mt-4 space-y-3">
            {
                comments.map((item, index) => (
                    <Comment comment={item} key={index} />
                ))
            }
            </div>
        </div>
    )
}
