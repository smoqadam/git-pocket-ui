# Git Pocket Complete Setup Guide

This guide will help you set up your own personal "Read It Later" service using Git Pocket. The system consists of two components: a backend for saving articles and a frontend for reading them.

---

## 🏗️ System Overview

**Git Pocket** is a privacy-focused reading system with two parts:

1. **Backend ([git-pocket](https://github.com/smoqadam/git-pocket))**: Extracts and saves articles to your GitHub repository
2. **Frontend**: Read your articles either at [gitpocket.saeedm.com](https://gitpocket.saeedm.com) or run locally

### How It Works

1. You save an article URL (via bookmarklet, iOS shortcut, or API call)
2. GitHub Actions extracts the article content and metadata
3. Content is saved to `metadata.json` in your repository
4. You read your articles through the web interface

---

## 🛠️ Part 1: Backend Setup (Article Saving)

### Step 1: Create Your Git Pocket Repository

1. Go to [github.com/smoqadam/git-pocket](https://github.com/smoqadam/git-pocket)
2. Click **"Use this template"** or **Fork** the repository
3. Name your repository (e.g., `my-git-pocket`)
4. Make sure it's **public** (required for GitHub Actions)

### Step 2: Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name like "Git Pocket"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **Copy and save the token** - you'll need it for saving articles

### Step 3: Enable GitHub Actions

1. Go to your repository → **Actions** tab
2. If prompted, click **"I understand my workflows, go ahead and enable them"**
3. GitHub Actions should now be enabled

### Step 4: Test Your Backend

Test that your backend works by running this command (replace the placeholders):

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_PERSONAL_ACCESS_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO_NAME/dispatches \
  -d '{"event_type":"new-url","client_payload":{"url":"https://example.com/some-article"}}'
```

If successful, check your repository - you should see a new commit with updated `metadata.json`.

---

## 📱 Part 2: Saving Articles (Multiple Methods)

### Method 1: Browser Bookmarklet

Create a bookmarklet for one-click saving from any webpage:

1. Create a new bookmark in your browser
2. Set the name to "Save to Git Pocket"
3. Set the URL to this JavaScript code (replace YOUR_USERNAME, YOUR_REPO, and YOUR_TOKEN):

```javascript
javascript:(function(){fetch('https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches',{method:'POST',headers:{'Accept':'application/vnd.github.v3+json','Authorization':'token YOUR_TOKEN','Content-Type':'application/json'},body:JSON.stringify({event_type:'new-url',client_payload:{url:window.location.href}})}).then(r=>r.ok?alert('Article saved to Git Pocket!'):alert('Error saving article'));})();
```

**Usage**: Click the bookmarklet while on any article page to save it.

### Method 2: iOS Shortcut

1. Download the **Shortcuts** app on iOS
2. Create a new shortcut with these actions:
   - **Get Current URL** (from Safari/web page)
   - **Get Contents of URL** with:
     - URL: `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`
     - Method: POST
     - Headers: 
       - `Accept: application/vnd.github.v3+json`
       - `Authorization: token YOUR_TOKEN`
       - `Content-Type: application/json`
     - Request Body: `{"event_type":"new-url","client_payload":{"url":"[Current URL]"}}`
   - **Show Notification**: "Article saved!"

**Usage**: Run the shortcut from Safari's share sheet or Siri.

### Method 3: Command Line

For power users, save articles via terminal:

```bash
# Create a simple script
echo '#!/bin/bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches \
  -d "{\"event_type\":\"new-url\",\"client_payload\":{\"url\":\"$1\"}}"
echo "Article saved!"' > save-article.sh

chmod +x save-article.sh

# Usage
./save-article.sh "https://example.com/article"
```

---

## 📖 Part 3: Reading Your Articles

### Option A: Use the Hosted Frontend

1. Go to [gitpocket.saeedm.com](https://gitpocket.saeedm.com)
2. Enter your Git Pocket repository URL (e.g., `https://github.com/yourusername/your-git-pocket-repo`)
3. Enter your GitHub personal access token
4. Click "Sync Articles"
5. Browse and read your saved articles!

### Option B: Run Frontend Locally

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/smoqadam/git-pocket-ui.git
   cd git-pocket-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)
5. Connect to your Git Pocket repository as described in Option A

---

## 🔧 Configuration Tips

### Security Best Practices

- Keep your GitHub token secure and private
- Consider using GitHub's fine-grained personal access tokens for better security
- Regularly rotate your access tokens

### Repository Settings

- Your Git Pocket repository must be **public** for GitHub Actions to work
- The `metadata.json` file will be created automatically on first use
- Each article is appended to the JSON file with extracted content and metadata

### Troubleshooting

- **Articles not saving**: Check GitHub Actions tab for error logs
- **Frontend not loading articles**: Verify repository URL and token permissions
- **Bookmarklet not working**: Ensure you've replaced all placeholders with your actual values

---

## 🎯 What You Get

- **Complete Privacy**: All data stored in your own GitHub repository
- **No Tracking**: No analytics, ads, or third-party services
- **Offline Reading**: Articles cached locally in your browser
- **Cross-Platform**: Works on desktop, mobile, and tablets
- **Portable**: Your data is always accessible via GitHub
- **Free**: Uses GitHub's free tier for everything

---

## 🤝 Contributing

Found a bug or want to suggest improvements? 

- Backend issues: [git-pocket repository](https://github.com/smoqadam/git-pocket)
- Frontend issues: [git-pocket-ui repository](https://github.com/smoqadam/git-pocket-ui)

## 📄 License

This project is open source and available under the MIT License.
