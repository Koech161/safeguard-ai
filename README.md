# SafeguardAI 🌟

Overview
--------
SafeguardAI is an AI-powered platform designed to detect and prevent digital abuse against women and girls across Africa. The platform provides real-time analysis of text and images to identify abusive content, offers safety resources, and connects users with support services.

Mission
-------
Building safer digital spaces where women and girls can exist, speak, and thrive without fear.

🎯 Problem Statement
--------------------
Digital spaces are becoming increasingly unsafe for women and girls:

- 1 in 3 African women faces online harassment
- Rising cases of cyberbullying, threats, stalking, and sextortion
- Lack of accessible tools for early detection and prevention
- Limited awareness of digital rights and support resources

💡 Solution
-----------
SafeguardAI addresses these challenges through:

- **AI-Powered Detection:** Real-time analysis of text and images for abusive content.
- **Multi-language Support:** English, Swahili, and local dialects.
- **Safety Resources:** Comprehensive digital safety guidelines and emergency protocols.
- **Support Network:** Country-specific GBV support organizations and hotlines.
- **Privacy-First:** No data storage; usage is anonymous by default.

🛠️ Technology Stack
-------------------

Frontend
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS with Dark/Light mode
- Icons: Lucide React
- HTTP Client: Axios
- Deployment: Vercel

Backend
- Framework: Django 5 with Django REST Framework
- AI Integration: Google Gemini AI (Gemini 2.5 Flash)
- Deployment: Render 

🚀 Features
-----------

Core Features
- **Text Analysis:** Paste and analyze suspicious messages, comments, or emails.
- **Image Analysis:** Upload screenshots and images for AI-powered content detection.
- **Risk Assessment:** Categorizes content and provides risk levels (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
- **Immediate Actions:** Provides specific, actionable safety steps for each risk level.
- **Multi-language:** Supports English, Swahili, and selected local languages.

Support Features
- **Safety Resources:** Practical digital safety tips and guidelines.
- **GBV Support:** Country-specific support organizations and hotlines.
- **Emergency Protocols:** Steps to follow if a user is in immediate danger.
- **Educational Content:** Materials to increase digital rights and safety awareness.

Additional Features
- Mobile-first, responsive design



🏗️ Installation & Setup
----------------------

Backend Setup (Django)

1. Clone the repository

```bash
git clone https://github.com/Koech161/safeguard-ai.git
cd safeguard-ai/safeguard_be
```

2. Create a virtual environment

Unix / macOS:
```bash
python -m venv venv
source venv/bin/activate
```

Windows (PowerShell):
```powershell
python -m venv venv
.\venv\Scripts\Activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Environment configuration

Create a `.env` file in the `safeguard_be/` directory with these variables:

```env
GEMINI_API_KEY=your-google-gemini-api-key
ALLOWED_ORIGINS=http://localhost:3000

```

5. Run migrations and start server

```bash
python manage.py runserver
```

Frontend Setup (Next.js)

1. Navigate to frontend directory

```bash
cd ../safeguard_fe
```

2. Install dependencies

```bash
npm install
```

3. Environment configuration

Create a `.env.local` file in the `safeguard_fe/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start development server

```bash
npm run dev
```

⚠️ Notes
- The AI integration uses Google Gemini; ensure `GEMINI_API_KEY` is set and has the required permissions.
- Redis is used for caching responses — make sure Redis is running and reachable via `REDIS_URL`.
- The platform is privacy-first: by design, it does not persist user-submitted text or images without explicit consent.

🤝 Contributing
---------------
We welcome contributions. Please open issues for bugs or feature requests, and submit pull requests against the `main` branch. Follow standard GitHub workflow:

```bash
git checkout -b feat/your-feature
# make changes
git commit -am "Add: brief description"
git push origin feat/your-feature
```

Include tests for backend changes and keep changes focused.

📬 Contact
-----------
If you need help or want to collaborate, open an issue or contact the maintainer listed on the repository.

📜 License
---------
This project is available under an open-source license. Add a `LICENSE` file to specify the chosen license.

Thank you for helping build safer digital spaces with SafeguardAI ❤️
