# 🌤️ Weather Info Dashboard

This project allows users to select a company and retrieve real-time weather information (T1H, REH, VEC, WSD) based on the company's address using coordinates (`nx`, `ny`) from the database.

---

## 🧹 Features

### 📌 Basic Information

- ✅ Select a company from an existing list (DB-powered).
- 🔍 Search company names in real-time.
- 🏢 Automatically populate address (City, District, Street) after selecting a company.

### 🗖️ Weather Inputs

- 🗓️ Select date from calendar.
- ⏰ Select time.

### ↺ Weather API Integration

- 📍 Fetch `nx` and `ny` coordinates based on selected company address.
- 🌐 Call external weather API using the retrieved data.
- 📊 Populate weather info boxes:
  - `T1H`: Temperature
  - `REH`: Humidity
  - `VEC`: Wind Direction (digit mapped to human-readable format using Table 1)
  - `WSD`: Wind Speed

### ⚠️ Validation & UX Enhancements

- ❗ Notifications shown if required inputs are missing.
- 🛡️ Defensive programming to prevent invalid API calls.
- 🔔 Reusable notification system with auto-close and icon support.

---

## 🏗️ Stack

| Layer            | Tech                                           |
| ---------------- | ---------------------------------------------- |
| Frontend         | React (TypeScript), Tailwind CSS, Lucide Icons |
| State Management | Context API or Provider (for Notification)     |
| Forms            | React Hook Form or Controlled Components       |
| Data Fetching    | REST API or Axios                              |
| UI Components    | Custom + Tailwind                              |

---

## 🛠️ Setup & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-org/weather-dashboard.git

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## ⚙️ API Requirements

> Weather API expects: `base_date`, `base_time`, `nx`, `ny`, `serviceKey`

Example request:

```ts
GET /weather?serviceKey={YOUR_SERVICE_KEY}date=20250801&time=0900&nx=60&ny=127
```

---

## 🧂 Table 1: VEC Mapping

```json
{
  "0": "North",
  "90": "East",
  "180": "South",
  "270": "West",
  ...
}
```

This mapping is applied **before rendering** the `VEC` value on UI.

---

## 🧪 Validation Rules

- Company must be selected.
- Address must be auto-filled (City, District, Street).
- Date and Time must be set before "Get Weather Info" is enabled.
- API call is prevented unless all required values are filled.
- Notification shown if any value is missing.

---

## ✅ Example Flow

1. User selects company `Acme Inc`.
2. Address (Tashkent, Shayxontohur, Navoi street) is auto-filled.
3. User selects `2025-08-01` and `09:00`.
4. On clicking "Get Weather Info", `nx`/`ny` are found in DB.
5. API is called.
6. Response values are shown in respective boxes.
7. `VEC` is mapped to string (e.g., `135` → `SE`).

---

## 📌 Notes

- Coordinates (`nx`, `ny`) are not lat/lon but grid values based on KMA weather system.
- `NotificationProvider` is used globally to show messages like missing inputs or API errors.
- Search is real-time and debounced to prevent excessive DB calls.

---
