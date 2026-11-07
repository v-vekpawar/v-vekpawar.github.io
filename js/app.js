document.addEventListener('DOMContentLoaded', () => {
    const termBody = document.getElementById('terminal-body');
    const cmdBtns = document.querySelectorAll('.cmd-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    let isTyping = false;
    let currentCmd = '';
    let cwd = '~';
    let viewToken = 0;
    let expToken = 0;
    const titleEl = document.querySelector('.terminal-title');

    // ================================================
    // DATA
    // ================================================
    const heroData = {
        label: "HI, I'M",
        name: `██╗   ██╗██╗██╗   ██╗███████╗██╗  ██╗    ██████╗  █████╗ ██╗    ██╗ █████╗ ██████╗
██║   ██║██║██║   ██║██╔════╝██║ ██╔╝    ██╔══██╗██╔══██╗██║    ██║██╔══██╗██╔══██╗
██║   ██║██║██║   ██║█████╗  █████╔╝     ██████╔╝███████║██║ █╗ ██║███████║██████╔╝
╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔═██╗     ██╔═══╝ ██╔══██║██║███╗██║██╔══██║██╔══██╗
 ╚████╔╝ ██║ ╚████╔╝ ███████╗██║  ██╗    ██║     ██║  ██║╚███╔███╔╝██║  ██║██║  ██║
  ╚═══╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝`,
        nameCompact: `██╗   ██╗██╗██╗   ██╗███████╗██╗  ██╗
██║   ██║██║██║   ██║██╔════╝██║ ██╔╝
██║   ██║██║██║   ██║█████╗  █████╔╝
╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔═██╗
 ╚████╔╝ ██║ ╚████╔╝ ███████╗██║  ██╗
  ╚═══╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
██████╗  █████╗ ██╗    ██╗ █████╗ ██████╗
██╔══██╗██╔══██╗██║    ██║██╔══██╗██╔══██╗
██████╔╝███████║██║ █╗ ██║███████║██████╔╝
██╔═══╝ ██╔══██║██║███╗██║██╔══██║██╔══██╗
██║     ██║  ██║╚███╔███╔╝██║  ██║██║  ██║
╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝`,
        subtitle: "AGENTIC AI DEVELOPER",
        bio: "Agentic AI Developer specializing in autonomous AI agents, with experience developing solutions for DG Signals, Indian Army. I build AI agents and automation tools that take over manual work, in Python, FastAPI and LLM APIs. Open to AI Engineer and Python Backend roles."
    };


    const skillsData = {
        'languages': [
            { name: 'Python', desc: 'Primary Language' },
            { name: 'Java', desc: 'OOP & DSA' },
            { name: 'SQL', desc: 'Database' }
        ],
        'agentic_ai': [
            { name: 'Agentic AI', desc: 'Tool use & multi-step agents' },
            { name: 'LLM APIs', desc: 'Gemini, Anthropic' },
            { name: 'MCP', desc: 'Anthropic certified' },
            { name: 'Prompting', desc: 'Structured Outputs' }
        ],
        'automation': [
            { name: 'Playwright', desc: 'Browser Automation' },
            { name: 'Selenium', desc: 'Browser Automation' },
            { name: 'Web Scraping', desc: 'Dynamic JS pages' }
        ],
        'backend': [
            { name: 'FastAPI', desc: 'Async REST APIs' },
            { name: 'Flask', desc: 'REST API framework' },
            { name: 'REST APIs', desc: 'Design & Consumption' },
            { name: 'Pandas', desc: 'Data Analysis' },
            { name: 'Numpy', desc: 'Numerical Computing' }
        ],
        'tools': [
            { name: 'Git/GitHub', desc: 'version control' },
            { name: 'HTML/CSS/JS', desc: 'frontend UIs' },
            { name: 'Next.js', desc: 'React frontend' }
        ]
    };

    // Flatten all skills
    const allSkills = [];
    for (const skills of Object.values(skillsData)) {
        allSkills.push(...skills);
    }

    const projectsData = [
        {
            title: "LinkedIn Profile Analyzer",
            tags: ["Python", "Playwright", "Flask", "Gemini API"],
            desc: "Scrapes LinkedIn profiles with Playwright and uses Gemini to score and summarize them for recruiters, cutting a manual review from minutes to under 30 seconds.",
            bullets: ["Handles JS-rendered pages with cookie persistence and login-state management", "Gemini-powered scoring and recruiter-focused summaries"],
            link: "",
            gh: "https://github.com/v-vekpawar/linkedin_analyzer_extension"
        },
        {
            title: "Auto Portfolio Studio",
            tags: ["Next.js", "Flask", "Gemini API"],
            desc: "Generates a developer portfolio from a GitHub username, LinkedIn data or an uploaded resume in under 60 seconds, cutting manual setup by about 90%.",
            bullets: ["Pulls GitHub repo metadata and resume content automatically", "Reusable Flask APIs with a Next.js + Tailwind frontend", "Gemini-generated portfolio sections"],
            link: "https://auto-portfolio-three.vercel.app",
            gh: "https://github.com/v-vekpawar/Auto_Portfolio"
        },
        {
            title: "Healthcare Copilot",
            tags: ["JavaScript", "Gemini API"],
            desc: "A secure web app where patients submit medical assistance requests and get an AI-generated structured summary.",
            bullets: ["Generates structured medical summaries", "Improves triage efficiency", "High-accessibility UI"],
            link: "https://healthcaresupportportal.vercel.app",
            gh: "https://github.com/v-vekpawar/healthcare_support_portal-demo"
        },
        {
            title: "Decision-Driven Data Analysis",
            tags: ["Python", "Pandas", "Scikit-learn"],
            desc: "A rule-based pipeline that deterministically gates cleaning, EDA and modeling to prevent silent data corruption and flag business risks.",
            bullets: ["Separates validation logic from execution, with every conversion decision logged", "Generates reproducible PDF reports with decision logs and risk summaries"],
            link: "",
            gh: "https://github.com/v-vekpawar/Data_Analysis_System"
        },
        {
            title: "Event Manager Platform",
            tags: ["Flask", "Python", "OAuth"],
            desc: "A web app for discovering and managing events, with automated scraping and Google OAuth.",
            bullets: ["Eventbrite automated scraping", "Google OAuth secure authentication"],
            link: "",
            gh: "https://github.com/v-vekpawar/event-manager"
        }
    ];

    const experienceData = [
        {
            cmd: "IAIP",
            role: "Intern (IAIP)",
            org: "Indian Army · DG Signals",
            period: "Aug 2026 – Nov 2026",
            length: "75 days",
            status: "COMPLETED",
            featured: true,
            kv: [
                ["Programme", "Indian Army Internship Program (IAIP)"],
                ["Placement", "DG Signals, Indian Army"]
            ],
            progress: { label: "75/75 days", pct: 100 },
            points: [
                "architecture and layout vetting of applications and websites",
                "SOC operations work",
                "automated tools replacing manual vetting and SOC tasks",
                "consolidated dashboard bringing those tools together",
                "ownership, and fast adaptation to new technologies and networks"
            ]
        },
        {
            cmd: "Conscript-HR",
            role: "Python Developer Intern",
            org: "Conscript HR (Remote)",
            period: "Jul 2026 – Aug 2026",
            length: "1 month",
            status: "COMPLETED",
            kv: [
                ["Company", "Conscript HR Advisors Pvt Ltd"],
                ["Mode", "Remote"]
            ],
            progress: { label: "1 month", pct: 100 },
            points: [
                "lead-generation agent that generates and qualifies leads from a query",
                "browser automation, web scraping, email and marketing workflows",
                "10,000+ records processed, existing scripts sped up through optimization"
            ]
        }
    ];

    const educationData = {
        degree: "B.Tech — Artificial Intelligence & Machine Learning",
        university: "Guru Gobind Singh Indraprastha University",
        dates: "Aug 2023 – Jul 2027",
        sgpa: "8.5",
        semester: "7",
        status: "In Progress"
    };

    // Paste each credential link into `url`; the "↗ credential" link only shows when url is set.
    const certsData = [
        { folder: "oracle/", title: "Agentic AI Certified Foundations Associate", org: "Oracle", date: "Aug 2026", type: "course", url: "" },
        { folder: "anthropic/", title: "Model Context Protocol", org: "Anthropic", date: "Sep 2025", type: "course", url: "" },
        { folder: "tata-forage/", title: "GenAI Powered Analytics", org: "Tata Group (Forage)", date: "Oct 2025", type: "job simulation", url: "" },
        { folder: "ibm/", title: "Data Analysis Using Python", org: "IBM Skills Network", date: "Aug 2025", type: "course", url: "" },
        { folder: "deloitte-forage/", title: "Technology & Data Analytics", org: "Deloitte Australia (Forage)", date: "Jun 2025", type: "job simulation", url: "" }
    ];

    const timelineData = [
        { year: "2023", t1: "B.Tech begins", t2: "Aug 2023", t3: "", state: "past" },
        { year: "2024", t1: "Hackathons begin", t2: "SIH · first hackathon", t3: "Projects & skills", state: "past" },
        { year: "2025", t1: "SIH college selection", t2: "4 certifications", t3: "Jun – Oct 2025", state: "past" },
        { year: "2026", t1: "2 internships", t2: "Jul – Nov 2026", t3: "", state: "now" },
        { year: "2027", t1: "Graduation", t2: "Jul 2027", t3: "", state: "future" }
    ];

    // ================================================
    // UTILITIES
    // ================================================
    function buildPromptLine(cmd = '', showCursor = true) {
        return `<span class="term-prompt">vivek</span><span class="term-dollar term-at">@</span><span class="term-path">portfolio</span><span class="term-dollar term-colon">:</span><span class="term-cwd">${cwd}</span><span class="term-dollar term-end">$</span> <span class="term-command">${cmd}</span>${showCursor ? '<span class="term-cursor"></span>' : ''}`;
    }

    function setCwd(path) {
        cwd = path;
        if (titleEl) titleEl.textContent = 'vivek@portfolio: ' + path;
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    // Types a command into a fresh prompt line inside `container`, like a real shell.
    async function typeCmd(container, cmd, alive, lead = 350, speed = 45) {
        const line = document.createElement('div');
        line.className = 'prompt-line sub-prompt';
        line.innerHTML = buildPromptLine('', true);
        container.appendChild(line);
        const span = line.querySelector('.term-command');
        if (lead) await sleep(lead);
        for (const ch of cmd) {
            if (!alive()) return false;
            span.textContent += ch;
            await sleep(speed);
        }
        await sleep(250);
        if (!alive()) return false;
        const cur = line.querySelector('.term-cursor');
        if (cur) cur.remove();
        return true;
    }

    function addBlock(container, html, cls = 'fx') {
        const d = document.createElement('div');
        d.className = cls;
        d.innerHTML = html;
        container.appendChild(d);
        termBody.scrollTop = termBody.scrollHeight; // follow the output like a terminal
        return d;
    }

    function addIdlePrompt(container) {
        const d = document.createElement('div');
        d.className = 'prompt-line term-idle fx';
        d.innerHTML = buildPromptLine('', true);
        container.appendChild(d);
        return d;
    }

    function scrambleText(element, finalString, duration = 1500) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:',.<>/?";
        let iteration = 0;
        const intervalTime = 40;
        const totalFrames = duration / intervalTime;
        const increment = finalString.length / totalFrames;

        const cancelId = setInterval(() => {
            element.innerText = finalString
                .split("")
                .map((letter, index) => {
                    if (index < Math.floor(iteration)) return finalString[index];
                    if (letter === " " || letter === "\n") return letter;
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= finalString.length) {
                clearInterval(cancelId);
                element.innerText = finalString;
            }
            iteration += increment;
        }, intervalTime);
    }

    function typewriterText(element, text, speed = 15) {
        element.textContent = "";
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        typeChar();
    }

    function typeCommand(cmd, callback) {
        const promptEl = termBody.querySelector('.prompt-line');
        if (!promptEl) { callback(); return; }

        const cmdSpan = promptEl.querySelector('.term-command');
        let i = 0;

        function type() {
            if (i < cmd.length) {
                cmdSpan.textContent += cmd.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                setTimeout(callback, 300);
            }
        }
        type();
    }

    // Typewriter for education lines
    function revealLines(lines, speed = 80) {
        let lineIdx = 0;

        function showNextLine() {
            if (lineIdx < lines.length) {
                const el = lines[lineIdx];
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = '1';
                el.classList.add('visible');
                lineIdx++;
                setTimeout(showNextLine, speed);
            }
        }
        showNextLine();
    }

    // Fit ASCII art to available container width by shrinking font-size
    function fitAsciiArt(el, maxSize = 10) {
        // Reset to max so measurement is accurate
        el.style.fontSize = maxSize + 'px';

        // Available width = terminal body width minus its left+right padding
        const style = getComputedStyle(termBody);
        const padH = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const available = termBody.clientWidth - padH;

        // scrollWidth gives the actual rendered width of the pre content
        const artWidth = el.scrollWidth;

        if (artWidth > available && available > 0) {
            const ratio = available / artWidth;
            const fitted = Math.max(3, parseFloat((maxSize * ratio).toFixed(2)));
            el.style.fontSize = fitted + 'px';
        }
    }

    // Shrinks hero spacing in steps until the home screen fits without a scrollbar
    function fitHeroToBody(nameEl, baseSize) {
        const levels = ['hero-tight-1', 'hero-tight-2', 'hero-tight-3'];
        const sizes = [baseSize, baseSize, Math.max(6, baseSize - 1.5), Math.max(5, baseSize - 3)];
        levels.forEach(c => termBody.classList.remove(c));
        const fits = () => {
            const last = termBody.lastElementChild;
            if (!last) return true;
            const padB = parseFloat(getComputedStyle(termBody).paddingBottom) || 0;
            return last.offsetTop + last.offsetHeight <= termBody.clientHeight - padB + 1;
        };
        fitAsciiArt(nameEl, sizes[0]);
        for (let i = 0; i < levels.length; i++) {
            if (fits()) break;
            termBody.classList.add(levels[i]);
            fitAsciiArt(nameEl, sizes[i + 1]);
        }
        nameEl.dataset.fit = nameEl.style.fontSize;
    }

    // ================================================
    // RENDERERS
    // ================================================
    function renderHero() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('whoami', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('whoami', false);

            const outputHtml = `
                <div class="term-output">
                    <div class="term-comment anim-fade-up anim-fade-up-d1">// vivek_pawar — portfolio</div>
                    <hr class="term-hero-separator anim-fade-up anim-fade-up-d1">
                    <span class="term-hero-label anim-fade-up anim-fade-up-d1" id="hero-label"></span>
                    <pre class="term-hero-name anim-fade-up anim-fade-up-d2" id="hero-name"></pre>
                    <span class="term-hero-subtitle anim-fade-up anim-fade-up-d3">› ${heroData.subtitle}</span>
                    <span class="term-hero-bio anim-fade-up anim-fade-up-d4" id="hero-bio"></span>
                    <div class="term-hero-cta anim-fade-up anim-fade-up-d5">
                        <a href="mailto:contact.vivekpawar@gmail.com" class="btn-contact">
                            <span>→</span> Contact Me
                        </a>
                        <button type="button" class="btn-contact btn-ghost" data-go="cd experience">View Experience <span>→</span></button>
                    </div>
                </div>
            `;
            termBody.innerHTML += outputHtml;

            const labelEl = document.getElementById('hero-label');
            const nameEl  = document.getElementById('hero-name');
            const bioEl   = document.getElementById('hero-bio');

            // Use compact art on narrow screens (≤ 520px)
            const useCompact = window.innerWidth <= 520;
            const artText = useCompact ? heroData.nameCompact : heroData.name;

            // Set text first so the browser can measure actual rendered width,
            // then fit the font-size so it never overflows the terminal body.
            // Stacked compact art is ~43 chars wide (vs 87 full), so it can be larger.
            nameEl.innerText = artText;
            fitAsciiArt(nameEl, useCompact ? 8 : 10);
            const fittedSize = nameEl.style.fontSize; // capture before scramble

            // Scramble effect — innerText changes but font-size style is untouched
            setTimeout(() => scrambleText(labelEl, heroData.label, 800), 150);
            setTimeout(() => {
                scrambleText(nameEl, artText, 1400);
                // Re-apply measured size (scramble may briefly flash wider chars)
                nameEl.style.fontSize = nameEl.dataset.fit || fittedSize;
            }, 350);
            setTimeout(() => typewriterText(bioEl, heroData.bio, 18), 1200);

            const goBtn = termBody.querySelector('[data-go]');
            if (goBtn) goBtn.addEventListener('click', () => executeCommand(goBtn.dataset.go));

            // Reserve the bio's final height so typing it never pushes the layout
            bioEl.textContent = heroData.bio;
            bioEl.style.minHeight = bioEl.offsetHeight + 'px';
            bioEl.textContent = '';

            const idle = document.createElement('div');
            idle.className = 'prompt-line term-idle anim-fade-up anim-fade-up-d5';
            idle.innerHTML = buildPromptLine('', true);
            termBody.appendChild(idle);

            fitHeroToBody(nameEl, useCompact ? 8 : 10);

            isTyping = false;
        });
    }

    function renderSkills() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('ls -l', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('ls -l', false);

            const outputDiv = document.createElement('div');
            outputDiv.className = 'term-output';
            termBody.appendChild(outputDiv);

            const comment = document.createElement('div');
            comment.className = 'term-comment';
            comment.textContent = `// tech_stack — ${allSkills.length} skills loaded`;
            outputDiv.appendChild(comment);

            const grid = document.createElement('div');
            grid.className = 'skills-grid';
            outputDiv.appendChild(grid);

            // Sequentially reveal each skill entry
            let skillIdx = 0;
            function revealNextSkill() {
                if (skillIdx < allSkills.length) {
                    const skill = allSkills[skillIdx];
                    const entry = document.createElement('div');
                    entry.className = 'skill-entry';
                    entry.innerHTML = `
                        <span class="arrow">→</span>
                        <span class="name">${skill.name}</span>
                        <span class="desc">// ${skill.desc}</span>
                    `;
                    grid.appendChild(entry);
                    skillIdx++;
                    setTimeout(revealNextSkill, 40); // Fast typographic sequence
                } else {
                    renderSkillFilters(outputDiv);
                }
            }
            revealNextSkill();

            isTyping = false;
        });
    }

    function renderSkillFilters(container) {
        const filters = document.createElement('div');
        filters.className = 'skills-filters anim-fade-up';
        filters.innerHTML = `<span class="term-comment" style="font-size: 11px; margin-right: 4px;">grep:</span>`;

        for (const category of Object.keys(skillsData)) {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = category;
            btn.textContent = `${category}()`;
            filters.appendChild(btn);
        }

        container.appendChild(filters);
        const outputArea = document.createElement('div');
        outputArea.id = 'filter-output-area';
        container.appendChild(outputArea);

        setupFilterListeners(filters);
    }

    function setupFilterListeners(container) {
        const filterBtns = container.querySelectorAll('.filter-btn');
        const outputArea = document.getElementById('filter-output-area');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.filter;
                const skills = skillsData[key];
                if (!skills) return;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                outputArea.innerHTML = `<div class="prompt-line" style="margin-bottom: 8px;">${buildPromptLine(`ls -l | grep ${key}`, false)}</div>`;

                let sIdx = 0;
                function revealFilterSkill() {
                    if (sIdx < skills.length) {
                        const skill = skills[sIdx];
                        const entry = document.createElement('div');
                        entry.className = 'skill-entry';
                        entry.style.paddingLeft = '16px';
                        entry.innerHTML = `
                            <span class="arrow">→</span>
                            <span class="name">${skill.name}</span>
                            <span class="desc">// ${skill.desc}</span>
                        `;
                        outputArea.appendChild(entry);
                        sIdx++;
                        termBody.scrollTop = termBody.scrollHeight;
                        setTimeout(revealFilterSkill, 50);
                    }
                }
                revealFilterSkill();
            });
        });
    }

    function renderProjects() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('ls', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('ls', false);

            let html = `<div class="term-output">`;
            html += `<div class="term-comment anim-fade-up" style="margin-bottom: 12px;">// ~/projects — ${projectsData.length} repositories found</div>`;

            // IDE split pane
            html += `<div class="projects-ide-layout anim-fade-up" style="animation-delay: 0.15s;">`;

            // Left: Explorer — file tree with titles
            html += `<div class="projects-explorer">`;
            html += `<div class="explorer-header">📁projects/</div>`;
            html += `<div class="project-list">`;
            projectsData.forEach((p, idx) => {
                html += `<div class="project-list-item${idx === 0 ? ' active' : ''}" data-project-id="${idx}">${p.title}</div>`;
            });
            html += `</div>`;
            html += `</div>`;

            // Right: Detail pane
            html += `<div class="projects-detail">`;
            html += `<div class="detail-prompt">`;
            html += `<span class="term-prompt">~/projects</span><span class="term-dollar"> $</span> <span class="detail-cli-text" id="detail-cli-text"></span><span class="term-cursor"></span>`;
            html += `</div>`;
            html += `<div class="detail-output" id="detail-output"></div>`;
            html += `</div>`;

            html += `</div>`;
            html += `</div>`;

            termBody.innerHTML += html;

            setupProjectListeners();
            setTimeout(() => showProject(0), 400);

            isTyping = false;
        });
    }

    let projectTypeTimeout;

    function setupProjectListeners() {
        const items = termBody.querySelectorAll('.project-list-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.projectId);
                if (!item.classList.contains('active')) {
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    showProject(id);
                }
            });
        });
    }

    function showProject(id) {
        const p = projectsData[id];
        const cliText = document.getElementById('detail-cli-text');
        const output = document.getElementById('detail-output');

        if (!cliText || !output) return;

        output.classList.remove('visible');
        clearTimeout(projectTypeTimeout);
        cliText.textContent = '';

        // Command: cat "Project Title"
        const runCmd = `cat "${p.title}"`;
        let charIdx = 0;

        function typeChar() {
            if (charIdx < runCmd.length) {
                cliText.textContent += runCmd.charAt(charIdx);
                charIdx++;
                projectTypeTimeout = setTimeout(typeChar, 30);
            } else {
                setTimeout(() => renderProjectOutput(p), 200);
            }
        }
        typeChar();
    }

    function renderProjectOutput(p) {
        const output = document.getElementById('detail-output');
        if (!output) return;

        const tagsHtml = p.tags.map(t => `<span class="detail-tag">${t}</span>`).join('');
        const bulletsHtml = p.bullets.map((b, i) => `<li style="opacity: 0;" class="p-bullet-${i}">${b}</li>`).join('');

        output.innerHTML = `
            <div class="detail-tags">${tagsHtml}</div>
            <div class="detail-title">${p.title}</div>
            <div class="detail-desc" id="p-desc"></div>
            <ul class="detail-bullets">${bulletsHtml}</ul>
            <div class="detail-links" id="p-links" style="opacity: 0;"></div>
        `;

        const descArea = document.getElementById('p-desc');
        const linksArea = document.getElementById('p-links');

        output.classList.add('visible');

        // Typewriter reveal for description
        typewriterText(descArea, p.desc, 10);

        // Sequential reveal for bullets
        setTimeout(() => {
            let bIdx = 0;
            function revealNextBullet() {
                if (bIdx < p.bullets.length) {
                    const li = output.querySelector(`.p-bullet-${bIdx}`);
                    if (li) {
                        li.style.transition = 'opacity 0.4s ease';
                        li.style.opacity = '1';
                    }
                    bIdx++;
                    setTimeout(revealNextBullet, 200);
                } else {
                    // Show links at the end
                    linksArea.style.transition = 'opacity 0.5s ease';
                    linksArea.style.opacity = '1';

                    let linksHtml = '';
                    if (p.link) linksHtml += `<a href="${p.link}" target="_blank" class="detail-link">Execute_App()</a>`;
                    if (p.gh) linksHtml += `<a href="${p.gh}" target="_blank" class="detail-link">View_Source()</a>`;
                    linksArea.innerHTML = linksHtml;
                }
            }
            revealNextBullet();
        }, (p.desc.length * 10) + 150);
    }

    async function renderEducation(tok) {
        const alive = () => tok === viewToken;
        termBody.innerHTML = '';
        if (!await typeCmd(termBody, 'cat degree.txt', alive)) return;

        const view = document.createElement('div');
        view.className = 'edu-view';
        termBody.appendChild(view);

        addBlock(view, `${educationData.degree.replace(' — ', ', ')}`, 'edu-deg-title fx');
        await sleep(180); if (!alive()) return;
        addBlock(view, `${educationData.university} · ${educationData.dates}`, 'edu-deg-sub fx');
        await sleep(250); if (!alive()) return;

        const tl = document.createElement('div');
        tl.className = 'tl';
        view.appendChild(tl);
        for (let i = 0; i < timelineData.length; i++) {
            const c = timelineData[i];
            const last = i === timelineData.length - 1;
            const node = c.state === 'future' ? '○' : (c.state === 'now' ? '◉' : '●');
            const line = last ? '' : (c.state === 'now'
                ? '<span class="tl-line half"><i></i><i></i></span>'
                : '<span class="tl-line"></span>');
            addBlock(tl, `<div class="tl-axis"><span class="tl-node">${node}</span>${line}</div>
                <div class="tl-year">${c.year}</div><div class="tl-t1">${c.t1}</div>
                <div class="tl-t2">${c.t2}</div><div class="tl-t3">${c.t3}</div>`, `tl-col ${c.state} fx`);
            await sleep(230); if (!alive()) return;
        }

        await sleep(150); if (!alive()) return;
        addBlock(view, `<span class="edu-badge">SGPA ${educationData.sgpa}</span> <span class="edu-status-dot">●</span> <span class="edu-status-text">${educationData.status.toUpperCase()}</span> <span class="edu-muted">· ${educationData.semester}th semester</span>`, 'edu-sgpa fx');
        await sleep(450); if (!alive()) return;

        addBlock(view, '', 'edu-gap');
        if (!await typeCmd(view, 'tree certifications/', alive)) return;
        termBody.scrollTop = termBody.scrollHeight;

        addBlock(view, 'certifications/', 'tree-root fx');
        await sleep(200); if (!alive()) return;
        for (let i = 0; i < certsData.length; i++) {
            const c = certsData[i];
            const branch = i === certsData.length - 1 ? '└──' : '├──';
            const link = c.url ? `<a class="tree-link" href="${c.url}" target="_blank" rel="noopener">↗ credential</a>` : '';
            addBlock(view, `<span class="tree-branch">${branch}</span><span class="tree-folder">${c.folder}</span><span class="tree-title">${c.title}</span><span class="tree-lead"></span><span class="tree-date">${c.date}</span>${link}`, 'tree-row fx');
            await sleep(280); if (!alive()) return;
        }
        addBlock(view, `${certsData.length} certifications`, 'tree-count fx');
        await sleep(200); if (!alive()) return;
        addIdlePrompt(view);
        termBody.scrollTop = termBody.scrollHeight;
    }

    async function renderExperience(tok) {
        const alive = () => tok === viewToken;
        termBody.innerHTML = '';
        if (!await typeCmd(termBody, 'ls -lt', alive)) return;

        const view = document.createElement('div');
        view.className = 'exp-view';
        termBody.appendChild(view);

        addBlock(view, '<span></span><span>ROLE</span><span>ORGANISATION</span><span>PERIOD</span><span>LENGTH</span><span>STATUS</span>', 'tbl-head fx');
        for (let i = 0; i < experienceData.length; i++) {
            const e = experienceData[i];
            const row = addBlock(view, `<span class="tbl-mark"></span>
                <span class="tbl-c tbl-role">${e.role}</span><span class="tbl-c tbl-org">${e.org}</span>
                <span class="tbl-c tbl-period">${e.period}</span><span class="tbl-c tbl-len">${e.length}</span>
                <span class="tbl-c tbl-status">● ${e.status}</span>`,
                `tbl-row${i === 0 ? ' selected' : ''}${e.featured ? ' featured' : ''} fx`);
            row.dataset.idx = i;
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            const open = () => { if (!row.classList.contains('selected')) showExperience(i, viewToken); };
            row.addEventListener('click', open);
            row.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); } });
            await sleep(170); if (!alive()) return;
        }
        addBlock(view, '<span class="tbl-hint-arrow">↑</span> click a row to inspect it', 'tbl-hint fx');
        const box = document.createElement('div');
        box.className = 'exp-detail';
        box.id = 'exp-detail';
        view.appendChild(box);
        await sleep(300); if (!alive()) return;
        showExperience(0, tok);
    }

    async function showExperience(idx, tok) {
        const my = ++expToken;
        const alive = () => tok === viewToken && my === expToken;
        const e = experienceData[idx];
        const box = document.getElementById('exp-detail');
        if (!box) return;

        termBody.querySelectorAll('.tbl-row').forEach(r => r.classList.toggle('selected', parseInt(r.dataset.idx, 10) === idx));
        const hint = termBody.querySelector('.tbl-hint');
        if (hint && idx !== 0) hint.classList.add('done');

        box.innerHTML = '';
        if (!await typeCmd(box, 'describe ' + e.cmd, alive, 0, 38)) return;

        const key = k => `<span class="edu-key">${k.padEnd(12, '\u00A0')}</span><span class="edu-colon">:</span> `;
        const lines = [];
        e.kv.forEach(([k, v]) => lines.push(key(k) + `<span class="exp-val">${v}</span>`));
        lines.push(key('Progress') + `<span class="exp-bar"><i></i></span> <span class="exp-val-b">${e.progress.label}</span>`);
        lines.push(`<span class="term-comment">Highlights</span>`);
        e.points.forEach(pt => lines.push(`<span class="exp-plus">+</span> <span class="exp-pt">${pt}</span>`));

        for (const l of lines) {
            if (!alive()) return;
            const el = addBlock(box, l, 'exp-line');
            requestAnimationFrame(() => el.classList.add('visible'));
            const fill = el.querySelector('.exp-bar i');
            if (fill) requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = e.progress.pct + '%'; }));
            await sleep(150);
        }
        if (!alive()) return;
        addIdlePrompt(box);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function renderClear() {
        termBody.innerHTML = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        isTyping = false;
    }

    // ================================================
    // COMMAND ROUTER
    // ================================================
    const cwdMap = {
        'cd me': '~',
        'cd experience': '~/experience',
        'cd skills': '~/skills',
        'cd projects': '~/projects',
        'cd education': '~/education'
    };

    const commands = {
        'cd me': renderHero,
        'cd experience': () => { isTyping = false; renderExperience(viewToken); },
        'cd skills': renderSkills,
        'cd projects': renderProjects,
        'cd education': () => { isTyping = false; renderEducation(viewToken); },
        'clear': renderClear
    };

    function executeCommand(cmd) {
        if (isTyping) return;
        if (cmd === currentCmd && cmd !== 'clear') return;

        isTyping = true;
        currentCmd = cmd;
        viewToken++;
        termBody.classList.remove('hero-tight-1', 'hero-tight-2', 'hero-tight-3');
        termBody.classList.toggle('is-home', cmd === 'cd me');

        cmdBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cmd === cmd);
        });

        if (cmd === 'clear') {
            currentCmd = '';
            cmdBtns.forEach(btn => btn.classList.remove('active'));
            renderClear();
            return;
        }

        // "cd" happens instantly, like a real shell: new folder in the prompt and title bar
        if (cwdMap[cmd]) setCwd(cwdMap[cmd]);

        const handler = commands[cmd];
        if (handler) handler();
    }

    // ================================================
    // EVENT LISTENERS
    // ================================================
    cmdBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.dataset.cmd);
        });
    });

    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        htmlEl.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });

    // ================================================
    // INIT
    // ================================================
    setTimeout(() => {
        executeCommand('cd me');
    }, 300);

    // Re-fit ASCII art on resize / orientation change
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const nameEl = document.getElementById('hero-name');
            if (nameEl) {
                // Re-render hero if active (handles compact↔full switch on rotation)
                const prevCmd = currentCmd;
                if (prevCmd === 'cd me') {
                    currentCmd = ''; // allow re-render
                    isTyping = false;
                    executeCommand('cd me');
                } else {
                    // Just re-fit without re-rendering
                    fitAsciiArt(nameEl, window.innerWidth <= 520 ? 13 : 10);
                }
            }
        }, 200);
    });
});
