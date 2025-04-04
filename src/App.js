import { useEffect, useState } from 'react';
import './App.css';
import plusIcon from "./assets/plusIcon.png"
import welcomeImg from "./assets/welcomeImg.png"
import lockIcon from "./assets/lock.png"

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("groupNotes")) || []);

  const [isModal, setIsModal] = useState(false);
  const [errors, setErrors] = useState(null);

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']
  const [title, setTitle] = useState("");
  const [color, setColor] = useState('')

  const [selectedGrp, setSelectedGrp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title, color);

    if (title) {
      if (!data.find(gp => gp.id === title)) {
        const words = title.trim().split(/\s+/);
        // console.log("Words: ",words);
        let initial = words.length > 1 ? words[0][0].toUpperCase() + words[1][0].toUpperCase() : words[0][0].toUpperCase();
        setData([...data, { "id": title, "group": { id: title, title: title, initial: initial, color: color, date: new Date(Date.now()), notes: [] } }]);

        setIsModal(false);
      }
      else {
        setErrors("Group already exists!")
      }
    }
  }

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
                  <li key={item?.group?.id} 
                    onClick={() => setSelectedGrp(item?.group?.id)} 
                    style={{backgroundColor: `${selectedGrp && item?.group?.id === selectedGrp ? '#e0dcdc' : 'white'}`}}>
                    <span style={{ backgroundColor: item?.group?.color, borderRadius: '100%' }}>{item?.group?.initial}</span>
                    {item?.group?.title}
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

      {isModal &&
        <div className="create-group">
          <h2>Create New group</h2>
          <form className='form'>
            <div className="form-row">
              <label htmlFor="name">Group Name</label>
              <input type="text"
                name='name'
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter group name'
                required />
            </div>
            <div className="form-row">
              <label htmlFor="color">Choose colour</label>
              {colors && colors.map((col, index) =>
                <p className='color'
                  key={index}
                  onClick={() => setColor(col)}
                  style={{ backgroundColor: col }} >
                </p>
              )}
            </div>
            {errors && <p style={{ color: 'red', fontSize: '10px' }}>{errors}</p>}
            <button className='group-submit'
              onClick={handleSubmit}>Create</button>
          </form>
        </div>
      }

      {
        selectedGrp ?
          <div className="notesPage">

          </div>
          :
          <div className="welcome" style={{ opacity: `${isModal ? '50%' : '100%'}` }} onClick={closePopUp}>
            <img src={welcomeImg} alt="" />
            <h2>Pocket Notes</h2>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

            <p className="encryption">
              <img src={lockIcon} alt="" />
              <span>end-to-end encrypted</span>
            </p>
          </div>
      }

    </div>
  );
}

export default App;
