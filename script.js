document.addEventListener('DOMContentLoaded', () => {
    // Mermaid initialization
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis',
                nodeSpacing: 50,
                rankSpacing: 60
            },
            themeVariables: {
                fontSize: '16px',
                primaryColor: '#38bdf8',
                primaryTextColor: '#f8fafc',
                primaryBorderColor: '#38bdf8',
                lineColor: '#94a3b8',
                secondaryColor: '#1e293b',
                tertiaryColor: '#0f172a'
            }
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links (starting with #)
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // For cross-page links (e.g., index.html#section), 
            // the default browser behavior will handle navigation.
        });
    });

    // Shared Chart Data (Case Study 03)
    const chartLabels = [
        'TEACHING HOURS', 
        'MATH & SCIENCES', 
        'CORE COURSES', 
        'GENERAL EDUCATION', 
        'FLEXI ELECTIVES', 
        'CREDIT HOURS', 
        'ELECTIVE COURSES', 
        'INTERNSHIPS'
    ];

    const chartDatasets = [
        {
            label: 'Proposed Model (Baseline)',
            data: [100, 100, 100, 100, 100, 100, 100, 100],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#38bdf8',
            tension: 0,
            fill: true
        },
        {
            label: 'MIT Benchmark',
            data: [65, 150, 118, 125, 62, 120, 108, 100],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            tension: 0.4,
            fill: true
        },
        {
            label: 'IIT Benchmark',
            data: [95, 80, 88, 48, 34, 118, 58, 50],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'rectRot',
            tension: 0.4,
            fill: true
        },
        {
            label: 'AICTE Model',
            data: [88, 72, 88, 64, 45, 105, 88, 150],
            borderColor: '#94a3b8',
            backgroundColor: 'rgba(148, 163, 184, 0.05)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'rect',
            tension: 0.4,
            fill: true
        }
    ];

    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: chartLabels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 30
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { 
                            color: '#e2e8f0', 
                            font: { 
                                family: 'JetBrains Mono', 
                                size: 11,
                                weight: '500'
                            },
                            padding: 20
                        },
                        ticks: { 
                            display: false, 
                            stepSize: 20,
                            backdropColor: 'transparent'
                        },
                        suggestedMin: 0,
                        suggestedMax: 160
                    }
                },
                plugins: {
                    legend: { 
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#f8fafc',
                            font: { family: 'JetBrains Mono', size: 10 },
                            padding: 15,
                            usePointStyle: true,
                            boxWidth: 8
                        }
                    },
                    tooltip: { 
                        backgroundColor: '#1e293b', 
                        titleFont: { family: 'JetBrains Mono' }, 
                        bodyFont: { family: 'JetBrains Mono' }, 
                        borderColor: '#38bdf8', 
                        borderWidth: 1, 
                        padding: 12 
                    }
                }
            }
        });
    }

    // Dashboard Autoplay & Progress Bar on Hover
    const dashboardSystems = [
        document.getElementById('dashboard-system'),
        document.getElementById('alpha-agent-system')
    ];

    dashboardSystems.forEach(system => {
        if (system) {
            const mockup = system.querySelector('.mockup');
            const img = mockup.querySelector('img');
            const progressBar = mockup.querySelector('.progress-bar');
            const originalSrc = img.src;

            mockup.addEventListener('mouseenter', () => {
                // Force WebP restart by updating src
                img.src = `${originalSrc}?v=${Date.now()}`;
                progressBar.classList.add('active');
            });

            mockup.addEventListener('mouseleave', () => {
                progressBar.classList.remove('active');
                img.src = originalSrc;
            });
        }
    });
});

function sortTable(n) {
    const table = document.querySelector(".risk-table");
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        // Skip the header (index 0) and the total row (last row)
        for (i = 1; i < (rows.length - 2); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Parse currency values like $400M
            let xVal = x.innerHTML.replace(/[$,M]/g, '');
            let yVal = y.innerHTML.replace(/[$,M]/g, '');

            const isNumeric = !isNaN(parseFloat(xVal)) && isFinite(xVal);

            if (dir == "asc") {
                if (isNumeric) {
                    if (parseFloat(xVal) > parseFloat(yVal)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (isNumeric) {
                    if (parseFloat(xVal) < parseFloat(yVal)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
