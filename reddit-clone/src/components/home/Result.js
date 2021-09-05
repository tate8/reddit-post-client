import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Result(props)
{ 
    const history = useHistory();
    const dispatch = useDispatch();

function toPost()
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
            <div className="post-group" onClick={toPost}>
                <div className="">
                    <img className="post-image" src={props.src} alt={props.src}></img>
                </div>
                <p className="post-title high-emphasis">{props.title}</p>
                <p className="comment-number medium-emphasis">{props.numComments} comments</p>
            </div>
        </>
    )
}
else if (props.type === 'link')
{
    let linkTrunc = props.link.substring(0, 25) + '...';
    return (
        <>
            <div className="post-group" onClick={toPost}>
                <div className="row">
                    <div className="col-md-6">
                        <a href={props.link}>{linkTrunc} <i className="fas fa-external-link-alt"></i></a>
                    </div>
                    <div className="col-md-6">
                        {props.linkThumbnail==='default' 
                        ? <div className="bad-thumbnail"><i class="fas fa-unlink"></i></div> 
                        : <img className="thumbnail" src={props.linkThumbnail} alt="thumbnail"></img>
}
                    </div>
                </div>
                <p className="post-title high-emphasis">{props.title}</p>

            </div>
        </>
    )
}
else if (props.type === 'hostedVideo')
{
    return (
        <>
            <div className="post-group" onClick={toPost}>
                <video width="300" height="400" controls className="video">
                    <source src={props.video_url} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
                <p className="post-title high-emphasis">{props.title}</p>
                <p className="comment-number medium-emphasis">{props.numComments} comments</p>

            </div>
        </>
    )
}
else if (props.type === 'richVideo')
{
    return (
        <>
            <div className="post-group" onClick={toPost}>
                <div className="col-md-6 post-video-container">
                    <img className="rich-video" src={props.video_url} alt="thumbnail"></img>
                </div>
                <p className="post-title high-emphasis">{props.title}</p>

            </div>
        </>
    )
}
else {
    return (
        <h1>diff type</h1>
    )
}

}

export default Result;