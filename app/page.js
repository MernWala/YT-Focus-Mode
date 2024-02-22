"use client";
import { useEffect, useRef, useState } from 'react'
import { IoIosLink } from "react-icons/io";
import { LuPaintbrush } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import { GoStack, GoTrash } from "react-icons/go";

const Home = () => {

  const textarea = useRef("")
  const mainForm = useRef("")
  const [currentLink, setCurrentLink] = useState('')
  const [inputState, setInputState] = useState({})
  const [linkStacks, setLinkStacks] = useState(() => {
    if (window !== 'undefined') {
      return JSON.parse(localStorage.getItem('youtube-jugad')) || []
    }
    
    return []
  })

  const handleInsert = (url) => {
    if (url) {
      setCurrentLink(url)
      return;
    }

    const regex = /src="(.*?)"/;
    const match = regex.exec(inputState?.url);
    if (match) {
      const src = match[1];
      setCurrentLink(src)
      return;
    }

    if (currentLink.length === 0) {
      window.alert(`Can't handle link!`)
      mainForm.current.reset()
    }
  }

  const handleStack = () => {
    const regex = /src="(.*?)"/;
    const match = regex.exec(inputState?.url)
    if (match) {
      const src = match[1];
      setLinkStacks([{ ...inputState, url: src }, ...linkStacks])
    }
  }

  const handleDelete = (url) => {
    setLinkStacks(linkStacks.filter(ele => ele.url != url))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleInsert("")
    handleStack()
  }

  useEffect(() => {
    localStorage.setItem('youtube-jugad', JSON.stringify(linkStacks))
  }, [linkStacks])

  return (
    <main className="flex min-h-[100vh] bg-gray-900 pt-20 pb-4">
      <div className="w-8/12 p-4">
        <div className="h-full w-full flex items-start justify-center relative">
          <iframe className="w-[95%] rounded-xl aspect-video bg-gray-700" src={currentLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          {currentLink.length === 0 &&
            <div className='absolute w-full h-full flex items-center justify-center'>
              <span className='text-lg text-gray-300 capitalize font-light my-auto'>Your video will show here</span>
            </div>
          }
        </div>
      </div>
      <div className="w-4/12 p-4">
        <form ref={mainForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name='title'
            className="w-full bg-gray-600 text-white rounded-md p-2 focus:outline-none focus:shadow-md focus:border-gray-400 font-mono text-sm mb-2"
            placeholder='Set Title for below link'
            onChange={(e) => { setInputState({ ...inputState, [e.target.name]: e.target.value }) }}
          />
          <textarea
            rows="7"
            name='url'
            className="w-full bg-gray-600 text-white rounded-md p-2 focus:outline-none focus:shadow-md focus:border-gray-400 font-mono text-sm"
            placeholder="Insert embaded link of youtube!"
            onChange={(e) => { setInputState({ ...inputState, [e.target.name]: e.target.value }) }}
            ref={textarea}
          >
          </textarea>
        </form>
        <div className="mt-2">
          <span className="block text-lg font-semibold text-white mb-2">Input Action</span>
          <div className="flex gap-3">
            <button type="button" className="border-0 bg-green-800 lh-1 leading-none px-3 py-2 rounded-md text-white uppercase flex gap-1" onClick={() => { handleInsert("") }}>
              <IoIosLink />
              Insert
            </button>
            <button type="button" className="border-0 bg-red-600 lh-1 leading-none px-3 py-2 rounded-md text-white uppercase flex gap-1" onClick={() => { mainForm.current.reset(); }}>
              <LuPaintbrush />
              Clear
            </button>
            <button type="button" className="border-0 bg-blue-600 lh-1 leading-none px-3 py-2 rounded-md text-white uppercase flex gap-1" onClick={() => { handleStack() }}>
              <GoStack />
              Stack Links
            </button>
          </div>
          <div className='mt-4 flex flex-col gap-2'>
            {linkStacks.map((ele) => {
              return (
                <div className='bg-gray-600 p-1 rounded-full flex items-center justify-start' key={ele.url}>
                  <div className='bg-gray-500 p-1 rounded-[50%] hover:scale-125 cursor-pointer transition-all hover:transition-all'>
                    <div className='relative flex items-center justify-center' onClick={() => { handleInsert(ele.url); console.log(ele.url) }}>
                      <p className='m-0 bg-white w-[10px] h-[10px] absolute z-0'></p>
                      <FaYoutube className='text-red-600 text-2xl relative z-1' />
                    </div>
                  </div>
                  <div className='ms-2 w-[85%]'>
                    <span className='text-sm text-white font-light capitalize truncate overflow-hidden block w-full cursor-default'>{ele.title}</span>
                  </div>
                  <div className='width-fit block ms-auto px-1 pe-0'>
                    <button type="button" className='leading-0 bg-red-600 p-2 rounded-full' onClick={() => { handleDelete(ele.url) }}>
                      <GoTrash className='leading-0 text-white' />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home