


export default function Comment({comment}) {
    return (
        <div className="w-full flex ">
            <div className="w-8 h-8 rounded-full overflow-hidden translate-y-2">
                <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" />
            </div>

            <div className="px-3">
                <h2 className="font-semibold text-slate-500 text-sm">{comment.email}</h2>
                <p className="text-slate-800 py-0.5">{comment.contenu}</p>
            </div>
        </div>
    )
}
