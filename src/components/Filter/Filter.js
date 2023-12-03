import { FilterText } from './Filter.styled';

export const Filter = ({ onSetFilter, value }) => {
    const handleChange = (event) => {
    onSetFilter(event.target.value);
  };
  return (
    <>
      <FilterText>Find contact by name</FilterText>
      <input
        type="text"
        name="search"
        placeholder="Type name"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};