import { useEffect } from 'react';
import { 
  HiUsers, HiCheckCircle, HiXCircle, HiChatBubbleLeftRight, 
  HiStar 
} from 'react-icons/hi2';
import './RSVPSummary.css';

function RSVPSummary({ guests }) {
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.confirmed).length;
  const unconfirmedGuests = totalGuests - confirmedGuests;
  const rsvpYes = guests.filter(guest => guest.rsvp).length;
  const vipGuests = guests.filter(guest => guest.vip).length;

  // Demonstrate useEffect to respond to state changes
  useEffect(() => {
    console.log('Summary updated:', {
      total: totalGuests,
      confirmed: confirmedGuests,
      unconfirmed: unconfirmedGuests,
      rsvpYes,
      vipGuests
    });
  }, [totalGuests, confirmedGuests, unconfirmedGuests, rsvpYes, vipGuests]);

  return (
    <div className="rsvp-summary">
      <div className="summary-grid">
        <div className="summary-card summary-total">
          <div className="card-icon">
            <HiUsers />
          </div>
          <div className="card-content">
            <div className="summary-number">{totalGuests}</div>
            <div className="summary-label">Total Guests</div>
          </div>
        </div>
        
        <div className="summary-card summary-confirmed">
          <div className="card-icon">
            <HiCheckCircle />
          </div>
          <div className="card-content">
            <div className="summary-number">{confirmedGuests}</div>
            <div className="summary-label">Confirmed</div>
          </div>
        </div>
        
        <div className="summary-card summary-unconfirmed">
          <div className="card-icon">
            <HiXCircle />
          </div>
          <div className="card-content">
            <div className="summary-number">{unconfirmedGuests}</div>
            <div className="summary-label">Pending</div>
          </div>
        </div>
        
        <div className="summary-card summary-rsvp">
          <div className="card-icon">
            <HiChatBubbleLeftRight />
          </div>
          <div className="card-content">
            <div className="summary-number">{rsvpYes}</div>
            <div className="summary-label">RSVP Yes</div>
          </div>
        </div>
        
        <div className="summary-card summary-vip">
          <div className="card-icon">
            <HiStar />
          </div>
          <div className="card-content">
            <div className="summary-number">{vipGuests}</div>
            <div className="summary-label">VIP Guests</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RSVPSummary;
