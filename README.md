# Event Planner App

A modern React application for managing event guests with neomorphic UI design and comprehensive guest management features.

## Features

### Core Functionality
- **Add Guests**: Modal-based form to add guests with name, email, phone, and address
- **Edit Guests**: Dedicated edit modal to update guest information
- **Remove Guests**: One-click removal with instant UI update
- **Guest Information**: Store complete contact details including phone and address

### Status Management
- **Confirmation Tracking**: Mark guests as confirmed or pending with visual indicators
- **RSVP Tracking**: Toggle RSVP status for each guest
- **VIP Status**: Mark special guests as VIP with gold star indicator
- **Visual Badges**: Color-coded badges showing confirmed (green), pending (orange), and RSVP (blue) status

### Live Dashboard
- **Total Guests**: Real-time count of all guests
- **Confirmed Count**: Track number of confirmed attendees
- **Unconfirmed Count**: Monitor pending confirmations
- **RSVP Statistics**: See how many guests have RSVP'd
- **VIP Tracking**: Count of VIP guests
- **Auto-Update**: All statistics update instantly with any changes

### Search & Filter
- **Search Bar**: Real-time search by guest name or email
- **Status Filter**: Filter by All, Confirmed, Unconfirmed, RSVP, or VIP
- **Instant Results**: Search and filter results update immediately
- **Clear UI**: Neomorphic search bar with icon indicators

### Data Export
- **Excel Export**: Export complete guest list to `.xlsx` format
- **Formatted Columns**: Name, Email, Phone, Address, Confirmed, RSVP, VIP, Added Date
- **Auto Column Width**: Optimized column widths for readability
- **Date Stamped**: Filename includes export date (Event_Guests_YYYY-MM-DD.xlsx)
- **Missing Data Handling**: Shows "N/A" for optional fields

### Modern UI/UX
- **Neomorphic Design**: Soft 3D shadows with raised/pressed button states
- **Horizontal Card Layout**: Clean, spacious guest cards in single-column layout
- **Icon-Only Buttons**: 5 action buttons per guest (Confirm, RSVP, VIP, Edit, Remove)
- **Hover Tooltips**: Descriptive tooltips on all action buttons
- **Visual Feedback**: Active button states show inset shadows
- **Color-Coded Actions**: Each action has distinct color (green, blue, gold, purple, red)
- **Empty State**: Helpful message when no guests or no search results
- **Smooth Animations**: Fade-in animations and hover effects throughout

### Responsive Design
- **Mobile-Friendly**: Cards stack vertically on smaller screens
- **Tablet Optimized**: Adaptive layouts for medium screens
- **Desktop Layout**: Full horizontal layout on large screens
- **Touch-Friendly**: Adequate button sizes for mobile interaction

## Lab 13: Adding Interactivity in React

This project demonstrates key React concepts:

### Hour 1: User Interactions & State Basics
- Handling user events (onClick, onChange)
- Basic useState usage
- Props and event callbacks
- Form handling and input management

### Hour 2: Deep Dive into State Updates & Batching
- Two-phase React rendering
- Understanding delayed state updates
- State batching behavior
- Immutable state updates for objects
- Using useEffect to respond to state changes

### Hour 3: Working with Arrays & Final Touches
- Managing complex array state
- Filtering arrays to remove items
- Updating array items immutably
- Conditional rendering
- Responsive design and UX enhancements

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### Build

```bash
npm run build
```

## Usage Guide

### Adding a Guest
1. Click the **"Add Guest"** button in the header
2. Fill in the guest details:
   - **Name** (required)
   - **Email** (required)
   - **Phone** (optional)
   - **Address** (optional)
3. Click **"Add Guest"** to save or **"Cancel"** to close

### Managing Guest Status
Each guest card has 5 action buttons:
- **Confirm** (green checkmark) - Toggle confirmed/pending status
- **RSVP** (blue checkmark) - Mark guest as RSVP'd
- **VIP** (gold star) - Mark guest as VIP
- **Edit** (purple pencil) - Open edit modal to update information
- **Remove** (red trash) - Delete guest from list

### Searching & Filtering
- Use the **search bar** to find guests by name or email
- Use the **filter dropdown** to show:
  - All guests
  - Only confirmed
  - Only unconfirmed
  - Only RSVP'd
  - Only VIP

### Exporting Data
1. Click the **"Export Data"** button in the header (appears when guests exist)
2. Excel file downloads automatically with all guest information
3. File format: `Event_Guests_YYYY-MM-DD.xlsx`

### Editing Guest Information
1. Click the **Edit button** (purple pencil icon) on any guest card
2. Modify the guest details in the modal
3. Click **"Save Changes"** to update or **"Cancel"** to discard changes

## Project Structure

```
src/
  components/
    AddGuestModal.jsx      - Modal component for adding new guests
    AddGuestModal.css      - Styles for add guest modal
    EditGuestModal.jsx     - Modal component for editing guest information
    EditGuestModal.css     - Styles for edit guest modal
    GuestList.jsx          - Component displaying guest list with horizontal cards
    GuestList.css          - Styles for guest list and cards
    RSVPSummary.jsx        - Dashboard with live statistics
    RSVPSummary.css        - Styles for summary cards
    FilterBar.jsx          - Search and filter controls
    FilterBar.css          - Styles for filter bar
  App.jsx                  - Main application component with state management
  App.css                  - Application-level styles and header
  main.jsx                 - Application entry point
  index.css                - Global styles and theme colors
```

## Technologies

- **React 19.2.0** - Modern React with hooks (useState, useEffect, useMemo)
- **Vite 7.2.4** - Fast build tool and dev server
- **React Icons (HeroIcons v2)** - Beautiful icon library
- **XLSX (SheetJS)** - Excel file generation and export
- **Modern CSS** - Neomorphic design with soft 3D shadows
- **Inter Font Family** - Google Fonts for clean typography
- **CSS Animations** - Smooth transitions and hover effects
