const Filter = ({ valueFilter, onChange }) => {
  return (
    <div>
      filter shown with <input value={valueFilter} onChange={onChange} />
    </div>
  );
};

export default Filter;
