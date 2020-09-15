import React from 'react';
import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const NewCard = ({recipe, index}) => {
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
      <img src={image} alt="Done Food or Drink" data-testid={`${index}-horizontal-image`} />
      <div>
        {type==='bebida' 
        ? <p data-testid={`${index}-horizontal-top-text`} >{`${alcoholicOrNot}`}</p>
        : <p data-testid={`${index}-horizontal-top-text`} >{`${area} - ${category}`}</p>}
      </div>
      <button 
      src={shareIcon} data-testid={`${index}-horizontal-share-btn`}
      onClick={() => toClipboard(`http://localhost:3000/${type}s/${id}`)}
      >
        <img src={shareIcon} alt="share"/>
      </button>
      {copy ? <h1>Link copiado!</h1> : null}
      <div>
        <p data-testid={`${index}-horizontal-name`} >{name}</p>
        <p data-testid={`${index}-horizontal-done-date`}>Feita em: {doneDate}</p>
      </div>
      <div>
        {tags.map((tag, index) => <p data-testid={`${index}-${tag}-horizontal-tag`}>{tag}</p>)}
      </div>
    </div>
  )
}

export default NewCard;
