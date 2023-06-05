'use client';
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

export default function Heading() {

    const [inputValue, setInputValue] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [keypoints, setKeypoints] = useState()
    const [completeSummary, setCompleteSummary] = useState()
    const [iframeSrc, setIframeSrc] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidYoutubeLink(inputValue)) {
            setWaiting(true);
            try {
                const response = await fetch("http://localhost:8001/api/summary", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: inputValue }),
                });

                const data = await response.json();

                if (data.iframe_code != undefined) {
                    setIframeSrc(data.iframe_code);

                    const kp = data.keypoints.split("\n").map((item, i) => (
                        <Fragment key={i}>
                            {item}
                            <br></br>
                        </Fragment>
                    ))
                    setKeypoints(kp);

                    const sum = data.complete.split("\n").map((item, i) => (
                        <Fragment key={i}>
                            {item}
                            <br></br><br></br>
                        </Fragment>
                    ))
                    setCompleteSummary(sum);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true)
                setWaiting(false);
            }
        } else {
            alert("Por favor ingrese un enlace de Youtube válido.");
        }
    };

    const isValidYoutubeLink = (url) => url.toLowerCase().includes('youtube.com') ? true : false

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gradient-to-tr from-indigo-600 to-indigo-900">
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 hover:cursor-pointer" onClick={refreshPage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-50">
                                            <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                                        </svg>

                                    </div>
                                    <div className="hidden md:block">

                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="relative ml-3">
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >

                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Youtube Summarizer</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        {!loaded ? (
                            <div className='max-w-2xl mx-auto'>
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                                        Youtube link
                                    </label>
                                    <input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md w-full"
                                    />
                                </div>
                                {!waiting ? (
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="rounded-md bg-indigo-700 px-3 py-3 text-md text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full mt-4 font-medium"
                                    >Resumir</button>) : (
                                    <div role="status" className='pt-4 flex justify-center'>
                                        <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>)}
                            </div>
                        ) : !error ? (
                            <div className='w-full'>
                                <div className='flex flex-row border-b-2 pb-7 grid-rows-1'>
                                    <iframe width="560" height="315" src={iframeSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                    <div className='ml-4 max-w-2xl'>
                                        <p className='font-semibold text-xl text-gray-800'>Resumen en viñetas</p>
                                        <p className='font-medium text-sm text-gray-700 mt-2'>{keypoints}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='font-semibold text-xl text-gray-800 mt-2'>Resumen completo</p>
                                    <p className='font-medium text-sm text-gray-700 mt-2'>{completeSummary}</p>
                                </div>
                            </div>
                        )  : (
                            <div>
                                <p className='font-semibold text-xl text-gray-800'>Ocurrio un error, intentalo nuevamente</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}
