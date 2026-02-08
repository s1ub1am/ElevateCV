// Template-specific default data for different roles
export const templateDefaults = {
    'devops': {
        personalInfo: {
            fullName: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            phone: '+91 98765 43210',
            linkedin: 'linkedin.com/in/rahulsharma',
            linkedinLabel: 'LinkedIn',
            portfolio: 'github.com/rahulsharma',
            portfolioLabel: 'GitHub',
            summary: 'DevOps Engineer with 3+ years of experience in automating and optimizing mission-critical deployments over large infrastructure. Proficient in AWS, Kubernetes, and CI/CD pipelines. proven ability to reduce deployment time and increase system reliability.',
            location: 'Bangalore, Karnataka',
        },
        education: [
            {
                institution: 'Indian Institute of Technology, Bombay',
                degree: 'B.Tech in Computer Science',
                field: 'Computer Science',
                location: 'Mumbai, India',
                startDate: '2016',
                endDate: '2020',
                gpa: '8.5/10.0'
            }
        ],
        experience: [
            {
                company: 'Tech Solutions India',
                position: 'DevOps Engineer',
                location: 'Bangalore, India',
                startDate: '2020-06',
                endDate: 'Present',
                description: 'Led migration of monolithic applications to microservices architecture on AWS EKS. Implemented CI/CD pipelines using GitLab CI and Jenkins. Reduced deployment time by 60% through automation.'
            }
        ],
        skills: [
            { id: 1, name: 'Cloud Platforms: AWS, Azure, GCP' },
            { id: 2, name: 'Container Orchestration: Kubernetes, Docker Swarm, ECS' },
            { id: 3, name: 'CI/CD: Jenkins, GitLab CI, GitHub Actions, CircleCI' },
            { id: 4, name: 'Infrastructure as Code: Terraform, CloudFormation, Ansible' },
            { id: 5, name: 'Scripting: Python, Bash, PowerShell, Go' },
            { id: 6, name: 'Monitoring: Prometheus, Grafana, ELK Stack, Datadog' },
            { id: 7, name: 'Version Control: Git, GitHub, GitLab, Bitbucket' },
            { id: 8, name: 'Databases: PostgreSQL, MySQL, MongoDB, Redis' },
            { id: 9, name: 'Security: SSL/TLS, IAM, Security Scanning, Vault' },
            { id: 10, name: 'Networking: VPC, Load Balancers, DNS, CDN' }
        ],
        projects: [
            {
                name: 'Cloud Infrastructure Automation',
                tech: 'Terraform, AWS, Python',
                description: 'Automated infrastructure provisioning for multi-environment setup using Terraform modules. Reduced infrastructure setup time from days to hours.',
                link: ''
            }
        ]
    },
    'data-scientist': {
        personalInfo: {
            fullName: 'Priya Patel',
            email: 'priya.patel@example.com',
            phone: '+91 98765 43211',
            linkedin: 'linkedin.com/in/priyapatel',
            linkedinLabel: 'LinkedIn',
            portfolio: 'github.com/priyapatel',
            portfolioLabel: 'GitHub',
            summary: 'Data Scientist with a strong background in machine learning and statistical analysis. Passionate about deriving insights from data to solve complex business problems. Skilled in Python, R, and SQL.',
            location: 'Pune, Maharashtra',
        },
        education: [
            {
                institution: 'Indian Statistical Institute, Kolkata',
                degree: 'M.Stat in Statistics',
                field: 'Statistics',
                location: 'Kolkata, India',
                startDate: '2018',
                endDate: '2020',
                gpa: '9.0/10.0'
            }
        ],
        experience: [
            {
                company: 'Data Analytics Pvt Ltd',
                position: 'Data Scientist',
                location: 'Hyderabad, India',
                startDate: '2020-07',
                endDate: 'Present',
                description: 'Developed machine learning models for customer churn prediction achieving 92% accuracy. Built dashboards and visualizations for business insights. Collaborated with cross-functional teams to implement data-driven solutions.'
            }
        ],
        skills: [
            { id: 1, name: 'Programming: Python, R, SQL, Scala' },
            { id: 2, name: 'ML/DL: Scikit-learn, TensorFlow, PyTorch, Keras' },
            { id: 3, name: 'Data Visualization: Tableau, Power BI, Matplotlib, Seaborn, Plotly' },
            { id: 4, name: 'Big Data: Spark, Hadoop, Hive, Kafka' },
            { id: 5, name: 'Statistics: A/B Testing, Hypothesis Testing, Regression, Time Series' },
            { id: 6, name: 'Tools: Jupyter, Git, Docker, MLflow' },
            { id: 7, name: 'Databases: SQL, NoSQL, PostgreSQL, MongoDB' },
            { id: 8, name: 'Cloud: AWS SageMaker, Google Cloud AI, Azure ML' },
            { id: 9, name: 'NLP: NLTK, spaCy, BERT, GPT, Transformers' },
            { id: 10, name: 'Computer Vision: OpenCV, YOLO, CNNs' }
        ],
        projects: [
            {
                name: 'Customer Segmentation Analysis',
                tech: 'Python, Scikit-learn, K-means',
                description: 'Performed clustering analysis on customer data to identify distinct segments. Results led to targeted marketing campaigns with 25% increase in conversion.',
                link: ''
            }
        ]
    },
    'mobile-dev': {
        personalInfo: {
            fullName: 'Arjun Singh',
            email: 'arjun.singh@example.com',
            phone: '+91 98765 43212',
            linkedin: 'linkedin.com/in/arjunsingh',
            linkedinLabel: 'LinkedIn',
            portfolio: 'github.com/arjunsingh',
            portfolioLabel: 'GitHub',
            summary: 'Passionate Mobile Application Developer with expertise in React Native and Android development. Dedicated to building user-friendly and high-performance mobile apps.',
            location: 'Gurgaon, Haryana',
        },
        education: [
            {
                institution: 'Delhi Technological University',
                degree: 'B.Tech in Software Engineering',
                field: 'Software Engineering',
                location: 'Delhi, India',
                startDate: '2017',
                endDate: '2021',
                gpa: '8.2/10.0'
            }
        ],
        experience: [
            {
                company: 'App Innovators',
                position: 'Mobile Developer',
                location: 'Noida, India',
                startDate: '2021-06',
                endDate: 'Present',
                description: 'Developed and maintained mobile applications using React Native for both iOS and Android platforms. Implemented push notifications, offline storage, and real-time features. Published apps with 100K+ downloads.'
            }
        ],
        skills: [
            { id: 1, name: 'Frameworks: React Native, Flutter, Swift, Kotlin, SwiftUI' },
            { id: 2, name: 'State Management: Redux, MobX, Provider, Zustand' },
            { id: 3, name: 'Backend Integration: REST APIs, GraphQL, Firebase, AWS Amplify' },
            { id: 4, name: 'Tools: Xcode, Android Studio, VS Code, Expo' },
            { id: 5, name: 'Testing: Jest, Detox, XCTest, Appium' },
            { id: 6, name: 'Deployment: App Store, Google Play, Fastlane, CodePush' },
            { id: 7, name: 'UI/UX: Material Design, Human Interface Guidelines, Responsive Design' },
            { id: 8, name: 'Performance: Memory Optimization, Lazy Loading, Code Splitting' },
            { id: 9, name: 'Push Notifications: FCM, APNs, OneSignal' },
            { id: 10, name: 'Analytics: Firebase Analytics, Mixpanel, Amplitude' }
        ],
        projects: [
            {
                name: 'E-commerce Mobile App',
                tech: 'React Native, Redux, Firebase',
                description: 'Built full-featured e-commerce app with product catalog, cart, payment integration, and order tracking. Achieved 4.5+ star rating with 50K+ active users.',
                link: ''
            }
        ]
    },
    'marketing': {
        personalInfo: {
            fullName: 'Ananya Gupta',
            email: 'ananya.gupta@example.com',
            phone: '+91 98765 43213',
            linkedin: 'linkedin.com/in/ananyagupta',
            linkedinLabel: 'LinkedIn',
            portfolio: 'ananyagupta.contently.com',
            portfolioLabel: 'Portfolio',
            summary: 'Creative and data-driven Digital Marketing Specialist with experience in SEO, social media marketing, and content strategy. Proven track record of increasing brand visibility and engagement.',
            location: 'Mumbai, Maharashtra',
        },
        education: [
            {
                institution: 'Symbiosis Institute of Media and Communication',
                degree: 'MBA in Marketing',
                field: 'Marketing',
                location: 'Pune, India',
                startDate: '2017',
                endDate: '2019',
                gpa: '8.8/10.0'
            }
        ],
        experience: [
            {
                company: 'Digital Brand Agency',
                position: 'Digital Marketing Executive',
                location: 'Mumbai, India',
                startDate: '2019-06',
                endDate: 'Present',
                description: 'Managed multi-channel digital marketing campaigns with budgets up to $500K. Increased website traffic by 150% and conversion rates by 40% through SEO, SEM, and content marketing strategies.'
            }
        ],
        skills: [
            { id: 1, name: 'Digital Marketing: SEO, SEM, PPC, Email Marketing, Affiliate Marketing' },
            { id: 2, name: 'Analytics: Google Analytics, Adobe Analytics, Mixpanel, Google Tag Manager' },
            { id: 3, name: 'Social Media: Facebook Ads, LinkedIn Ads, Instagram, Twitter/X, TikTok' },
            { id: 4, name: 'Tools: HubSpot, Salesforce, Hootsuite, Canva, Mailchimp' },
            { id: 5, name: 'Content: Copywriting, Content Strategy, Storytelling, Blog Writing' },
            { id: 6, name: 'Strategy: Market Research, A/B Testing, ROI Analysis, Conversion Optimization' },
            { id: 7, name: 'Paid Advertising: Google Ads, Meta Ads, Display Ads, Retargeting' },
            { id: 8, name: 'Marketing Automation: Workflows, Lead Nurturing, Drip Campaigns' },
            { id: 9, name: 'Brand Management: Brand Voice, Positioning, Identity' },
            { id: 10, name: 'Video Marketing: YouTube, Video Ads, TikTok, Reels' }
        ],
        projects: [
            {
                name: 'Brand Awareness Campaign',
                tech: 'Google Ads, Facebook Ads, Analytics',
                description: 'Led multi-platform campaign that increased brand awareness by 200% and generated 10K+ qualified leads. Managed $200K budget with 5:1 ROI.',
                link: ''
            }
        ]
    },
    'healthcare': {
        personalInfo: {
            fullName: 'Dr. Rohan Mehta',
            email: 'rohan.mehta@example.com',
            phone: '+91 98765 43214',
            linkedin: 'linkedin.com/in/rohanmehta',
            linkedinLabel: 'LinkedIn',
            portfolio: '',
            portfolioLabel: '',
            summary: 'Dedicated Medical Professional with a focus on patient-centered care. Experienced in emergency medicine and general practice. Committed to improving community health standards.',
            location: 'Chennai, Tamil Nadu',
        },
        education: [
            {
                institution: 'All India Institute of Medical Sciences (AIIMS)',
                degree: 'MBBS',
                field: 'Medicine',
                location: 'New Delhi, India',
                startDate: '2013',
                endDate: '2018',
                gpa: 'Top 5%'
            }
        ],
        experience: [
            {
                company: 'City General Hospital',
                position: 'Junior Resident',
                location: 'Chennai, India',
                startDate: '2019-01',
                endDate: 'Present',
                description: 'Provided compassionate patient care in ICU setting. Collaborated with interdisciplinary teams to develop and implement care plans. Maintained 98% patient satisfaction rating.'
            }
        ],
        skills: [
            { id: 1, name: 'Patient Care: Assessment, Treatment, Monitoring, Care Planning' },
            { id: 2, name: 'Clinical Skills: IV Therapy, Wound Care, Medication Administration, Phlebotomy' },
            { id: 3, name: 'Documentation: Electronic Health Records (EHR), Charting, Clinical Notes' },
            { id: 4, name: 'Certifications: BLS, ACLS, PALS, NRP' },
            { id: 5, name: 'Soft Skills: Communication, Empathy, Critical Thinking, Team Collaboration' },
            { id: 6, name: 'Technology: Epic, Cerner, McKesson, Meditech' },
            { id: 7, name: 'Specialized Care: ICU, ER, Pediatrics, Geriatrics' },
            { id: 8, name: 'Safety Protocols: Infection Control, HIPAA Compliance, Patient Safety' },
            { id: 9, name: 'Assessment Tools: Vital Signs, Pain Assessment, Glasgow Coma Scale' },
            { id: 10, name: 'Patient Education: Discharge Planning, Health Literacy, Counseling' }
        ],
        projects: [
            {
                name: 'Patient Safety Initiative',
                tech: 'Quality Improvement, Data Analysis',
                description: 'Led quality improvement project that reduced medication errors by 30% through implementation of double-check protocols and staff training.',
                link: ''
            }
        ]
    },
    'creative': {
        personalInfo: {
            fullName: 'Kavya Reddy',
            email: 'kavya.reddy@example.com',
            phone: '+91 98765 43215',
            linkedin: 'linkedin.com/in/kavyareddy',
            linkedinLabel: 'LinkedIn',
            portfolio: 'behance.net/kavyareddy',
            portfolioLabel: 'Behance',
            summary: 'Creative Graphic Designer with a keen eye for detail and a passion for visual storytelling. Experienced in creating branding materials, digital illustrations, and UI designs.',
            location: 'Bangalore, Karnataka',
        },
        education: [
            {
                institution: 'National Institute of Design (NID)',
                degree: 'B.Des in Graphic Design',
                field: 'Graphic Design',
                location: 'Ahmedabad, India',
                startDate: '2016',
                endDate: '2020',
                gpa: '8.9/10.0'
            }
        ],
        experience: [
            {
                company: 'Creative Studio',
                position: 'Graphic Designer',
                location: 'Bangalore, India',
                startDate: '2020-07',
                endDate: 'Present',
                description: 'Created visual designs for diverse clients including branding, marketing materials, and digital content. Managed projects from concept to delivery, ensuring client satisfaction and brand consistency.'
            }
        ],
        skills: [
            { id: 1, name: 'Design Software: Adobe Creative Suite, Figma, Sketch, Canva' },
            { id: 2, name: 'Core Skills: Branding, Typography, Layout Design, Color Theory' },
            { id: 3, name: 'Digital: Web Design, UI/UX, Motion Graphics, Social Media Graphics' },
            { id: 4, name: 'Print: Packaging, Posters, Editorial Design, Brochures' },
            { id: 5, name: 'Tools: InDesign, Illustrator, Photoshop, After Effects, XD' },
            { id: 6, name: 'Process: Ideation, Prototyping, Client Collaboration, Design Thinking' },
            { id: 7, name: '3D/Animation: Blender, Cinema 4D, Lottie, Principle' },
            { id: 8, name: 'Photography: Photo Editing, Retouching, Composition' },
            { id: 9, name: 'Video: Premiere Pro, Final Cut Pro, DaVinci Resolve' },
            { id: 10, name: 'Presentation: PowerPoint, Keynote, Google Slides, Pitch Decks' }
        ],
        projects: [
            {
                name: 'Brand Identity Design',
                tech: 'Adobe Illustrator, Photoshop',
                description: 'Developed complete brand identity for startup including logo, color palette, typography, and brand guidelines. Resulting design increased brand recognition by 80%.',
                link: ''
            }
        ]
    },
    'student': {
        personalInfo: {
            fullName: 'Aditya Verma',
            email: 'aditya.verma@example.com',
            phone: '+91 98765 43216',
            linkedin: 'linkedin.com/in/adityaverma',
            linkedinLabel: 'LinkedIn',
            portfolio: 'github.com/adityaverma',
            portfolioLabel: 'GitHub',
            summary: 'Final year Computer Science student with a strong foundation in algorithms and data structures. Passionate about full-stack development and artificial intelligence. Seeking an entry-level software engineering role to apply academic learning in a practical setting.',
            location: 'Hyderabad, Telangana',
        },
        education: [
            {
                institution: 'International Institute of Information Technology (IIIT), Hyderabad',
                degree: 'B.Tech in Computer Science',
                field: 'Computer Science',
                location: 'Hyderabad, India',
                startDate: '2020',
                endDate: '2024 (Expected)',
                gpa: '9.2/10.0'
            }
        ],
        experience: [
            {
                company: 'Tech StartUp Inc.',
                position: 'Software Engineering Intern',
                location: 'Bangalore, India',
                startDate: '2023-05',
                endDate: '2023-07',
                description: 'Assisted in developing a RESTful API for a new product feature using Node.js and Express. Wrote unit tests and improved code coverage by 15%. Collaborated with senior developers in code reviews and agile meetings.'
            }
        ],
        skills: [
            { id: 1, name: 'Languages: Java, Python, JavaScript, C++' },
            { id: 2, name: 'Web Technologies: React, Node.js, HTML5, CSS3' },
            { id: 3, name: 'Databases: MySQL, MongoDB' },
            { id: 4, name: 'Tools: Git, VS Code, Postman' },
            { id: 5, name: 'Core Concepts: Data Structures, Algorithms, OOP' },
            { id: 6, name: 'Soft Skills: Problem Solving, Teamwork, Communication' }
        ],
        projects: [
            {
                name: 'E-Commerce Website',
                description: 'Developed a full-stack e-commerce application using MERN stack. Implemented user authentication, product catalog, shopping cart, and payment gateway integration.',
                tech: 'React, Node.js, MongoDB',
                link: 'github.com/adityaverma/ecommerce'
            },
            {
                name: 'Weather App',
                description: 'Built a weather forecasting app using OpenWeatherMap API. Features include current weather, 5-day forecast, and location-based search.',
                tech: 'JavaScript, HTML, CSS',
                link: 'github.com/adityaverma/weather-app'
            },
            {
                name: 'Task Manager CLI',
                description: 'Created a command-line interface tool for managing tasks. Supports adding, listing, and deleting tasks with priority levels.',
                tech: 'Python',
                link: 'github.com/adityaverma/task-cli'
            }
        ]
    }
};

// Map visual template IDs to role-specific defaults
const templateRoleMapping = {
    'modern': 'devops',              // Modern Professional → DevOps Engineer
    'harvard': 'data-scientist',      // Harvard Classic → Data Scientist
    'mnc-standard': 'student',        // Corporate Clean → Student/Fresher (TCS/Wipro)
    'tech-minimalist': 'mobile-dev',  // Tech Minimalist → Mobile Developer
    'project-centric': 'student',     // Project Centric → Student/Fresher
    'minimal-fresher': 'student',     // Minimal Fresher → Student/Fresher
    'two-column': 'devops',           // Two Column → DevOps/Full Stack
    'academic': 'data-scientist',     // Academic → Data Scientist
    'student': 'student'              // Student → Student
};

// Default empty structure
const emptyDefaults = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        linkedinLabel: '',
        portfolio: '',
        portfolioLabel: '',
        summary: '',
        location: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
};

// Get template defaults by templateId or return empty structure
export const getTemplateDefaults = (templateId) => {
    // First check if it's a direct role-based template ID (e.g., 'devops', 'data-scientist')
    if (templateDefaults[templateId]) {
        return templateDefaults[templateId];
    }

    // Then check if we have a role mapping for this visual template ID
    const mappedRole = templateRoleMapping[templateId];
    if (mappedRole && templateDefaults[mappedRole]) {
        return templateDefaults[mappedRole];
    }

    // For templates without specific defaults, return empty structure
    return emptyDefaults;
};
