import Header from "./header"

export default function Home()  {

    return (
        <div>
            <Header />

            <div className="w-full flex mt-10 px-8 md:px-24 space-x-6">
                <div className="w-full space-y-4">
                    <h1>About</h1>
                </div>

            </div>
        </div>
    )
}
