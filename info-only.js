// Information-Only Course Display (No Selection/Application)

// Override course card creation to remove selection buttons
function createCourseCardInfoOnly(courseName, courseData) {
    const card = document.createElement('div');
    card.className = 'course-card info-card';
    
    let icon = '📚';
    if (courseName.includes('ITI')) icon = '🔧';
    if (courseName.includes('Diploma')) icon = '🎓';
    if (courseName.includes('Army') || courseName.includes('NCC')) icon = '🪖';
    if (courseName.includes('Art') || courseName.includes('Music') || courseName.includes('Dance')) icon = '🎨';
    if (courseName.includes('Computer')) icon = '💻';
    if (courseName.includes('Medical') || courseName.includes('Health')) icon = '🏥';
    
    card.innerHTML = `
        <div class="course-image">${icon}</div>
        <h3>${courseName}</h3>
        <p class="course-full-name">${courseData.fullName || courseName}</p>
        <p>${(courseData.description || 'Professional course information').substring(0, 80)}...</p>
        <div class="course-meta">
            <span>Duration: ${courseData.duration || '1-4 years'}</span>
            <span>${courseData.fees || '₹50,000 - ₹2,00,000'}</span>
        </div>
        <div class="course-quick-info">
            <small>Avg Salary: ${courseData.averageSalary || '₹2,00,000 - ₹6,00,000'}</small>
        </div>
        <div class="course-actions">
            <button class="btn btn-primary btn-small" onclick="showCourseInfoOnly('${courseName}')">
                View Course Info
            </button>
        </div>
    `;
    
    return card;
}

// Show course information without application options
function showCourseInfoOnly(courseName) {
    playClickSound();
    
    const courseData = completeCoursesData.courseDetails[courseName] || allCoursesData.courseDetails[courseName];
    
    if (!courseData) {
        showBasicCourseInfoOnly(courseName);
        return;
    }
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${courseData.fullName || courseName}</h2>
        <div class="course-header-info">
            <span class="course-tag">${courseName}</span>
            <span class="duration-tag">${courseData.duration}</span>
        </div>
        
        <div class="course-detail-grid">
            <div class="detail-card">
                <h4>📚 Course Information</h4>
                <p><strong>Eligibility:</strong> ${courseData.eligibility}</p>
                <p><strong>Duration:</strong> ${courseData.duration}</p>
                <p><strong>Fees Range:</strong> ${courseData.fees}</p>
                <p><strong>Description:</strong> ${courseData.description}</p>
                <p><strong>Average Salary:</strong> ${courseData.averageSalary}</p>
            </div>
            
            <div class="detail-card">
                <h4>🏆 Top 3 Certificates Required</h4>
                <ul class="certificates-list">
                    ${courseData.certificates.slice(0, 3).map(cert => `<li>✓ ${cert}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-card">
                <h4>🏫 Top 3 Colleges</h4>
                <div class="colleges-ranking">
                    ${courseData.topColleges.slice(0, 3).map(college => `
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
                <h4>💼 Career Opportunities</h4>
                <div class="career-tags">
                    ${courseData.careerOptions.map(career => `<span class="career-tag">${career}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="info-only-footer">
            <button class="btn btn-secondary" onclick="downloadCourseInfo('${courseName}')">
                Download Course Info
            </button>
        </div>
    `;
    
    document.getElementById('courseModal').classList.remove('hidden');
}

// Show basic course info for courses without detailed data
function showBasicCourseInfoOnly(courseName) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${courseName}</h2>
        
        <div class="course-detail-grid">
            <div class="detail-card">
                <h4>📚 Course Information</h4>
                <p><strong>Course:</strong> ${courseName}</p>
                <p><strong>Duration:</strong> 1-4 years (varies by course)</p>
                <p><strong>Eligibility:</strong> As per course requirements</p>
                <p><strong>Description:</strong> Professional course in ${courseName}</p>
            </div>
            
            <div class="detail-card">
                <h4>🏆 Common Certificates</h4>
                <ul class="certificates-list">
                    <li>✓ Course Completion Certificate</li>
                    <li>✓ Skill Assessment Certificate</li>
                    <li>✓ Industry Recognition</li>
                </ul>
            </div>
            
            <div class="detail-card">
                <h4>🏫 Sample Colleges</h4>
                <div class="colleges-ranking">
                    <div class="college-rank-item">
                        <span class="rank">#1</span>
                        <div class="college-info">
                            <strong>Government Institute</strong><br>
                            <small>Multiple Cities | ₹50,000 - ₹1,00,000</small>
                        </div>
                    </div>
                    <div class="college-rank-item">
                        <span class="rank">#2</span>
                        <div class="college-info">
                            <strong>State University</strong><br>
                            <small>Major Cities | ₹75,000 - ₹1,50,000</small>
                        </div>
                    </div>
                    <div class="college-rank-item">
                        <span class="rank">#3</span>
                        <div class="college-info">
                            <strong>Private College</strong><br>
                            <small>Metro Cities | ₹1,00,000 - ₹2,50,000</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="info-only-footer">
            <button class="btn btn-secondary" onclick="downloadCourseInfo('${courseName}')">
                Download Course Info
            </button>
        </div>
    `;
    
    document.getElementById('courseModal').classList.remove('hidden');
}

// Download course information (simplified)
function downloadCourseInfo(courseName) {
    playClickSound();
    
    const courseData = completeCoursesData.courseDetails[courseName] || allCoursesData.courseDetails[courseName];
    
    let infoContent = `
STUDENT GUIDE INDIA - COURSE INFORMATION

Course: ${courseData ? courseData.fullName : courseName}
Duration: ${courseData ? courseData.duration : '1-4 years'}
Eligibility: ${courseData ? courseData.eligibility : 'As per requirements'}
Fees: ${courseData ? courseData.fees : '₹50,000 - ₹2,00,000'}

DESCRIPTION:
${courseData ? courseData.description : `Professional course in ${courseName}`}

TOP 3 CERTIFICATES:
${courseData ? courseData.certificates.slice(0, 3).map(cert => `• ${cert}`).join('\n') : '• Course Completion Certificate\n• Skill Assessment\n• Industry Recognition'}

TOP 3 COLLEGES:
${courseData ? courseData.topColleges.slice(0, 3).map(college => `${college.ranking}. ${college.name}, ${college.city} - ${college.fees}`).join('\n') : '1. Government Institute - Multiple Cities\n2. State University - Major Cities\n3. Private College - Metro Cities'}

CAREER OPPORTUNITIES:
${courseData ? courseData.careerOptions.map(career => `• ${career}`).join('\n') : '• Professional roles in the field\n• Government positions\n• Private sector opportunities'}

SALARY RANGE: ${courseData ? courseData.averageSalary : '₹2,00,000 - ₹6,00,000'}

Generated on: ${new Date().toLocaleDateString()}
Source: Student Guide India
Developer: Darshak Bhalgamiya
    `;
    
    const blob = new Blob([infoContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseName.replace(/\s+/g, '_')}_Course_Info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Override existing functions to use info-only versions
document.addEventListener('DOMContentLoaded', function() {
    // Override course card creation functions
    window.createCourseCard = createCourseCardInfoOnly;
    window.createSearchResultCard = createCourseCardInfoOnly;
    window.showFullCourseDetails = showCourseInfoOnly;
    window.showDetailedCourseInfo = showCourseInfoOnly;
    
    // Remove any existing selection-related elements
    const collegeSelection = document.getElementById('collegeSelection');
    if (collegeSelection) {
        collegeSelection.remove();
    }
    
    const collegeModal = document.getElementById('collegeModal');
    if (collegeModal) {
        collegeModal.remove();
    }
});

// Override search result display to use info-only cards
function displaySearchResultsInfoOnly(matches, query) {
    // Hide pathway steps
    document.getElementById('stageSelection').classList.add('hidden');
    document.getElementById('streamSelection').classList.add('hidden');
    document.getElementById('subBranchSelection').classList.add('hidden');
    document.getElementById('courseGrid').classList.remove('hidden');
    
    // Update header
    const pathwayHeader = document.querySelector('.pathway-header h1');
    pathwayHeader.textContent = `Search Results for "${query}"`;
    
    // Display matching courses
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';
    
    matches.forEach(courseName => {
        const courseData = completeCoursesData.courseDetails[courseName] || allCoursesData.courseDetails[courseName] || {};
        const courseCard = createCourseCardInfoOnly(courseName, courseData);
        container.appendChild(courseCard);
    });
    
    // Add back to search button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn btn-secondary';
    backBtn.textContent = 'New Search';
    backBtn.onclick = () => location.reload();
    backBtn.style.margin = '20px auto';
    backBtn.style.display = 'block';
    container.appendChild(backBtn);
}

// Override the search results display function
window.displaySearchResults = displaySearchResultsInfoOnly;