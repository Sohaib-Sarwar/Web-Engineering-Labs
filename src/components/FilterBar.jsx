import { HiMagnifyingGlass, HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./FilterBar.css";

function FilterBar({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) {
  return (
    <search className="filter-bar" role="search">
      <div className="search-box">
        <HiMagnifyingGlass className="search-icon" aria-hidden="true" />
        <label htmlFor="guest-search" className="visually-hidden">
          Search guests
        </label>
        <input
          id="guest-search"
          type="search"
          placeholder="Search guests by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search guests by name or email"
        />
      </div>

      <div className="filter-group">
        <HiAdjustmentsHorizontal className="filter-icon" aria-hidden="true" />
        <label htmlFor="guest-filter" className="visually-hidden">
          Filter guests
        </label>
        <select
          id="guest-filter"
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
          aria-label="Filter guests by status"
        >
          <option value="all">All Guests</option>
          <option value="confirmed">Confirmed Only</option>
          <option value="unconfirmed">Pending Only</option>
          <option value="rsvp">RSVP Yes</option>
          <option value="vip">VIP Guests</option>
        </select>
      </div>
    </search>
  );
}

export default FilterBar;
