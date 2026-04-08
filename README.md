# 📅 Interactive Wall Calendar

A customizable, responsive React wall calendar built with **Next.js 14**, **Tailwind CSS**, and **date-fns**. This project features a unique "physical" skeuomorphic aesthetic, local storage persistence, and a dynamic two-tone theming system.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.17 or later
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

   Bash

   ```
   git clone https://github.com/sayyed-musab/Interactive-Calendar-Component---takeUForward-Challenge
   ```

   ```
   cd Interactive-Calendar-Component---takeUForward-Challenge
   ```

2. **Install dependencies:**

   Bash

   ```
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   Bash

   ```
   npm run dev
   ```

4. **View the app:** Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

---

## 🛠 Architectural Choices

### 1. Theming System (Two-Tone Arrays)

Instead of a single hex code, we implemented a **2D Array System** (`string[][]`).

- **Primary Color (`index 0`):** Used for high-contrast elements like buttons, borders, and active date highlights.
- **Accent/Wall Color (`index 1`):** A lighter, desaturated version of the primary color used for the application background to create a "room" atmosphere without straining the eyes.

### 2. State Persistence with `useEffect`

To ensure a seamless user experience, we utilize `localStorage` for theme and notes.

- **Hydration Safety:** Because Next.js renders on the server first, we initialize state with a default value and perform the `localStorage` lookup inside a `useEffect` hook. This prevents **Hydration Mismatch** errors where the server-rendered UI differs from the client’s stored preferences.

### 3. Component Communication

The project follows a **Top-Down Data Flow**:

- **`Home (page.tsx)`**: Acts as the "Smart Controller," managing the global theme state and persistence logic.
- **`WallCalendar`**: A "Presentational Component" that receives the theme and distributes it to specialized sub-components (`CalendarHero`, `CalendarGrid`, and `Notes`).

### 4. TypeScript Implementation

Strict typing is used throughout to catch errors during development:

- **Prop Destructuring:** Solved `ts(2322)` errors by explicitly typing the props object: `({ themeColor }: { themeColor: string })`.
- **Strict Array Types:** Themes are typed as `string[]` to ensure both primary and light variants are always present and accessible.

---

## 🎨 UI/UX Features

- **Physical Skeuomorphism:** The calendar includes a custom-coded top binding and wall hanger UI created with SVG and CSS to mimic a real paper calendar.
- **Responsive Grid:** The layout automatically shifts from a side-by-side view (**Desktop**) to a stacked view (**Mobile**) using Tailwind’s `md:` breakpoints.
- **Interactive Feedback:** Color pickers use smooth CSS transitions (`scale-125`) and rings to provide immediate visual confirmation of the active theme.

---

## 📁 Project Structure

Plaintext

```
├── components/
│   ├── WallCalendar.tsx  # Main calendar container & layout
│   ├── CalendarHero.tsx  # Top visual section (Month/Year display)
│   ├── CalendarGrid.tsx  # Date logic and interactive day rendering
│   └── Notes.tsx         # Side panel for date-specific persistence
├── app/
│   ├── layout.tsx        # Global styles, fonts, and metadata
│   └── page.tsx          # Root logic, state management & Theme picker
└── public/               # Static assets and icons
```

---
