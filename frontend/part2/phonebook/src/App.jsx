import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedPerson = { ...existingPerson, number: number };

        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson,
              ),
            );
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: number,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNumber("");
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNumber(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const personsToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchChange} />
      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={number}
        onNameChange={handleNameChange}
        onNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
