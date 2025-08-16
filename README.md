# 🇬🇪 Georgian Citizenship Test App

A comprehensive mobile-first web application to help prepare for the Georgian citizenship test. Built with React, Ionic, and TypeScript.

## 🎯 Features

### 📚 Three Test Categories
- **Georgian Language** (ქართული ენა) - Language and grammar questions
- **Georgian History** (საქართველოს ისტორია) - Historical knowledge
- **Georgian Law** (საქართველოს კანონმდებლობა) - Legal system and constitution

### 🧪 Test Mode
- 10 random questions per test from a pool of questions
- Multiple choice format (4 options per question)
- Pass threshold: 7 out of 10 correct answers
- Progress tracking with visual indicators
- No time limit - take your time to think

### 📖 Study Mode
- Practice with all questions in a category
- Immediate feedback with explanations
- Progress tracking and accuracy statistics
- Learn at your own pace

### 💾 Progress Tracking
- **Auto-save**: Progress is saved automatically
- **Resume tests**: Continue where you left off
- **User statistics**: Track your performance over time
- **Local storage**: All data stays on your device

### 📊 Results & Analytics
- Detailed score breakdown
- Pass/fail status with visual indicators
- Answer review with explanations
- Performance statistics

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd georgian-citizenship-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📱 Mobile Development

This app is built with Ionic and can be deployed as a mobile app:

### Build for Production
```bash
npm run build
```

### Mobile App (Capacitor)
```bash
npm install @capacitor/cli @capacitor/core
npx cap init
npx cap add ios
npx cap add android
npx cap sync
```

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
├── data/
│   └── questions.ts    # Test questions and data structure
├── pages/              # Main app pages
│   ├── Home.tsx        # Main dashboard
│   ├── Test.tsx        # Test interface
│   ├── Results.tsx     # Results display
│   └── Study.tsx       # Study mode
├── utils/
│   └── progressManager.ts  # Progress tracking utilities
├── theme/              # Styling and theming
└── App.tsx             # Main app component
```

## 📝 Adding Your Questions

Replace the sample questions in `src/data/questions.ts` with your actual citizenship test questions:

```typescript
export const testCategories: TestCategory[] = [
  {
    id: 'georgian',
    name: 'Georgian Language',
    nameGeorgian: 'ქართული ენა',
    description: 'Test your knowledge of Georgian language and grammar',
    questions: [
      {
        id: 1,
        question: 'Your question here?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0, // Index of correct answer (0-3)
        explanation: 'Explanation of the correct answer'
      },
      // Add more questions...
    ]
  },
  // Add more categories...
];
```

## 🎨 Customization

### Styling
- Modify `src/theme/variables.css` for color schemes
- Update component styles for layout changes
- Add custom fonts in `src/assets/fonts/`

### Features
- Add more test categories
- Implement time limits
- Add audio pronunciation for Georgian words
- Include image-based questions

## 📊 Data Management

The app uses localStorage for data persistence:

- **Test Progress**: Saves current test state
- **Results**: Stores completed test results
- **Study Progress**: Tracks learning progress
- **User Statistics**: Performance analytics

### Export/Import Data
```typescript
// Export your progress
const data = progressManager.exportData();

// Import progress
progressManager.importData(jsonData);
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test.e2e` - Run end-to-end tests
- `npm run test.unit` - Run unit tests

### Tech Stack
- **React 18** - UI framework
- **Ionic 7** - Mobile-first components
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Capacitor** - Mobile deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Good luck with your Georgian citizenship test! 🇬🇪✨**
