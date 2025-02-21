# Stopwatch App

A modern, responsive stopwatch application built with React that allows users to create and manage multiple independent stopwatches. Features a clean UI with dark/light theme support and drag-and-drop functionality for organizing stopwatches.

## Features

- **Multiple Stopwatches**: Create and manage multiple stopwatches simultaneously
- **Drag and Drop**: Reorder stopwatches using intuitive drag-and-drop functionality
- **Theme Toggle**: Switch between light and dark themes
- **Persistent State**: Saves theme preference across sessions
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Time Display**: Shows hours, minutes, and seconds in a clear digital format

## Technology Stack

- React
- Tailwind CSS for styling
- @dnd-kit for drag-and-drop functionality
- Lucide React for icons
- Context API for theme management

## Components

### App

The root component that manages the theme context and provides the main layout structure.

- Implements theme toggling functionality
- Provides theme context to child components
- Renders the main application layout

### StopwatchDeck

Manages the collection of stopwatch cards and their organization.

- Handles adding and removing stopwatches
- Implements drag-and-drop functionality for reordering
- Manages the modal for adding new stopwatches

### StopwatchCard

Individual stopwatch component with timer functionality.

- Features play, pause, and reset controls
- Displays time in HH:MM:SS format
- Includes delete functionality
- Implements drag-and-drop handlers
- Changes background color based on status (playing/paused/reset)

## Usage

### Basic Controls

1. **Add Stopwatch**: Click the "+" button at the bottom to create a new stopwatch
2. **Start/Pause**: Click the green play/pause button to control the timer
3. **Reset**: Click the yellow reset button to zero the timer
4. **Delete**: Click the red trash button to remove a stopwatch
5. **Reorder**: Drag and drop stopwatches to rearrange their order
6. **Theme**: Click the theme toggle button in the top-right corner to switch between light and dark modes

### Status Indicators

- **Green Background**: Timer is running
- **Red Background**: Timer is paused
- **Yellow Background**: Timer is reset

## Implementation Details

### State Management

- Uses React's useState for component-level state management
- Implements useContext for theme management
- Uses useRef for interval management and ID generation
- Implements custom usePersistedState hook for theme persistence

### Time Handling

- Calculates elapsed time using Date.now()
- Updates display every second using setInterval
- Formats time display with padded zeros for consistent appearance

### Drag and Drop

- Uses @dnd-kit/core and @dnd-kit/sortable for drag-and-drop functionality
- Implements touch and keyboard support for accessibility
- Disables drag functionality when hovering over control buttons

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Dependencies

- react
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- lucide-react
- tailwindcss

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the [MIT License](LICENSE).
