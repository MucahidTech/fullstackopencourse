const Filter = ({ search, onChange }) => (
  <div>
    Filter shown with:
    <input value={search} onChange={onChange} />
  </div>
);

export default Filter;
