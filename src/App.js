import { useEffect, useState } from 'react';
import './App.css';
import plusIcon from "./assets/plusIcon.png"
import WelcomePage from './components/WelcomePage';
import CreateGroup from './components/CreateGroup';
import NotesPage from './components/NotesPage';

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("groupNotes")) || []);

  const [isModal, setIsModal] = useState(false);

  const [selectedGrp, setSelectedGrp] = useState(null);

  useEffect(() => {
    localStorage.setItem("groupNotes", JSON.stringify(data));
    console.log(data);
  }, [data]);

  // clicks outside the popup then you need to close the popup
  const closePopUp = () => {
    if (isModal) setIsModal(false)

  }

  return (
    <div className='app'>
      <div className="sidemenu" style={{ opacity: `${isModal ? '50%' : '100%'}` }} onClick={closePopUp}>
        <h1 className='heading'>Pocket Notes</h1>
        {
          data &&
          <ul className='grp-list'>
            {
              data.map((item) => {
                return (
                  <li key={item?.id} 
                    onClick={() => setSelectedGrp(item)} 
                    style={{backgroundColor: `${selectedGrp && item?.id === selectedGrp?.id ? '#e0dcdc' : 'white'}`}}>
                    <span style={{ backgroundColor: item?.color, borderRadius: '100%' }}>{item?.logo}</span>
                    {item?.title}
                  </li>
                )
              })
            }
          </ul>
        }

        <button className='newgroup-btn' onClick={() => setIsModal(true)}>
          <img src={plusIcon} alt="create new group" />
        </button>
      </div>

      {isModal && <CreateGroup data={data} setData={setData} setIsModal={setIsModal}/> }

      {
        selectedGrp ?
          <NotesPage group={selectedGrp} data={data} setData ={setData} isModal={isModal} closePopUp={closePopUp} />
          :
          <WelcomePage isModal={isModal} closePopUp={closePopUp} />
      }

    </div>
  );
}

export default App;
