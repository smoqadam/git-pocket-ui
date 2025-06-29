# Article Sync App

A Next.js application that syncs and displays articles from GitHub repositories.

## Features

- **GitHub Integration**: Sync articles from GitHub repositories using personal access tokens
- **Local Storage**: Articles are stored locally using IndexedDB for offline access
- **Article Management**: Browse and view synced articles with a clean interface
- **Dark Mode**: Automatic theme switching based on system preferences
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Login/Sync**: Enter a GitHub repository URL and your personal access token
2. **Browse Articles**: View your synced articles in the main interface
3. **Read Articles**: Click on any article to view its full content

## GitHub Setup

To sync articles from a GitHub repository:

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens)
2. Ensure your repository contains articles in a supported format
3. Use the repository URL (e.g., `https://github.com/username/repo-name`)

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **IndexedDB** - Local storage
- **GitHub API** - Repository integration
