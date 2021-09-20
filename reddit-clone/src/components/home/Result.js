import React from 'react'
import $ from 'jquery'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingResult from './LoadingResult'


let heartAnimation = () =>
{
    $(() => {
        $('.post-heart').on('click', function() {
            $(this).toggleClass('far')
            $(this).toggleClass('fas')
        })

    })
}

function Result(props)
{ 
    const history = useHistory();
    const dispatch = useDispatch();

    let toPost = () =>
    {
        let id = props.postId;
        dispatch({ type: 'SET_CURRENT_POST_ID', payload: id })
        history.push(`/${id}`)
    }
    // display different result formats based off of the post type
    if (props.type === 'image')
    {
        return (
            <>
                <div className="post-group">
                    <div className="">
                        <img className="post-image" src={props.src} alt={props.src} onClick={toPost}></img>
                    </div>
                    <p className="post-title high-emphasis">{props.title}</p>
                    <p className="comment-number medium-emphasis"><i class="fas fa-comments comment-icon"></i> {props.numComments}</p>
                    <i class="far fa-heart post-heart" onClick={heartAnimation}></i>
                </div>
            </>
        )
    }
    else if (props.type === 'link')
    {
        let linkTrunc = props.link.substring(0, 25) + '...';
        return (
            <>
                <div className="post-group">
                    <div className="row">
                        <div className="col-md-6">
                            <a href={props.link}>{linkTrunc} <i className="fas fa-external-link-alt"></i></a>
                        </div>
                        <div className="col-md-6">
                            {props.linkThumbnail==='default' 
                            ? <div className="bad-thumbnail"><i class="fas fa-unlink" onClick={toPost}></i></div> 
                            : <img className="thumbnail" src={props.linkThumbnail} alt="thumbnail" onClick={toPost}></img>
                            }
                        </div>
                    </div>
                    <p className="post-title high-emphasis">{props.title}</p>
                    <p className="comment-number medium-emphasis"><i class="fas fa-comments"></i> {props.numComments}</p>
                    <i class="far fa-heart post-heart" onClick={heartAnimation}></i>
                </div>
            </>
        )
    }
    else if (props.type === 'hostedVideo')
    {
        return (
            <>
                <div className="post-group">
                    <video width="300" height="400" controls className="video" onClick={toPost}>
                        <source src={props.video_url} type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                    <p className="post-title high-emphasis">{props.title}</p>
                    <p className="comment-number medium-emphasis"><i class="fas fa-comments"></i> {props.numComments}</p>
                    <i class="far fa-heart post-heart" onClick={heartAnimation}></i>
                </div>
            </>
        )
    }
    else if (props.type === 'richVideo')
    {
        return (
            <>
                <div className="post-group">
                    <div className="col-md-6 post-video-container">
                        <img className="rich-video" src={props.video_url} alt="thumbnail" onClick={toPost}></img>
                    </div>
                    <p className="post-title high-emphasis">{props.title}</p>
                    <p className="comment-number medium-emphasis"><i class="fas fa-comments"></i> {props.numComments}</p>
                    <i class="far fa-heart post-heart" onClick={heartAnimation}></i>
                </div>
            </>
        )
    }
    else {
        return (
            <LoadingResult />
        )
    }
}

export default Result