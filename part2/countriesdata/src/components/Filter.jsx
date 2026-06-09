const Filter = ({ search, onChange }) => (
  <div>
    Find Countries:
    <input value={search} onChange={onChange} />
  </div>
);

export default Filter;
