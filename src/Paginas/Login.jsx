import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import APIS from '../Services/FetchAPI';

import storage from '../Services/LocalStorage';

function Login() {
  const { fetch } = useContext(AppContext);
  
  useEffect(() => {
<<<<<<< HEAD
    fetch.getFood(APIS.food.searchByName('Fish'));
    console.log(APIS.food.searchByName)
=======
    fetch.addFoodByName('Fish');
    storage.initStorage();
    storage.setValueByKey('user', { email: 'a@a.com' });
    console.log(storage.getStorageAsObject());
>>>>>>> 59fe0103d842b4abb320faccceebf55e49599f19
    // eslint-disable-next-line
  }, []);

  return(
    <AppContext.Consumer>
      {
        ({ comidas12, isFetching }) => (isFetching) ? 
          (
            <div>Loading...</div>
          ) : (
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
