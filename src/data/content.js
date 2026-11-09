// Single source of truth — every fact below comes from the resume
// (plus the IoT Minds internship supplied separately).

export const profile = {
  name: 'Bonagiri Chaitra',
  role: ['Computer Science Undergraduate', 'Software Developer'],
  tagline:
    'Building thoughtful digital experiences through clean code, problem-solving, and continuous learning.',
  phone: '+91 9440279376',
  phoneHref: 'tel:+919440279376',
  email: 'chaitrabonagiri2005@gmail.com',
  linkedin: 'https://linkedin.com/in/chaitra-bonagiri-404b61290',
  linkedinLabel: 'chaitra-bonagiri-404b61290',
  github: 'https://github.com/chaitra1205',
  githubLabel: 'chaitra1205',
  resume: `${import.meta.env.BASE_URL}Bonagiri_Chaitra_Resume.pdf`,
  resumeFile: 'Bonagiri_Chaitra_Resume.pdf',
  photo: `${import.meta.env.BASE_URL}bonagiri-chaitra.jpg`,
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  // [text, highlighted?]
  lead: [
    ['Computer Science undergraduate with hands-on experience in ', false],
    ['software development', true],
    [', ', false],
    ['backend engineering', true],
    [', and building ', false],
    ['web applications', true],
    ['.', false],
  ],
  body: 'Proficient in Python, JavaScript, SQL, REST APIs, and database management, with experience in developing, testing, and debugging applications. Strong foundation in data structures, algorithms, and object-oriented programming, with an interest in building scalable and reliable software solutions.',
  facts: [
    { value: '9.05', label: 'B.Tech CGPA' },
    { value: '03', label: 'Internships' },
    { value: '02', label: 'Full-stack projects' },
  ],
  focus: [
    { title: 'Software Development', text: 'Developing, testing and debugging applications from start to finish.' },
    { title: 'Backend Engineering', text: 'RESTful APIs with Django, Django REST Framework and Flask.' },
    { title: 'Web Applications', text: 'Full-stack builds with React.js and Python-based technologies.' },
    { title: 'Python · JavaScript · SQL', text: 'Plus REST APIs and database management with MongoDB and MySQL.' },
    { title: 'Testing & Debugging', text: 'API testing, unit testing and methodical debugging.' },
    { title: 'Scalable Solutions', text: 'Grounded in data structures, algorithms and object-oriented programming.' },
  ],
}

export const education = [
  {
    period: '2023 — Present',
    school: 'Sreyas Institute of Engineering and Technology',
    degree: 'B.Tech — Computer Science and Engineering',
    scoreLabel: 'CGPA',
    score: '9.05',
  },
  {
    period: '2023',
    school: 'Narayana Junior College',
    degree: 'Intermediate (MPC)',
    scoreLabel: 'Score',
    score: '97.6%',
  },
  {
    period: '2021',
    school: 'Akshara International School',
    degree: 'CBSE (10th)',
    scoreLabel: 'Score',
    score: '91.5%',
  },
]

// Chronological, numbered 01 → 03.
export const experience = [
  {
    role: 'Backend Intern — Django',
    company: 'Bcommune Technologies',
    period: 'April 2025 — June 2025',
    points: [
      'Developed RESTful APIs using Django and Django REST Framework.',
      'Implemented authentication and role-based access control.',
      'Integrated APIs for multiple user roles.',
      'Collaborated with frontend developers and troubleshot integration issues.',
    ],
    tags: ['Django', 'Django REST Framework', 'Authentication', 'RBAC'],
  },
  {
    role: 'Frontend Intern',
    company: 'IoT Minds',
    period: 'April 2026 — July 2026',
    points: [
      'Designed responsive Flutter interfaces for IoT-based smart automation applications.',
      'Explored Node.js backend integration, cloud technologies, and Home Assistant for IoT solutions.',
      'Improved user experience by collaborating on interface enhancements for smart automation platforms.',
    ],
    tags: ['Flutter', 'Node.js', 'Home Assistant'],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Sanshi Pvt. Ltd.',
    period: 'September 2026 — Present',
    current: true,
    points: [
      'Contributed to full-stack development using React.js and Python-based technologies.',
      'Developed and enhanced frontend interfaces.',
      'Integrated application features with backend services.',
      'Tested applications, identified bugs, and supported debugging.',
    ],
    tags: ['React.js', 'Python', 'Testing'],
  },
]

export const projects = [
  {
    title: 'Clinical Cost Insight App',
    summary:
      'A healthcare price comparison platform to search and compare diagnostic test prices across healthcare centers.',
    points: [
      'Search and compare diagnostic test prices across multiple healthcare centers.',
      'Flask RESTful APIs integrated with MongoDB Atlas.',
      'RapidFuzz for intelligent diagnostic test matching.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Flask', 'MongoDB'],
    github: 'https://github.com/chaitra1205/Clinical_cost_insight',
    diagram: {
      caption: 'Search → match → compare',
      flow: true,
      nodes: [
        { k: 'Search', v: 'Diagnostic tests' },
        { k: 'Match', v: 'RapidFuzz' },
        { k: 'Compare', v: 'Prices by center' },
      ],
      layers: ['HTML · CSS · JavaScript', 'Flask REST APIs', 'MongoDB Atlas'],
    },
  },
  {
    title: 'Hospital Management System',
    summary:
      'A MERN stack hospital management platform with dedicated portals for administrators, doctors and patients.',
    points: [
      'Admin, Doctor, and Patient portals with dedicated dashboards.',
      'Secure authentication and appointment scheduling.',
      'RESTful API integration for patient registration and administrative workflows.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/chaitra1205/Hospital-Management-System',
    diagram: {
      caption: 'Three portals, one API',
      flow: false,
      nodes: [
        { k: 'Admin', v: 'Portal' },
        { k: 'Doctor', v: 'Portal' },
        { k: 'Patient', v: 'Portal' },
      ],
      layers: ['React.js dashboards', 'Node.js + Express.js REST APIs', 'MongoDB'],
    },
  },
]

export const skills = [
  { category: 'Programming', items: ['Python', 'JavaScript', 'C'] },
  { category: 'Frontend', items: ['React.js', 'HTML', 'CSS', 'Flutter'] },
  { category: 'Backend', items: ['Django', 'Flask', 'RESTful APIs'] },
  { category: 'Databases & Cloud', items: ['MongoDB', 'MySQL', 'Azure Fundamentals'] },
  { category: 'Concepts', items: ['Data Structures', 'Algorithms', 'Object-Oriented Programming', 'DBMS'] },
  { category: 'Development Practices', items: ['API Testing', 'Unit Testing', 'Debugging', 'Software Testing'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
  { category: 'Currently Learning', items: ['MS SQL Server'], learning: true },
  { category: 'Soft Skills', items: ['Team Collaboration', 'Communication', 'Problem Solving', 'Ownership', 'Adaptability'] },
]

export const leadership = {
  role: 'Hospitality Team Lead',
  org: 'TEDxSreyas',
  points: [
    'Led volunteer coordination and managed guest interactions during the TEDx event.',
    'Collaborated with organizing teams to ensure smooth event execution and logistics.',
  ],
}
