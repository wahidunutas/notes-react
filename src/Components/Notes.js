import React, { useEffect } from "react";
import uuid from "react-uuid";
import FormUpdate from "./FormUpdateNotes";
import { BsPlusLg, BsTrashFill,BsFillGridFill } from 'react-icons/bs';
import {FaMinus, FaSave, FaThList} from 'react-icons/fa'
import './style.css';
import FormAddNotes from "./FormAddNotes";

const Notes = () => {
    const [open, setOpen] = React.useState(false);
    const [editShow, setEditShow] = React.useState(false);
    
    const [values, setValues] = React.useState('');
    const [notes, setNotes] = React.useState(
        localStorage.notes ? JSON.parse(localStorage.notes) : []
    );  
    const [isEdit, setIsEdit] = React.useState(null);
    const [list, setList] = React.useState(false);

    const handleAddNotes = () => {
        if (values.length > 0) {
            setOpen(false);
        } else if (values && editShow) {
            setNotes(
                notes.map((note) => {
                    if (note.id === isEdit) {
                        return {
                            ...note,
                            title: values.title,
                            body: values.body,
                            lastModified: Date.now(),
                        };
                    }
                    return note;
                })
            );
            setValues('');
            setIsEdit(null);
            setEditShow(false);
        }else {
            const allInputData = {
                id: uuid(),
                title: values.title,
                body: values.body,
                lastModified: Date.now(),
            }
            setNotes([...notes, allInputData]);
            setValues('');
            setIsEdit(null);
        }

    };

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const onDeleteNote = (noteId) => {
        setNotes(notes.filter(({ id }) => id !== noteId));
        setEditShow(false);
    };
    const onUpdateNote = (noteId) => {
        const noteIntem = notes.find((note) => note.id === noteId);
        setValues(noteIntem);
        setIsEdit(noteId);
        setEditShow(true);
    }

    const handleButton = () => {
        if(editShow){
            return (
                <>
                    <button onClick={handleAddNotes }><span><FaSave title="Edit" /></span></button>
                    <button onClick={() => onDeleteNote(values.id)}><span><BsTrashFill title="Hapus"/></span></button>
                    <button onClick={() => setEditShow(!editShow)}><span><FaMinus title="min" /></span></button>
                </>
            )
        } else if (open) {
            return (
                <>
                    <button onClick={handleAddNotes }>
                        <span><FaSave title="Simpan" /></span>
                    </button>
                    
                    <button onClick={() => setOpen(!open)}>
                        <span><FaMinus title="Min"/></span>
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <button onClick={() => setOpen(!open)}>
                        <span><BsPlusLg title="Tambah"/></span>
                    </button>
                </>
            )
        }
    }
    
    const sort = notes.sort((a, b) => b.lastModified - a.lastModified);

    
    return (
        <div className="notes-content">
            <div className="notes-box">
                <main>
                    <div className="main-header">
                        <h1>Notes</h1>
                        <div className="button-action">
                            {handleButton()}
                        </div>
                    </div>
                    <div className='main-body'>
                        <div className={open ? 'main-body-main active' : 'main-body-main'}>
                            <FormAddNotes  setValues={setValues} values={values}/>
                        </div>
                        <div className={editShow ? 'editshow active' : 'editshow'}>
                            <FormUpdate setValues={setValues} values={values} />
                        </div>
                        <div className="main-body-grid-selector">
                            <div className="grid">
                                <button onClick={(e) => setList(!list)}>
                                    {
                                        list ? <span><BsFillGridFill /></span> : <span><FaThList /></span>
                                    }
                                </button>
                            </div>
                            <div className={list ? "main-body-notes list" : "main-body-notes"}>
                                {
                                    sort.map((note) => {
                                        return (
                                            <div key={note.id}>
                                                <div className={list ? 'card list' : 'card'} onClick={(e) => onUpdateNote(note.id)} on>
                                                    <div className="card-header">
                                                        <h3>{note.title}</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>{note.body && note.body.substr(0, 100) }</p>
                                                        <div className="datemod">
                                                            {new Date(note.lastModified).toLocaleDateString("en-GB", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default Notes;