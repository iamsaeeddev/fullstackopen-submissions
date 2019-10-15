import React, { useState,useEffect } from "react";
import noteService from './services/services';

const Filter = ({setSearch,search}) => {
  const handleSearch = ev => {
    search = ev.target.value.trim().toLowerCase();
    setSearch(search)
};
  return (
    <input onChange={handleSearch}  value={search} />
  )
}

const PersonForm = ({notes, setNote}) => {
  const [newName, setNewName] = useState({name:"",number:""});
  const handleForm = ev => {
    ev.preventDefault();

    if (notes.some(person => person.name === newName.name)) {
      alert(`${newName.name} is already added to phonebook`);
    } else {
      noteService.create(newName)
        notes = notes.concat(newName);
        setNote(notes);
    
      let emptyName = {
        name: "",
        number: ""
      };
      setNewName(emptyName);
    }
  };



  const handleInputName = ev => {
    let updatedName = {
      name: ev.target.value
    };
    setNewName(updatedName);
  };

  const handleInputNumber = ev => {
    let updatedName = {
      ...newName,
      number: ev.target.value,
      id : Math.floor((Math.random() * 1000) + 1)
    };
    setNewName(updatedName);
  };
  return (
    <form onSubmit={handleForm}>
    <div>
      name:{" "}
      <input onChange={handleInputName} value={newName.name} name="name" />
      <br />
      number:{" "}
      <input
        onChange={handleInputNumber}
        value={newName.number}
        name="number"
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({notes, search}) => {
 
  return (
    <div>{search.length > 0 ? 
      notes.filter(person => {return person.name.toLowerCase().match(search)}).map((v, i) => {
    return <div key={i}>{v.name} {v.number}</div> }): notes.map((v, i) => {
      return <div key={i}>{v.name} {v.number}</div> })
    }</div>
  )
}

const App = () => {
  const [notes, setNote] = useState([]);
  const [input, setInput] = useState([]);

  const [search, setSearch] = useState("");

  const hook = () => {
      noteService.getAll().then(response => {
        setNote(response.data)
      })
  }

  useEffect(hook,[])

  return (
    <div>
      <h2>phonebook</h2>
      <div>
        filter shown with <Filter search={search} setSearch={setSearch}  />
      </div>
      <h2>add a new</h2>
      <PersonForm notes={notes} setNote={setNote} />
      <h2>Numbers</h2>
      <Persons notes={notes} search={search} setNote={setNote} />
    </div>
  );
};

export default App;