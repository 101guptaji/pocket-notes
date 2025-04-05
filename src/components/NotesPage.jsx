import React, { useState } from 'react'

import grayArrow from "../assets/grayArrow.png";
import blueArrow from "../assets/blueArrow.png";
import backArrow from "../assets/backArrow.png";

const NotesPage = ({ group, data, setData, isModal, closePopUp }) => {
    // console.log(group)

    const [newNote, setNewNote] = useState("");

    const addNote = () => {
        if (newNote.trim() === '') return;

        const dateObj = new Date();

        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });

        const formattedTime = dateObj.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        group.lastUpdated =  new Date();
        group.notes?.push({ text: newNote, id: Date.now(), createdDate: formattedDate, creationTime: formattedTime });

        setData([...data]);
        // console.log(data);

        setNewNote('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNote();
        }
    }

    return (
        <div className="notes-container" style={{ opacity: `${isModal ? '50%' : '100%'}` }} onClick={closePopUp}>
            <header className="heading">
                <span style={{ backgroundColor: group?.color }}>{group?.logo}</span>
                <h2 className='title'>{group?.title}</h2>
            </header>

            <main className="notes">
                {group && group.notes && group.notes.map((note) => {
                    return (
                        <div key={note.id} className='note-card'>
                            <p>{note.text}</p>
                            <div className="timeStamp">
                                <span>{note.createdDate}</span>
                                <span className='dot'></span>
                                <span>{note.creationTime}</span>
                            </div>
                        </div>
                    )

                })}
            </main>

            <footer className="input-container">
                <div className='note-input'>
                    <textarea
                        className="text-area"
                        placeholder="Enter your text here............"
                        rows="5"
                        value={newNote} onKeyDown={handleKeyDown}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <img className='enter-key'
                        src={`${newNote ? blueArrow : grayArrow}`}
                        alt='Enter' width='20px' height='20px'
                        onClick={addNote} />
                </div>
            </footer>
        </div>
    )
}

export default NotesPage