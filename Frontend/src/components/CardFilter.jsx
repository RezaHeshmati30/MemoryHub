
function CardFilter({ filterStatus, setFilterStatus, handleFilterChange }) {
    return (
      <div className="flex justify-between">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
        <select id="statusFilter" value={filterStatus} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="all">All</option>
          <option value="not studied">Not Studied</option>
          <option value="need practice">Need Practice</option>
          <option value="mastered">Mastered</option>
          <option value="not studied and need practice">Not Studied and Need Practice</option>
        </select>
      </div>
    );
  }

export default CardFilter;
