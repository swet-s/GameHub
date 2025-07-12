# GameHub

A collection of simple games built with React, featuring a Coin Toss game and a Fifteen Puzzle game with multiple difficulty levels.

## Features

- **Coin Toss Game**: Simple coin flipping simulation with statistics tracking
- **Fifteen Puzzle**: Classic sliding puzzle game with multiple grid sizes (3x3 to 6x6)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Score Tracking**: Best time tracking for puzzle completion
- **Modern UI**: Clean, intuitive interface with smooth animations

## Project Structure

```
src/
├── components/
│   ├── games/
│   │   ├── CoinToss.js          # Coin toss game component
│   │   ├── CoinToss.css
│   │   ├── FifteenPuzzle.js     # Main puzzle game component
│   │   ├── FifteenPuzzle.css
│   │   └── PuzzleScoreDisplay.js # Score display component
│   ├── Header.js                # Navigation header
│   ├── Header.css
│   ├── Footer.js                # Footer component
│   ├── Footer.css
│   ├── LevelWindow.js           # Level selection component
│   └── LevelWindow.css
├── constants/
│   └── gameConstants.js         # Centralized constants
├── hooks/
│   └── usePuzzleGame.js         # Custom hook for puzzle logic
├── utils/
│   └── puzzleUtils.js           # Puzzle utility functions
├── App.js                       # Main app component
├── index.js                     # App entry point
└── index.css                    # Global styles
```

## Code Quality Improvements

### Modularity
- **Extracted utility functions**: Moved puzzle logic to separate utility files
- **Custom hooks**: Created `usePuzzleGame` hook for state management
- **Component separation**: Split large components into smaller, focused ones
- **Constants centralization**: All hardcoded values moved to constants file

### Readability
- **JSDoc comments**: Added comprehensive documentation for all functions and components
- **Consistent naming**: Improved variable and function naming conventions
- **Code organization**: Better file structure and import organization
- **Removed unused code**: Cleaned up commented code and unused imports

### Maintainability
- **Type checking**: Added PropTypes documentation (ready for implementation)
- **Error handling**: Improved error handling patterns
- **Performance**: Optimized re-renders with proper dependency arrays
- **Scalability**: Modular structure makes it easy to add new games

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm start
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```

## Games

### Coin Toss
- Simple coin flipping simulation
- Tracks heads vs tails statistics
- Shows percentage distribution
- Smooth flip animation

### Fifteen Puzzle
- Classic sliding puzzle game
- Multiple difficulty levels (3x3 to 6x6 grid)
- Best time tracking per level
- Touch and mouse support
- Solvability checking algorithm

## Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **FontAwesome**: Icons
- **React Device Detect**: Device detection for touch/mouse events
- **CSS3**: Styling with responsive design

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
