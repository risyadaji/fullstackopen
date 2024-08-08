import { useState, useEffect } from "react";

import personService from "./services/person";

import Persons from "./components/Person";
import PersonForm from "./components/Forms";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [existingPerson, setExistingPerson] = useState();

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  useEffect(() => {
    // this will always trigger after changes on persons
    setExistingPerson(
      persons.reduce((obj, item) => {
        obj[item.name] = item.id;
        return obj;
      }, {}),
    );
  }, [persons]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilterChanged = (event) => setFilter(event.target.value);
  const handleNameOnChanged = (event) => setNewName(event.target.value);
  const handleNumberOnChanged = (event) => setNewNumber(event.target.value);

  const handleOnDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteById(person.id).then((deletedPerson) => {
        const newPersons = persons.filter((p) => p.id !== deletedPerson.id);
        setPersons(newPersons);
      });
    }
  };

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
      let confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(confirmMessage)) {
        // prepare update person
        const existingId = existingPerson[newName];
        const updatePerson = persons.find((person) => person.id === existingId);
        updatePerson.number = newNumber;

        personService.update(existingId, updatePerson).then((updatedPerson) => {
          const newPerson = persons.map((person) =>
            person.id !== existingId ? person : updatedPerson,
          );
          setPersons(newPerson);
        });
      }

      setNewNumber("");
      return setNewName("");
    }

    const newPerson = {
      id: `${persons.length + 1}`,
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
    });
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
      <Persons onDelete={handleOnDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
