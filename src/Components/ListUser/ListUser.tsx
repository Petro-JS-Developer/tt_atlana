import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './listUser.scss';

export interface Users {
  users: UserInterface[],
}

export interface UserInterface {
  id?: number,
  login?: string,
  avatar_url?: string,
  name?: string,
  email?: string,
  location?: string,
  created_at?: string,
  followers?: number,
  following?: number,
  forks?: number,
  stargazers_count?: number,
  public_repos?: number,
}

export const ListUser: React.FC<Users> = ({ users }) => {
  const [curentInput, setCurentInput] = useState('');
  const [filterUser, setFilterUser] = useState(users);
  const handleEvent = () => {
    setFilterUser(users.filter(
      (user: UserInterface) => user.name?.toLowerCase().includes(curentInput.toLowerCase()),
    ));
  };
  const saveUser = (person: UserInterface) => {
    const curentUser = JSON.stringify(person);
    localStorage.setItem('curentUser', curentUser);
    localStorage.setItem('valueSearchRepos', '');
  };
  useEffect(() => {
    setCurentInput(`${localStorage.getItem('valueSearchUsers')}`);
  }, []);

  useEffect(() => {
    handleEvent();
    localStorage.setItem('valueSearchUsers', curentInput);
  }, [curentInput]);

  return (
    <div className="users">
      <input type="search" name="searchInput" id="" placeholder="Search for Users" className="users__search" value={curentInput} onChange={(e) => setCurentInput(e.target.value)} />
      <ul className="users__list">
        {filterUser.map((user: UserInterface) => (
          <li key={user.id} className="users__item" onClick={() => saveUser(user)} role="presentation">
            <Link to="/user" className="users-item">
              <img src={user.avatar_url} alt="avatar" className="users-item__avatar" />
              <div className="users-item__name">{user.name}</div>
              <div className="users-item__repos">
                Repo:
                {' '}
                {user.public_repos}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
