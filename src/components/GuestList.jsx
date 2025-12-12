import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiCheckCircle,
  HiXCircle,
  HiPencil,
  HiTrash,
  HiStar,
  HiCalendar,
} from "react-icons/hi2";
import "./GuestList.css";

function GuestList({
  guests,
  allGuests,
  onToggleConfirm,
  onToggleRSVP,
  onRemoveGuest,
  onToggleVIP,
  onEdit,
}) {
  if (guests.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <HiUser className="empty-icon" aria-hidden="true" />
        <p>No guests found</p>
        <span className="empty-subtitle">
          {allGuests && allGuests.length > 0
            ? "Try adjusting your filters or search"
            : "Start by adding your first guest above"}
        </span>
      </div>
    );
  }

  return (
    <ul className="guest-list" role="list" aria-label="Guest list">
      {guests.map((guest) => (
        <li key={guest.id}>
          <article
            className={`guest-card ${guest.confirmed ? "confirmed" : ""} ${
              guest.rsvp ? "rsvp-yes" : ""
            } ${guest.vip ? "vip" : ""}`}
            aria-label={`Guest: ${guest.name}${guest.vip ? ", VIP" : ""}${
              guest.confirmed ? ", Confirmed" : ", Pending"
            }`}
          >
            <header className="guest-header">
              <div className="guest-avatar" aria-hidden="true">
                <HiUser />
              </div>
              <div className="guest-main-info">
                <div className="guest-name-row">
                  <h3>{guest.name}</h3>
                  {guest.vip && (
                    <span className="vip-indicator" aria-label="VIP Guest">
                      <HiStar aria-hidden="true" />
                    </span>
                  )}
                </div>
                <address className="guest-contact">
                  <span>
                    <HiEnvelope aria-hidden="true" />{" "}
                    <a href={`mailto:${guest.email}`}>{guest.email}</a>
                  </span>
                  {guest.phone && (
                    <span>
                      <HiPhone aria-hidden="true" />{" "}
                      <a href={`tel:${guest.phone}`}>{guest.phone}</a>
                    </span>
                  )}
                </address>
              </div>
            </header>

            <div className="guest-status-row">
              <div
                className="status-badges"
                role="group"
                aria-label="Guest status"
              >
                {guest.confirmed ? (
                  <span className="badge badge-confirmed">
                    <HiCheckCircle aria-hidden="true" /> Confirmed
                  </span>
                ) : (
                  <span className="badge badge-pending">
                    <HiXCircle aria-hidden="true" /> Pending
                  </span>
                )}
                {guest.rsvp && (
                  <span className="badge badge-rsvp">
                    <HiCheckCircle aria-hidden="true" /> RSVP
                  </span>
                )}
              </div>
            </div>

            <nav
              className="guest-actions"
              aria-label={`Actions for ${guest.name}`}
            >
              <button
                onClick={() => onToggleConfirm(guest.id)}
                className={`btn-action ${
                  guest.confirmed ? "btn-confirmed" : "btn-confirm"
                }`}
                aria-label={
                  guest.confirmed ? "Mark as pending" : "Confirm guest"
                }
                aria-pressed={guest.confirmed}
              >
                <HiCheckCircle aria-hidden="true" />
              </button>

              <button
                onClick={() => onToggleRSVP(guest.id)}
                className={`btn-action ${
                  guest.rsvp ? "btn-rsvp-active" : "btn-rsvp"
                }`}
                aria-label={guest.rsvp ? "Remove RSVP" : "Mark as RSVP"}
                aria-pressed={guest.rsvp}
              >
                <HiCheckCircle aria-hidden="true" />
              </button>

              <button
                onClick={() => onToggleVIP(guest.id)}
                className={`btn-action ${
                  guest.vip ? "btn-vip-active" : "btn-vip"
                }`}
                aria-label={guest.vip ? "Remove VIP status" : "Mark as VIP"}
                aria-pressed={guest.vip}
              >
                <HiStar aria-hidden="true" />
              </button>

              <button
                onClick={() => onEdit(guest)}
                className="btn-action btn-edit"
                aria-label={`Edit ${guest.name}`}
              >
                <HiPencil aria-hidden="true" />
              </button>

              <button
                onClick={() => onRemoveGuest(guest.id)}
                className="btn-action btn-remove"
                aria-label={`Remove ${guest.name}`}
              >
                <HiTrash aria-hidden="true" />
              </button>
            </nav>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default GuestList;
