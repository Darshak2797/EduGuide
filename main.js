// --- Application State & Constants ---
const appState = {
    coursesData: [],
    collegesData: [],
    currentStage: '',
    currentStream: '',
    currentSubBranch: '',
    selectedCourse: null,
    savedCourses: JSON.parse(localStorage.getItem('savedCourses')) || [],
    currentTheme: localStorage.getItem('theme') || 'light',
};

// Tree structure for pathways
const pathwayTree = {
    '10th': {
        'science': {
            'general': [
                'ITI Electrician', 'ITI Fitter', 'ITI Welder', 'ITI Computer Operator', 'ITI Mechanic Motor Vehicle',
                'ITI Electronics', 'ITI Plumber', 'ITI Carpenter', 'ITI Painter', 'ITI Machinist',
                'Diploma Civil Engineering', 'Diploma Mechanical Engineering', 'Diploma Electrical Engineering',
                'Diploma Electronics Engineering', 'Diploma Computer Engineering', 'Diploma Chemical Engineering',
                'Diploma Automobile Engineering', 'Diploma Textile Engineering', 'Diploma Mining Engineering',
                'Diploma Metallurgy', 'Diploma Architecture', 'Diploma Interior Design', 'Diploma Fashion Design',
                'Diploma Hotel Management', 'Diploma Catering Technology', 'Diploma Event Management',
                'Certificate Digital Marketing', 'Certificate Data Entry', 'Certificate Computer Basic',
                'Certificate Networking'
            ],
            'medical': [
                'ANM', 'GNM', 'Pharmacy Assistant', 'Lab Technician', 'X-Ray Technician',
                'ECG Technician', 'Dialysis Technician', 'OT Assistant', 'Medical Record Technician',
                'Medical Lab Technician', 'Radiology Technician', 'Physiotherapy Assistant', 'Optometry',
                'Dental Hygienist', 'Veterinary Assistant', 'Nutrition Assistant', 'Healthcare Administration',
                'Phlebotomy Technician', 'Mental Health Worker', 'Community Health Worker'
            ]
        },
        'commerce': {
            'general': [
                'Commerce Diploma', 'Accounting Course', 'Banking Course', 'Tally Course', 'GST Course',
                'Business Administration Diploma', 'Financial Accounting Diploma', 'Taxation Diploma',
                'Business Analytics Diploma', 'Retail Management Diploma', 'Insurance Services Diploma',
                'Payroll Management Certificate', 'Stock Market Certificate', 'Investment Banking Course',
                'Logistics & Supply Chain Diploma', 'Entrepreneurship Certificate', 'E-Commerce Diploma',
                'Digital Marketing Diploma', 'Financial Markets Course', 'Cost Accounting Course',
                'Corporate Finance Diploma', 'Business Law Course', 'Human Resource Diploma',
                'Office Management Certificate', 'Travel and Tourism Diploma', 'Hotel Management Diploma',
                'Foreign Trade Diploma', 'Event Management Diploma', 'Banking Operations Certificate',
                'Wealth Management Course', 'Market Research Certificate', 'Business Communication Course',
                'Leadership and Management Diploma', 'Startup Management Course', 'E-Audit Course',
                'Supply Chain Management Diploma', 'Retail Sales Certificate', 'Insurance Broking Course',
                'International Business Certificate', 'Tax Consultant Course', 'Import Export Management Diploma',
                'Digital Payments Course', 'Merchant Banking Diploma', 'Microfinance Course',
                'Agri-Business Management Diploma', 'Securities Market Course', 'Retail Banking Certificate',
                'Corporate Taxation Course', 'Service Management Diploma'
            ]
        },
        'arts': {
            'general': [
                'Arts Diploma', 'Fine Arts', 'Music Course', 'Dance Course', 'Photography',
                'Theatre Arts', 'Film Making', 'Animation & VFX', 'Graphic Design', 'Interior Design',
                'Fashion Design', 'Journalism', 'Mass Communication', 'Creative Writing', 'Digital Media Diploma',
                'Advertising Diploma', 'Public Relations Diploma', 'Performing Arts', 'Music Production',
                'Acting Course', 'Sculpture Course', 'Painting Course', 'Ceramics Course', 'Art History Course',
                'Art Therapy Course', 'Fashion Styling', 'Textile Design', 'Jewelry Design', 'Photography Editing',
                'Film Editing', 'Sound Design', 'Theatre Production', 'Media Studies', 'Broadcast Journalism',
                'Radio Jockey Course', 'Video Production', 'Interior Decoration', 'Landscape Design', 'Culinary Arts',
                'Hospitality Management', 'Exhibition Design', 'Advertising Design', 'Sound Engineering',
                'Fashion Merchandising', 'Visual Effects', 'Web Design Course', 'Studio Art Diploma', 'Crafts Course'
            ]
        },
        'd2d': {
            'general': [
                'ITI Electrician', 'ITI Fitter', 'ITI Welder', 'ITI Computer Operator', 'ITI Mechanic Motor Vehicle',
                'ITI Electronics', 'ITI Plumber', 'ITI Carpenter', 'ITI Painter', 'ITI Machinist',
                'Diploma Civil Engineering', 'Diploma Mechanical Engineering', 'Diploma Electrical Engineering',
                'Diploma Electronics Engineering', 'Diploma Computer Engineering', 'Diploma Chemical Engineering',
                'Diploma Automobile Engineering', 'Diploma Textile Engineering', 'Diploma Mining Engineering',
                'Diploma Metallurgy', 'Diploma Architecture', 'Diploma Interior Design', 'Diploma Fashion Design',
                'Diploma Hotel Management', 'Diploma Catering Technology', 'Diploma Event Management',
                'Diploma Photography', 'Diploma Animation', 'Diploma Graphic Design', 'Diploma Web Design',
                'Diploma Digital Marketing', 'Diploma Journalism', 'Diploma Mass Communication', 'Diploma Acting',
                'Diploma Music', 'Diploma Dance', 'Diploma Fine Arts', 'Diploma Sculpture', 'Diploma Painting',
                'Certificate Beautician', 'Certificate Hair Styling', 'Certificate Makeup Artist', 'Certificate Tailoring',
                'Certificate Embroidery', 'Certificate Cooking', 'Certificate Baking', 'Certificate Driving',
                'Certificate Security Guard', 'Certificate First Aid'
            ]
        },
        'army': {
            'general': [
                'NCC Certificate', 'Army Technical Entry', 'Navy Technical Entry', 'Air Force Technical Entry',
                'Soldier General Duty', 'Soldier Technical', 'Soldier Clerk', 'Soldier Tradesman',
                'Indian Coast Guard', 'BSF Constable', 'CRPF Constable', 'CISF Constable', 'Police Constable',
                'Home Guard', 'Fire Service', 'Disaster Management', 'Para Military Forces', 'Intelligence Bureau',
                'RAW Training', 'Military Police', 'NDA Preparation', 'CDS Preparation', 'AFCAT Coaching',
                'Air Force Group X', 'Air Force Group Y', 'Navy SSR', 'Navy MR', 'Army Nursing Assistant',
                'Physical Training Instructor', 'Security Guard Training', 'K9 Handling Course', 'Border Security Training',
                'Defence Driving Course', 'Armament Technician', 'Radar Technician', 'Aviation Hospitality',
                'Ship Crew Training', 'Para Troops Training', 'Military Logistics', 'Field Engineering',
                'Military Communications', 'Electronic Warfare Course', 'Drone Operations', 'Cyber Security Operations',
                'Flight Operations Support', 'Aircraft Maintenance', 'Storekeeper Technical', 'Cookery for Defence',
                'Weapon Technician', 'Civil Defence Course', 'Military Band Training'
            ]
        }
    },
    '12th': {
        'science': {
            'maths': [
                'B.Tech Computer Science', 'B.Tech Information Technology', 'B.Tech Cybersecurity', 
                'B.Tech Artificial Intelligence', 'B.Tech Data Science', 'B.Tech Mechanical Engineering',
                'B.Tech Civil Engineering', 'B.Tech Electrical Engineering', 'B.Tech Electronics',
                'B.Tech Aerospace', 'B.Tech Chemical Engineering', 'B.Tech Petroleum Engineering',
                'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Statistics',
                'BCA', 'B.Sc Computer Science', 'B.Sc IT', 'Architecture', 'Naval Architecture'
            ],
            'biology': [
                'MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'Veterinary Science', 'Pharmacy', 
                'B.Sc Nursing', 'Physiotherapy', 'Occupational Therapy', 'B.Sc Biology',
                'B.Sc Biotechnology', 'B.Sc Microbiology', 'B.Sc Biochemistry', 'B.Sc Genetics',
                'B.Sc Environmental Science', 'B.Sc Forensic Science', 'B.Sc Agriculture',
                'B.Sc Horticulture', 'B.Sc Forestry', 'Food Technology', 'Nutrition & Dietetics'
            ]
        },
        'commerce': {
            'general': [
                'B.Com', 'B.Com Honours', 'BBA', 'BMS', 'BBM', 'Chartered Accountancy',
                'Company Secretary', 'Cost Management Accountant', 'B.Com Banking & Insurance',
                'B.Com Computer Application', 'BFM', 'International Business', 'E-Commerce',
                'Digital Marketing', 'Financial Markets', 'Actuarial Science', 'Economics Honours'
            ]
        },
        'arts': {
            'general': [
                'BA English', 'BA Hindi', 'BA History', 'BA Geography', 'BA Political Science',
                'BA Psychology', 'BA Sociology', 'BA Philosophy', 'BA Economics', 'BFA Fine Arts',
                'Mass Communication', 'Journalism', 'BA LLB', 'BBA LLB', 'Hotel Management',
                'Event Management', 'Fashion Design', 'Interior Design', 'Graphic Design',
                'Animation & VFX', 'Film Making', 'Music', 'Dance', 'Theatre Arts'
            ]
        },
        'army': [
            'NDA (National Defence Academy)', 'CDS (Combined Defence Services)', 'AFCAT (Air Force)',
            'Indian Military Academy', 'Naval Academy', 'Air Force Academy', 'Officers Training Academy',
            'Technical Graduate Course', 'Short Service Commission', 'Permanent Commission',
            'Army Medical Corps', 'Army Engineering Corps', 'Army Signal Corps', 'Army Intelligence Corps'
        ]
    }
};

// Sound effects
const clickSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
clickSound.volume = 0.1;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async function() {
    initTheme();
    await loadData();
    initializeEventListeners();
    startTypingAnimation();

    // Check for URL parameters to pre-select a stage or perform a search
    const urlParams = new URLSearchParams(window.location.search);
    const stage = urlParams.get('stage');
    if (stage && document.getElementById('stageSelection')) {
        selectStage(stage);
    }

    const searchQuery = urlParams.get('search');
    if (searchQuery && document.getElementById('courseGrid')) {
        handleSearchQuery(searchQuery);
    }

    updateSavedCoursesDisplay();
});

// --- DATA LOADING ---
async function loadData() {
    // Show loader if you have one
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        appState.coursesData = data.courses;
        appState.collegesData = data.colleges;
    } catch (error) {
        console.error('Error loading data:', error);
        appState.coursesData = [];
        appState.collegesData = [];
    }
    // Hide loader
}

// --- EVENT LISTENERS ---
function initializeEventListeners() {
    // Home page search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        document.getElementById('searchBtn')?.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Event Delegation for dynamic content
    document.body.addEventListener('click', (e) => {
        const stageBtn = e.target.closest('.btn-stage');
        if (stageBtn) {
            playClickSound();
            selectStage(stageBtn.dataset.stage);
            return;
        }

        const streamCard = e.target.closest('.stream-card[data-stream]');
        if (streamCard) {
            playClickSound();
            selectStream(streamCard.dataset.stream);
            return;
        }

        const subBranchCard = e.target.closest('.stream-card[data-sub-branch]');
        if (subBranchCard) {
            playClickSound();
            selectSubBranch(subBranchCard.dataset.subBranch);
            return;
        }

        const closeModalBtn = e.target.closest('.close-modal');
        if (closeModalBtn) {
            closeModal();
            return;
        }
    });

    // Specific listeners
    document.getElementById('courseSearch')?.addEventListener('input', filterCourses);
    document.getElementById('durationFilter')?.addEventListener('change', filterCourses);
    document.getElementById('feesFilter')?.addEventListener('change', filterCourses);
    document.getElementById('findColleges')?.addEventListener('click', findNearestColleges);
    document.getElementById('contactForm')?.addEventListener('submit', handleContactForm);

    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
}

// --- UI HELPER FUNCTIONS ---
function updateActiveUI(selector, dataKey, activeValue) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.toggle('active', el.dataset[dataKey] === activeValue);
    });
}

function createElement(tag, { className, textContent, innerHTML, ...attributes } = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    if (innerHTML) element.innerHTML = innerHTML;

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}

function playClickSound() {
    if (clickSound && !document.body.classList.contains('muted')) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.classList.remove('modal-open');
}

// --- THEME TOGGLE ---
function initTheme() {
    document.documentElement.setAttribute('data-theme', appState.currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    appState.currentTheme = appState.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', appState.currentTheme);
    initTheme();
}

function updateThemeIcon() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = appState.currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// --- TYPING ANIMATION (Home Page) ---
const typingTexts = ['Career Path', 'Dream Job', 'Future Success', 'Perfect Course'];
let currentTextIndex = 0;

function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    typeText(typingElement);
}

function typeText(element) {
    const text = typingTexts[currentTextIndex];
    let i = 0;
    element.textContent = '';
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => eraseText(element), 2000);
        }
    }, 100);
}

function eraseText(element) {
    const text = element.textContent;
    let i = text.length;
    const eraseInterval = setInterval(() => {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
        } else {
            clearInterval(eraseInterval);
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(() => typeText(element), 500);
        }
    }, 50);
}

// --- NAVIGATION & SEARCH ---
function navigateToPathways(stage) {
    playClickSound();
    window.location.href = `pathways.html?stage=${stage}`;
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        playClickSound();
        window.location.href = `pathways.html?search=${encodeURIComponent(query)}`;
    }
}

function normalizeIdentifier(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getAllPathwayCourses() {
    const courses = [];
    Object.entries(pathwayTree).forEach(([stage, streams]) => {
        Object.entries(streams).forEach(([stream, subBranches]) => {
            Object.entries(subBranches).forEach(([subBranch, names]) => {
                if (Array.isArray(names)) {
                    names.forEach(name => {
                        courses.push({ name, stage, stream, subBranch });
                    });
                }
            });
        });
    });
    return courses;
}

function createGenericCourseObject(name, stage, stream) {
    return {
        id: normalizeIdentifier(name),
        name,
        stream,
        stage,
        courseLevel: stage === '10th' ? 'Diploma / Certificate' : 'UG Degree',
        duration: '3-4',
        eligibility: `${stage} pass`,
        fees: '₹30,000 - ₹1,50,000',
        description: `Professional course in ${name}`,
        image: '📚'
    };
}

function findCourseByIdentifier(identifier) {
    const normalizedId = normalizeIdentifier(identifier);
    const exactDataMatch = appState.coursesData.find(course => course.id === normalizedId || course.name.toLowerCase() === identifier.toLowerCase());
    if (exactDataMatch) return exactDataMatch;

    const pathwayEntry = getAllPathwayCourses().find(course => normalizeIdentifier(course.name) === normalizedId || course.name.toLowerCase() === identifier.toLowerCase());
    if (pathwayEntry) return createGenericCourseObject(pathwayEntry.name, pathwayEntry.stage, pathwayEntry.stream);

    return null;
}

function handleSearchQuery(query) {
    const allCourses = appState.coursesData;
    const queryLower = query.toLowerCase();

    const dataMatches = allCourses.filter(course =>
        course.name.toLowerCase().includes(queryLower) ||
        course.description.toLowerCase().includes(queryLower) ||
        course.eligibility?.toLowerCase().includes(queryLower) ||
        course.entranceExam?.toLowerCase().includes(queryLower) ||
        course.expectedCutoff?.toLowerCase().includes(queryLower) ||
        (course.careerOptions && course.careerOptions.join(' ').toLowerCase().includes(queryLower)) ||
        (course.topRecruiters && course.topRecruiters.join(' ').toLowerCase().includes(queryLower))
    );

    const pathwayMatches = getAllPathwayCourses()
        .filter(pathwayCourse => !allCourses.some(course => course.name === pathwayCourse.name))
        .filter(pathwayCourse => pathwayCourse.name.toLowerCase().includes(queryLower))
        .map(pathwayCourse => createGenericCourseObject(pathwayCourse.name, pathwayCourse.stage, pathwayCourse.stream));

    const matches = [...dataMatches, ...pathwayMatches];

    const container = document.getElementById('coursesContainer');
    const grid = document.getElementById('courseGrid');
    const header = grid.querySelector('h2');

    if (matches.length > 0) {
        header.textContent = `Search Results for "${query}"`;
        container.innerHTML = '';
        matches.forEach((course, index) => {
            const card = createCourseCard(course, { detailed: true });
            card.style.setProperty('--delay-index', index);
            card.classList.add('fade-in');
            container.appendChild(card);
        });
    } else {
        header.textContent = `No Results for "${query}"`;
        container.innerHTML = '<p class="no-results">Try searching for a different course or browse the pathways below.</p>';
    }

    document.getElementById('stageSelection')?.classList.add('hidden');
    document.getElementById('streamSelection')?.classList.add('hidden');
    grid.classList.remove('hidden');
    grid.scrollIntoView({ behavior: 'smooth' });
}

// --- PATHWAY LOGIC ---
function selectStage(stage) {
    appState.currentStage = stage;
    updateActiveUI('.btn-stage', 'stage', stage);
    displayAvailableStreams();
    document.getElementById('streamSelection').classList.remove('hidden');
    document.getElementById('subBranchSelection').classList.add('hidden');
    document.getElementById('courseGrid').classList.add('hidden');
    document.getElementById('streamSelection').scrollIntoView({ behavior: 'smooth' });
}

function displayAvailableStreams() {
    const container = document.getElementById('streamCards');
    if (!container) return;

    const streamConfig = {
        science: { icon: '🔬', title: 'Science', description: 'For careers in Engineering, Medicine, and Research.' },
        commerce: { icon: '💼', title: 'Commerce', description: 'For careers in Business, Finance, and Accounting.' },
        arts: { icon: '🎨', title: 'Arts', description: 'For creative, social, and media-focused careers.' },
        d2d: { icon: '🎓', title: 'Diploma / D2D', description: 'Job-ready diploma and certification paths after 10th.' },
        army: { icon: '🪖', title: 'Defence & Army', description: 'Defence training, NCC and paramilitary options after 10th.' }
    };

    let availableStreams = Object.keys(pathwayTree[appState.currentStage] || {});
    
    // Filter streams based on stage
    if (appState.currentStage === '10th') {
        availableStreams = ['d2d', 'army'];
    }
    // For 12th, show all available streams
    container.innerHTML = '';

    availableStreams.forEach(stream => {
        const config = streamConfig[stream] || { icon: '📚', title: stream.charAt(0).toUpperCase() + stream.slice(1), description: 'Explore this stream.' };
        const card = createElement('div', {
            className: 'stream-card',
            'data-stream': stream,
            innerHTML: `<div class="stream-icon">${config.icon}</div><h3>${config.title}</h3><p>${config.description}</p>`
        });
        container.appendChild(card);
    });
}

function selectStream(stream) {
    appState.currentStream = stream;
    updateActiveUI('.stream-card[data-stream]', 'stream', stream);
    displaySubBranches();
    document.getElementById('subBranchSelection').classList.remove('hidden');
    document.getElementById('subBranchSelection').scrollIntoView({ behavior: 'smooth' });
}

function displaySubBranches() {
    const container = document.getElementById('subBranchCards');
    if (!container) return;
    const subBranches = pathwayTree[appState.currentStage]?.[appState.currentStream] || {};
    container.innerHTML = '';

    Object.keys(subBranches).forEach(subBranch => {
        let icon = '📚';
        let title = subBranch.charAt(0).toUpperCase() + subBranch.slice(1);
        let description = `${subBranches[subBranch].length} courses available`;

        if (appState.currentStream === 'science' && appState.currentStage === '12th') {
            if (subBranch === 'maths') {
                icon = '🔢';
                title = 'PCM (Physics, Chemistry, Maths)';
                description = 'Engineering, Technology, Research';
            } else if (subBranch === 'biology') {
                icon = '🧬';
                title = 'PCB (Physics, Chemistry, Biology)';
                description = 'Medical, Life Sciences, Research';
            }
        }

        const card = createElement('div', {
            className: 'stream-card',
            'data-sub-branch': subBranch,
            innerHTML: `<div class="stream-icon">${icon}</div><h3>${title}</h3><p>${description}</p>`
        });
        container.appendChild(card);
    });
}

function selectSubBranch(subBranch) {
    appState.currentSubBranch = subBranch;
    updateActiveUI('.stream-card[data-sub-branch]', 'subBranch', subBranch);
    displayCourses();
    document.getElementById('courseGrid').classList.remove('hidden');
    document.getElementById('courseGrid').scrollIntoView({ behavior: 'smooth' });
}

// --- COURSE DISPLAY & ACTIONS ---
function displayCourses() {
    const container = document.getElementById('coursesContainer');
    if (!container) return;
    const availableCourses = pathwayTree[appState.currentStage]?.[appState.currentStream]?.[appState.currentSubBranch] || [];
    container.innerHTML = '';

    availableCourses.forEach(courseName => {
        const course = appState.coursesData.find(c => c.name === courseName) || createGenericCourseObject(courseName, appState.currentStage, appState.currentStream);
        const courseCard = createCourseCard(course);
        container.appendChild(courseCard);
    });

    // Add fade-in animation
    setTimeout(() => {
        container.querySelectorAll('.course-card').forEach((card, index) => {
            card.style.setProperty('--delay-index', index);
            card.classList.add('fade-in');
        });
    }, 100);
}

function createCourseCard(course, options = {}) {
    const { detailed = false } = options;
    const card = createElement('div', { className: `course-card${detailed ? ' detailed-card' : ''}` });
    const courseLevel = course.courseLevel ? `<span class="course-tag">${course.courseLevel}</span>` : '';
    const descriptionText = detailed ? course.description : `${course.description.substring(0, 70)}...`;

    card.innerHTML = `
        <div class="course-icon">${course.image || '📚'}</div>
        <div class="course-card-content">
            <h3>${course.name}</h3>
            <p>${descriptionText}</p>
            <div class="course-meta">
                <span>Duration: ${course.duration} years</span>
                ${courseLevel}
            </div>
            ${detailed ? `
            <div class="course-extra-details">
                <p><strong>Eligibility:</strong> ${course.eligibility || 'N/A'}</p>
                <p><strong>Entrance Exam:</strong> ${course.entranceExam || 'N/A'}</p>
                <p><strong>Expected Cutoff:</strong> ${course.expectedCutoff || 'N/A'}</p>
                <p><strong>Top Recruiters:</strong> ${course.topRecruiters?.slice(0, 4).join(', ') || 'N/A'}</p>
            </div>
            ` : ''}
        </div>
    `;

    const actions = createElement('div', { className: 'course-actions' });
    const detailsButton = createElement('button', {
        className: 'btn btn-primary btn-small',
        textContent: 'View Details'
    });

    detailsButton.addEventListener('click', (e) => {
        e.preventDefault();
        showCourseDetails(course.id || course.name);
    });
    actions.appendChild(detailsButton);
    card.appendChild(actions);

    return card;
}

function showCourseDetails(courseId) {
    playClickSound();
    const course = findCourseByIdentifier(courseId);
    if (!course) {
        console.error("Course not found:", courseId);
        return;
    }

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; // Clear previous content

    // Build detailed content
    modalContent.innerHTML = `
        <h3>${course.name}</h3>
        <span class="course-tag modal-tag">${course.courseLevel || 'General'}</span>
        <div class="course-details">
            <div class="detail-section">
                <h4>Course Overview</h4>
                <p>${course.description}</p>
            </div>
            <div class="detail-section">
                <h4>Key Information</h4>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Eligibility:</strong> ${course.eligibility}</p>
                <p><strong>Entrance Exam:</strong> ${course.entranceExam || 'NEET / Relevant State Exam'}</p>
                <p><strong>Cutoff:</strong> ${course.expectedCutoff || 'Varies by college'}</p>
                <p><strong>Fees Range:</strong> ${course.fees}</p>
                <p><strong>Average Salary:</strong> ${course.averageSalary || 'N/A'}</p>
                <p><strong>Specializations:</strong> ${course.specializations?.join(', ') || 'General'}</p>
            </div>
            <div class="detail-section">
                <h4>Career Prospects</h4>
                <p><strong>Top Roles:</strong></p>
                <div class="career-tags">
                    ${course.careerOptions?.map(opt => `<span class="career-tag">${opt}</span>`).join('') || '<p>N/A</p>'}
                </div>
                <p style="margin-top: 1rem;"><strong>Top Recruiters:</strong></p>
                <div class="recruiter-list">
                    ${course.topRecruiters?.join(', ') || 'N/A'}
                </div>
            </div>
            <div class="detail-section college-section">
                <h4>Top Colleges</h4>
                <div class="college-table">
                    <div class="college-table-header">
                        <div>College Name</div>
                        <div>Fees (Approx.)</div>
                        <div>Placement</div>
                    </div>
                    ${course.colleges?.slice(0, 10).map(college => `
                        <div class="college-table-row">
                            <div><strong>${college.name}</strong>, ${college.city}</div>
                            <div>${college.fees}</div>
                            <div>${college.placementRate || 'N/A'}</div>
                        </div>
                    `).join('') || '<p>No top colleges listed.</p>'}
                </div>
            </div>
            ${course.video ? `
            <div class="detail-section video-section">
                <h4>Learn More</h4>
                <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe src="${course.video}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                </div>
            </div>
            ` : ''}
            <div class="detail-section">
                <h4>Helpful Resources</h4>
                <div class="reference-links">
                    ${course.references?.map(ref => `<a href="${ref}" target="_blank" class="btn btn-small btn-secondary">Reference Link</a>`).join('') || '<p>N/A</p>'}
                </div>
            </div>
            <div class="course-actions"></div>
        </div>
    `;

    // Add buttons with event listeners for security
    const actionsContainer = modalContent.querySelector('.course-actions');
    const collegeFinderBtn = createElement('button', { className: 'btn btn-secondary', textContent: 'Find Nearest Colleges' });
    collegeFinderBtn.onclick = () => showCollegeFinder(courseId);
    modalContent.querySelector('.college-section').appendChild(collegeFinderBtn);

    const saveBtn = createElement('button', {
        className: 'btn btn-primary',
        textContent: appState.savedCourses.includes(courseId) ? 'Remove from Saved' : 'Save Course'
    });
    saveBtn.onclick = () => toggleSaveCourse(courseId);

    const brochureBtn = createElement('button', {
        className: 'btn btn-secondary',
        textContent: 'Download Brochure'
    });
    brochureBtn.onclick = () => downloadBrochure(courseId);

    actionsContainer.append(saveBtn, brochureBtn);
    document.body.classList.add('modal-open');
    document.getElementById('courseModal').classList.remove('hidden');
}

function toggleSaveCourse(courseId) {
    playClickSound();
    let savedCourses = appState.savedCourses;
    const courseIndex = savedCourses.indexOf(courseId);

    if (courseIndex > -1) {
        savedCourses.splice(courseIndex, 1);
    } else {
        savedCourses.push(courseId);
    }

    localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
    updateSavedCoursesDisplay();

    // Update button text in modal if open
    const modal = document.getElementById('courseModal');
    if (!modal.classList.contains('hidden')) {
        const saveBtn = modal.querySelector('.course-actions .btn-primary');
        if (saveBtn) {
            saveBtn.textContent = appState.savedCourses.includes(courseId) ? 'Remove from Saved' : 'Save Course';
        }
    }
}

function updateSavedCoursesDisplay() {
    const container = document.getElementById('savedCoursesContainer');
    const section = document.getElementById('savedCourses');
    if (!container || !section) return;

    const savedCourses = appState.savedCourses;
    if (savedCourses.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    container.innerHTML = ''; // Clear existing

    savedCourses.forEach(courseId => {
        const course = appState.coursesData.find(c => c.id === courseId);
        if (course) {
            const card = createCourseCard(course);
            container.appendChild(card);
        }
    });
}

function downloadBrochure(courseId) {
    playClickSound();
    const course = findCourseByIdentifier(courseId);
    if (!course) return;

    const brochureContent = `
STUDENT GUIDE INDIA - COURSE BROCHURE

Course: ${course.name}
Stream: ${course.stream?.toUpperCase() || 'N/A'}
Duration: ${course.duration} years
Eligibility: ${course.eligibility}
Fees Range: ${course.fees}
Average Salary: ${course.averageSalary || 'N/A'}

Description:
${course.description}

Career Options:
${course.careerOptions?.map(c => `• ${c}`).join('\n') || 'N/A'}

Top Recruiters:
${course.topRecruiters?.map(r => `• ${r}`).join('\n') || 'N/A'}

Top Colleges:
${course.colleges?.map(college => `• ${college.name}, ${college.city} | Fees: ${college.fees} | Placement: ${college.placementRate || 'N/A'}`).join('\n') || 'N/A'}

For more information, visit our website.
Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([brochureContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.name.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// --- COLLEGE FINDER ---
function showCollegeFinder(courseId) {
    document.getElementById('courseModal').classList.add('hidden');
    const collegeModal = document.getElementById('collegeModal');
    collegeModal.classList.remove('hidden');
    collegeModal.dataset.courseId = courseId;
}

function findNearestColleges() {
    const city = document.getElementById('cityInput').value.trim().toLowerCase();
    const courseId = document.getElementById('collegeModal').dataset.courseId;

    if (!city) {
        alert('Please enter your city or pincode');
        return;
    }
    playClickSound();

    const relevantColleges = appState.collegesData.filter(college =>
        college.courses.includes(courseId) &&
        (college.city.toLowerCase().includes(city) || college.pincode.includes(city))
    );

    const displayColleges = relevantColleges.length > 0 ?
        relevantColleges :
        appState.collegesData.filter(college => college.courses.includes(courseId));

    const container = document.getElementById('nearestColleges');
    container.innerHTML = `
        <h4>Colleges for your search:</h4>
        ${displayColleges.slice(0, 10).map(college => `
            <div class="college-item">
                <strong>${college.name}</strong> - ${college.city}<br>
                <small>Fees: ${college.fees} | Placement: ${college.placementRate || 'N/A'} | Pincode: ${college.pincode}</small>
            </div>
        `).join('') || '<p>No colleges found for this course and location.</p>'}
    `;
}

// --- MISC FORMS & ACTIONS ---
function handleContactForm(e) {
    e.preventDefault();
    playClickSound();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    alert(`Thank you ${name}! Your message has been received. We'll get back to you soon.`);
    e.target.reset();
}

function joinCommunity() {
    playClickSound();
    alert('Redirecting to Student Community WhatsApp Group...\n\n(This is a demo link)');
}

// --- COURSE FILTERING (Example) ---
function filterCourses() {
    // This is a basic implementation. You can expand it.
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const cards = document.querySelectorAll('#coursesContainer .course-card');

    cards.forEach(card => {
        const courseName = card.querySelector('h3').textContent.toLowerCase();
        const showCard = courseName.includes(searchTerm);
        card.style.display = showCard ? 'block' : 'none';
    });
}