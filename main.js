(async () => {
  const config = window.PORTFOLIO_CONFIG || {};
  if (location.protocol === "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    try {
      const response = await fetch("/api/portfolio-config", { headers: { Accept: "application/json" } });
      if (response.ok) Object.assign(config, await response.json());
    } catch { /* The editable config.js values remain the fallback. */ }
  }
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function createElement(tag, className, text, parent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    if (parent) parent.append(element);
    return element;
  }
  function renderContentLists() {
    const achievementList = $("#achievement-list");
    (config.achievements || []).forEach(item => {
      const card = createElement("article", `achievement-card${item.featured ? " achievement-major" : ""} reveal`, undefined, achievementList);
      const mark = createElement("span", "achievement-mark", item.mark, card);
      if (item.suffix) createElement("small", "", item.suffix, mark);
      createElement("span", "achievement-label", item.label, card);
      createElement("h3", "", item.title, card);
      createElement("p", "", item.description, card);
      createElement("span", "achievement-bottom", item.note, card);
    });

    const eventList = $("#event-list");
    (config.events || []).forEach((item, index) => {
      const card = createElement("article", `event-card event-${index ? "almaty" : "astana"} reveal`, undefined, eventList);
      const photo = createElement("div", "event-photo", undefined, card);
      const image = createElement("img", "", undefined, photo);
      image.src = item.photo;
      image.alt = item.alt;
      image.loading = "lazy";
      createElement("span", "event-photo-label", item.caption, photo);
      const details = createElement("div", "event-details", undefined, card);
      const eyebrow = createElement("div", "event-eyebrow", undefined, details);
      createElement("span", "", item.type, eyebrow);
      createElement("span", "", item.city, eyebrow);
      createElement("h3", "", item.title, details);
      const facts = createElement("div", "event-facts", undefined, details);
      createElement("span", "", item.date, facts);
      createElement("span", "", `Prize fund · ${item.prize}`, facts);
      createElement("p", "", item.description, details);
      const bottom = createElement("div", "event-bottom", undefined, details);
      createElement("span", "", `Role · ${item.role}`, bottom);
      createElement("span", "", "Results details not published", bottom);
    });

    const skillList = $("#skill-list");
    (config.skills || []).forEach(item => {
      const card = createElement("article", `skill-group${item.accent ? " skill-group-accent" : ""} reveal`, undefined, skillList);
      createElement("div", "skill-symbol", item.icon, card);
      createElement("span", "skill-category", item.category, card);
      createElement("h3", "", item.title, card);
      createElement("p", "", item.description, card);
      const pills = createElement("div", "skill-pills", undefined, card);
      item.tools.forEach(tool => createElement("span", "", tool, pills));
    });
  }
  renderContentLists();
  $$(".project-card[data-project]").forEach(card => {
    const project = config.projects?.[card.dataset.project];
    if (!project) return;
    $(".project-info h3", card).textContent = project.title;
    $(".project-info p", card).textContent = project.description;
    const tags = $(".project-tags", card);
    tags.replaceChildren(...project.tags.map(tag => createElement("span", "", tag)));
    let website = $(".project-site", card);
    if (project.website) {
      if (!website) {
        website = createElement("a", "project-site", undefined, $(".project-info", card));
        website.append(document.createTextNode("Visit website "));
        createElement("span", "", "↗", website);
      }
      website.href = project.website;
      website.target = "_blank";
      website.rel = "noopener noreferrer";
      website.setAttribute("aria-label", `Visit ${project.title} website`);
    } else if (website) website.remove();
  });
  $$(".contact-links a").forEach(link => {
    if (link.textContent.includes("LinkedIn")) link.href = config.linkedin;
    if (link.textContent.includes("Instagram")) link.href = config.instagram;
  });
  $$("[data-email]").forEach(element => { element.dataset.email = config.email || ""; });
  $$("a[href^='mailto:']").forEach(link => { link.href = `mailto:${config.email}`; });
  if (config.location) {
    $(".location-copy").textContent = config.location;
    $(".short-location").textContent = config.location.split(",")[0] + ", KZ";
    $(".footer-inner > span:nth-child(2)").textContent = `Building with curiosity in ${config.location}.`;
  }
  if (config.focus) $(".focus-copy").textContent = config.focus;
  if (config.name) {
    const copyright = $(".footer-copyright");
    copyright.replaceChildren(document.createTextNode("© "), createElement("span", "", new Date().getFullYear()), document.createTextNode(` ${config.name}`));
  }

  // Theme preference: saved choice first, then the operating system setting.
  const root = document.documentElement;
  const themeButton = $(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = savedTheme || (systemDark ? "dark" : "light");
  function updateThemeButton() {
    const dark = root.dataset.theme === "dark";
    themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
    themeButton.title = `Switch to ${dark ? "light" : "dark"} theme`;
    $(".theme-icon", themeButton).textContent = dark ? "☼" : "◐";
    const themeColor = $("meta[name='theme-color']");
    if (themeColor) themeColor.content = dark ? "#151a17" : "#f7f7f4";
  }
  updateThemeButton();
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeButton();
  });

  // Small-screen navigation stays keyboard and screen-reader friendly.
  const menuToggle = $(".menu-toggle");
  const navLinks = $(".nav-links");
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  }
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navLinks.classList.toggle("open", open);
  });
  $$(".nav-links a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("click", event => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  const header = $(".site-header");
  const navAnchors = $$(".nav-links a");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-28% 0px -62% 0px", threshold: 0 });
  $$("main section[id]").forEach(section => sectionObserver.observe(section));
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(element => revealObserver.observe(element));

  // Verified highlight counts use values already shown in the portfolio.
  const counters = $$("[data-count]");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / 700, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  // Booking is ready for a configured scheduler. Until then, it prepares a
  // meeting request with the selected type and duration in the visitor's zone.
  const bookingModal = $("#booking-modal");
  const meetingOptions = $$(".meeting-option", bookingModal);
  const bookingNext = $("#booking-next", bookingModal);
  const bookingContinue = $("#booking-continue", bookingModal);
  const bookingChoice = $("#booking-choice", bookingModal);
  const bookingNote = $("#booking-note", bookingModal);
  const bookingFoot = $("#booking-foot", bookingModal);
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "local timezone";
  $("#visitor-timezone").textContent = zone;
  let chosenMeeting = null;
  function updateBookingLink() {
    if (!chosenMeeting) return;
    const meeting = config.meetings?.[chosenMeeting];
    if (!meeting) return;
    bookingChoice.textContent = `${meeting.title} · ${meeting.duration} minutes · ${zone}`;
    bookingNext.hidden = false;
    const bookingUrl = meeting.bookingUrl || config.bookingUrl;
    if (bookingUrl) {
      bookingFoot.textContent = "Available times and confirmation are provided by the calendar service.";
      const url = new URL(bookingUrl, window.location.href);
      const isGoogleAppointmentPage = /(^|\.)calendar\.google\.com$/.test(url.hostname) || /(^|\.)calendar\.app\.google$/.test(url.hostname);
      if (!isGoogleAppointmentPage) {
        url.searchParams.set("duration", String(meeting.duration));
        url.searchParams.set("meeting", meeting.title);
      }
      bookingContinue.href = url.toString();
      bookingContinue.target = "_blank";
      bookingContinue.rel = "noreferrer";
      bookingContinue.innerHTML = 'Continue to scheduling <span aria-hidden="true">↗</span>';
      bookingNote.textContent = isGoogleAppointmentPage
        ? "Choose an available time on Google Calendar’s booking page. Google will add the meeting to the calendar and send a confirmation."
        : "Choose an available time on the scheduling page. The provider will send the confirmation.";
    } else {
      bookingFoot.textContent = "No calendar is connected yet. Select a meeting type to prepare an email request.";
      const subject = encodeURIComponent(`Meeting request: ${meeting.title}`);
      const body = encodeURIComponent(`Hi Janbolat,\n\nI'd like to arrange a ${meeting.title} (${meeting.duration} minutes).\nMy timezone: ${zone}\n\nA few times that work for me:\n\n`);
      bookingContinue.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
      bookingContinue.removeAttribute("target");
      bookingContinue.removeAttribute("rel");
      bookingContinue.innerHTML = 'Request this meeting <span aria-hidden="true">↗</span>';
      bookingNote.textContent = "A calendar account is not connected yet. This prepares an email request; meeting times can be confirmed by email.";
    }
  }
  $$(".booking-trigger").forEach(button => button.addEventListener("click", () => {
    closeMenu();
    if (!bookingModal.open) bookingModal.showModal();
  }));
  meetingOptions.forEach(button => button.addEventListener("click", () => {
    chosenMeeting = button.dataset.meeting;
    meetingOptions.forEach(option => option.classList.toggle("selected", option === button));
    updateBookingLink();
  }));

  // Project detail data lives in config.js; optional role/status are omitted
  // until verified information is provided.
  const caseModal = $("#case-modal");
  $$("[data-case]").forEach(button => button.addEventListener("click", () => {
    const project = config.projects?.[button.dataset.case];
    if (!project) return;
    $("#case-title", caseModal).textContent = project.title;
    $(".case-description", caseModal).textContent = project.description;
    const metadata = $(".case-meta", caseModal);
    metadata.replaceChildren(...project.tags.map(tag => {
      const chip = document.createElement("span");
      chip.textContent = tag;
      return chip;
    }));
    if (project.role) metadata.append(Object.assign(document.createElement("span"), { textContent: `Role · ${project.role}` }));
    if (project.status) metadata.append(Object.assign(document.createElement("span"), { textContent: `Status · ${project.status}` }));
    const website = project.website;
    const note = $(".case-note", caseModal);
    note.textContent = website ? "Project details beyond this overview have not been published." : "Website, role, status, and project results have not been published.";
    if (website) {
      const link = document.createElement("a");
      link.href = website;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.className = "text-link";
      link.textContent = "Visit project website ↗";
      note.append(document.createElement("br"), link);
    }
    caseModal.showModal();
  }));

  // Copy-to-clipboard has a textarea fallback for older browsers.
  $$(".copy-email").forEach(button => button.addEventListener("click", async () => {
    const email = button.dataset.email || config.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      const input = document.createElement("textarea");
      input.value = email;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.append(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      showToast(copied ? "Email copied to clipboard" : email);
    }
  }));

  // Contact form validates locally. Configure contactEndpoint to POST directly;
  // otherwise a prefilled email draft avoids claiming a message was delivered.
  const contactForm = $("#contact-form");
  const formStatus = $("#form-status");
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();
    formStatus.textContent = "";
    const required = $$('[required]', contactForm);
    const invalid = required.find(field => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      formStatus.textContent = "Please complete the required fields with a valid email.";
      formStatus.dataset.state = "error";
      return;
    }
    const data = Object.fromEntries(new FormData(contactForm).entries());
    if (config.contactEndpoint) {
      const submit = $("button[type='submit']", contactForm);
      submit.disabled = true;
      submit.textContent = "Sending…";
      try {
        const response = await fetch(config.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("The form service returned an error.");
        contactForm.reset();
        formStatus.textContent = "Thanks — your message has been sent.";
        formStatus.dataset.state = "success";
      } catch {
        formStatus.textContent = "The message could not be sent. Please email janbolatique.kz@gmail.com instead.";
        formStatus.dataset.state = "error";
      } finally {
        submit.disabled = false;
        submit.innerHTML = 'Prepare email <span aria-hidden="true">↗</span>';
      }
      return;
    }
    const subject = encodeURIComponent(`${data.reason}: message from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nCompany / organization: ${data.company || "—"}\nReason: ${data.reason}\n\n${data.message}`);
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    formStatus.textContent = "Your email app should open with the message ready. Send it there to complete your note.";
    formStatus.dataset.state = "success";
  });

  // Keyboard command palette, including live filtering and arrow-key selection.
  const commandModal = $("#command-modal");
  const commandInput = $("#command-input");
  const commandButtons = $$("#command-list button");
  let selectedCommand = 0;
  function visibleCommands() { return commandButtons.filter(button => !button.hidden); }
  function setCommandSelection(index) {
    const visible = visibleCommands();
    if (!visible.length) return;
    selectedCommand = (index + visible.length) % visible.length;
    visible.forEach((button, i) => button.classList.toggle("selected", i === selectedCommand));
  }
  function openCommandPalette() {
    closeMenu();
    commandInput.value = "";
    commandButtons.forEach(button => { button.hidden = false; });
    setCommandSelection(0);
    commandModal.showModal();
    commandInput.focus();
  }
  function runCommand(command) {
    commandModal.close();
    const sections = { projects: "projects", achievements: "achievements" };
    if (sections[command]) $(`#${sections[command]}`).scrollIntoView({ behavior: "smooth" });
    if (command === "booking") bookingModal.showModal();
    if (command === "email") window.location.href = `mailto:${config.email}`;
    if (command === "linkedin") window.open(config.linkedin, "_blank", "noopener,noreferrer");
    if (command === "instagram") window.open(config.instagram, "_blank", "noopener,noreferrer");
  }
  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      commandModal.open ? commandModal.close() : openCommandPalette();
    }
  });
  commandInput.addEventListener("input", () => {
    const query = commandInput.value.trim().toLowerCase();
    commandButtons.forEach(button => { button.hidden = !button.textContent.toLowerCase().includes(query); });
    selectedCommand = 0;
    setCommandSelection(0);
  });
  commandInput.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") { event.preventDefault(); setCommandSelection(selectedCommand + 1); }
    if (event.key === "ArrowUp") { event.preventDefault(); setCommandSelection(selectedCommand - 1); }
    if (event.key === "Enter") { event.preventDefault(); visibleCommands()[selectedCommand]?.click(); }
  });
  commandButtons.forEach(button => button.addEventListener("click", () => runCommand(button.dataset.command)));

  // Native dialog close affordances and form state cleanup.
  $$(".modal-close").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
  [bookingModal, caseModal, commandModal].forEach(dialog => {
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => {
      if (dialog === bookingModal) {
        chosenMeeting = null;
        meetingOptions.forEach(option => option.classList.remove("selected"));
        bookingNext.hidden = true;
      }
    });
  });
  $("#year").textContent = String(new Date().getFullYear());
  if (config.availability) $(".availability-copy").textContent = config.availability;
  document.querySelectorAll("a[target='_blank']").forEach(link => {
    if (!link.rel.includes("noopener")) link.rel = "noreferrer noopener";
  });
})();
