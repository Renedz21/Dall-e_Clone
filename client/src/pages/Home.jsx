import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map((post) => <Card key={post._id} {...post} />)
    }

    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
            {title}
        </h2>
    )
}


const Home = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])

    const [searchText, setSearchText] = useState('')

    const [searchResults, setSearchResults] = useState('')

    const [searchedTimeOut, setSearchedTimeOut] = useState(null)


    const handleSearch = (e) => {
        setSearchText(e.target.value)

        setSearchedTimeOut(
            setTimeout(() => {
                const searchResults = posts.filter((post) => post.name.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase()))

                setSearchResults(searchResults)
            }, 500)
        )
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('http://localhost:8000/api/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                console.log(data.data)
                setPosts(data.data.reverse())
            } catch (error) {
                alert('Something went wrong', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <section className='max-w-7xl mx-auto'>

            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    The Community Showcase
                </h1>
                <p className='mt-8 text-[#666e75] text-[16px] max-w-[500px]'>
                    Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
                </p>
            </div>

            <div className='mt-16'>
                <FormField
                    labelName='Search Posts'
                    type='text'
                    name='text'
                    placeholder='Search posts'
                    value={searchText}
                    handleChange={handleSearch}
                />
            </div>

            <div className='mt-10'>
                {isLoading ? (
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                Showing results for <span className='text-[#222328]'>{searchText}</span>
                            </h2>
                        )}

                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {searchText ? (
                                <RenderCards
                                    data={searchResults}
                                    title="No search results found"
                                />
                            ) : (
                                <RenderCards
                                    data={posts}
                                    title="No posts found"
                                />
                            )}
                        </div>
                    </>
                )}
            </div>

        </section>
    )
}

export default Home