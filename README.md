# Discord Presence Viewer 🎮

A beautiful, real-time website to view your Discord presence status, activities, and more!

## Features

- ✨ Modern, responsive UI with gradient background
- 🔄 Real-time Discord presence updates
- 🎯 Shows your current status (online, idle, dnd, offline)
- 🎮 Displays your activities (games, music, streaming, etc.)
- 👤 Shows your Discord avatar and username
- 📱 Mobile-friendly design

## Setup Instructions

### 1. Get Your Discord User ID

1. Open Discord and go to **User Settings** (gear icon)
2. Go to **Advanced** → Enable **Developer Mode**
3. Right-click on your profile picture/name
4. Click **Copy ID** (this is your Discord User ID)

### 2. Configure Your Discord ID

Open `src/server.ts` and replace `YOUR_DISCORD_ID_HERE` with your Discord User ID:

```typescript
const DISCORD_ID = "YOUR_DISCORD_ID_HERE"; // Replace with your ID
```

Or set it as an environment variable:
```bash
# Windows PowerShell
$env:DISCORD_ID="your_discord_id_here"

# Windows CMD
set DISCORD_ID=your_discord_id_here

# Linux/Mac
export DISCORD_ID="your_discord_id_here"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Server

```bash
npm run dev
```

### 5. Open in Browser

Open your browser and go to: **http://localhost:3000**

## How It Works

This project uses the [Lanyard API](https://lanyard.rest) to fetch your Discord presence data in real-time via WebSocket. The server connects to Lanyard's WebSocket API and streams your Discord presence information, which is then displayed on a beautiful web interface.

## Technologies Used

- **Node.js** + **Express** - Backend server
- **TypeScript** - Type-safe code
- **WebSocket** - Real-time connection to Lanyard API
- **HTML/CSS/JavaScript** - Frontend interface
- **Lanyard API** - Discord presence data

## Troubleshooting

- **"Discord ID not configured"**: Make sure you've set your Discord ID in `server.ts`
- **Status shows "offline"**: Make sure Discord is running and you're logged in
- **No activities showing**: You might not have any active activities in Discord
- **Connection issues**: Make sure your Discord account has Developer Mode enabled

## License

MIT

