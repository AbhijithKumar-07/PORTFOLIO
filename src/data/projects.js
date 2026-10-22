export const projects = [
  {
    title: "Food Delivery Platform",
    tagline: "Full-Stack E-Commerce & Logistics",
    description: "An end-to-end full-stack food delivery ecosystem with a customer storefront and centralized administrative portal. Features dynamic menu management, multipart uploads via Multer, Stripe checkout with 100+ processed transactions (99% success rate), and stateless JWT-driven RBAC authentication.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Stripe API", "JWT", "Multer"],
    github: "https://github.com/AbhijithKumar-07/Food-Delivery",
    live: "https://food-delivery-frontend-7lf2.onrender.com/",
    image: "/assets/FoodDelivery.png",
    accentColor: "from-orange-500/20 via-amber-500/10 to-transparent",
    borderHover: "hover:border-orange-500/40",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20"
  },
  {
    title: "Code Sync",
    tagline: "Distributed Pair Programming Platform",
    description: "Real-time collaborative coding platform for synchronized pair programming and remote technical assessments. Enabled real-time collaborative code synchronization for 10+ concurrent users via Socket.io and Yjs (CRDTs) with latency under 100ms, live presence tracking, and reconnect recovery.",
    tech: ["React.js", "Node.js", "Express.js", "Socket.io", "Yjs (CRDTs)", "CodeMirror"],
    github: "https://github.com/AbhijithKumar-07/Code-Sync",
    live: "https://code-sync-frontend-7a09.onrender.com/",
    image: "/assets/CodeSync.png",
    invertOnDark: true,
    accentColor: "from-blue-500/20 via-cyan-500/10 to-transparent",
    borderHover: "hover:border-blue-500/40",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  },
  {
    title: "Real-Time Chat Application",
    tagline: "Instant Messaging & Online Presence",
    description: "Modern full-stack real-time messaging application featuring instant peer communication via Socket.io, active online/offline presence indicators, persistent chat histories, responsive theme styling using DaisyUI and Tailwind CSS, and secure JWT-based user authentication.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "Tailwind CSS", "DaisyUI", "JWT"],
    github: "https://github.com/AbhijithKumar-07/Chat-App",
    live: "https://chat-app-iuwc.onrender.com/",
    image: null,
    icon: "MessageSquare",
    accentColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderHover: "hover:border-emerald-500/40",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    title: "Real-Time Device Tracker",
    tagline: "Live Geolocation & Fleet Telemetry",
    description: "Live geolocation tracking system built using WebSockets and the Geolocation API. Broadcasts continuous device coordinates via Socket.io and visualizes them on an interactive map using Leaflet.js and OpenStreetMap with dynamic marker updates and clean disconnection handling.",
    tech: ["Node.js", "Express.js", "Socket.io", "Leaflet.js", "EJS", "Geolocation API"],
    github: "https://github.com/AbhijithKumar-07/RealTime-Device-Tracker",
    live: "https://realtime-device-tracker-2mf2.onrender.com/",
    image: "/assets/DeviceTracking1.webp",
    accentColor: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderHover: "hover:border-purple-500/40",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20"
  }
];
