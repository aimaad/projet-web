

export default function Background({children}) {
    return (
        <div className="w-screen h-screen bg-slate-200 relative flex flex-col items-center justify-center">
            <div className="z-10">
            {children}
            </div>
        </div>
    )
}
