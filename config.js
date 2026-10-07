/*
 * Portfolio content and local fallbacks. On Vercel, BOOKING_URL and
 * CONTACT_ENDPOINT environment variables override the matching values below.
 * Without an endpoint, the contact form prepares an email draft.
 */
window.PORTFOLIO_CONFIG = {
  name: "Janbolat Daribek",
  email: "janbolatique.kz@gmail.com",
  location: "Astana, Kazakhstan",
  focus: "Design × AI × business",
  availability: "Open to collaborations",
  bookingUrl: "",
  contactEndpoint: "",
  linkedin: "https://linkedin.com/in/janbolat-daribek-6929b6320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  instagram: "https://www.instagram.com/janbolatique?igsh=YWY2ZHczcWZibWt4&utm_source=qr",
  achievements: [
    { mark: "03", label: "NATIONAL · CHEMISTRY", title: "Bronze Medal", description: "Republican Olympiad ‘Daryn’ in Chemistry", note: "National level competition", featured: true },
    { mark: "5.0", label: "ACADEMICS", title: "GPA", description: "Consistent 5.0 GPA throughout studies. (4.0 American scale)", note: "Ongoing excellence" },
    { mark: "30", suffix: "th", label: "NATIONAL COMPETITION", title: "Örken Grant", description: "Recipient of the grant for studies at NIS; ranked 30th out of 1,200 candidates.", note: "Grant recipient" },
    { mark: "↗", label: "CHEMISTRY", title: "Olympiad Participant", description: "Multiple participations in regional and national chemistry olympiads.", note: "Regional & national" }
  ],
  events: [
    { type: "Hackathon", city: "Astana", title: "Hackathon Astana", date: "5 April 2026", prize: "1,400,000 ₸", description: "A platform for young builders and developers, organized to bring people together around new ideas.", role: "Organizer", photo: "img/hackathon-astana.jpg", alt: "Hackathon Astana event", caption: "Build together" },
    { type: "Startup Battle", city: "Almaty", title: "Startup Battle Almaty", date: "29 August 2026", prize: "550,000 ₸", description: "A gathering for early-stage ideas and ambitious founders to present and connect.", role: "Organizer", photo: "img/startup-battle-almaty.jpg", alt: "Startup Battle Almaty event", caption: "Ideas take the stage" }
  ],
  skills: [
    { icon: "✳", category: "01 / VISUAL THINKING", title: "Design", description: "Turning ideas into clear, thoughtful experiences.", tools: ["Figma", "Photoshop", "Illustrator", "Branding", "UI / UX"] },
    { icon: "⌘", category: "02 / BUILDING", title: "Development & AI", description: "Exploring how intelligent tools can solve useful problems.", tools: ["Python", "Machine learning", "AI tools", "Automation", "Web development"], accent: true },
    { icon: "↗", category: "03 / MAKING IT HAPPEN", title: "Entrepreneurship", description: "Taking ideas from first sketch to shared effort.", tools: ["Startup building", "Business development", "Team management", "Event organization"] }
  ],
  projects: {
    trainee: { title: "Trainee", description: "AI-powered matchmaking platform connecting athletes with professional trainers through high-accuracy AI matching.", tags: ["AI matchmaking", "Sports tech", "Startup"], website: "https://www.trainee.it.com/" },
    synapsense: { title: "SynapSense", description: "AI brain detection platform paired with a wearable device for real-time neural signal monitoring and analysis.", tags: ["AI", "Neurotech", "Wearable device"] },
    tripai: { title: "TripAI", description: "AI-powered platform for automated tour planning and booking.", tags: ["AI", "Automation", "Travel tech"] },
    jobsy: { title: "JOBSY AI", description: "Intelligent recruitment platform automating the employee hiring process.", tags: ["AI", "HR tech", "Automation"] },
    "nis-kitap": { title: "NIS Kitap", description: "Digital library containing textbooks and resources for school.", tags: ["Education", "Web development", "Digitalization"], website: "https://nis-kitap.vercel.app/" }
  },
  meetings: {
    quick: { title: "15 min Quick Chat", duration: 15 },
    collab: { title: "30 min Collaboration Meeting", duration: 30 },
    startup: { title: "30 min Startup / AI Discussion", duration: 30 },
    design: { title: "30 min Design / Freelance Consultation", duration: 30 }
  }
};
