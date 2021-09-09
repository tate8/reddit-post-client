import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function SubredditBox()
{
    const query = useSelector(state => state.search.query)
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        fetchDetails();
    })

    let fetchDetails = () =>
    {
        if (query === 'popular')
        {
            setTitle('r/popular');
            setDescription('A collection of the most popular reddit posts')
        }
        else
        {
            fetch('https://www.reddit.com/r/' + query + '/about.json')
            .then(res => res.json())
            .then(body => {

                if (body.data.over18)
                {
                    dispatch({ type: 'SET_QUERY', payload: 'popular' })
                }

                setTitle(body.data.display_name_prefixed)
                setDescription(body.data.public_description)
                setIcon(body.data.icon_img)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }  

    return (
        <>
            <div className="sr-container">
                <img className="sr-img" src={icon}></img>
                <h6 className="sr-title high-emphasis">{title}</h6>
                <p className="sr-description medium-emphasis">{description}</p>
            </div>
        </>
    )
}
  


export default SubredditBox;