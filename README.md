# 🔥 DailyDrop™ — Mini E-Commerce

A fresh, modern e-commerce app with daily deals that drop every midnight.

## 🚀 Quick Start

### Frontend
```bash
cd Frontend/frontend-app
npm install
npm start
```
Runs at → http://localhost:3000

### Backend
```bash
cd Backend
npm install
npm start
```
Runs at → http://localhost:5000

## ✨ Features Added (Updated Version)
- 🔥 **DailyDrop branding** — Dark theme with orange accents
- ⏱️ **Live countdown timer** — Resets at midnight daily
- 🛒 **Full cart drawer** — Qty controls, remove, savings display
- 🔖 **Discount badges** — Auto-calculated % off on every card
- 📊 **Stock progress bars** — "8 left / 73% sold" urgency
- 🏷️ **Category filters** — Tech, Home, Fashion, Food, Fitness
- 🔃 **Sort options** — By price, discount, featured
- 📢 **Animated marquee** — Scrolling promo announcements
- 🎉 **Toast notifications** — Add-to-cart & order confirmations
- 📱 **Fully responsive** — Mobile, tablet, desktop

## 🛠 Tech Stack
- **Frontend**: React 19, Tailwind CSS, CSS Animations
- **Backend**: Express.js, MongoDB (optional), Node.js ESM
- **Fonts**: Syne (headings) + DM Sans (body)

## 🔧 Environment Variables
Create `.env` in `Frontend/frontend-app/`:
```
REACT_APP_API_URL=http://localhost:5000
```

Create `.env` in `Backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dailydrop
```
