/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getRepos } from '../../api';
import { ListRepos } from '../ListRepos/ListRepos';
import { UserInterface } from '../ListUser/ListUser';
import { Loader } from '../Loader/Loader';
import './user.scss';

export interface Repos {
  arrRepos: UserRepo[],
}

export interface UserRepo {
  id?: number,
  name?: string,
  forks?: number,
  stargazers_count?: number,
  html_url?: string,
}

export const User: React.FC<UserInterface> = () => {
  const [selectedUser, setSelectedUser] = useState<UserInterface | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [arrRepos, setArrRepos] = useState<UserRepo[] | []>([]);
  const {
    login,
    avatar_url,
    name,
    email,
    location,
    created_at,
    followers,
    following,
  } = { ...selectedUser };

  useEffect(() => {
    setIsLoading(false);
    const curentUser = localStorage.getItem('curentUser');
    if (typeof curentUser === 'string') {
      setSelectedUser(JSON.parse(curentUser));
    }
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (login) {
      getRepos(`/${login}`)
        .then((res) => res.json())
        .then((res) => {
          setArrRepos(res);
        });
    }
  }, [selectedUser]);

  return (
    <div className="user">
      {isLoading ? (
        Object.keys(arrRepos).length > 0 && (
          <>
            <div className="user__container">
              <div className="user__avatar user-avatar">
                <img className="user-avatar__img" src={avatar_url} alt="avatar" />
              </div>
              <div className="user__userInform user-inform">
                <div className="user-inform__name">
                  Name:
                  {' '}
                  {name}
                </div>
                <div className="user-inform__email">
                  Email:
                  {' '}
                  {email}
                </div>
                <div className="user-inform__location">
                  Location:
                  {' '}
                  {location}
                </div>
                <div className="user-inform__createdAt">
                  Join Date:
                  {' '}
                  {created_at}
                </div>
                <div className="user-inform__followers">
                  Followers:
                  {' '}
                  {followers}
                </div>
                <div className="user-inform__following">
                  Following:
                  {' '}
                  {following}
                </div>
              </div>
            </div>

            <p className="user__biography">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam quo aperiam a placeat eum aliquam quae harum ullam voluptas earum. Tenetur quod, quia eveniet laboriosam aperiam quasi amet repellendus modi unde dignissimos voluptatum quidem rem animi tempore iusto? At nostrum exercitationem velit earum tempora, asperiores voluptatibus nobis aliquam sed ducimus.
            </p>
            <ListRepos arrRepos={arrRepos} />
          </>
        )
      ) : <Loader />}

    </div>
  );
};
