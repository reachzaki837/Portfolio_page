# Mohammed Zaki S — AI-Powered Portfolio

A personal portfolio website built with React, featuring AI-powered tools including a chatbot, project explainer, and skill recommender — all powered by the Groq API (Llama / Compound Mini model).

---

## Live Demo

[View Portfolio](https://your-portfolio.vercel.app) <!-- Replace with your Vercel URL -->

---

## Features

- **Typing Animation** — Hero section with character-by-character typing effect
- **AI Chatbot** — Floating chat widget that answers questions about Zaki using Groq AI
- **AI Project Explainer** — Explains any project in plain English on demand
- **AI Skill Recommender** — Matches Zaki's skills to a visitor's job role or goal
- **Resizable Chatbot** — Drag to resize the chat window, adjust font size
- **Smooth Navigation** — Fixed navbar with smooth scroll to all sections
- **Fully Responsive** — Works on desktop and mobile

---

## Tech Stack

- **Frontend:** React (Create React App)
- **Styling:** Inline CSS with design tokens
- **AI:** Groq API — `compound-beta-mini` model
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/reachzaki837/Portfolio_page.git
cd Portfolio_page
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```
REACT_APP_GROQ_KEY=your_groq_api_key_here
```

Get your free API key at [console.groq.com](https://console.groq.com).

### 4. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Deployment (Vercel)

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)
2. Go to [vercel.com](https://vercel.com) and import your GitHub repository
3. In Vercel → **Settings → Environment Variables**, add:
   - **Name:** `REACT_APP_GROQ_KEY`
   - **Value:** your Groq API key
4. Click **Deploy**

---

## Project Structure

```
my-portfolio/
├── public/
├── src/
│   └── App.js        # All components and logic
├── .env              # Local environment variables (never commit this)
├── .gitignore
├── package.json
└── README.md
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Typing animation intro with name, title, and tagline |
| Skills | Tech stack with progress bars and certifications |
| Projects | Project cards with AI Explain feature |
| AI Tools | Skill Recommender powered by Groq AI |
| Contact | Email, LinkedIn, GitHub links |

---

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_GROQ_KEY` | Your Groq API key from console.groq.com |

---

## Security Note

Never commit your `.env` file to GitHub. Always add it to `.gitignore` before running `git add .`. If accidentally exposed, regenerate your API key immediately at [console.groq.com](https://console.groq.com).

---

## Author

**Mohammed Zaki S**
- GitHub: [@reachzaki837](https://github.com/reachzaki837)
- LinkedIn: [reachzaki](https://www.linkedin.com/in/reachzaki)
- Email: mohammedzaki.be27@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
