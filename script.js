/* ==========================================================================
   PORTFOLIO INTERACTIVITY & LOGIC
   Developer: Amr Adel (.NET Full Stack Developer)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initThemeSwitcher();
  initCanvasParticles();
  initMouseEffects();
  initCustomCursor();
  initScrollProgress();
  initRevealAnimations();
  initStatsCounters();
  initProjectFiltersAndModals();
  initTimelineAccordion();
  initAIChatWidget();
  initContactForm();
  initContactQrModal();
  initFreelanceShowcase();
});

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        toggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
}

/* ==========================================================================
   THEME SWITCHER
   ========================================================================== */
let updateCanvasColors = null; // Hook to notify canvas of theme change

function initThemeSwitcher() {
  const switchBtn = document.querySelector("#themeToggleBtn") || document.querySelector(".theme-switch");
  const currentTheme = localStorage.getItem("portfolio-theme") || "dark"; // Default to dark theme

  document.documentElement.setAttribute("data-theme", currentTheme);

  if (switchBtn) {
    switchBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);

      // Trigger canvas color update if active
      if (typeof updateCanvasColors === "function") {
        updateCanvasColors(newTheme);
      }
    });
  }
}

/* ==========================================================================
   CANVAS PARTICLES & AMBIENT FLUID BACKGROUND
   ========================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Real mouse position + smoothed interpolated mouse position (Lerp)
  let rawMouse = { x: -1000, y: -1000, isHover: false };
  let smoothMouse = { x: -1000, y: -1000 };
  const mouseRadius = 180;

  // Theme-aware palettes (RGB channels for flexible alpha rendering)
  const themeConfigs = {
    light: {
      p1: { r: 160, g: 92, b: 56 },   // Warm Caramel
      p2: { r: 200, g: 150, b: 110 }, // Champagne Gold
      lineR: 160, lineG: 92, lineB: 56,
      lineBaseAlpha: 0.07,
      lineActiveAlpha: 0.35
    },
    dark: {
      p1: { r: 79, g: 142, b: 247 },  // Electric Cobalt
      p2: { r: 166, g: 180, b: 201 }, // Brushed Silver
      lineR: 79, lineG: 142, lineB: 247,
      lineBaseAlpha: 0.08,
      lineActiveAlpha: 0.45
    }
  };

  let currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  let activePalette = themeConfigs[currentTheme] || themeConfigs.dark;

  updateCanvasColors = (theme) => {
    currentTheme = theme;
    activePalette = themeConfigs[theme] || themeConfigs.dark;
    particles.forEach(p => p.assignColors(activePalette));
  };

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    initParticles();
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.depth = Math.random() * 0.7 + 0.3; // Depth plane (0.3 to 1.0)
      this.radius = (Math.random() * 1.8 + 1.1) * this.depth;
      
      // Base natural drift velocity
      this.baseVx = (Math.random() - 0.5) * 0.45 * this.depth;
      this.baseVy = (Math.random() - 0.5) * 0.45 * this.depth;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      
      // Twinkle & pulse phase
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.015 + Math.random() * 0.02;
      this.isType2 = Math.random() > 0.65;
      this.assignColors(activePalette);
    }

    assignColors(palette) {
      this.colorBase = this.isType2 ? palette.p2 : palette.p1;
    }

    draw() {
      // Gentle luminous pulse
      const alpha = Math.max(0.12, (0.35 + Math.sin(this.pulse) * 0.18) * this.depth);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colorBase.r}, ${this.colorBase.g}, ${this.colorBase.b}, ${alpha.toFixed(3)})`;
      ctx.fill();

      // Soft ambient halo for larger foreground particles
      if (this.depth > 0.75) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.colorBase.r}, ${this.colorBase.g}, ${this.colorBase.b}, ${(alpha * 0.16).toFixed(3)})`;
        ctx.fill();
      }
    }

    update() {
      this.pulse += this.pulseSpeed;

      // Fluid magnetic mouse interaction
      if (rawMouse.isHover) {
        const dx = this.x - smoothMouse.x;
        const dy = this.y - smoothMouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouseRadius && dist > 0.1) {
          // Dynamic magnetic force (fluid wave repulsion)
          const factor = (1 - dist / mouseRadius) * 0.85;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * factor * 0.45;
          this.vy += Math.sin(angle) * factor * 0.45;
        }
      }

      // Smooth velocity decay toward natural drift
      this.vx = this.vx * 0.94 + this.baseVx * 0.06;
      this.vy = this.vy * 0.94 + this.baseVy * 0.06;

      this.x += this.vx;
      this.y += this.vy;

      // Screen boundary wrap with soft margin
      if (this.x < -30) this.x = width + 20;
      else if (this.x > width + 30) this.x = -20;
      if (this.y < -30) this.y = height + 20;
      else if (this.y > height + 30) this.y = -20;

      this.draw();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 12500), 105);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectFilaments() {
    const maxDist = 125;
    const pCount = particles.length;

    for (let i = 0; i < pCount; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < pCount; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        if (dist < maxDist) {
          // Calculate proximity to mouse for dynamic filament illumination
          let mouseInfluence = 0;
          if (rawMouse.isHover) {
            const midX = (p1.x + p2.x) * 0.5;
            const midY = (p1.y + p2.y) * 0.5;
            const mouseDist = Math.hypot(midX - smoothMouse.x, midY - smoothMouse.y);
            if (mouseDist < mouseRadius) {
              mouseInfluence = (1 - mouseDist / mouseRadius);
            }
          }

          const distRatio = 1 - dist / maxDist;
          const alpha = (activePalette.lineBaseAlpha * distRatio) + (activePalette.lineActiveAlpha * mouseInfluence * distRatio);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${activePalette.lineR}, ${activePalette.lineG}, ${activePalette.lineB}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = mouseInfluence > 0.15 ? 0.9 : 0.55;
          ctx.stroke();
        }
      }
    }
  }

  function renderLoop() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse position tracking (Lerp)
    if (rawMouse.isHover) {
      smoothMouse.x += (rawMouse.x - smoothMouse.x) * 0.12;
      smoothMouse.y += (rawMouse.y - smoothMouse.y) * 0.12;
    }

    particles.forEach(p => p.update());
    connectFilaments();
    requestAnimationFrame(renderLoop);
  }

  // Event Listeners
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", (e) => {
    rawMouse.x = e.clientX;
    rawMouse.y = e.clientY;
    rawMouse.isHover = true;
  });

  window.addEventListener("mouseleave", () => {
    rawMouse.isHover = false;
  });

  resizeCanvas();
  renderLoop();
}

/* ==========================================================================
   INTERACTIVE MOUSE SPOTLIGHT & CARD 3D TILT
   ========================================================================== */
function initMouseEffects() {
  const root = document.documentElement;
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 3;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Smooth lerp loop for the ambient spotlight halo
  function updateSpotlight() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    root.style.setProperty("--mouse-x", `${currentX.toFixed(1)}px`);
    root.style.setProperty("--mouse-y", `${currentY.toFixed(1)}px`);
    requestAnimationFrame(updateSpotlight);
  }
  updateSpotlight();

  // Card cursor spotlight and subtle 3D tilt
  const interactiveCards = document.querySelectorAll(".project-card, .skill-card, .timeline-card, .contact-card, .contact-form");

  interactiveCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--card-mouse-x", `${x}px`);
      card.style.setProperty("--card-mouse-y", `${y}px`);

      // Gentle 3D perspective tilt (subtle and realistic)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.setProperty("--card-mouse-x", `-500px`);
      card.style.setProperty("--card-mouse-y", `-500px`);
    });
  });
}

/* ==========================================================================
   NON-TRADITIONAL DYNAMIC CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  // Disable on touch-only devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let isVisible = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.classList.remove("cursor-hidden");
      ring.classList.remove("cursor-hidden");
    }

    // Direct hardware-accelerated positioning for the inner precision dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  window.addEventListener("mouseleave", () => {
    isVisible = false;
    dot.classList.add("cursor-hidden");
    ring.classList.add("cursor-hidden");
  });

  window.addEventListener("mouseenter", () => {
    isVisible = true;
    dot.classList.remove("cursor-hidden");
    ring.classList.remove("cursor-hidden");
  });

  window.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-active");
  });

  window.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-active");
  });

  // Smooth lerp loop for the futuristic follower reticle
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Dynamic hover detection for interactive elements
  const hoverSelector = 'a, button, .btn, .chat-trigger, .theme-toggle-btn, .project-card, .skill-card, .contact-card, .tab-btn, .modal-close, .chat-suggest-btn, .contact-qr-code-box, input, textarea, select, [role="button"]';

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      document.body.classList.add("cursor-hover");
    }
    const textTarget = e.target.closest('h1, h2, .section-title, .hero-title');
    if (textTarget && !target) {
      document.body.classList.add("cursor-text");
    }
  });

  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      document.body.classList.remove("cursor-hover");
    }
    const textTarget = e.target.closest('h1, h2, .section-title, .hero-title');
    if (textTarget) {
      document.body.classList.remove("cursor-text");
    }
  });
}

/* ==========================================================================
   SCROLL PROGRESS & NAVBAR BACKGROUND
   ========================================================================== */
function initScrollProgress() {
  const header = document.querySelector("header");
  const progressLine = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollHeight) * 100;
    
    if (progressLine) {
      progressLine.style.width = scrollPercent + "%";
    }

    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  });
}

/* ==========================================================================
   REVEAL ANIMATIONS
   ========================================================================== */
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   STATISTICS COUNTERS
   ========================================================================== */
function initStatsCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute("data-target"));
        let current = 0;
        const duration = 1500; // ms
        const steps = 50;
        const increment = target / steps;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + "+";
        }, intervalTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".stat-num").forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   PROJECTS FILTER & MODALS
   ========================================================================== */
function initProjectFiltersAndModals() {
  // Filter logic
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          setTimeout(() => card.style.opacity = "1", 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => card.style.display = "none", 300);
        }
      });
    });
  });

  // Modal logic
  const modal = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const modalTitle = document.querySelector(".modal-title");
  const modalMeta = document.querySelector(".modal-meta");
  const modalDesc = document.querySelector(".modal-desc-text");
  const modalTech = document.querySelector(".modal-tech-list");
  const modalImpact = document.querySelector(".modal-impact-list");
  const tabBtns = document.querySelectorAll(".modal-tab-btn");
  const contentPanels = document.querySelectorAll(".modal-content-panel");

  // Project databases mapping for rich detail
  const projectDetails = {
    "ATM Software": {
      desc: "Developed a robust ATM kiosk software system deployed at major branches of Banque du Caire. The application is built on .NET framework and interfaces with a variety of specialized hardware devices via SDKs and APIs. Focused heavily on high-availability, encryption, security compliance, and user safety.",
      techs: ["C# / .NET Core", "Windows Services", "WPF UI Framework", "Hardware POS SDK Integration", "IPC (Inter-process communication)", "Secure Cryptographic Protocols", "SQL Server Database"],
      impact: ["Successfully deployed in live production ATMs managing daily customer deposits and withdrawals.", "Achieved 99.8% system uptime during critical hardware diagnostic testing.", "Integrated POS peripheral printers, security cameras, and card reader sensors securely.", "Ensured full banking compliance with financial transaction auditing standards."]
    },
    "Master Gold Kiosk": {
      desc: "Architected the software backend and core hardware interfacing layers for a bullion and gold coin vending kiosk. Implemented secure payment processing, barcode scanning, and precise hardware weight sensor monitoring to ensure error-free gold dispensing.",
      techs: [".NET Core API", "C# Programming", "Microcontroller Comm Protocols", "Hardware Weight Scale API", "PrimeNG Admin Dashboard", "Oracle DB & PL/SQL"],
      impact: ["Completed full software lifecycle from device driver wrapper creation to live pilot testing.", "Integrated secure financial transactions including card validation and gold value calculations in real-time.", "Eliminated dispensing errors entirely using a multi-step hardware handshake protocol.", "Built an admin configuration module for pricing adjustments based on real-time market gold value feeds."]
    },
    "ERP School Management": {
      desc: "Participated in designing and building a multi-module ERP system for international academies and schools. Contributed modules to manage admissions, student grades, attendance tracking, and teacher salaries.",
      techs: ["Angular", "C# Backend APIs", "ASP.NET Web API", "SQL Server Schema Design", "Stored Procedures", "Reporting Services (SSRS)"],
      impact: ["Streamlined school administration time by 40% through centralized portal access.", "Provided parents with a secure interface to view student performance, homework grades, and fee records.", "Optimized database queries, reducing data load latency for grade sheets by over 60%.", "Supported automated school payroll systems and automated tax calculations."]
    },
    "AI Customer Support Bot": {
      desc: "Built a self-improving chatbot integrated with internal database records. Utilized automated workflow platforms (n8n) and OpenAI model APIs to answer customer inquiries about product shipments, order statuses, and billing.",
      techs: ["n8n Workflow Engine", "OpenAI API Integration", "Node.js Helpers", "PostgreSQL Database", "Vector Database Embeddings"],
      impact: ["Deflected 65% of common customer support calls to the automated assistant.", "Implemented automated order checking API hooks that verify shipping status in seconds.", "Integrated vector databases for specific document query searches.", "Reduced average support resolution times from 12 hours to under 30 seconds."]
    },
    "Factory ERP system": {
      desc: "Engineered manufacturing resource modules for a full-scale factory ERP solution. Oversaw inventory tracking, raw material purchasing schedules, and supply chain management dashboards.",
      techs: ["C# .NET Core", "Angular Dashboard", "SQL Server", "EF Core", "CQRS Architecture Pattern", "RabbitMQ Message Queue"],
      impact: ["Implemented real-time barcode inventory scanning, cutting material counting audits from 2 days to 3 hours.", "Created automated raw material replenishment alerts preventing production line halts.", "Designed optimized dashboard views that load production statistics for managers in under 1 second.", "Reduced data redundancy across factory sites using CQRS synchronization."]
    }
  };

  // Open modal click handler
  document.querySelectorAll(".btn-details").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      const title = card.querySelector("h3").textContent;
      const meta = card.querySelector(".project-meta").textContent;
      const data = projectDetails[title] || { desc: card.querySelector("p").textContent, techs: ["Custom stack"], impact: ["Successful project deployment."] };

      // Set content
      modalTitle.textContent = title;
      modalMeta.textContent = meta;
      modalDesc.textContent = data.desc;

      // Render tech tags
      modalTech.innerHTML = "";
      data.techs.forEach(t => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = t;
        modalTech.appendChild(span);
      });

      // Render impacts list
      modalImpact.innerHTML = "";
      data.impact.forEach(imp => {
        const li = document.createElement("li");
        li.textContent = imp;
        modalImpact.appendChild(li);
      });

      // Reset to first tab
      tabBtns.forEach(t => t.classList.remove("active"));
      tabBtns[0].classList.add("active");
      contentPanels.forEach(p => p.classList.remove("active"));
      contentPanels[0].classList.add("active");

      // Open Modal
      modal.classList.add("open");
      document.body.style.overflow = "hidden"; // disable scroll
    });
  });

  // Close modal click handler
  if (modalClose && modal) {
    const close = () => {
      modal.classList.remove("open");
      document.body.style.overflow = ""; // enable scroll
    };

    modalClose.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });
  }

  // Modal Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.getAttribute("data-tab");
      contentPanels.forEach(panel => {
        panel.classList.toggle("active", panel.id === `panel-${target}`);
      });
    });
  });
}

/* ==========================================================================
   EXPERIENCE TIMELINE ACCORDION
   ========================================================================== */
function initTimelineAccordion() {
  const cards = document.querySelectorAll(".timeline-card");

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      // If clicked on links inside description, don't toggle
      if (e.target.tagName === "A") return;

      const isActive = card.classList.contains("active");
      
      // Close other cards
      cards.forEach(c => c.classList.remove("active"));

      // Toggle clicked card
      if (!isActive) {
        card.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   AI ASSISTANT (CHATBOT WIDGET)
   ========================================================================== */
function initAIChatWidget() {
  const trigger = document.querySelector(".chat-trigger");
  const box = document.querySelector(".chat-box");
  const closeBtn = document.querySelector(".chat-close-btn");
  const messagesContainer = document.querySelector(".chat-messages");
  const suggestionsContainer = document.querySelector(".chat-suggestions");

  // Predefined chatbot questions and replies
  const botBrain = {
    "tech-stack": {
      q: "What is your main technology stack?",
      a: "I work primarily with <strong>.NET Core, C#, ASP.NET Web API, and SQL Server</strong> on the backend. On the frontend, I build interactive clients using <strong>Angular, TypeScript, PrimeNG, and Tailwind CSS</strong>. I also use <strong>n8n</strong> and AI agents for workflow automation!"
    },
    "banking": {
      q: "Tell me about your hardware & banking projects.",
      a: "I worked on ATM kiosk applications for <strong>Banque du Caire</strong>, integrating camera streams, receipt printers, and POS systems securely. I also built a gold and bullion vending kiosk for <strong>Finway Tech</strong> using weight sensors and Oracle database procedures."
    },
    "freelance": {
      q: "Are you available for freelance projects?",
      a: "Yes, I am! I am open to freelance consulting, API developments, ERP enhancements, or workflow automations. Drop me a line in the contact form below or email me directly at <strong>amr.adel20@outlook.com</strong>."
    },
    "why-you": {
      q: "Why should we hire or collaborate with you?",
      a: "Unlike typical developers, I started working in my <strong>first year of university</strong>. Having shipped code in ERPs, Fintech, hardware kiosks, and school management systems, I understand business requirements and code ownership. I build systems that solve real business issues."
    }
  };

  // Close chatbot
  const closeChat = () => {
    box.classList.remove("open");
  };

  // Toggle chatbot box
  if (trigger && box && closeBtn) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      box.classList.toggle("open");
      // Hide red notification dot on first open
      const notifyDot = trigger.querySelector(".notify-dot");
      if (notifyDot) notifyDot.style.display = "none";
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeChat();
    });

    // Close chat when clicking anywhere outside
    document.addEventListener("click", (e) => {
      if (box.classList.contains("open")) {
        if (!box.contains(e.target) && !trigger.contains(e.target)) {
          closeChat();
        }
      }
    });

    // Close chat on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("open")) {
        closeChat();
      }
    });
  }

  // Handle clicking custom suggestion questions
  suggestionsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".chat-suggest-btn");
    if (!btn) return;

    const key = btn.getAttribute("data-key");
    const QA = botBrain[key];
    if (!QA) return;

    // Remove buttons to prevent spamming
    suggestionsContainer.style.pointerEvents = "none";
    suggestionsContainer.style.opacity = "0.5";

    // 1. Append user message bubble
    appendMessage(QA.q, "user");

    // 2. Append typing indicator
    const typingBubble = appendTypingIndicator();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Delay bot response slightly to feel natural
    setTimeout(() => {
      // Remove typing bubble
      typingBubble.remove();
      appendMessage(QA.a, "bot");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Re-enable suggestions
      suggestionsContainer.style.pointerEvents = "auto";
      suggestionsContainer.style.opacity = "1";
    }, 1000);
  });

  function appendMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);
  }

  function appendTypingIndicator() {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot typing";
    bubble.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    messagesContainer.appendChild(bubble);
    return bubble;
  }
}

/* ==========================================================================
   CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const inputs = document.querySelectorAll(".form-control");
  const statusMsg = document.querySelector(".form-status");

  // Floating label helpers for prefilled inputs
  inputs.forEach(input => {
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "") {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    });
  });

  if (form && statusMsg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name").value;
      const email = document.getElementById("form-email").value;
      const subject = document.getElementById("form-subject").value;
      const message = document.getElementById("form-message").value;

      const btn = form.querySelector("button[type='submit']");
      const btnText = btn.textContent;
      
      // Visual Feedback - Sending state
      btn.disabled = true;
      btn.textContent = "Opening Gmail...";
      statusMsg.style.display = "none";

      // Build email components
      const body = `Hi Amr,\n\nMy name is ${name} (${email}).\n\n${message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=amr.adel20@outlook.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Direct open in Gmail compose
      window.open(gmailUrl, '_blank');

      // Immediate success feedback
      setTimeout(() => {
        // Reset button
        btn.disabled = false;
        btn.textContent = btnText;

        // Visual Feedback - Success state
        statusMsg.className = "form-status success";
        statusMsg.textContent = "Gmail compose window opened. Thank you for your message!";
        statusMsg.style.display = "block";

        // Reset fields
        form.reset();
        inputs.forEach(i => i.classList.remove("has-value"));
      }, 1000);
    });
  }
}

/* ==========================================================================
   CONTACT QR MODAL (LIGHTBOX)
   ========================================================================== */
function initContactQrModal() {
  const trigger = document.getElementById("contactQrTrigger");
  const modal = document.getElementById("qrModal");
  const closeBtn = document.getElementById("qrModalClose");

  if (!trigger || !modal) return;

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   FREELANCE & WEB SHOWCASE LOGIC (CARDS, VIDEO HOVER & DOCS MODAL)
   ========================================================================== */
function initFreelanceShowcase() {
  const showcaseGrid = document.getElementById("showcaseGrid");
  const modal = document.getElementById("projectDocsModal");
  const modalCloseBtn = document.getElementById("docsModalCloseBtn");
  const modalBadge = document.getElementById("docsModalBadge");
  const modalTitle = document.getElementById("docsModalTitle");
  const modalSubtitle = document.getElementById("docsModalSubtitle");
  const modalOverview = document.getElementById("docsOverviewContent");
  const modalFeatures = document.getElementById("docsFeaturesList");
  const modalTechTags = document.getElementById("docsTechTags");
  const modalTechText = document.getElementById("docsTechText");
  const modalRawCode = document.getElementById("docsRawCode");
  const modalRawFilename = document.getElementById("docsRawFilename");
  const modalRawOpenBtn = document.getElementById("docsRawOpenBtn");
  const tabBtns = document.querySelectorAll(".docs-modal-tab-btn");
  const panels = document.querySelectorAll(".docs-panel");

  const hoverPreview = document.getElementById("hoverVideoPreview");
  const hoverPreviewVideo = document.getElementById("hoverPreviewVideo");
  const hoverPreviewTitle = document.getElementById("hoverPreviewTitle");

  const projects = window.freelanceProjectsData || [];
  if (!showcaseGrid || projects.length === 0) return;

  // 1. Render all cards dynamically
  showcaseGrid.innerHTML = "";
  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "showcase-card";
    card.setAttribute("data-category", proj.category);
    card.setAttribute("data-id", proj.id);

    const tagsHtml = proj.tags.map(tag => `<span class="showcase-tag">${tag}</span>`).join("");

    card.innerHTML = `
      <div class="showcase-media" title="Hover to preview full demo">
        <img src="${proj.thumbnail}" alt="${proj.title}" class="showcase-thumb" loading="lazy">
        <div class="showcase-category-badge">${proj.categoryLabel}</div>
        <div class="showcase-live-indicator">
          <span class="showcase-live-dot"></span>
          <span>VIDEO DEMO</span>
        </div>
      </div>
      <div class="showcase-body">
        <h3 class="showcase-title">${proj.title}</h3>
        <p class="showcase-subtitle">${proj.subtitle}</p>
        <div class="showcase-tags">
          ${tagsHtml}
        </div>
        <div class="showcase-actions">
          <button class="btn-showcase-details" data-id="${proj.id}" type="button">
            <span>Details & Docs</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <div class="showcase-doc-indicator ${proj.hasMd ? 'has-doc' : ''}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <span>${proj.hasMd ? '.md Spec' : 'Overview'}</span>
          </div>
        </div>
      </div>
    `;

    // 2. Large Video Hover Preview (plays prominent screen while hovering)
    const media = card.querySelector(".showcase-media");

    media.addEventListener("mouseenter", () => {
      if (!hoverPreview || !hoverPreviewVideo) return;
      if (hoverPreviewTitle) hoverPreviewTitle.textContent = proj.title;

      const encodedUrl = encodeURI(proj.videoUrl);
      if (hoverPreviewVideo.getAttribute("data-current-src") !== proj.videoUrl) {
        hoverPreviewVideo.src = encodedUrl;
        hoverPreviewVideo.setAttribute("data-current-src", proj.videoUrl);
        hoverPreviewVideo.load();
      }

      hoverPreview.classList.add("active");
      hoverPreview.setAttribute("aria-hidden", "false");

      const playPromise = hoverPreviewVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    });

    media.addEventListener("mouseleave", () => {
      if (!hoverPreview || !hoverPreviewVideo) return;
      hoverPreview.classList.remove("active");
      hoverPreview.setAttribute("aria-hidden", "true");
      hoverPreviewVideo.pause();
      hoverPreviewVideo.currentTime = 0;
    });

    // 3. Open Details & Docs Modal on Click
    const openBtn = card.querySelector(".btn-showcase-details");
    const handleCardOpen = (e) => {
      e.stopPropagation();
      // Ensure hover preview closes when opening modal
      if (hoverPreview && hoverPreviewVideo) {
        hoverPreview.classList.remove("active");
        hoverPreview.setAttribute("aria-hidden", "true");
        hoverPreviewVideo.pause();
        hoverPreviewVideo.currentTime = 0;
      }
      openProjectModal(proj);
    };

    openBtn.addEventListener("click", handleCardOpen);
    media.addEventListener("click", handleCardOpen);

    showcaseGrid.appendChild(card);
  });

  // Re-bind mouse tilt spotlight to new cards
  if (typeof initMouseEffects === "function") {
    const newCards = showcaseGrid.querySelectorAll(".showcase-card");
    newCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--card-mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--card-mouse-y", `${e.clientY - rect.top}px`);
      });
    });
  }

  // 4. Open Project Modal (Focused purely on documentation, features & .md file)
  function openProjectModal(proj) {
    if (!modal) return;

    modalBadge.textContent = proj.categoryLabel;
    modalTitle.textContent = proj.title;
    modalSubtitle.textContent = proj.subtitle;

    // Set Overview Markdown HTML
    const overviewMd = proj.overview || proj.fullMarkdown || "No additional overview available.";
    modalOverview.innerHTML = formatMarkdown(overviewMd);

    // Set Features List
    modalFeatures.innerHTML = "";
    if (proj.features && proj.features.length > 0) {
      proj.features.forEach(feat => {
        const li = document.createElement("li");
        li.className = "docs-feature-item";
        li.innerHTML = `
          <svg class="docs-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <div><strong>${feat}</strong></div>
        `;
        modalFeatures.appendChild(li);
      });
    } else {
      modalFeatures.innerHTML = `<li class="docs-feature-item"><span>Full documentation available in the specification.</span></li>`;
    }

    // Set Tech Stack Panel
    modalTechTags.innerHTML = proj.tags.map(t => `<span class="docs-tech-pill">${t}</span>`).join("");
    modalTechText.textContent = proj.techStackText || "HTML5, CSS3, JavaScript, Responsive Design";

    // Set Raw Markdown Spec
    const rawMd = proj.fullMarkdown || proj.overview || `# ${proj.title}\n\n${proj.subtitle}`;
    modalRawCode.textContent = rawMd;
    const fileName = proj.mdPath ? proj.mdPath.split("/").pop() : `${proj.id}-spec.md`;
    modalRawFilename.textContent = fileName;
    modalRawOpenBtn.href = encodeURI(proj.mdPath || proj.videoUrl);

    // Reset to Overview Tab
    tabBtns.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    tabBtns[0].classList.add("active");
    const firstPanel = document.getElementById("docsPanelOverview");
    if (firstPanel) firstPanel.classList.add("active");

    // Open
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // 6. Close Modal
  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  // 7. Modal Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const tabTarget = btn.getAttribute("data-tab");
      let panelId = "docsPanelOverview";
      if (tabTarget === "features") panelId = "docsPanelFeatures";
      else if (tabTarget === "tech") panelId = "docsPanelTech";
      else if (tabTarget === "raw-doc") panelId = "docsPanelRaw";

      const targetPanel = document.getElementById(panelId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Simple Markdown Parser Helper
  function formatMarkdown(md) {
    if (!md) return "";
    let lines = md.split("\n");
    let out = [];
    let inList = false;

    lines.forEach(line => {
      line = line.trim();
      if (!line) {
        if (inList) {
          out.push("</ul>");
          inList = false;
        }
        return;
      }

      // Headers
      if (line.startsWith("### ")) {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<h3>${formatInline(line.replace("### ", ""))}</h3>`);
      } else if (line.startsWith("## ")) {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<h3>${formatInline(line.replace("## ", ""))}</h3>`);
      } else if (line.startsWith("# ")) {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<h3>${formatInline(line.replace("# ", ""))}</h3>`);
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        if (!inList) { out.push("<ul>"); inList = true; }
        out.push(`<li>${formatInline(line.substring(2))}</li>`);
      } else {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<p>${formatInline(line)}</p>`);
      }
    });

    if (inList) out.push("</ul>");
    return out.join("");
  }

  function formatInline(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
}


