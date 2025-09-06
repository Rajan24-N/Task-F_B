# 📑 Purchase Order Form (React + Tailwind)

A Purchase Order Management Form built with **React, TailwindCSS, and functional components**.  
The form replicates the required layout and includes **validations, dropdowns, date pickers, budget handling, and talent selection**.

---

## 🚀 Features

- **Purchase Order Details**
  - Client Name (mandatory, dropdown)
  - Purchase Order Type (Group / Individual)
  - Purchase Order No. (alphanumeric + special characters allowed)
  - Received On (date picker)
  - Received From (Name + Email, both mandatory)
  - PO Start & End Dates (end date cannot be before start date)
  - Budget (numeric, max 5 digits, with currency selector)

- **Talent Details**
  - Job Title / REQ Name (mandatory dropdown based on selected client)
  - REQ ID auto-fills when Job Title is selected
  - Add multiple REQ sections (only in Group PO)
  - Talent listing & selection:
    - **Individual PO** → only 1 talent allowed
    - **Group PO** → minimum 2 talents required
    - Selecting a talent opens a mandatory detail input

- **Form Behavior**
  - Save → Displays form in read-only view mode
  - Reset → Clears all fields and resets to defaults
  - Validation messages for all required fields
  - Submission → Logs filled form data in console

- **Tech Stack**
  - ⚛️ React (functional components + hooks)
  - 🎨 TailwindCSS for responsive design
  - 📦 Clean modular folder structure

---

## ⚡️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/purchase-order-form.git
cd FrontendFolder
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup TailwindCSS
Tailwind is already configured with `postcss` and `autoprefixer`.

If missing, install manually:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Inside `tailwind.config.js`, ensure:
```js
content: ["./src/**/*.{js,jsx,ts,tsx}"],
```

### 4️⃣ Run the Development Server
```bash
npm start
```

App runs at: **http://localhost:3000**

---

## 🧪 Form Validations

- All mandatory fields show **red error messages** on invalid submission.
- **Date Rules**:
  - PO Start Date ≤ PO End Date
- **Talent Rules**:
  - Individual PO → only 1 talent allowed
  - Group PO → at least 2 talents required
- Budget → max 5 digits, numeric only.

---

## 🛠️ Commands

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm install`      | Install dependencies                 |
| `npm start`        | Run local dev server                 |

---

## 🙌 Authored

Developed with ❤️ as part of a React.js technical assessment.
