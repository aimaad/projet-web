

export default function ErrorDialog({message}) {
    return (
        <div className="w-screen h-screen bg-white flex flex-col items-center justify-center">
            <p className="text-red-500 text-xl">Error occurred</p>
            <small>{message || "Error"}</small>
        </div>
    )
}
