import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import APIS from '../Services/FetchAPI';

function Login() {
  const { fetch } = useContext(AppContext);
  
  useEffect(() => {
    fetch.getFood(APIS.food.searchByName('Fish'));
    console.log(APIS.food.searchByName)
    // eslint-disable-next-line
  }, []);

  return(
    <AppContext.Consumer>
      {
        ({ comidas12, isFetching }) => (isFetching) ? 
          (
            <div>Loading...</div>
          ):(
            <div>
              <h1>Login Page</h1>
              <h3>Teste (pesquisa por 'Fish')</h3>
              {
                comidas12.map(({ strMeal, idMeal }) => (
                  <p key={idMeal}>{ strMeal }</p>
                ))
              }
            </div>
          )
      }
    </AppContext.Consumer>
  );
}

export default Login;
