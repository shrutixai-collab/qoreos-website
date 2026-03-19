# QoreOS Website — Agent Instructions

## Project Overview
Single-page marketing website for QoreOS — India's first Claude-native AIOS
(AI Operating System). Builds and installs custom AI employees into Indian
businesses. Target clients: Indian SMBs, D2C brands, startups.

Tech Stack: HTML5, CSS3, Vanilla JS — single index.html file.
No frameworks. No build tools. No npm. No dependencies.
Deployed via GitHub → Vercel.

## Skills
- For frontend design and UI: Read /mnt/skills/public/frontend-design/SKILL.md
  BEFORE writing any code. Non-negotiable. This produces significantly
  better visual output.
- For coding: Use your own judgment.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in workflows/
- Each workflow defines objective, inputs, tools, outputs, edge cases
- Written in plain language

**Layer 2: Agent (You)**
- Read the relevant workflow, execute in correct sequence
- Handle failures gracefully
- Connect intent to execution without doing everything yourself
- If a workflow doesn't exist for a task, ask before creating

**Layer 3: Tools (The Execution)**
- Scripts in tools/ for deterministic execution
- Credentials in .env only — never hardcode secrets
- Check tools/ before building anything new

## How to Operate

**1. Look for existing tools first**
Check tools/ before creating anything new.

**2. Learn and adapt when things fail**
- Read the full error message
- Fix and retest
- Document what you learned in the workflow
- Update so it never happens again

**3. Keep workflows current**
Don't create or overwrite workflows without asking unless explicitly told to.

## Self-Improvement Loop
1. Identify what broke
2. Fix the tool/code
3. Verify the fix works
4. Update workflow with new approach
5. Document so it never happens again

## File Structure
qoreos-website/
  index.html         # Entire website — HTML + CSS + JS in one file
  CLAUDE.md          # This file
  workflows/         # SOPs
  tools/             # Scripts
  .env               # Secrets — never commit

## Design Direction (NON-NEGOTIABLE)
- Brand: QoreOS
- Tagline: "Your Business, Upgraded at Its Core."
- Feel: Premium, warm dark — NOT pure black, NOT white
- Typography: Distinctive premium font pairing — NOT Inter, NOT Roboto, NOT Arial
- Accent color: Your choice — must feel premium for Indian AI brand
- Style: Typography-first, clean hierarchy, generous spacing
- Reference: Linear.app confidence + Tenex.co writing energy
- Mobile responsive: Mandatory

## Project Rules
1. Single index.html — everything inside one file
2. Real client-facing product — polished, professional, no shortcuts
3. Mobile responsive with hamburger menu
4. Smooth scroll between all sections
5. All CTAs link to WhatsApp placeholder: https://wa.me/91XXXXXXXXXX
6. NO lorem ipsum anywhere — only provided copy
7. NO external frameworks or CDN libraries
8. Scroll-triggered animations on section reveal
9. Fixed navbar — transparent, blurs on scroll
10. Hero: full viewport height, centered, animated entrance
11. FAQ: accordion with smooth open/close
12. Pricing: three columns, middle highlighted as Most Popular

## Token-Efficient Communication
- No fluff — start with action
- Just create/modify files directly
- Show final code only, not iterations
- Don't show unchanged code when editing
- "✓" = just confirm
- "?" = brief explanation
- "next" = skip explanation, execute
- "explain" = full teaching mode

## Always Explain (Worth the Tokens)
- Security issues
- Breaking changes
- Data loss risks
- Critical errors

## Bottom Line
Read SKILL.md first. Make bold design decisions. Build something memorable
and premium. Stay token-efficient. Stay reliable.
