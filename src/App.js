import { useEffect, useState } from 'react';
import './App.css';
import WelcomePage from './components/WelcomePage';
import CreateGroup from './components/CreateGroup';
import NotesPage from './components/NotesPage';
import SideMenu from './components/SideMenu';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavigateMain from './components/NavigateMain';

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("groupNotes")) || []);

  const [isModal, setIsModal] = useState(false);

  const [selectedGrp, setSelectedGrp] = useState(null);

  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setwindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("groupNotes", JSON.stringify(data));
    // console.log(data);
  }, [data]);

  // clicks outside the popup then you need to close the popup
  const closePopUp = () => {
    if (isModal) setIsModal(false)

  }

  if (windowWidth < 768) {
    return (
      <Router>
        <div className='app'>
          {isModal && <CreateGroup data={data} setData={setData} setIsModal={setIsModal} />}
          <Routes>

            <Route path='/' element={<SideMenu width={windowWidth} isModal={isModal} setIsModal={setIsModal} closePopUp={closePopUp} data={data} selectedGrp={selectedGrp} setSelectedGrp={setSelectedGrp} />}>
            </Route>

            <Route path='/main' element={selectedGrp && <NotesPage group={selectedGrp} setSelectedGrp={setSelectedGrp} data={data} setData={setData} isModal={isModal} closePopUp={closePopUp} />}>
            </Route>
          </Routes>
        </div>
      </Router>
    )
  }
  else {
    return (
      <Router>
        {isModal && <CreateGroup data={data} setData={setData} setIsModal={setIsModal} />}
        <Routes>
          <Route path='/' element={
            <div className='app'>
              <SideMenu isModal={isModal} setIsModal={setIsModal} closePopUp={closePopUp} data={data} selectedGrp={selectedGrp} setSelectedGrp={setSelectedGrp} />
              {
                selectedGrp ?
                  <NotesPage group={selectedGrp} setSelectedGrp={setSelectedGrp} data={data} setData={setData} isModal={isModal} closePopUp={closePopUp} />
                  :
                  <WelcomePage isModal={isModal} closePopUp={closePopUp} />
              }
            </div>}>
          </Route>
          <Route path='/main' element={<NavigateMain width={windowWidth} />} />
        </Routes>
      </Router >

    );
  }
}

export default App;
