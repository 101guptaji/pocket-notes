import { useState } from 'react';
import './App.css';
import plusIcon from "./assets/plusIcon.png"
import welcomeImg from "./assets/welcomeImg.png"
import lockIcon from "./assets/lock.png"

function App() {
  const [groupList, setGroupList] = useState([]);

  return (
    <div className='app'>
      <div className="sidemenu">
        <h1 className='heading'>Pocket Notes</h1>
        {
          groupList &&
          <ul>
            {
              groupList.map((item) => {
                <li key={item?.id}>{item.name}</li>
              })
            }
          </ul>
        }

        <button className='newgroup-btn'>
          <img src={plusIcon} alt="create new group" />
        </button>
      </div>

      <div className="welcome">
        <img src={welcomeImg} alt="" />
        <h2>Pocket Notes</h2>
        <p>Send and receive messages without keeping your phone online.</p>
        <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

        <p className="encryption">
          <img src={lockIcon} alt="" />
          <span>end-to-end encrypted</span>
        </p>
      </div>
    </div>
  );
}

export default App;
