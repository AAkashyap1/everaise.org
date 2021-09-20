export default function Question() {
    return (
        <main className={question === "0" ? "mt-0" : "mt-8"}>
            <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="space-y-6 lg:px-0 lg:col-span-9">
                <form onSubmit={e => setLoading(false)}>
                <div className="shadow sm:rounded-md overflow-hidden shadow border border-gray-200">
                    <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Assignment Information</h3>
                        <p className="mt-1 text-sm text-gray-500">{'* '}Denotes a required field.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Number of Questions (Include separate parts as separate questions){'*'}
                        </label>
                        <input
                            min="1"
                            required
                            value={age}
                            onChange={e => setQuestions(parseInt(e.target.value))}
                            type="number"
                            name="age"
                            id="eger"
                            autoComplete="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                        Create Template
                    </button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </main>
    )
}