// Load comprehensive course data
let comprehensiveData = {};

async function loadComprehensiveData() {
    try {
        const response = await fetch('comprehensive-data.json');
        comprehensiveData = await response.json();
    } catch (error) {
        console.error('Error loading comprehensive data:', error);
    }
}

// Show detailed course information
function showDetailedCourseInfo(courseName) {
    playClickSound();
    
    const courseKey = courseName.replace(/\s+/g, ' ').trim();
    const courseInfo = comprehensiveData.courseDetails[courseKey];
    
    if (!courseInfo) {
        // Show basic info for courses not in detailed database
        showBasicCourseInfo(courseName);
        return;
    }
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${courseInfo.fullName}</h2>
        
        <div class="course-detail-grid">
            <div class="detail-card">
                <h4>📚 Course Overview</h4>
                <p><strong>Duration:</strong> ${courseInfo.duration}</p>
                <p><strong>Eligibility:</strong> ${courseInfo.eligibility}</p>
                <p><strong>Fees Range:</strong> ${courseInfo.fees}</p>
                <p><strong>Description:</strong> ${courseInfo.description}</p>
            </div>
            
            <div class="detail-card">
                <h4>🏆 Top 3 Certificates</h4>
                <ul>
                    ${courseInfo.certificates.map(cert => `<li>${cert}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-card">
                <h4>🏫 Top 3 Colleges</h4>
                <div class="colleges-ranking">
                    ${courseInfo.topColleges.map((college, index) => `
                        <div class="college-rank-item">
                            <span class="rank">#${college.ranking}</span>
                            <div class="college-info">
                                <strong>${college.name}</strong><br>
                                <small>${college.city} | ${college.fees}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-card">
                <h4>💼 Career Options</h4>
                <div class="career-tags">
                    ${courseInfo.careerOptions.map(career => `<span class="career-tag">${career}</span>`).join('')}
                </div>
                <p><strong>Average Salary:</strong> ${courseInfo.averageSalary}</p>
            </div>
        </div>
        
        <div class="action-buttons-modal">
            <button class="btn btn-primary" onclick="proceedToCollegeSelection('${courseName}')">
                Select This Course
            </button>
            <button class="btn btn-secondary" onclick="downloadDetailedBrochure('${courseName}')">
                Download Brochure
            </button>
        </div>
    `;
    
    document.getElementById('courseModal').classList.remove('hidden');
}

// Show basic course info for courses not in detailed database
function showBasicCourseInfo(courseName) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${courseName}</h2>
        
        <div class="course-detail-grid">
            <div class="detail-card">
                <h4>📚 Course Information</h4>
                <p><strong>Course:</strong> ${courseName}</p>
                <p><strong>Duration:</strong> 3-4 years (typical)</p>
                <p><strong>Eligibility:</strong> As per course requirements</p>
                <p><strong>Description:</strong> Professional course in ${courseName}</p>
            </div>
            
            <div class="detail-card">
                <h4>🏫 Sample Colleges</h4>
                <div class="colleges-list">
                    <div class="college-item">Government College - Mumbai (₹50,000)</div>
                    <div class="college-item">State University - Delhi (₹1,50,000)</div>
                    <div class="college-item">Private Institute - Bangalore (₹2,00,000)</div>
                </div>
            </div>
        </div>
        
        <div class="action-buttons-modal">
            <button class="btn btn-primary" onclick="proceedToCollegeSelection('${courseName}')">
                Select This Course
            </button>
        </div>
    `;
    
    document.getElementById('courseModal').classList.remove('hidden');
}

// Proceed to college selection
function proceedToCollegeSelection(courseName) {
    closeModal();
    
    // Set selected course
    selectedCourse = { name: courseName };
    document.getElementById('selectedCourse').value = courseName;
    
    // Show college selection
    document.getElementById('collegeSelection').classList.remove('hidden');
    document.getElementById('collegeSelection').scrollIntoView({ behavior: 'smooth' });
    
    // Populate colleges based on course
    populateCollegesForCourse(courseName);
}

// Populate colleges for selected course
function populateCollegesForCourse(courseName) {
    const collegeSelect = document.getElementById('collegeSelect');
    collegeSelect.innerHTML = '<option value="">Select a college</option>';
    
    const courseInfo = comprehensiveData.courseDetails[courseName];
    
    if (courseInfo && courseInfo.topColleges) {
        courseInfo.topColleges.forEach(college => {
            const option = document.createElement('option');
            option.value = college.name;
            option.textContent = `${college.name} - ${college.city} (${college.fees})`;
            collegeSelect.appendChild(option);
        });
    } else {
        // Default colleges
        const defaultColleges = [
            {name: 'Government College', city: 'Mumbai', fees: '₹50,000'},
            {name: 'State University', city: 'Delhi', fees: '₹1,50,000'},
            {name: 'Private Institute', city: 'Bangalore', fees: '₹2,00,000'}
        ];
        
        defaultColleges.forEach(college => {
            const option = document.createElement('option');
            option.value = college.name;
            option.textContent = `${college.name} - ${college.city} (${college.fees})`;
            collegeSelect.appendChild(option);
        });
    }
}

// Enhanced search functionality
function performEnhancedSearch() {
    const query = document.getElementById('courseSearch').value.toLowerCase().trim();
    
    if (!query) {
        alert('Please enter a course name to search');
        return;
    }
    
    playClickSound();
    
    // Search in comprehensive data
    const allCourses = Object.keys(comprehensiveData.courseDetails || {});
    const pathwayCourses = [];
    
    // Collect all courses from pathway tree
    Object.values(comprehensiveData.pathwayTree || {}).forEach(stage => {
        Object.values(stage).forEach(stream => {
            Object.values(stream).forEach(courses => {
                pathwayCourses.push(...courses);
            });
        });
    });
    
    const allAvailableCourses = [...new Set([...allCourses, ...pathwayCourses])];
    
    // Find matching courses
    const matches = allAvailableCourses.filter(course => 
        course.toLowerCase().includes(query)
    );
    
    if (matches.length > 0) {
        // Show first match details
        showDetailedCourseInfo(matches[0]);
    } else {
        alert(`No courses found matching "${query}". Try searching for: MBBS, Engineering, CA, BBA, etc.`);
    }
}

// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    loadComprehensiveData();
    
    // Enhanced search button
    const searchApplyBtn = document.getElementById('searchApplyBtn');
    if (searchApplyBtn) {
        searchApplyBtn.addEventListener('click', performEnhancedSearch);
    }
    
    // Home page apply button
    const applyBtn = document.getElementById('applyBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                window.location.href = `pathways.html?search=${encodeURIComponent(query)}`;
            } else {
                window.location.href = 'pathways.html';
            }
        });
    }
    
    // Check for search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && document.getElementById('courseSearch')) {
        document.getElementById('courseSearch').value = searchQuery;
        setTimeout(() => performEnhancedSearch(), 500);
    }
});

// Download detailed brochure
function downloadDetailedBrochure(courseName) {
    playClickSound();
    
    const courseInfo = comprehensiveData.courseDetails[courseName];
    
    let brochureContent = `
STUDENT GUIDE INDIA - DETAILED COURSE BROCHURE

Course: ${courseInfo ? courseInfo.fullName : courseName}
Duration: ${courseInfo ? courseInfo.duration : '3-4 years'}
Eligibility: ${courseInfo ? courseInfo.eligibility : 'As per requirements'}
Fees: ${courseInfo ? courseInfo.fees : '₹50,000 - ₹2,00,000'}

Description:
${courseInfo ? courseInfo.description : `Professional course in ${courseName}`}
`;

    if (courseInfo) {
        brochureContent += `
Top Certificates:
${courseInfo.certificates.map(cert => `• ${cert}`).join('\n')}

Top Colleges:
${courseInfo.topColleges.map(college => `• ${college.name}, ${college.city} - ${college.fees}`).join('\n')}

Career Options:
${courseInfo.careerOptions.map(career => `• ${career}`).join('\n')}

Average Salary: ${courseInfo.averageSalary}
`;
    }

    brochureContent += `
For more information, visit: Student Guide India
Generated on: ${new Date().toLocaleDateString()}
Project by: Darshak Bhalgamiya
    `;
    
    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseName.replace(/\s+/g, '_')}_Detailed_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}