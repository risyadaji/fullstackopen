import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Person";
import PersonForm from "./components/Forms";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [existingPerson, setExistingPerson] = useState();

  const hookPersons = () => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      let persons = resp.data;
      let existingPersons = persons.reduce((obj, item) => {
        obj[item.name] = true;
        return obj;
      }, {});

      setExistingPerson(existingPersons);
      setPersons(persons);
    });
  };

  useEffect(hookPersons, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilterChanged = (event) => {
    setFilter(event.target.value);
  };

  const handleNameOnChanged = (event) => setNewName(event.target.value);
  const handleNumberOnChanged = (event) => setNewNumber(event.target.value);

  const filteredPersons =
    filter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "") {
      return alert("name must not be empty");
    }

    if (newNumber === "") {
      return alert("number must not be empty");
    }

    if (Object.prototype.hasOwnProperty.call(existingPerson, newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewNumber("");
      return setNewName("");
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    const newExistingPerson = { ...existingPerson };
    newExistingPerson[newName] = true;

    setExistingPerson(newExistingPerson);
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter valueFilter={filter} onChange={handleFilterChanged} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        handleNumberOnChanged={handleNumberOnChanged}
        handleNameOnChanged={handleNameOnChanged}
        valueName={newName}
        valueNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;