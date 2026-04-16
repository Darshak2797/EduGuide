// --- Application State & Constants ---
const appState = {
    coursesData: [],
    collegesData: [],
    currentStage: '',
    currentStream: '',
    currentSubBranch: '',
    selectedCourse: null,
    savedCourses: JSON.parse(localStorage.getItem('savedCourses')) || [],
};
 
// Tree structure for pathways
const pathwayTree = {
    '10th': {
        'science': {
            'general': ['ITI Courses', 'Diploma in Engineering'],
            'medical': ['ANM', 'GNM']
        },
        'commerce': {
            'general': ['Commerce Diploma']
        },
        'arts': {
            'general': ['Arts Diploma', 'BFA (Fine Arts)']
        }
    },
    '12th': {
        'science': {
            'maths': [
                'B.Tech Computer Science', 'BCA', 'B.Arch', 'B.Tech Mechanical', 'B.Tech Civil', 
                'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics'
            ],
            'biology': [
                'MBBS', 'BDS', 'B.Pharm', 'B.Sc Biology', 'BAMS', 'BHMS', 
                'B.Sc Nursing', 'Physiotherapy'
            ]
        },
        'commerce': {
            'general': [
                'B.Com', 'BBA', 'Chartered Accountancy', 'Company Secretary', 
                'BMS', 'Economics Honours'
            ]
        },
        'arts': {
            'general': [
                'BA English', 'BA History', 'BA Psychology', 'BFA (Fine Arts)', 
                'Mass Communication', 'Journalism', 'Fashion Design', 'BA LLB', 
                'Hotel Management', 'Event Management'
            ]
        }
    }
};

// Sound effects
const clickSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
clickSound.volume = 0.1;

// Initialize app
document.addEventListener('DOMContentLoaded', async function() {
    await loadData();
    initializeEventListeners();
    
    // Check for URL parameters to pre-select a stage or perform a search
    const urlParams = new URLSearchParams(window.location.search);
    const stage = urlParams.get('stage');
    if (stage && document.getElementById('stageSelection')) {
        selectStage(stage);
    }
    
    // Handle search query from URL
    const searchQuery = urlParams.get('search');
    if (searchQuery && document.getElementById('courseGrid')) {
        handleSearchQuery(searchQuery);
    }
    
    // Show saved courses if any
    updateSavedCoursesDisplay();
});

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        appState.coursesData = data.courses;
        appState.collegesData = data.colleges;
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback data if JSON fails to load
        appState.coursesData = [];
        appState.collegesData = [];
    }
}

// --- Event Listeners Initialization (using Event Delegation) ---
function initializeEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        document.getElementById('searchBtn')?.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Use event delegation for dynamic content
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

    // Specific listeners that don't benefit from delegation
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

// --- UI Helper Functions ---
function updateActiveUI(selector, dataKey, activeValue) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.toggle('active', el.dataset[dataKey] === activeValue);
    });
}

function createElement(tag, { className, textContent, innerHTML, ...attributes } = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    if (innerHTML) element.innerHTML = innerHTML; // Use with caution

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}


// Navigation functions
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

// Stage selection
function selectStage(stage) {
    appState.currentStage = stage;
    updateActiveUI('.btn-stage', 'stage', stage);

    // Show stream selection
    document.getElementById('streamSelection').classList.remove('hidden');
    document.getElementById('courseGrid').classList.add('hidden');
    
    // Scroll to stream selection
    document.getElementById('streamSelection').scrollIntoView({ behavior: 'smooth' });
}

// Stream selection
function selectStream(stream) {
    appState.currentStream = stream;
    updateActiveUI('.stream-card[data-stream]', 'stream', stream);

    // Show sub-branches
    displaySubBranches();
    document.getElementById('subBranchSelection').classList.remove('hidden');
    
    // Scroll to sub-branches
    document.getElementById('subBranchSelection').scrollIntoView({ behavior: 'smooth' });
}

// Display sub-branches
function displaySubBranches() {
    const container = document.getElementById('subBranchCards');
    const subBranches = pathwayTree[appState.currentStage][appState.currentStream];
    
    container.innerHTML = '';
    
    Object.keys(subBranches).forEach(subBranch => {
        let icon = '📚';
        let title = subBranch.charAt(0).toUpperCase() + subBranch.slice(1);
        let description = '';
        
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
        } else {
            description = `${subBranches[subBranch].length} courses available`;
        }
        
        const card = createElement('div', {
            className: 'stream-card',
            'data-sub-branch': subBranch,
            innerHTML: `
                <div class="stream-icon">${icon}</div>
                <h3>${title}</h3>
                <p>${description}</p>
            `
        });
        container.appendChild(card);
    });
}

// Sub-branch selection
function selectSubBranch(subBranch) {
    appState.currentSubBranch = subBranch;
    updateActiveUI('.stream-card[data-sub-branch]', 'subBranch', subBranch);
    
    // Show courses
    displayCourses();
    document.getElementById('courseGrid').classList.remove('hidden');
    
    // Scroll to courses
    document.getElementById('courseGrid').scrollIntoView({ behavior: 'smooth' });
}

// Display courses
function displayCourses() {
    const container = document.getElementById('coursesContainer');
    const availableCourses = pathwayTree[appState.currentStage][appState.currentStream][appState.currentSubBranch];
    
    container.innerHTML = '';
    
    availableCourses.forEach(courseName => {
        const course = appState.coursesData.find(c => c.name === courseName) || {
            id: courseName.toLowerCase().replace(/\s+/g, '-'),
            name: courseName,
            stream: appState.currentStream,
            stage: appState.currentStage,
            duration: '3-4',
            eligibility: `${appState.currentStage} pass`,
            fees: '₹50,000 - ₹2,00,000',
            description: `Professional course in ${courseName}`,
            image: '📚'
        };
        
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

// Create course card
function createCourseCard(course) {
    const card = createElement('div', { className: 'course-card' });

    const image = createElement('div', { className: 'course-image', textContent: course.image });
    const title = createElement('h3', { textContent: course.name });
    const description = createElement('p', { textContent: course.description });
    const meta = createElement('div', {
        className: 'course-meta',
        innerHTML: `<span>Duration: ${course.duration} years</span><span>${course.fees}</span>`
    });
    const actions = createElement('div', { className: 'course-actions' });
    const detailsButton = createElement('button', {
        className: 'btn btn-primary btn-small',
        textContent: 'View Full Details'
    });

    // Use addEventListener instead of inline onclick and fix function name
    detailsButton.addEventListener('click', (e) => {
        e.preventDefault();
        showCourseDetails(course.id || course.name);
    });

    actions.appendChild(detailsButton);
    card.append(image, title, description, meta, actions);

    return card;
}

// Show course details in modal
function showCourseDetails(courseId) {
    playClickSound();
    const course = appState.coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const modalContent = document.getElementById('modalContent');
    // Clear previous content safely
    modalContent.innerHTML = '';

    // Build content programmatically to prevent XSS
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
                <p><strong>Duration:</strong> ${course.duration} years</p>
                <p><strong>Eligibility:</strong> ${course.eligibility}</p>
                <p><strong>Fees Range:</strong> ${course.fees}</p>
                <p><strong>Average Salary:</strong> ${course.averageSalary || 'N/A'}</p>
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
            
            <div class="course-actions">
                <!-- Buttons will be handled by event listeners -->
            </div>
        </div>
    `;

    // Add buttons with event listeners
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

// Toggle save course
function toggleSaveCourse(courseId) {
    playClickSound();
    let savedCourses = appState.savedCourses;
    if (savedCourses.includes(courseId)) {
        savedCourses = savedCourses.filter(id => id !== courseId);
    } else {
        savedCourses.push(courseId);
    }
    
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
    appState.savedCourses = savedCourses;
    updateSavedCoursesDisplay();
    
    // Update button text in modal if open
    const modal = document.getElementById('courseModal');
    if (!modal.classList.contains('hidden')) {
        showCourseDetails(courseId);
    }
    
    // No need to re-render all courses, modal update is enough
}

// Update saved courses display
function updateSavedCoursesDisplay() {
    const container = document.getElementById('savedCoursesContainer');
    if (!container) return;

    const savedCourses = appState.savedCourses;
    if (savedCourses.length === 0) {
        document.getElementById('savedCourses').classList.add('hidden');
        return;
    }
    
    document.getElementById('savedCourses').classList.remove('hidden');
    container.innerHTML = ''; // Clear existing
    
    savedCourses.forEach(courseId => {
        const course = coursesData.find(c => c.id === courseId);
        if (course) {
            const card = createCourseCard(course);
            container.appendChild(card);
        }
    });
}

// Show college finder modal
function showCollegeFinder(courseId) {
    document.getElementById('courseModal').classList.add('hidden');
    document.getElementById('collegeModal').classList.remove('hidden');
    document.getElementById('collegeModal').dataset.courseId = courseId;
}

// Find nearest colleges
function findNearestColleges() {
    const city = document.getElementById('cityInput').value.trim().toLowerCase();
    const courseId = document.getElementById('collegeModal').dataset.courseId;
    
    if (!city) {
        alert('Please enter your city or pincode');
        return;
    }
    
    playClickSound();
    
    // Filter colleges that offer the course and match city
    const relevantColleges = appState.collegesData.filter(college => 
        college.courses.includes(courseId) && 
        (college.city.toLowerCase().includes(city) || 
         college.pincode.includes(city))
    );
    
    // If no exact match, show all colleges for the course
    const displayColleges = relevantColleges.length > 0 ? 
        relevantColleges : 
        appState.collegesData.filter(college => college.courses.includes(courseId));
    
    const container = document.getElementById('nearestColleges');
    container.innerHTML = `
        <h4>Colleges for your search:</h4>
        ${displayColleges.slice(0, 3).map(college => `
            <div class="college-item">
                <strong>${college.name}</strong> - ${college.city}<br>
                <small>Fees: ${college.fees} | Pincode: ${college.pincode}</small>
            </div>
        `).join('') || '<p>No colleges found for this course.</p>'}
    `;
}

// Download brochure (generates a simple PDF-like content)
function downloadBrochure(courseId) {
    playClickSound();
    const course = appState.coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const brochureContent = `
STUDENT GUIDE INDIA - COURSE BROCHURE

Course: ${course.name}
Stream: ${course.stream.toUpperCase()}
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

For more information, visit: Student Guide India
Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.name.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Filter courses
function filterCourses() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const durationFilter = document.getElementById('durationFilter').value;
    const feesFilter = document.getElementById('feesFilter').value;
    
    const cards = document.querySelectorAll('.course-card');
    
    cards.forEach(card => {
        const courseName = card.querySelector('h3').textContent.toLowerCase();
        const courseDuration = card.querySelector('.course-meta span').textContent;
        const courseFees = card.querySelector('.course-meta span:last-child').textContent;
        
        let showCard = true;
        
        // Search filter
        if (searchTerm && !courseName.includes(searchTerm)) {
            showCard = false;
        }
        
        // Duration filter
        if (durationFilter && !courseDuration.includes(durationFilter)) {
            showCard = false;
        }
        
        // Fees filter
        if (feesFilter) {
            const fees = courseFees.replace(/[₹,]/g, '');
            const feeAmount = parseInt(fees.split('-')[0]) || 0;
            
            if (feesFilter === 'low' && feeAmount >= 50000) showCard = false;
            if (feesFilter === 'medium' && (feeAmount < 50000 || feeAmount > 200000)) showCard = false;
            if (feesFilter === 'high' && feeAmount <= 200000) showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Close modal
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.classList.remove('modal-open');
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    playClickSound();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
    e.target.reset();
}

// Join community
function joinCommunity() {
    playClickSound();
    alert('Redirecting to Student Community WhatsApp Group...\n\nThis is a demo link. In a real website, this would open the actual community group.');
}

// Play click sound
function playClickSound() {
    if (clickSound && !document.body.classList.contains('muted')) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {
            // Ignore audio play errors
        });
    }
}

// Mute toggle (can be added to UI if needed)
function toggleMute() {
    document.body.classList.toggle('muted');
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Select course for college selection
function selectCourseForCollege(courseId) {
    playClickSound();
    const course = appState.coursesData.find(c => c.id === courseId) || {
        id: courseId,
        name: courseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        colleges: [
            {name: 'Government College', city: 'Mumbai', fees: '₹50,000'},
            {name: 'Private University', city: 'Delhi', fees: '₹1,50,000'},
            {name: 'State University', city: 'Bangalore', fees: '₹75,000'}
        ]
    };
    
    appState.selectedCourse = course;
    
    // Update form
    document.getElementById('selectedCourse').value = course.name;
    
    // Populate colleges
    const collegeSelect = document.getElementById('collegeSelect');
    collegeSelect.innerHTML = '<option value="">Select a college</option>';
    
    course.colleges?.forEach(college => {
        const option = document.createElement('option');
        option.value = college.name;
        option.textContent = `${college.name} - ${college.city} (${college.fees})`;
        collegeSelect.appendChild(option);
    });
    
    // Show college selection
    document.getElementById('collegeSelection').classList.remove('hidden');
    document.getElementById('collegeSelection').scrollIntoView({ behavior: 'smooth' });
}

// Submit selection
function submitSelection() {
    const course = document.getElementById('selectedCourse').value;
    const college = document.getElementById('collegeSelect').value;
    const area = document.getElementById('areaSelect').value;
    
    if (!course || !college || !area) {
        alert('Please fill all fields before submitting');
        return;
    }
    
    playClickSound();
    
    // Show success message
    const result = `
Your Selection Summary:

Stage: After ${appState.currentStage}
Stream: ${appState.currentStream.charAt(0).toUpperCase() + appState.currentStream.slice(1)}
Specialization: ${appState.currentSubBranch.charAt(0).toUpperCase() + appState.currentSubBranch.slice(1)}
Course: ${course}
College: ${college}
Preferred Area: ${area.charAt(0).toUpperCase() + area.slice(1)}

Thank you for using Student Guide India!
Your selection has been saved.`;
    
    alert(result);
    
    // Save to localStorage
    const selection = {
        stage: appState.currentStage,
        stream: appState.currentStream,
        subBranch: appState.currentSubBranch,
        course: course,
        college: college,
        area: area,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('lastSelection', JSON.stringify(selection));
    
    // Reset form
    resetPathwayForm();
}

// Reset pathway form
function resetPathwayForm() {
    appState.currentStage = '';
    appState.currentStream = '';
    appState.currentSubBranch = '';
    appState.selectedCourse = null;
    
    // Hide all steps except first
    document.getElementById('stageSelection').classList.remove('hidden');
    document.getElementById('streamSelection').classList.add('hidden');
    document.getElementById('subBranchSelection').classList.add('hidden');
    document.getElementById('courseGrid').classList.add('hidden');
    document.getElementById('collegeSelection').classList.add('hidden');
    
    // Remove active classes
    document.querySelectorAll('.btn-stage, .stream-card').forEach(el => {
        el.classList.remove('active');
    });
    
    // Scroll to top
    document.getElementById('stageSelection').scrollIntoView({ behavior: 'smooth' });
}

// Handle search query from URL
function handleSearchQuery(query) {
    const allCourses = appState.coursesData;
    const queryLower = query.toLowerCase();
    const matches = allCourses.filter(course =>
        course.name.toLowerCase().includes(queryLower) ||
        course.description.toLowerCase().includes(queryLower) ||
        (course.careerOptions && course.careerOptions.join(' ').toLowerCase().includes(queryLower))
    );

    const container = document.getElementById('coursesContainer');
    const grid = document.getElementById('courseGrid');
    const header = grid.querySelector('h2');

    if (matches.length > 0) {
        header.textContent = `Search Results for "${query}"`;
        container.innerHTML = '';
        matches.forEach((course, index) => {
            const card = createCourseCard(course);
            // Add animation properties for search results
            card.style.setProperty('--delay-index', index);
            card.classList.add('fade-in');
            container.appendChild(card);
        });
    } else {
        header.textContent = `No Results for "${query}"`;
        container.innerHTML = '<p class="no-results">Try searching for a different course or browse the pathways below.</p>';
    }

    document.getElementById('stageSelection').classList.add('hidden');
    document.getElementById('streamSelection').classList.add('hidden');
    grid.classList.remove('hidden');
    grid.scrollIntoView({ behavior: 'smooth' });
}