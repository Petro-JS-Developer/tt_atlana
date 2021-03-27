import React, { useEffect, useState } from 'react';
import { Repos, UserRepo } from '../User/User';
import './listRepos.scss';

export const ListRepos: React.FC<Repos> = ({ arrRepos }) => {
  const [curentInput, setCurentInput] = useState('');
  const [filterRepos, setFilterRepos] = useState(arrRepos);
  const handleEvent = () => {
    setFilterRepos(arrRepos.filter(
      (repo: UserRepo) => repo.name?.toLowerCase().includes(curentInput.toLowerCase()),
    ));
  };

  useEffect(() => {
    setCurentInput(`${localStorage.getItem('valueSearchRepos')}`);
  }, []);

  useEffect(() => {
    handleEvent();
    localStorage.setItem('valueSearchRepos', curentInput);
  }, [curentInput]);

  return (
    <div className="listRepos">
      <input type="search" name="searchInput" placeholder="Search for Users`s Repositories" className="listRepos__search" onChange={(e) => setCurentInput(e.target.value)} value={curentInput} />
      <ul className="listRepos__list">
        {filterRepos.map((repo) => (

          <li className="listRepos__item" key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="listRepos__item_wrapper  repo-item">
              <div className="repo-item__name">
                {repo.name}
              </div>
              <div className="repo-item__infoAboutRepo infoAboutRepo">
                <div className="infoAboutRepo__forks">
                  {repo.forks}
                  {' '}
                  Forks
                </div>
                <div className="infoAboutRepo__stars">
                  {repo.stargazers_count}
                  {' '}
                  Stars
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
