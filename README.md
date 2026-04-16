# Student Guide India - Career Guidance Website

A modern, responsive website to help Indian students choose their career path after 10th and 12th grade.

## 🚀 Features

- **Interactive Career Pathways**: Step-by-step guidance for choosing streams and courses
- **Comprehensive Course Database**: 12+ courses with detailed information
- **College Finder**: Find nearest colleges based on city/pincode
- **Save & Download**: Save favorite courses and download brochures
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Clean, student-friendly interface with smooth animations

## 📁 Project Structure

```
EduGuide/
├── index.html          # Home page
├── pathways.html       # Interactive pathways page
├── resources.html      # Contact & resources page
├── styles.css          # All CSS styles
├── app.js             # JavaScript functionality
├── data.json          # Course and college data
└── README.md          # This file
```

## 🛠️ How to Run Locally

1. **Download/Clone the project** to your computer
2. **Open the folder** in your file explorer
3. **Double-click on `index.html`** to open in your web browser
4. **Navigate through the website** using the menu

### Alternative Method:
- Use a local server (recommended for full functionality):
  - Install Live Server extension in VS Code
  - Right-click on `index.html` and select "Open with Live Server"

## 🎨 Customization for Your College Project

### 1. Update Content
- **Edit `data.json`** to add/modify courses and colleges
- **Change text** in HTML files to match your requirements
- **Update contact information** in `resources.html`

### 2. Branding
- **Replace "Student Guide India"** with your project name
- **Update footer credits** with your name
- **Change color scheme** in `styles.css` (search for color codes like `#2563eb`)

### 3. Add More Features
- **Add more courses** by extending the `data.json` file
- **Include real college data** for your region
- **Add actual YouTube video links** in course data
- **Connect contact form** to a real backend service

## 🎯 Key Sections Explained

### Home Page (`index.html`)
- Hero section with animated title
- Search functionality
- "After 10th" and "After 12th" navigation buttons
- Features showcase

### Pathways Page (`pathways.html`)
- 3-step interactive flow:
  1. Choose stage (10th/12th)
  2. Select stream (Science/Commerce/Arts)
  3. Browse courses with detailed information
- Course filtering and search
- Save courses functionality
- College finder with city search

### Resources Page (`resources.html`)
- Contact form
- Helpful resource links
- Community section

## 💾 Data Structure

### Course Object
```json
{
  "id": "unique-course-id",
  "name": "Course Name",
  "stream": "science/commerce/arts",
  "stage": "10th/12th",
  "courseLevel": "UG Degree/PG Diploma/Certificate",
  "duration": "years",
  "eligibility": "requirements",
  "fees": "₹range",
  "description": "course description",
  "image": "emoji/icon",
  "video": "youtube-embed-url",
  "averageSalary": "₹range LPA",
  "careerOptions": ["Role 1", "Role 2"],
  "topRecruiters": ["Company 1", "Company 2"],
  "references": ["link1", "link2"],
  "colleges": [{"name": "College", "city": "City", "fees": "₹amount", "placementRate": "90%"}]
}
```

## 🎨 Design Features

- **Color Scheme**: Blue (#2563eb), White, Light Gray accents
- **Typography**: Poppins font family
- **Animations**: Fade-in, slide, and hover effects
- **Responsive**: Mobile-first design with flexbox/grid
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Technical Features

- **Local Storage**: Saves user's favorite courses
- **JSON Data**: Easy to update course/college information
- **Modal Windows**: Course details and college finder
- **Search & Filter**: Real-time course filtering
- **PDF Generation**: Download course brochures
- **Sound Effects**: Optional click sounds (with mute option)

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🚀 Future Enhancements

- Add user registration/login
- Connect to real college APIs
- Include entrance exam information
- Add career counselor chat
- Implement course comparison feature
- Add scholarship information
- Include placement statistics

## 📞 Support

For any questions about customizing this project for your college assignment:

1. Check the code comments for guidance
2. Modify `data.json` for content changes
3. Update CSS variables for design changes
4. Test on different devices for responsiveness

## 📄 License

This project is created for educational purposes. Feel free to modify and use for your college projects.

---

**Made with ❤️ for Indian Students**

*Project created by Darshak Bhalgamiya - 2025*