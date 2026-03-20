# QoreOS — Project Instructions

## What is QoreOS
QoreOS is India's first Claude-native AIOS (AI Operating System). We build and install custom AI employees into Indian businesses so teams stop drowning in repetitive work and focus on actual growth. Human-first — AI works alongside people, not replacing them.

## Tech Stack
- Frontend: HTML + CSS + Vanilla JS (single-file pages)
- Backend: Node.js + Express
- AI: Claude API (Anthropic) via @anthropic-ai/sdk
- Deployment: GitHub → Vercel (not deployed yet)
- No React. No frameworks. No TypeScript. Keep it simple.

## Project Structure
QoreOS/
├── CLAUDE.md              # This file — project context
├── index.html             # Main website (DO NOT modify without explicit instruction)
├── .env                   # API keys — NEVER commit this
├── package.json           # Node dependencies
├── server.js              # Express backend for demo pages
├── demo/
│   ├── qsales.html        # Q:Sales interactive demo
│   ├── qca.html           # Q:CA demo (not built yet)
│   ├── qcompete.html      # Q:Compete demo (not built yet)
│   └── qads.html          # Q:Ads demo (not built yet)

## Design Tokens (apply to ALL pages)
- Background: #0D1117 (main site), #0A0E17 (demo pages)
- Accent: #6366F1 (indigo)
- Text primary: #F8FAFC
- Text secondary: #94A3B8
- Text muted: #475569
- Card background: #1E2333 or #12172A
- Green: #34D399 | Yellow: #FBBF24 | Red: #F87171
- Heading font: Cormorant Garamond (serif)
- Body font: Space Grotesk (sans-serif)
- Border radius: 12px (cards), 9999px (pills/buttons)

## Brand Voice
- Confident, warm, premium, direct, no fluff
- Not corporate, not startup-bro, not Western
- Feels like a sharp young Indian founder built this

## AI Employees (4 flagship)
1. Q:Sales — Full AI sales department (lead capture, qualification, follow-up, objection handling, pipeline, briefings)
2. Q:CA — AI finance and compliance assistant (India-exclusive, GST, ITC, advance tax)
3. Q:Compete — 24/7 competitor monitoring
4. Q:Ads — Ad copy, campaign management, spend optimisation

## Demo Pages
- Each demo is a single self-contained HTML file with inline CSS and JS
- Demos call the local Express server for Claude API access
- API endpoints follow pattern: POST /api/{employee}/generate and POST /api/{employee}/detail
- Backend keeps API key safe — never expose it to the browser
- Handle errors gracefully with retry options

## Rules
- NEVER modify index.html unless explicitly told to
- NEVER expose API keys in frontend code
- NEVER use React, TypeScript, or any framework
- Keep all pages as single HTML files with inline styles and scripts
- All new features go through me first — don't create files without being told to
- Indian context matters — use INR (₹), Indian names, Indian cities, Hinglish where appropriate
- Mobile responsive is mandatory for everything

## Server
- Express.js on port 3000
- Serves index.html at root "/"
- Serves demo pages from /demo/
- API routes at /api/
- Uses dotenv for environment variables
- CORS enabled for local development

## Token Efficiency
- No fluff — start with action
- Modify files directly, no preamble
- Confirm with ✓, ask with ?
