import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { getUsers } from './api';
import './app.scss';
import { ListUser, UserInterface } from './Components/ListUser/ListUser';
import { Loader } from './Components/Loader/Loader';
import { User } from './Components/User/User';

function App() {
  const [users, setUsers] = useState<UserInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
    getUsers()
      .then((data) => data.json())
      .then((data) => {
        const requests = data.map((user: { url: RequestInfo; }) => fetch(user.url));

        Promise.all(requests)
          .then((responses) => Promise.all(responses.map((res: any) => res.json())))
          .then((result) => setUsers(result));
      });
    setIsLoading(true);
  }, []);

  return (
    <div className="app">
      <div className="container">
        {isLoading ? (
          <>
            <h1 className="users__title">GitHub Searcher</h1>
            <Switch>
              <Route path="/tt_atlana">
                {users.length > 0 && (
                <ListUser
                  users={users}
                />
                )}
              </Route>
              <Route path="/user">
                <User />
              </Route>
            </Switch>
          </>
        ) : <Loader />}

      </div>
    </div>
  );
}

export default App;
