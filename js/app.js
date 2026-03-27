document.addEventListener('DOMContentLoaded', () => {
    const termBody = document.getElementById('terminal-body');
    const cmdBtns = document.querySelectorAll('.cmd-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    let isTyping = false;
    let currentCmd = '';

    // ================================================
    // DATA
    // ================================================
    const heroData = {
        label: "HI, I'M",
        name: "Vivek Pawar",
        subtitle: "AI & ML Developer",
        bio: "B.Tech AI & ML student building intelligent, automation-driven systems. Currently focused on Agentic AI."
    };

    const skillsData = {
        'languages': [
            { name: 'Python', desc: 'Primary Language' },
            { name: 'Java', desc: 'OOP & DSA' },
            { name: 'SQL', desc: 'Database' }
        ],
        'ai_tools': [
            { name: 'Playwright', desc: 'Browser Automation' },
            { name: 'Prompting', desc: 'Structured Outputs' }
        ],
        'backend': [
            { name: 'Flask', desc: 'REST API framework' },
            { name: 'Pandas', desc: 'Data Analysis' },
            { name: 'Numpy', desc: 'Numerical Computing' },
            { name: 'REST APIs', desc: 'Design & Consumption' }
        ],
        'tools': [
            { name: 'Git/GitHub', desc: 'version control' },
            { name: 'HTML/CSS/JS', desc: 'frontend UIs' }
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
            tags: ["Python", "Selenium"],
            desc: "A sophisticated browser extension that scrapes LinkedIn profiles and employs Gemini AI to create custom, recruiter-focused analytical summaries.",
            bullets: ["Browser extension integration", "LLM-powered analytical insights"],
            link: "",
            gh: "https://github.com/v-vekpawar/linkedin_analyzer_extension"
        },
        {
            title: "Auto Portfolio Studio",
            tags: ["Next.js", "Flask", "AI Automation"],
            desc: "Automatically generates a stunning personal portfolio website from LinkedIn, GitHub, and Resume—powered by Next.js, Flask, and AI.",
            bullets: ["Self-operating website generation", "Integrates with GitHub/LinkedIn APIs", "Automated deployment pipeline"],
            link: "https://auto-portfolio-three.vercel.app",
            gh: "https://github.com/v-vekpawar/Auto_Portfolio"
        },
        {
            title: "Healthcare Copilot",
            tags: ["JavaScript", "Gemini API"],
            desc: "A secure web application enabling patients to submit medical assistance requests mapped with AI-powered summary generation.",
            bullets: ["Generates structured medical summaries", "Improves triage efficiency", "High-accessibility UI"],
            link: "https://healthcaresupportportal.vercel.app",
            gh: "https://github.com/v-vekpawar/healthcare_support_portal-demo"
        },
        {
            title: "Event Manager Platform",
            tags: ["Flask", "Python", "OAuth"],
            desc: "A sleek, modern web application for discovering and managing events with automated scraping and Google OAuth.",
            bullets: ["Eventbrite automated scraping", "Google OAuth secure authentication"],
            link: "",
            gh: "https://github.com/v-vekpawar/event-manager"
        },
        {
            title: "Deterministic Data Analysis",
            tags: ["Python", "Data Science"],
            desc: "A policy-driven data analysis system that deterministically evaluates when modeling is justified and flags business risks.",
            bullets: ["Algorithmically flags anomalies", "Prevents stochastic over-modeling"],
            link: "",
            gh: "https://github.com/v-vekpawar/Data_Analysis_System"
        }
    ];

    const educationData = {
        degree: "B.Tech — Artificial Intelligence",
        university: "Guru Gobind Singh Indraprastha University",
        dates: "08/2023 — 07/2027",
        sgpa: "8.441",
        semester: "6",
        status: "In Progress"
    };

    const certsData = [
        { icon: "TATA", title: "GenAI Powered Analytics", org: "Tata Group", date: "Oct 2025", type: "job simulation" },
        { icon: "IBM", title: "Data Analysis Using Python", org: "IBM Skills Network", date: "Aug 2025", type: "course" },
        { icon: "DELOITTE", title: "Technology & Data Analytics", org: "Deloitte Australia", date: "Jun 2025", type: "job simulation" }
    ];

    // ================================================
    // UTILITIES
    // ================================================
    function buildPromptLine(cmd = '', showCursor = true) {
        return `<span class="term-prompt">vivek</span><span class="term-dollar">@</span><span class="term-path">portfolio</span><span class="term-dollar">:~$</span> <span class="term-command">${cmd}</span>${showCursor ? '<span class="term-cursor"></span>' : ''}`;
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
                    if (letter === " ") return " ";
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

    // ================================================
    // RENDERERS
    // ================================================
    function renderHero() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('cd me', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('cd me', false);

            const outputHtml = `
                <div class="term-output">
                    <div class="term-comment anim-fade-up anim-fade-up-d1">// vivek_pawar — portfolio v2.0</div>
                    <hr class="term-hero-separator anim-fade-up anim-fade-up-d1">
                    <span class="term-hero-label anim-fade-up anim-fade-up-d1" id="hero-label"></span>
                    <span class="term-hero-name anim-fade-up anim-fade-up-d2" id="hero-name"></span>
                    <span class="term-hero-subtitle anim-fade-up anim-fade-up-d3">› ${heroData.subtitle}</span>
                    <span class="term-hero-bio anim-fade-up anim-fade-up-d4" id="hero-bio"></span>
                    <div class="term-hero-cta anim-fade-up anim-fade-up-d5">
                        <a href="mailto:contact.vivekpawar@gmail.com" class="btn-contact">
                            <span>→</span> Contact Me
                        </a>
                    </div>
                </div>
            `;
            termBody.innerHTML += outputHtml;

            const labelEl = document.getElementById('hero-label');
            const nameEl = document.getElementById('hero-name');
            const bioEl = document.getElementById('hero-bio');

            setTimeout(() => scrambleText(labelEl, heroData.label, 800), 150);
            setTimeout(() => scrambleText(nameEl, heroData.name, 1400), 350);
            setTimeout(() => typewriterText(bioEl, heroData.bio, 18), 1200);

            isTyping = false;
        });
    }

    function renderSkills() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('cd skills && ls -l', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('cd skills && ls -l', false);

            let html = `<div class="term-output">`;
            html += `<div class="term-comment anim-fade-up">// tech_stack — ${allSkills.length} skills loaded</div>`;

            // Compact grid showing ALL skills at once
            html += `<div class="skills-grid anim-fade-up" style="animation-delay: 0.15s;">`;
            allSkills.forEach(skill => {
                html += `
                    <div class="skill-entry">
                        <span class="arrow">→</span>
                        <span class="name">${skill.name}</span>
                        <span class="desc">// ${skill.desc}</span>
                    </div>
                `;
            });
            html += `</div>`;

            // Filter buttons
            html += `<div class="skills-filters anim-fade-up" style="animation-delay: 0.3s;">`;
            html += `<span class="term-comment" style="font-size: 11px; margin-right: 4px;">grep:</span>`;
            for (const category of Object.keys(skillsData)) {
                html += `<button class="filter-btn" data-filter="${category}">${category}()</button>`;
            }
            html += `</div>`;

            // Area for appended filter output
            html += `<div id="filter-output-area"></div>`;

            html += `</div>`;
            termBody.innerHTML += html;

            // Attach filter listeners
            setupFilterListeners();

            isTyping = false;
        });
    }

    function setupFilterListeners() {
        const filterBtns = termBody.querySelectorAll('.filter-btn');
        const outputArea = document.getElementById('filter-output-area');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.filter;
                const skills = skillsData[key];
                if (!skills) return;

                // Toggle active
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Build appended output
                let html = `<div class="filter-output">`;
                html += `<div class="prompt-line" style="margin-bottom: 8px;">${buildPromptLine(`ls -l | grep ${key}`, false)}</div>`;
                skills.forEach(skill => {
                    html += `
                        <div class="skill-entry" style="padding-left: 16px;">
                            <span class="arrow">→</span>
                            <span class="name">${skill.name}</span>
                            <span class="desc">// ${skill.desc}</span>
                        </div>
                    `;
                });
                html += `</div>`;

                outputArea.innerHTML = html;

                // Scroll to bottom of terminal
                termBody.scrollTop = termBody.scrollHeight;
            });
        });
    }

    function renderProjects() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('cd projects', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('cd projects', false);

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
        const bulletsHtml = p.bullets.map(b => `<li>${b}</li>`).join('');

        let linksHtml = '';
        if (p.link) linksHtml += `<a href="${p.link}" target="_blank" class="detail-link">Execute_App()</a>`;
        if (p.gh) linksHtml += `<a href="${p.gh}" target="_blank" class="detail-link">View_Source()</a>`;

        output.innerHTML = `
            <div class="detail-tags">${tagsHtml}</div>
            <div class="detail-title">${p.title}</div>
            <div class="detail-desc">${p.desc}</div>
            <ul class="detail-bullets">${bulletsHtml}</ul>
            <div class="detail-links">${linksHtml}</div>
        `;

        output.classList.add('visible');
    }

    function renderEducation() {
        const promptHtml = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        termBody.innerHTML = promptHtml;

        typeCommand('cd education', () => {
            const promptLine = termBody.querySelector('.prompt-line');
            promptLine.innerHTML = buildPromptLine('cd education', false);

            const pad = (str, len) => str + '\u00A0'.repeat(Math.max(0, len - str.length));

            let lines = [];
            lines.push(`<span class="term-comment">// loading credentials.json...</span>`);
            lines.push(`&nbsp;`);
            lines.push(`<span class="edu-key">${pad('degree', 12)}</span><span class="edu-colon">:</span> <span class="edu-str">"${educationData.degree}"</span>`);
            lines.push(`<span class="edu-key">${pad('university', 12)}</span><span class="edu-colon">:</span> <span class="edu-str">"${educationData.university}"</span>`);
            lines.push(`<span class="edu-key">${pad('period', 12)}</span><span class="edu-colon">:</span> <span class="edu-str">"${educationData.dates}"</span>`);
            lines.push(`<span class="edu-key">${pad('sgpa', 12)}</span><span class="edu-colon">:</span> <span class="edu-num">${educationData.sgpa}</span>`);
            lines.push(`<span class="edu-key">${pad('semester', 12)}</span><span class="edu-colon">:</span> <span class="edu-num">${educationData.semester}</span>`);
            lines.push(`<span class="edu-key">${pad('status', 12)}</span><span class="edu-colon">:</span> <span class="edu-status-dot">●</span> <span class="edu-str">${educationData.status}</span>`);
            lines.push(`&nbsp;`);
            lines.push(`<span class="term-comment">// loading certifications[${certsData.length}]...</span>`);
            lines.push(`&nbsp;`);

            certsData.forEach((cert, idx) => {
                lines.push(`<span class="edu-cert-idx">[${idx}]</span> <span class="edu-cert-icon">${cert.icon}</span> <span class="edu-pipe">│</span> <span class="edu-cert-name">${cert.title}</span> <span class="edu-pipe">│</span> <span class="edu-str">${cert.date}</span> <span class="term-comment">// ${cert.type}</span>`);
            });

            let eduHtml = `<div class="term-output">`;
            lines.forEach((line) => {
                eduHtml += `<span class="edu-line">${line}</span>`;
            });
            eduHtml += `</div>`;

            termBody.innerHTML += eduHtml;

            const eduLines = termBody.querySelectorAll('.edu-line');
            revealLines(Array.from(eduLines), 80);

            isTyping = false;
        });
    }

    function renderClear() {
        termBody.innerHTML = `<div class="prompt-line">${buildPromptLine('', true)}</div>`;
        isTyping = false;
    }

    // ================================================
    // COMMAND ROUTER
    // ================================================
    const commands = {
        'cd me': renderHero,
        'cd skills': renderSkills,
        'cd projects': renderProjects,
        'cd education': renderEducation,
        'clear': renderClear
    };

    function executeCommand(cmd) {
        if (isTyping) return;
        if (cmd === currentCmd && cmd !== 'clear') return;

        isTyping = true;
        currentCmd = cmd;

        cmdBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cmd === cmd);
        });

        if (cmd === 'clear') {
            currentCmd = '';
            cmdBtns.forEach(btn => btn.classList.remove('active'));
            renderClear();
            return;
        }

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
});
