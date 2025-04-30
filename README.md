
# 🧭 TourTrace

**TourTrace** is a modern travel planning web app that helps users generate custom tour plans, discover destinations, and visualize trips on an interactive map. It integrates Supabase for authentication and storage, Google Maps for routing, and TailwindCSS for styling.

![screenshot](public/screenshot.png)

---

## 🚀 Features

- 🗺 Interactive Google Maps with destination markers
- 📍 Location-based event & festival discovery
- ✨ Generate personalized travel itineraries
- 🔐 User authentication with Supabase
- 🎨 Responsive UI built with TailwindCSS
- 🌓 Light/Dark mode with CSS variables

---

## 📦 Tech Stack

| Tech           | Description                                  |
|----------------|----------------------------------------------|
| Vite           | Build tool for fast React development        |
| Supabase       | Auth, Realtime DB, Storage                   |
| Tailwind CSS   | Utility-first styling framework              |
| Google Maps    | Destination rendering and routing            |
| TypeScript     | Type-safe frontend development               |

---

## 🛠 Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/DimitarHristovski/TourTrace.git
cd TourTrace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root and add your environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

> ✅ Make sure to enable **Google Maps JavaScript API**, **Places API**, and **Directions API** in Google Cloud Console.

### 4. Run the development server

```bash
npm run dev
```

---

## 🗃 Project Structure

```bash
src/
├── components/      # Reusable UI components
├── pages/           # App routes
├── styles/          # Global styles (Tailwind)
├── supabase/        # DB types, migrations
.env                 # Environment configuration
```

---

## ⚙️ Authentication

Supabase handles:
- Email/password login
- Session persistence with cookies
- Real-time user state

You can extend with OAuth providers (e.g., Google, GitHub) easily.

---

## 🧠 Coming Soon

- 🧳 Multi-day itinerary builder
- 🧭 AI-based destination recommendation
- 🗂 Saved trips dashboard
- 📱 PWA + offline support

---

## 🙌 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/awesome-feature`
3. Commit changes: `git commit -m 'Add awesome feature'`
4. Push: `git push origin feature/awesome-feature`
5. Submit a Pull Request

---

## 📝 License

MIT License. See [`LICENSE`](./LICENSE) for more info.

---

## 📮 Contact

For questions or collaboration ideas, feel free to reach out on GitHub [@DimitarHristovski](https://github.com/DimitarHristovski).
