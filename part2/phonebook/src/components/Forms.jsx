const PersonForm = ({
  onSubmit,
  handleNameOnChanged,
  handleNumberOnChanged,
  valueName,
  valueNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={handleNameOnChanged} />
      </div>
      <div>
        number: <input value={valueNumber} onChange={handleNumberOnChanged} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
