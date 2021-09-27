import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import Result from './Result'
import LoadingResult from './LoadingResult'
import Filter from '../Filter'

function Results()
{   
    const [data, setData] = useState(1)
    const afterListings = useSelector(state => state.pagination.afterListings) // for pagination
    const page = useSelector(state => state.pagination.page)
    const currentFilter = useSelector(state => state.search.filter)
    const query = useSelector(state => state.search.query)
    const results = useSelector(state => state.search.results)
    const location = useLocation();
    const dispatch = useDispatch()


    useEffect(() => {
        if (location.pathname === '/') { fetchResults() }
    }, [data])


    useEffect(() => {
        if (location.pathname === '/') 
        {
            dispatch({ type: 'DELETE_AFTER_LISTINGS' }) // reset after listings ids
            dispatch({ type: 'DELETE_QUERY_RESULTS' }) // reset results
            fetchResults()
        }
    }, [query, currentFilter])

    let fetchNewPosts = () => {
        setData(Math.random())
    }

    let fetchResults = () =>
    {
        let results = []
        let img_url = ''
        let video_url = ''
        let title = ''
        let link = ''
        let type = ''
        let linkThumbnail = ''
        let numComments = ''
        let postId = ''


        fetch('https://www.reddit.com/r/' + query + "/" + currentFilter + '.json?limit=10&after=' + afterListings.at(-1))
        .then(response => response.json())
        .then(body => {
            for (let i = 0; i < body.data.children.length; ++i) {
                let result = ''
                let child = body.data.children[i]

                if (i % 9 === 0)
                {
                    dispatch({ type: 'SET_AFTER_LISTING', payload: child.data.name })
                }

                // if chain for different types of posts
                // Loop through each post from the json gained from the fetch. Parse relevant information and pass as props to a result component
                if (child.data.post_hint === 'image')
                {
                    type = 'image'
                    img_url = child.data.url_overridden_by_dest
                    title = child.data.title
                    numComments = child.data.num_comments
                    postId = child.data.id

                    result = <Result src={img_url} title={title} type={type} numComments={numComments} postId={postId} />
                }
                else if (child.data.post_hint === 'link')
                {
                    type = 'link'
                    link = child.data.url_overridden_by_dest
                    title = child.data.title
                    linkThumbnail = child.data.thumbnail
                    numComments = child.data.num_comments
                    postId = child.data.id

                    result = <Result title={title} type={type} link={link} linkThumbnail={linkThumbnail} numComments={numComments} postId={postId} />
                }
                else if (child.data.post_hint === 'hosted:video')
                {
                    type = 'hostedVideo'
                    title = child.data.title
                    video_url = child.data.secure_media.reddit_video.fallback_url
                    numComments = child.data.num_comments
                    postId = child.data.id

                    result = <Result title={title} type={type} video_url={video_url} numComments={numComments} postId={postId} />
                }
                else if (child.data.post_hint === 'rich:video')
                {
                    type = 'richVideo'
                    title = child.data.title
                    video_url = child.data.secure_media.oembed.thumbnail_url
                    numComments = child.data.num_comments
                    postId = child.data.id

                    result = <Result title={title} type={type} video_url={video_url} numComments={numComments} postId={postId} />
                }
                results.push(result)
            }
            dispatch({type: "QUERY_RESULTS", payload: results}) // send action to update results
        }).catch((err) => {
            console.log(err)
            results = null;
        })
    }

    return (
        <>
            {!query ? <h6 className="query-text disabled" >No query</h6> :<h6 className="query-text disabled" >Showing results for {query}</h6>}
            
            { !results 
            ? <> <LoadingResult /> <LoadingResult /> <LoadingResult /> </>
            : 
            <> 
                <Filter />
                {results.map(p =>p)} 

                <a className="btn btn-success" onClick={fetchNewPosts}>Load more</a>
            </>
            }
        </>
    )
}

export default Results