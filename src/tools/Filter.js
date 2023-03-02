const Filter = ({ filterValue, handleChange }) => {
    return (
        <div>Filter: <input value={filterValue} onChange={handleChange} /></div>
    )
}

export default Filter