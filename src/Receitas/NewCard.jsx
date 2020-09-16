import React from 'react';
import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import { Link } from 'react-router-dom';
import './carddss.css'

const NewCard = ({recipe, index, redirect, pathname}) => {
  const { type, id, area, category, alcoholicOrNot, name, image, tags, doneDate } = recipe
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    console.log(recipe)
  }, [])

  const toClipboard = (link) => {
    navigator.clipboard.writeText(link)
    .then(() => {
      /* alert('Link copiado!'); */
      setCopy(true);
    })
    .catch(() => null);
  }

  return(
    <div>
         <button onClick={() => redirect(`/${type}s/${id}`)}>
          <img  className="card-img-1" src={image} alt="Done Food or Drink" data-testid={`${index}-horizontal-image`} />
          </button>
      <div>
        <button 
        src={shareIcon} data-testid={`${index}-horizontal-share-btn`}
        onClick={() => toClipboard(`http://localhost:3000/${type}s/${id}`)}
        >
          <img src={shareIcon} alt="share" className="card-img-2"/>
        </button>
        <div>
          {type==='bebida' 
          ? <p  className="card-title" data-testid={`${index}-horizontal-top-text`} >{`${alcoholicOrNot}`}</p>
          : <p  className="card-title" data-testid={`${index}-horizontal-top-text`} >{`${area} - ${category}`}</p>}
        </div>
        {copy ? <h1>Link copiado!</h1> : null}
        <div>
          <button onClick={() => redirect(`/${type}s/${id}`)}>
          <p className="card-title" data-testid={`${index}-horizontal-name`} >{name}</p>
          </button>
      </div>
        <p  className="card-title" data-testid={`${index}-horizontal-done-date`}>Feita em: {doneDate}</p>
      </div>
      <div>
        {tags.map((tag) => <p  className="card-title"data-testid={`${index}-${tag}-horizontal-tag`}>{tag}</p>)}
      </div>
    </div>
  )
}

export default NewCard;
