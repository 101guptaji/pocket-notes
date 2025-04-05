import React, { useState } from 'react'

const CreateGroup = ({data, setData, setIsModal}) => {
    const [errors, setErrors] = useState(null);

    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']
    const [title, setTitle] = useState("");
    const [color, setColor] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(title, color);

        if (title && color) {
            if (!data.find(gp => gp?.id === title)) {
                const words = title.trim().split(/\s+/);
                // console.log("Words: ",words);
                let initial = words.length > 1 ? words[0][0].toUpperCase() + words[1][0].toUpperCase() : words[0][0].toUpperCase();
                
                setData([{ id: title, "title": title, logo: initial, color: color, lastUpdated: new Date(Date.now()), notes: [] }, ...data]);

                setErrors(null);
                setIsModal(false);
            }
            else {
                setErrors("Group already exists!")
            }
        }
        else {
            setErrors("Name and Colour is required.")
        }
    }

    return (
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
    )
}

export default CreateGroup