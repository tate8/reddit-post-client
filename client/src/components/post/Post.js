import React, { useEffect, useState } from "react"
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import fetch from 'cross-fetch' // for safari

import SearchNavbar from "../home/SearchNavbar"
import HostedPost from "./HostedPost"
import ImagePost from "./ImagePost"
import LinkPost from "./LinkPost"
import RichPost from "./RichPost"
import LoadingResult from "../home/LoadingResult"
import Comment from "./Comment"

// scroll to top of page on reload
$(function(){
    $(window).scrollTop(0)
})

// this componenet will get post data and comments based off of url param 'id' and pass them to the postdata component
function Post()
{
    const [result, setResult] = useState(<LoadingResult />) // show loading result before post gets loaded

    let { id } = useParams()
    const query = useSelector(state => state.search.query)
    const comments = useSelector(state => state.postData.comments)
    const currentPostId = useSelector(state => state.postData.id)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/login' || location.pathname !== '/register')
        {
            console.log('fetch')
            fetchResults()
        }
    }, [history]) // fetch result when the url changes


    let fetchResults = () =>
    {
        let img_url = ''
        let video_url = ''
        let title = ''
        let link = ''
        let linkThumbnail = ''
        let numComments = ''
        let postId = ''
        let subreddit = ''
        let tempComments = []

        fetch('https://www.reddit.com/r/' + query + "/" + id + '.json')
        .then(response => response.json())
        .then(body => {
            for (let i = 0; i < body[0].data.children.length; ++i) {
                let child = body[0].data.children[i]

                // if chain for different types of posts
                // Loop through each post from the json gained from the fetch. Parse relevant information and pass as props to a result component
                if (child.data.post_hint === 'image') // child.data.author
                {
                    img_url = child.data.url_overridden_by_dest
                    title = child.data.title
                    numComments = child.data.num_comments
                    postId = child.data.id
                    subreddit = child.data.subreddit_name_prefixed
                    setResult(<ImagePost src={img_url} title={title} numComments={numComments} postId={postId} subreddit={subreddit} />)
                }
                else if (child.data.post_hint === 'link')
                {
                    link = child.data.url_overridden_by_dest
                    title = child.data.title
                    linkThumbnail = child.data.thumbnail
                    numComments = child.data.num_comments
                    subreddit = child.data.subreddit_name_prefixed

                    setResult( <LinkPost link={link} title={title} linkThumbnail={linkThumbnail} numComments={numComments} subreddit={subreddit} /> )
                }
                else if (child.data.post_hint === 'hosted:video')
                {
                    title = child.data.title
                    video_url = child.data.secure_media.reddit_video.fallback_url
                    numComments = child.data.num_comments
                    subreddit = child.data.subreddit_name_prefixed

                    setResult( <HostedPost title={title} video_url={video_url} numComments={numComments} subreddit={subreddit} /> )
                }
                else if (child.data.post_hint === 'rich:video')
                {
                    title = child.data.title
                    video_url = child.data.secure_media.oembed.thumbnail_url
                    numComments = child.data.num_comments
                    subreddit = child.data.subreddit_name_prefixed

                    setResult( <RichPost title={title} video_url={video_url} numComments={numComments} subreddit={subreddit} /> )
                }

                // here will get the comments for the post
                for (let i = 0; i < body[1].data.children.length; ++i) {
                    let comment = body[1].data.children[i]
                    let author = comment.data.author
                    let content = comment.data.body
                    let tempComment = <Comment content={content} author={author} />
                    tempComments.push(tempComment)
                }
            }
            dispatch({type: "SET_COMMENTS", payload: tempComments}) // send action to update comments
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            { location.pathname === `/${currentPostId}` && <SearchNavbar />}
            { location.pathname === `/${currentPostId}` && result}
            { location.pathname === `/${currentPostId}` && (!comments ? <></> : comments.map(e => e))}
        </>
    )
}

export default Post