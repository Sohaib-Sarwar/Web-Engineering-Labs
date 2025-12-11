import { useState } from 'react';
import { HiPlus, HiCalendarDays, HiArrowDownTray } from 'react-icons/hi2';
import * as XLSX from 'xlsx';
import AddGuestModal from './components/AddGuestModal';
import EditGuestModal from './components/EditGuestModal';
import GuestList from './components/GuestList';
import RSVPSummary from './components/RSVPSummary';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, confirmed, unconfirmed, rsvp
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  // Add a new guest
  const handleAddGuest = (guestData) => {
    setGuests(prevGuests => [...prevGuests, guestData]);
    console.log('Guest added, current state:', guests); // Demonstrates delayed state update
  };

  // Toggle confirmation status - demonstrates immutable object updates
  const handleToggleConfirm = (id) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id ? { ...guest, confirmed: !guest.confirmed } : guest
      )
    );
    console.log('Confirmation toggled for guest:', id);
  };

  // Toggle RSVP status - demonstrates batching and state updates
  const handleToggleRSVP = (id) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id ? { ...guest, rsvp: !guest.rsvp } : guest
      )
    );
    // Multiple state updates are batched by React
    console.log('RSVP toggled, state will update after this function completes');
  };

  // Remove a guest - demonstrates array filtering
  const handleRemoveGuest = (id) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
  };

  // Update guest information - demonstrates immutable updates
  const handleUpdateGuest = (id, updatedData) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id ? { ...guest, ...updatedData } : guest
      )
    );
  };

  // Toggle VIP status
  const handleToggleVIP = (id) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id ? { ...guest, vip: !guest.vip } : guest
      )
    );
  };

  // Filter and search guests
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filterStatus) {
      case 'confirmed':
        return guest.confirmed;
      case 'unconfirmed':
        return !guest.confirmed;
      case 'rsvp':
        return guest.rsvp;
      case 'vip':
        return guest.vip;
      default:
        return true;
    }
  });

  // Export guest list to Excel
  const handleExportGuests = () => {
    // Prepare data for Excel
    const excelData = guests.map(guest => ({
      'Name': guest.name,
      'Email': guest.email,
      'Phone': guest.phone || 'N/A',
      'Address': guest.address || 'N/A',
      'Confirmed': guest.confirmed ? 'Yes' : 'No',
      'RSVP': guest.rsvp ? 'Yes' : 'No',
      'VIP': guest.vip ? 'Yes' : 'No',
      'Added Date': guest.addedDate ? new Date(guest.addedDate).toLocaleDateString() : 'N/A'
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Guest List');

    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Address
      { wch: 10 }, // Confirmed
      { wch: 8 },  // RSVP
      { wch: 8 },  // VIP
      { wch: 12 }  // Added Date
    ];

    // Generate Excel file and download
    const fileName = `Event_Guests_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <HiCalendarDays className="header-icon" />
          <div className="header-text">
            <h1>Event Planner</h1>
            <p>Manage your guests with elegance</p>
          </div>
        </div>
        <div className="header-actions">
          {guests.length > 0 && (
            <button onClick={handleExportGuests} className="btn-export-header">
              <HiArrowDownTray />
              <span>Export Data</span>
            </button>
          )}
          <button onClick={() => setIsModalOpen(true)} className="btn-add-guest">
            <HiPlus />
            <span>Add Guest</span>
          </button>
        </div>
      </header>

      <div className="app-container">
        <RSVPSummary guests={guests} />
        
        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        
        <GuestList
          guests={filteredGuests}
          allGuests={guests}
          onToggleConfirm={handleToggleConfirm}
          onToggleRSVP={handleToggleRSVP}
          onRemoveGuest={handleRemoveGuest}
          onUpdateGuest={handleUpdateGuest}
          onToggleVIP={handleToggleVIP}
          onEdit={(guest) => setEditingGuest(guest)}
        />
      </div>
      
      <AddGuestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGuest={handleAddGuest}
      />
      
      {editingGuest && (
        <EditGuestModal 
          isOpen={!!editingGuest}
          onClose={() => setEditingGuest(null)}
          guest={editingGuest}
          onUpdateGuest={handleUpdateGuest}
        />
      )}
    </div>
  );
}

export default App;
