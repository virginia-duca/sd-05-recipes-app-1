import React from 'react';
import { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { toggleFavorite, isRecipeFavorited, appPage } from '../Services/Utils';

const NewCardFavoritos = ({ recipe, index }, { location, history, redirect }) => {
  const { alcoholicOrNot, area, category, id, image, name, type } = recipe;
  const [copy, setCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorited(id, type));

//   const toClipboard = (link) => {
//     navigator.clipboard
//       .writeText(link)
//       .then(() => {
//         /* alert('Link copiado!'); */
//         setCopy(true);
//       })
//       .catch(() => null);
//   };

// useEffect(() => {
//     effect
//     return () => {
//         cleanup
//     }
// }, [input])
// if (isFavorite) {
//     setIsFavorite(false)
//     return <Redirect to={location}/>
// }
  return (
    <div>
      <p>{type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}</p>
      <p>{name}</p>
      <button>
        <img src={shareIcon} />
      </button>
      <button
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        onClick={() => {
          setIsFavorite(toggleFavorite(recipe));
        document.location.reload()
        }}
      >
        <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} />
      </button>
      <img src={image} />
    </div>
  );
};

export default withRouter(NewCardFavoritos);
