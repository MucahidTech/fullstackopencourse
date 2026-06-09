import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <Person person={person} key={person.id} handleDelete={handleDelete} />
      ))}
    </>
  );
};

export default Persons;
