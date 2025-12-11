import { 
  HiUser, HiEnvelope, HiPhone, HiMapPin, HiCheckCircle, 
  HiXCircle, HiPencil, HiTrash, HiStar, HiCalendar 
} from 'react-icons/hi2';
import './GuestList.css';

function GuestList({ guests, allGuests, onToggleConfirm, onToggleRSVP, onRemoveGuest, onToggleVIP, onEdit }) {

  if (guests.length === 0) {
    return (
      <div className="empty-state">
        <HiUser className="empty-icon" />
        <p>No guests found</p>
        <span className="empty-subtitle">
          {allGuests && allGuests.length > 0 
            ? 'Try adjusting your filters or search'
            : 'Start by adding your first guest above'}
        </span>
      </div>
    );
  }

  return (
    <div className="guest-list">
      {guests.map((guest) => (
        <div
          key={guest.id}
          className={`guest-card ${guest.confirmed ? 'confirmed' : ''} ${
            guest.rsvp ? 'rsvp-yes' : ''
          } ${guest.vip ? 'vip' : ''}`}
        >
              <div className="guest-header">
                <div className="guest-avatar">
                  <HiUser />
                </div>
                <div className="guest-main-info">
                  <div className="guest-name-row">
                    <h3>{guest.name}</h3>
                    {guest.vip && <span className="vip-indicator"><HiStar /></span>}
                  </div>
                  <div className="guest-contact">
                    <span><HiEnvelope /> {guest.email}</span>
                    {guest.phone && <span><HiPhone /> {guest.phone}</span>}
                  </div>
                </div>
              </div>
              
              <div className="guest-status-row">
                <div className="status-badges">
                  {guest.confirmed ? (
                    <span className="badge badge-confirmed">
                      <HiCheckCircle /> Confirmed
                    </span>
                  ) : (
                    <span className="badge badge-pending">
                      <HiXCircle /> Pending
                    </span>
                  )}
                  {guest.rsvp && (
                    <span className="badge badge-rsvp">
                      <HiCheckCircle /> RSVP
                    </span>
                  )}
                </div>
              </div>
              
              <div className="guest-actions">
                <button
                  onClick={() => onToggleConfirm(guest.id)}
                  className={`btn-action ${guest.confirmed ? 'btn-confirmed' : 'btn-confirm'}`}
                  title={guest.confirmed ? 'Mark as Pending' : 'Confirm Guest'}
                >
                  <HiCheckCircle />
                </button>
                
                <button
                  onClick={() => onToggleRSVP(guest.id)}
                  className={`btn-action ${guest.rsvp ? 'btn-rsvp-active' : 'btn-rsvp'}`}
                  title="Toggle RSVP Status"
                >
                  <HiCheckCircle />
                </button>
                
                <button
                  onClick={() => onToggleVIP(guest.id)}
                  className={`btn-action ${guest.vip ? 'btn-vip-active' : 'btn-vip'}`}
                  title={guest.vip ? 'Remove VIP Status' : 'Mark as VIP'}
                >
                  <HiStar />
                </button>
                
                <button
                  onClick={() => onEdit(guest)}
                  className="btn-action btn-edit"
                  title="Edit Guest"
                >
                  <HiPencil />
                </button>
                
                <button
                  onClick={() => onRemoveGuest(guest.id)}
                  className="btn-action btn-remove"
                  title="Remove Guest"
                >
                  <HiTrash />
                </button>
              </div>
        </div>
      ))}
    </div>
  );
}

export default GuestList;
