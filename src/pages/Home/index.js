import React from 'react';
import { Header } from "../../components/Header";
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList/index.jsx';
import {useState} from 'react';
import './styles.css'

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app"></img>
        <div className="info">
          <div className="input-line">
            <input name="usuario"
            value={user}
            onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={handleGetData} className="search">Search</button>
          </div>
          {currentUser?.name ? (<>
          <div className="profile-infos">
            <img src={currentUser.avatar_url}
            className="img-profile"
            alt="profile picture"></img>
            <div className="text-infos">
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
          </>
          ): null}
          {repos?.length ? (<>
          <div>
            <h4>Repositórios</h4>
            {repos.map(repo => (
              // eslint-disable-next-line react/jsx-key
              <ItemList url={repo.html_url} title={repo.name} description={repo.description } />
            ))}
          </div>
          </>
        ): null}
        </div>
      </div>
    </div>
  );
}

export default App;