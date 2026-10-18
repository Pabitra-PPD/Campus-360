/**
 * Campus 360 Unified Database & Persistent Storage Layer
 * Simulates a robust reactive backend with LocalStorage persistence,
 * role-based access control (RBAC), and automatic real-time event broadcasting.
 * Expanded with: Lost & Found, Campus Navigation, Transport, Canteen,
 * Emergency Services, Feedback tracking, Clubs, and Campus AI Engine.
 */

(function () {
  'use strict';

  const DB_STORAGE_KEY = 'campus360_db_v3'; // Upgraded version for complete feature expansion
  const AUTH_STORAGE_KEY = 'campus360_auth_v2';

  // Demo user credentials and profiles
  const DEMO_USERS = {
    student: {
      id: 'STU-2024-8842',
      name: 'Alex Turner',
      email: 'student@campus360.edu',
      password: 'student123',
      role: 'student',
      department: 'Computer Science & Engineering',
      year: '3rd Year (Sem 6)',
      rollNo: '21BCSE042',
      cgpa: '8.85',
      avatar: 'AT',
      phone: '+91 98765 43210'
    },
    admin: {
      id: 'ADM-2024-001',
      name: 'Dr. Vikram Malhotra',
      email: 'admin@campus360.edu',
      password: 'admin123',
      role: 'admin',
      department: 'Dean of Academic Affairs',
      designation: 'Senior Administrator & Professor',
      avatar: 'VM',
      phone: '+91 98200 11223'
    }
  };

  // Initial Comprehensive Seed Data
  function getSeedData() {
    return {
      version: '3.0',
      notices: [
        {
          id: 'notif-001',
          title: 'Revised Schedule for Mid-Semester Examinations (Spring 2026)',
          category: 'Exam',
          department: 'Examination Cell',
          content: 'All undergraduate students are hereby notified that the Spring 2026 Mid-Semester Examinations have been rescheduled to commence from March 2, 2026. Hall tickets will be released on the portal 3 days prior. Mobile phones and smartwatches are strictly prohibited in the exam halls.',
          author: 'Dr. Vikram Malhotra (Dean)',
          date: '2026-02-18',
          timeAgo: '2 hours ago',
          isUrgent: true,
          status: 'published',
          views: 342,
          pinned: true
        },
        {
          id: 'notif-002',
          title: 'Technova 2026: Annual Inter-College Tech Symposium Registrations Open',
          category: 'Event',
          department: 'Student Affairs',
          content: 'Registrations are now open for Technova 2026! Featuring over 15 events including Hackathons, Robotics Arenas, Code Sprint, and Gaming Tournaments with prize pools exceeding Rs. 3,50,000. Early bird passes available until February 25.',
          author: 'Student Council Tech Lead',
          date: '2026-02-17',
          timeAgo: '1 day ago',
          isUrgent: false,
          status: 'published',
          views: 610,
          pinned: false
        },
        {
          id: 'notif-003',
          title: 'Submission Deadline Extended: Computer Networks Lab Record',
          category: 'Academic',
          department: 'Computer Engineering',
          content: 'The deadline for submitting the verified hard copy of Computer Networks Lab records (Assignments 1-6 with Wireshark packet captures) has been extended to Friday, 5:00 PM. Late submissions will incur a 20% mark penalty.',
          author: 'Prof. Anjali Deshmukh',
          date: '2026-02-16',
          timeAgo: '2 days ago',
          isUrgent: false,
          status: 'published',
          views: 185,
          pinned: false
        },
        {
          id: 'notif-004',
          title: 'Microsoft & TCS Campus Recruitment Drive: Registration Protocol',
          category: 'Placement',
          department: 'Training & Placement Cell',
          content: 'Eligible 3rd and final year students (B.Tech CSE, IT, EXTC with CGPA >= 7.5 and no active backlogs) must complete their mandatory profile verification on the T&P portal before February 22. Online assessments begin next week.',
          author: 'Placement Officer',
          date: '2026-02-15',
          timeAgo: '3 days ago',
          isUrgent: true,
          status: 'published',
          views: 890,
          pinned: true
        },
        {
          id: 'notif-005',
          title: 'Draft: Campus Wi-Fi 6 Upgrade Maintenance Window (Admin Only)',
          category: 'Administration',
          department: 'IT Infrastructure',
          content: 'Internal draft notice for scheduled core network maintenance during the upcoming weekend. Not yet published to general students.',
          author: 'Dr. Vikram Malhotra',
          date: '2026-02-19',
          timeAgo: 'Just now',
          isUrgent: false,
          status: 'draft',
          views: 0,
          pinned: false
        }
      ],
      events: [
        {
          id: 'evt-001',
          title: 'Technova 2026: Flagship Tech & Innovation Fest',
          category: 'Fest',
          date: '2026-03-05',
          endDate: '2026-03-07',
          time: '09:00 AM - 08:00 PM',
          venue: 'Main Auditorium & Innovation Labs',
          organizer: 'Council of Student Affairs',
          capacity: 1200,
          registeredUsers: ['STU-2024-8842'],
          description: 'The biggest annual tech carnival of the institute! 3 days packed with drone racing, paper presentations, AI exhibits, coding battles, and keynotes by prominent industry leaders from Google, NVIDIA, and Microsoft.',
          tags: ['Tech Fest', 'Hackathon', 'Cash Prizes', 'Certificates'],
          fee: 'Free for Students',
          status: 'published'
        },
        {
          id: 'evt-002',
          title: 'HackSpark: 36-Hour National AI & Cloud Hackathon',
          category: 'Hackathon',
          date: '2026-03-12',
          endDate: '2026-03-13',
          time: '08:00 AM Kickoff',
          venue: 'High Performance Computing Lab (HPC-402)',
          organizer: 'Google Developer Student Club (GDSC)',
          capacity: 250,
          registeredUsers: [],
          description: 'Build real-world AI, Web3, and HealthTech applications within 36 hours. Free food, mentors from top startups, exclusive AWS credits, and seed funding opportunities for winning prototypes.',
          tags: ['Hackathon', 'AI', 'Cloud', 'Networking'],
          fee: 'Free',
          status: 'published'
        },
        {
          id: 'evt-003',
          title: 'Hands-on Workshop: Building Autonomous Agents with Python',
          category: 'Workshop',
          date: '2026-02-27',
          endDate: '2026-02-27',
          time: '02:00 PM - 05:30 PM',
          venue: 'Seminar Hall 2, Dept of CSE',
          organizer: 'AI & Data Science Research Cell',
          capacity: 80,
          registeredUsers: [],
          description: 'Comprehensive technical workshop covering tool calling, multi-agent workflows, vector retrieval, and deployment using open source models. Bring your own laptop with Python 3.11+ installed.',
          tags: ['Workshop', 'Python', 'Generative AI', 'Certificate'],
          fee: 'Free',
          status: 'published'
        },
        {
          id: 'evt-004',
          title: 'Inter-Department Badminton & Futsal Championship',
          category: 'Sports',
          date: '2026-03-18',
          endDate: '2026-03-20',
          time: '04:00 PM - 08:30 PM',
          venue: 'Campus Indoor Sports Complex',
          organizer: 'Athletics & Sports Committee',
          capacity: 300,
          registeredUsers: [],
          description: 'Cheer for your department or compete in the annual indoor racket and futsal trophy. Refreshments and trophies for winners.',
          tags: ['Sports', 'Badminton', 'Futsal', 'Trophy'],
          fee: 'Free',
          status: 'published'
        },
        {
          id: 'evt-005',
          title: 'Symphony 2026: Annual Cultural Gala & Battle of Bands',
          category: 'Cultural',
          date: '2026-03-28',
          endDate: '2026-03-28',
          time: '06:00 PM - 10:30 PM',
          venue: 'Campus Open Air Amphitheatre',
          organizer: 'Cultural Arts Society',
          capacity: 2000,
          registeredUsers: [],
          description: 'An evening of musical euphoria, drama club showcases, choreography performances, and celebrity live band headline act.',
          tags: ['Cultural', 'Music', 'Live Band', 'Drama'],
          fee: 'Free Student Pass',
          status: 'published'
        }
      ],
      academics: {
        timetable: {
          Monday: [
            { period: 1, time: '09:00 - 10:00', code: 'CS301', subject: 'Data Structures & Algorithms', room: 'L-201', faculty: 'Prof. Sharma', type: 'Lecture' },
            { period: 2, time: '10:00 - 11:00', code: 'CS302', subject: 'Operating Systems', room: 'L-201', faculty: 'Prof. Deshmukh', type: 'Lecture' },
            { period: 3, time: '11:15 - 01:15', code: 'CS303L', subject: 'Database Management Systems Lab', room: 'Lab 4', faculty: 'Prof. Rao', type: 'Lab' },
            { period: 4, time: '02:00 - 03:00', code: 'CS304', subject: 'Computer Networks', room: 'L-204', faculty: 'Dr. Sengupta', type: 'Lecture' },
            { period: 5, time: '03:00 - 04:00', code: 'CS305', subject: 'Artificial Intelligence & ML', room: 'L-204', faculty: 'Dr. Malhotra', type: 'Lecture' }
          ],
          Tuesday: [
            { period: 1, time: '09:00 - 10:00', code: 'CS304', subject: 'Computer Networks', room: 'L-204', faculty: 'Dr. Sengupta', type: 'Lecture' },
            { period: 2, time: '10:00 - 11:00', code: 'CS305', subject: 'Artificial Intelligence & ML', room: 'L-204', faculty: 'Dr. Malhotra', type: 'Lecture' },
            { period: 3, time: '11:15 - 01:15', code: 'CS301L', subject: 'DSA & Competitive Coding Lab', room: 'Lab 2', faculty: 'Prof. Sharma', type: 'Lab' },
            { period: 4, time: '02:00 - 03:00', code: 'CS302', subject: 'Operating Systems', room: 'L-201', faculty: 'Prof. Deshmukh', type: 'Lecture' },
            { period: 5, time: '03:00 - 04:00', code: 'HS301', subject: 'Engineering Ethics & IPR', room: 'Seminar 1', faculty: 'Dr. Kulkarni', type: 'Tutorial' }
          ],
          Wednesday: [
            { period: 1, time: '09:00 - 10:00', code: 'CS303', subject: 'Database Management Systems', room: 'L-201', faculty: 'Prof. Rao', type: 'Lecture' },
            { period: 2, time: '10:00 - 11:00', code: 'CS301', subject: 'Data Structures & Algorithms', room: 'L-201', faculty: 'Prof. Sharma', type: 'Lecture' },
            { period: 3, time: '11:15 - 12:15', code: 'CS304', subject: 'Computer Networks', room: 'L-204', faculty: 'Dr. Sengupta', type: 'Lecture' },
            { period: 4, time: '01:00 - 03:00', code: 'CS302L', subject: 'Operating Systems Kernel Lab', room: 'Lab 3', faculty: 'Prof. Deshmukh', type: 'Lab' },
            { period: 5, time: '03:15 - 04:30', code: 'CS306P', subject: 'Minor Project Mentorship', room: 'Project Hub', faculty: 'All Mentors', type: 'Project' }
          ],
          Thursday: [
            { period: 1, time: '09:00 - 10:00', code: 'CS305', subject: 'Artificial Intelligence & ML', room: 'L-204', faculty: 'Dr. Malhotra', type: 'Lecture' },
            { period: 2, time: '10:00 - 11:00', code: 'CS302', subject: 'Operating Systems', room: 'L-201', faculty: 'Prof. Deshmukh', type: 'Lecture' },
            { period: 3, time: '11:15 - 01:15', code: 'CS304L', subject: 'Computer Networks Packet Lab', room: 'Lab 5', faculty: 'Dr. Sengupta', type: 'Lab' },
            { period: 4, time: '02:00 - 03:00', code: 'CS303', subject: 'Database Management Systems', room: 'L-201', faculty: 'Prof. Rao', type: 'Lecture' },
            { period: 5, time: '03:00 - 04:00', code: 'CS307', subject: 'Open Elective / Cloud Computing', room: 'Auditorium', faculty: 'Guest Faculty', type: 'Lecture' }
          ],
          Friday: [
            { period: 1, time: '09:00 - 10:00', code: 'CS301', subject: 'Data Structures & Algorithms', room: 'L-201', faculty: 'Prof. Sharma', type: 'Lecture' },
            { period: 2, time: '10:00 - 11:00', code: 'CS303', subject: 'Database Management Systems', room: 'L-201', faculty: 'Prof. Rao', type: 'Lecture' },
            { period: 3, time: '11:15 - 01:15', code: 'CS305L', subject: 'Machine Learning Model Lab', room: 'Lab 1 (GPU)', faculty: 'Dr. Malhotra', type: 'Lab' },
            { period: 4, time: '02:00 - 03:30', code: 'CCA', subject: 'Club & Co-curricular Activities', room: 'Activity Hall', faculty: 'Club Leads', type: 'Activity' }
          ],
          Saturday: [
            { period: 1, time: '09:30 - 11:30', code: 'SEM301', subject: 'Research Methodology & Technical Paper Seminar', room: 'Seminar Hall 1', faculty: 'HOD CSE', type: 'Seminar' },
            { period: 2, time: '11:45 - 01:00', code: 'TNP', subject: 'Placement Aptitude & Mock Interviews', room: 'Auditorium', faculty: 'Placement Team', type: 'Training' }
          ]
        },
        attendance: [
          { subject: 'Data Structures & Algorithms', code: 'CS301', attended: 22, total: 25, percentage: 88, status: 'safe', faculty: 'Prof. Sharma' },
          { subject: 'Operating Systems', code: 'CS302', attended: 23, total: 25, percentage: 92, status: 'safe', faculty: 'Prof. Deshmukh' },
          { subject: 'Database Management Systems', code: 'CS303', attended: 18, total: 25, percentage: 72, status: 'warning', faculty: 'Prof. Rao', marginNote: 'Need 3 more consecutive classes to reach 75%' },
          { subject: 'Computer Networks', code: 'CS304', attended: 20, total: 25, percentage: 80, status: 'safe', faculty: 'Dr. Sengupta' },
          { subject: 'Artificial Intelligence & ML', code: 'CS305', attended: 17, total: 20, percentage: 85, status: 'safe', faculty: 'Dr. Malhotra' }
        ],
        materials: [
          {
            id: 'mat-001',
            title: 'B-Trees, AVL Trees & Red-Black Trees Complete Master Notes',
            subject: 'Data Structures & Algorithms',
            code: 'CS301',
            semester: 'Sem 6',
            uploadedBy: 'Prof. Sharma',
            fileType: 'PDF',
            size: '4.8 MB',
            date: '2026-02-14',
            downloadUrl: '#preview-pdf-mat001',
            status: 'published'
          },
          {
            id: 'mat-002',
            title: 'OS Virtual Memory, Paging, and Page Replacement Algorithms Guide',
            subject: 'Operating Systems',
            code: 'CS302',
            semester: 'Sem 6',
            uploadedBy: 'Prof. Deshmukh',
            fileType: 'PDF',
            size: '3.2 MB',
            date: '2026-02-12',
            downloadUrl: '#preview-pdf-mat002',
            status: 'published'
          },
          {
            id: 'mat-003',
            title: 'DBMS Relational Calculus, 3NF/BCNF Normalization Cheatsheet',
            subject: 'Database Management Systems',
            code: 'CS303',
            semester: 'Sem 6',
            uploadedBy: 'Prof. Rao',
            fileType: 'PDF',
            size: '2.1 MB',
            date: '2026-02-10',
            downloadUrl: '#preview-pdf-mat003',
            status: 'published'
          },
          {
            id: 'mat-004',
            title: 'Neural Networks, Backpropagation & Gradient Descent Slide Deck',
            subject: 'Artificial Intelligence & ML',
            code: 'CS305',
            semester: 'Sem 6',
            uploadedBy: 'Dr. Vikram Malhotra',
            fileType: 'PPTX',
            size: '8.4 MB',
            date: '2026-02-08',
            downloadUrl: '#preview-pdf-mat004',
            status: 'published'
          }
        ],
        assignments: [
          {
            id: 'asg-001',
            title: 'Assignment 3: Implement Self-Balancing AVL Trees with Visual Rotation Traversal',
            subject: 'Data Structures & Algorithms',
            code: 'CS301',
            dueDate: '2026-02-24',
            dueInDays: 3,
            totalMarks: 20,
            instructions: 'Implement AVL Tree insertion, deletion and rotation operations in C++ or Java. Include output test runs for at least 15 edge nodes.',
            status: 'pending',
            submittedDate: null,
            score: null
          },
          {
            id: 'asg-002',
            title: 'Lab Assignment 4: Dining Philosophers & Producer-Consumer via POSIX Semaphores',
            subject: 'Operating Systems',
            code: 'CS302',
            dueDate: '2026-02-26',
            dueInDays: 5,
            totalMarks: 20,
            instructions: 'Write a multi-threaded C program using pthread and sem_wait / sem_post primitives to prevent deadlock and starvation.',
            status: 'pending',
            submittedDate: null,
            score: null
          },
          {
            id: 'asg-003',
            title: 'Assignment 2: Complex SQL Queries, Window Functions & Index Profiling',
            subject: 'Database Management Systems',
            code: 'CS303',
            dueDate: '2026-02-15',
            dueInDays: 0,
            totalMarks: 20,
            instructions: 'Analyze PostgreSQL EXPLAIN ANALYZE queries on a 100k row dataset.',
            status: 'submitted',
            submittedDate: '2026-02-14',
            score: '19 / 20'
          },
          {
            id: 'asg-004',
            title: 'Assignment 1: Convolutional Neural Network (CNN) for CIFAR-10 Image Classification',
            subject: 'Artificial Intelligence & ML',
            code: 'CS305',
            dueDate: '2026-03-02',
            dueInDays: 9,
            totalMarks: 25,
            instructions: 'Train a PyTorch or TensorFlow model achieving at least 82% validation accuracy. Submit Google Colab notebook link.',
            status: 'pending',
            submittedDate: null,
            score: null
          }
        ],
        exams: [
          { subject: 'Data Structures & Algorithms', code: 'CS301', date: '2026-03-02', time: '10:00 AM - 12:00 PM', hall: 'Exam Hall 301', seat: 'Block B-14' },
          { subject: 'Operating Systems', code: 'CS302', date: '2026-03-04', time: '10:00 AM - 12:00 PM', hall: 'Exam Hall 301', seat: 'Block B-14' },
          { subject: 'Database Management Systems', code: 'CS303', date: '2026-03-06', time: '10:00 AM - 12:00 PM', hall: 'Exam Hall 302', seat: 'Block C-08' },
          { subject: 'Computer Networks', code: 'CS304', date: '2026-03-09', time: '10:00 AM - 12:00 PM', hall: 'Exam Hall 302', seat: 'Block C-08' },
          { subject: 'Artificial Intelligence & ML', code: 'CS305', date: '2026-03-11', time: '10:00 AM - 12:00 PM', hall: 'Exam Hall 303', seat: 'Block A-22' }
        ]
      },
      opportunities: [
        {
          id: 'opp-001',
          title: 'Google Summer of Code (GSoC) 2026 Mentorship Program',
          type: 'Internship',
          company: 'Google Open Source Organizations',
          stipend: '$1,500 - $3,000 Stipend',
          location: 'Remote',
          deadline: '2026-03-24',
          description: 'Global program focused on bringing student developers into open source software development. Work with mentors on cutting-edge real-world open source codebases.',
          eligibility: 'All Enrolled College Students (18+), Git & Programming familiarity',
          applyUrl: 'https://summerofcode.withgoogle.com',
          status: 'published',
          savedBy: ['STU-2024-8842'],
          appliedBy: []
        },
        {
          id: 'opp-002',
          title: 'DRDO Defense AI & Cybersecurity Research Fellowship',
          type: 'Internship',
          company: 'Defence Research and Development Organisation',
          stipend: '₹25,000 / month',
          location: 'Pune / Bangalore Labs',
          deadline: '2026-03-15',
          description: 'Prestigious 6-month hands-on research fellowship working on secure computer vision, autonomous embedded systems, and threat intelligence telemetry.',
          eligibility: 'B.Tech 3rd/4th Year with CGPA > 8.0 in CSE/ECE/IT',
          applyUrl: '#apply-drdo',
          status: 'published',
          savedBy: [],
          appliedBy: ['STU-2024-8842']
        },
        {
          id: 'opp-003',
          title: 'National Merit STEM Innovation Scholarship 2026',
          type: 'Scholarship',
          company: 'Ministry of Education & Tech Council',
          stipend: '₹50,000 Annual Grant',
          location: 'National Level',
          deadline: '2026-03-30',
          description: 'Financial grant awarded to top 5% academic achievers pursuing engineering and technology degrees to sponsor research, books, and international conference papers.',
          eligibility: 'Full-time engineering students with family income < 8 LPA or CGPA >= 8.5',
          applyUrl: '#apply-scholarship',
          status: 'published',
          savedBy: ['STU-2024-8842'],
          appliedBy: []
        },
        {
          id: 'opp-004',
          title: 'Smart India Hackathon (SIH) 2026 — Internal College Selection',
          type: 'Competition',
          company: 'Government of India Innovation Cell',
          stipend: '₹1,00,000 First Prize',
          location: 'On-Campus Screening',
          deadline: '2026-03-08',
          description: 'Form teams of 6 students (with mandatory at least 1 female teammate) to tackle national problem statements in Smart Agriculture, Clean Water, and Cyber Defense.',
          eligibility: 'Teams of 6 students from any engineering branch',
          applyUrl: '#apply-sih',
          status: 'published',
          savedBy: [],
          appliedBy: []
        },
        {
          id: 'opp-005',
          title: 'AWS Certified Solutions Architect Student Exam Voucher 2026',
          type: 'Certification',
          company: 'Amazon Web Services Academy',
          stipend: '100% Exam Fee Waiver ($150 value)',
          location: 'Online Examination',
          deadline: '2026-04-10',
          description: 'Full voucher sponsorship provided by Institute Cloud Excellence Center for students who complete the 40-hour AWS Cloud Academy modules.',
          eligibility: 'Students with > 80% attendance in Cloud Computing module',
          applyUrl: '#apply-aws',
          status: 'published',
          savedBy: [],
          appliedBy: []
        }
      ],
      marketplace: [
        {
          id: 'mkt-001',
          title: 'Higher Engineering Mathematics — B.S. Grewal (44th Edition)',
          category: 'Textbooks',
          price: 320,
          condition: 'Like New',
          sellerId: 'STU-2024-4110',
          sellerName: 'Rohan Patil (CSE Final Year)',
          sellerContact: 'rohan.patil@campus360.edu • WhatsApp: 9811223344',
          date: '2026-02-16',
          description: 'Hardcover edition with all solved examples for Sem 1-4. No markings or folded pages. Pickup near Central Library.',
          status: 'approved'
        },
        {
          id: 'mkt-002',
          title: 'Casio fx-991EX ClassWiz Scientific Calculator (Original with Case)',
          category: 'Electronics',
          price: 850,
          condition: 'Excellent',
          sellerId: 'STU-2024-7719',
          sellerName: 'Priya Nair (EXTC 3rd Year)',
          sellerContact: 'priya.nair@campus360.edu • 9845012345',
          date: '2026-02-15',
          description: 'High-res natural textbook display with matrix, vector, and polynomial solvers. Battery replaced last month.',
          status: 'approved'
        },
        {
          id: 'mkt-003',
          title: 'Arduino Uno Ultimate Starter Kit with Sensors, Breadboard & Cables',
          category: 'Electronics',
          price: 950,
          condition: 'Like New',
          sellerId: 'STU-2024-8842',
          sellerName: 'Alex Turner (Me)',
          sellerContact: 'student@campus360.edu',
          date: '2026-02-17',
          description: 'Used only once for IoT mini-project. Includes ultrasonic sensor, servo motor, jumper wires, relay, and OLED module.',
          status: 'approved'
        },
        {
          id: 'mkt-004',
          title: 'Standard White Lab Coat / Apron (Size 38 / M) with Institute Crest',
          category: 'Stationery',
          price: 180,
          condition: 'Good',
          sellerId: 'STU-2024-3201',
          sellerName: 'Kavita Singh (Chemical Dept)',
          sellerContact: 'kavita.s@campus360.edu',
          date: '2026-02-14',
          description: 'Freshly laundered, pure cotton, no chemical stains or tears. Ideal for first/second year chemistry and physics labs.',
          status: 'approved'
        },
        {
          id: 'mkt-005',
          title: 'Omega Mini-Drafter with 360° Scale and Canvas Carrying Case',
          category: 'Lab Gear',
          price: 400,
          condition: 'Like New',
          sellerId: 'STU-2024-5541',
          sellerName: 'Sameer Kulkarni (Mech 2nd Year)',
          sellerContact: 'sameer.k@campus360.edu',
          date: '2026-02-12',
          description: 'Precision engineering drawing mini drafter with steel rod clamp. Smooth rotation, zero wobble.',
          status: 'approved'
        },
        {
          id: 'mkt-006',
          title: 'Data Structures and Algorithms in C++ — Adam Drozdek',
          category: 'Textbooks',
          price: 250,
          condition: 'Fair',
          sellerId: 'STU-2024-1190',
          sellerName: 'Divya Iyer',
          sellerContact: 'divya.i@campus360.edu',
          date: '2026-02-11',
          description: 'Good reference book for tree and graph algorithms. Some highlighter notes in Chapter 5.',
          status: 'approved'
        }
      ],
      // ----------------------------------------------------
      // A. LOST & FOUND CENTER
      // ----------------------------------------------------
      lostFound: [
        {
          id: 'lf-001',
          type: 'found',
          title: 'Brown Leather Bi-fold Wallet with Library Card',
          category: 'Keys & Wallets',
          location: 'Central Canteen (Table 14)',
          date: '2026-02-18',
          description: 'Found on table 14 after afternoon lunch hour. Contains student library card and small change. Deposited safely at Security Desk.',
          status: 'found',
          reporterId: 'STU-STAFF-01',
          reporterName: 'Canteen Staff (Security Desk)',
          claims: []
        },
        {
          id: 'lf-002',
          type: 'lost',
          title: 'Apple AirPods Pro (2nd Gen) in White MagSafe Case',
          category: 'Electronics',
          location: 'High Performance Computing Lab (HPC-402)',
          date: '2026-02-17',
          description: 'Left near workstation 18 during evening GPU practicals. Case has a small blue astronaut vinyl decal.',
          status: 'claim_pending',
          reporterId: 'STU-2024-8842',
          reporterName: 'Alex Turner',
          claims: [
            {
              id: 'cl-001',
              claimantId: 'STU-2024-8842',
              claimantName: 'Alex Turner',
              claimantDept: 'Computer Engineering',
              proofDescription: 'Case has a blue astronaut sticker on back and engraving initials AT.',
              date: '2026-02-17',
              status: 'pending'
            }
          ]
        },
        {
          id: 'lf-003',
          type: 'found',
          title: 'Official Institute Student RFID ID Card (2nd Year)',
          category: 'ID Cards',
          location: 'Library 2nd Floor Reading Hall',
          date: '2026-02-16',
          description: 'Student ID card found near Reference Shelf B-08. Cardholder has been notified via portal broadcast.',
          status: 'returned',
          reporterId: 'STU-2024-1120',
          reporterName: 'Library Desk',
          claims: [
            {
              id: 'cl-002',
              claimantId: 'STU-2024-3012',
              claimantName: 'Rohan Sharma',
              claimantDept: 'Mechanical Engineering',
              proofDescription: 'Verified with physical student photo database.',
              date: '2026-02-16',
              status: 'approved'
            }
          ]
        },
        {
          id: 'lf-004',
          type: 'lost',
          title: 'Casio fx-991EX ClassWiz Calculator with Transparent Slide Cover',
          category: 'Electronics',
          location: 'Lecture Hall L-201',
          date: '2026-02-15',
          description: 'Misplaced on the third row bench after Operating Systems lecture.',
          status: 'lost',
          reporterId: 'STU-2024-7719',
          reporterName: 'Priya Nair',
          claims: []
        },
        {
          id: 'lf-005',
          type: 'found',
          title: 'Set of 3 Yale Keys on Navy Blue Paracord Keychain',
          category: 'Keys & Wallets',
          location: 'Sports Ground Pavilion',
          date: '2026-02-14',
          description: 'Found on the first bleacher row after the inter-department football practice.',
          status: 'found',
          reporterId: 'STU-2024-5541',
          reporterName: 'Athletics Committee',
          claims: []
        }
      ],
      // ----------------------------------------------------
      // B. CAMPUS NAVIGATION & DIRECTORY
      // ----------------------------------------------------
      campusLocations: [
        {
          id: 'loc-01',
          name: 'Main Academic Block A',
          code: 'BLOCK-A',
          building: 'Block A',
          floor: 'Ground to 4th Floor',
          category: 'Classrooms',
          description: 'Core lecture halls (L-101 to L-204), Faculty Cabins, and Dean Office.',
          operatingHours: '08:00 AM - 06:30 PM',
          contact: 'Office of Academics: Ext 101'
        },
        {
          id: 'loc-02',
          name: 'High Performance Computing & AI Labs',
          code: 'HPC-402',
          building: 'Block B',
          floor: '4th Floor',
          category: 'Laboratories',
          description: 'NVIDIA RTX GPU clusters, Linux workstations, and AI research workstations.',
          operatingHours: '08:30 AM - 07:00 PM',
          contact: 'Prof. Sharma: Ext 402'
        },
        {
          id: 'loc-03',
          name: 'Central Knowledge Center & Library',
          code: 'LIB-CENTRAL',
          building: 'Library Block',
          floor: 'Ground to 3rd Floor',
          category: 'Library & Study',
          description: 'Over 45,000 engineering volumes, silent study zones, e-resource portals, and discussion carrels.',
          operatingHours: '08:00 AM - 09:30 PM',
          contact: 'Chief Librarian: Ext 300'
        },
        {
          id: 'loc-04',
          name: 'Student Plaza & Central Canteen',
          code: 'FOOD-COURT',
          building: 'Student Center',
          floor: 'Ground Floor',
          category: 'Food & Dining',
          description: 'Fresh vegetarian meals, combo thalis, snacks, beverages, and outdoor patio seating.',
          operatingHours: '08:00 AM - 07:30 PM',
          contact: 'Canteen Desk: Ext 501'
        },
        {
          id: 'loc-05',
          name: 'Dr. APJ Abdul Kalam Auditorium',
          code: 'AUDI-MAIN',
          building: 'Central Campus',
          floor: 'Ground Floor',
          category: 'Facilities',
          description: '1,200-seat state-of-the-art auditorium for symposiums, cultural nights, and corporate recruitment keynotes.',
          operatingHours: 'Event-based / 09:00 AM - 09:00 PM',
          contact: 'Auditorium In-charge: Ext 205'
        },
        {
          id: 'loc-06',
          name: 'Campus Emergency Health & First Aid Clinic',
          code: 'MED-CLINIC',
          building: 'Near Main Gate',
          floor: 'Ground Floor',
          category: 'Facilities',
          description: 'Resident medical physician, emergency oxygen, observation beds, and rapid ambulance dispatch.',
          operatingHours: '24/7 Service',
          contact: 'Emergency Medical Hotline: Ext 108'
        },
        {
          id: 'loc-07',
          name: 'Indoor Sports Complex & Gymnasium',
          code: 'SPORTS-COMPLEX',
          building: 'Sports Block',
          floor: 'Ground Floor',
          category: 'Sports & Amenities',
          description: 'Synthetic badminton courts, table tennis tables, chess room, and full gym.',
          operatingHours: '06:00 AM - 08:30 PM',
          contact: 'Athletics Office: Ext 601'
        },
        {
          id: 'loc-08',
          name: 'Training & Placement Corporate Center',
          code: 'TNP-SUITE',
          building: 'Block A',
          floor: '1st Floor',
          category: 'Administration',
          description: 'Group discussion conference halls, interview cubicles, and aptitude testing lab.',
          operatingHours: '09:00 AM - 05:30 PM',
          contact: 'T&P Officer: Ext 150'
        }
      ],
      // ----------------------------------------------------
      // D. CAMPUS TRANSPORT & COMMUTE
      // ----------------------------------------------------
      transportRoutes: [
        {
          id: 'tr-01',
          routeNumber: 'Route 1: Thane Station East',
          pickupPoints: 'Thane Stn → Teen Hath Naka → Cadbury Junction → Majiwada → Campus Gate',
          morningTimes: ['07:45 AM', '08:15 AM', '08:45 AM'],
          eveningTimes: ['04:30 PM', '05:15 PM', '06:00 PM'],
          vehicle: 'Bus #14 (45-Seater AC)',
          status: 'On Time'
        },
        {
          id: 'tr-02',
          routeNumber: 'Route 2: Borivali & Western Corridor',
          pickupPoints: 'Borivali National Park → Dahisar Check Naka → Ghodbunder Flyover → Campus Gate',
          morningTimes: ['07:15 AM', '08:00 AM'],
          eveningTimes: ['04:45 PM', '05:30 PM'],
          vehicle: 'Bus #08 (52-Seater)',
          status: 'On Time'
        },
        {
          id: 'tr-03',
          routeNumber: 'Route 3: Navi Mumbai & Vashi',
          pickupPoints: 'Vashi Plaza → Airoli Toll Naka → Rabale → Mulund Naka → Campus Gate',
          morningTimes: ['07:30 AM', '08:10 AM'],
          eveningTimes: ['04:45 PM', '05:15 PM'],
          vehicle: 'Bus #22 (45-Seater AC)',
          status: 'Departed'
        },
        {
          id: 'tr-04',
          routeNumber: 'Route 4: Kalyan & Dombivli Ring',
          pickupPoints: 'Kalyan Station → Dombivli Circle → Shilphata → Mumbra Bypass → Campus Gate',
          morningTimes: ['07:20 AM', '08:05 AM'],
          eveningTimes: ['04:50 PM', '05:25 PM'],
          vehicle: 'Bus #05 (52-Seater)',
          status: 'On Time'
        }
      ],
      // ----------------------------------------------------
      // D. CANTEEN MENU & OPERATING HOURS
      // ----------------------------------------------------
      canteenMenu: [
        { id: 'cnt-01', name: 'Veg Poha with Roasted Peanuts', category: 'Breakfast', price: 35, veg: true, availability: 'Available' },
        { id: 'cnt-02', name: 'Steamed Idli & Medu Vada Sambar', category: 'Breakfast', price: 45, veg: true, availability: 'Available' },
        { id: 'cnt-03', name: 'Paneer Cheese Grilled Sandwich', category: 'Breakfast', price: 65, veg: true, availability: 'Available' },
        { id: 'cnt-04', name: 'Executive Veg Special Thali', category: 'Lunch', price: 140, veg: true, availability: 'Popular', description: '2 Veg Gravies, Dal Tadka, Jeera Rice, 3 Butter Rotis, Gulab Jamun, Papad' },
        { id: 'cnt-05', name: 'Dal Tadka with Steam Rice', category: 'Lunch', price: 90, veg: true, availability: 'Available' },
        { id: 'cnt-06', name: 'Crispy Veg Spring Rolls (6 pcs)', category: 'Snacks', price: 50, veg: true, availability: 'Available' },
        { id: 'cnt-07', name: 'Hot Samosa Pav with Spicy Chutney (2 pcs)', category: 'Snacks', price: 28, veg: true, availability: 'Available' },
        { id: 'cnt-08', name: 'Cold Coffee with Vanilla Ice Cream', category: 'Beverages', price: 55, veg: true, availability: 'Available' },
        { id: 'cnt-09', name: 'Fresh Masala Cutting Chai', category: 'Beverages', price: 15, veg: true, availability: 'Available' }
      ],
      // ----------------------------------------------------
      // D. EMERGENCY CONTACTS & SERVICES
      // ----------------------------------------------------
      emergencyContacts: [
        { title: 'Campus Health Clinic & First Aid', contact: '+91 98200 11999', ext: '108', available: '24/7 On-Duty Resident Doctor' },
        { title: 'Campus Security & Gate Control', contact: '+91 98200 11000', ext: '100', available: '24/7 Patrol & Emergency Escort' },
        { title: 'Women Safety & Grievance Cell', contact: '+91 98200 11555', ext: '155', available: 'Confidential Dean Line' },
        { title: 'Student Counseling & Wellness', contact: '+91 98200 11333', ext: '133', available: '09:00 AM - 06:00 PM (Confidential)' },
        { title: 'IT Services & Wi-Fi Emergency Helpdesk', contact: '+91 98200 11444', ext: '404', available: '08:30 AM - 07:00 PM' }
      ],
      // ----------------------------------------------------
      // D. STUDENT CLUBS & SOCIETIES
      // ----------------------------------------------------
      clubs: [
        { id: 'clb-01', name: 'Google Developer Student Club (GDSC)', category: 'Technical', members: 310, lead: 'Aarav Sharma', meeting: 'Every Thursday, 4 PM @ HPC Lab', logo: '💻', joined: true },
        { id: 'clb-02', name: 'AI & Machine Learning Research Cell', category: 'Technical', members: 220, lead: 'Priya Nair', meeting: 'Every Tuesday, 4 PM @ Lab 4', logo: '🤖', joined: false },
        { id: 'clb-03', name: 'Robotics & Hardware Systems Club', category: 'Technical', members: 165, lead: 'Sameer Kulkarni', meeting: 'Every Friday, 3 PM @ Workshop', logo: '🛠️', joined: false },
        { id: 'clb-04', name: 'Cultural Arts & Dramatics Society', category: 'Cultural', members: 240, lead: 'Divya Iyer', meeting: 'Every Wednesday, 4:30 PM @ Amphitheatre', logo: '🎭', joined: false },
        { id: 'clb-05', name: 'Athletics & Sports Committee', category: 'Sports', members: 290, lead: 'Rohan Patil', meeting: 'Daily Practice @ Sports Complex', logo: '🏆', joined: true }
      ],
      // ----------------------------------------------------
      // D. FEEDBACK & COMPLAINTS WITH TRACKING
      // ----------------------------------------------------
      feedbackReports: [
        {
          id: 'ISSUE-2026-881',
          category: 'Wi-Fi & Network',
          title: 'Intermittent Wi-Fi signal drop on Library 3rd Floor',
          description: 'High packet loss while accessing IEEE Xplore digital library research papers.',
          date: '2026-02-16',
          studentName: 'Alex Turner',
          status: 'under_review',
          adminNotes: 'Network team deploying an additional Cisco Catalyst Wi-Fi 6 access point on Feb 19.'
        },
        {
          id: 'ISSUE-2026-874',
          category: 'Facilities & Infrastructure',
          title: 'Loose HDMI cable in Seminar Hall 2 presentation podium',
          description: 'Display project switches off intermittently during group slides.',
          date: '2026-02-14',
          studentName: 'Priya Nair',
          status: 'resolved',
          adminNotes: 'Replaced with 4K gold-plated braided HDMI cable by campus AV support.'
        },
        {
          id: 'ISSUE-2026-890',
          category: 'Canteen & Hygiene',
          title: 'Evening snack counter runs out early during exam weeks',
          description: 'Need extended bakery and tea availability until 06:30 PM for lab students.',
          date: '2026-02-18',
          studentName: 'Rohan Patil',
          status: 'submitted',
          adminNotes: null
        }
      ],
      notifications: [
        {
          id: 'notif-sys-01',
          title: 'Mid-Semester Exam Schedule Published',
          message: 'The examination timetable for Spring 2026 is now live on the noticeboard.',
          timestamp: '2 hours ago',
          type: 'exam',
          read: false,
          targetRole: 'all',
          link: 'pages/notices.html'
        },
        {
          id: 'notif-sys-02',
          title: 'Technova 2026 Registration Confirmed',
          message: 'You have successfully registered for the Technova 2026 pass! Check your ticket in profile.',
          timestamp: '1 day ago',
          type: 'event',
          read: true,
          targetRole: 'student',
          link: 'pages/campus-life.html'
        },
        {
          id: 'notif-sys-03',
          title: 'Attendance Warning in DBMS',
          message: 'Your current attendance in Database Management Systems is 72% (below required 75%).',
          timestamp: '2 days ago',
          type: 'academic',
          read: false,
          targetRole: 'student',
          link: 'pages/dashboard.html'
        },
        {
          id: 'notif-sys-04',
          title: 'New Opportunity: DRDO Research Fellowship',
          message: 'Dean of Academic Affairs published a new verified defense fellowship opportunity.',
          timestamp: '3 days ago',
          type: 'opportunity',
          read: true,
          targetRole: 'student',
          link: 'pages/opportunities.html'
        }
      ],
      activityLog: [
        { id: 'act-001', action: 'Published Notice', target: 'Revised Schedule for Mid-Semester Examinations', user: 'Dr. Vikram Malhotra', role: 'admin', timestamp: '2026-02-18 14:30' },
        { id: 'act-002', action: 'Created Event', target: 'Technova 2026', user: 'Dr. Vikram Malhotra', role: 'admin', timestamp: '2026-02-17 11:15' },
        { id: 'act-003', action: 'Uploaded Study Notes', target: 'B-Trees, AVL Trees Notes', user: 'Prof. Sharma', role: 'admin', timestamp: '2026-02-14 16:00' }
      ]
    };
  }

  // Database Class
  class CampusDatabase {
    constructor() {
      this.initDB();
      this.initAuth();
    }

    initDB() {
      try {
        const raw = localStorage.getItem(DB_STORAGE_KEY);
        if (!raw) {
          this.data = getSeedData();
          this.saveDB();
        } else {
          this.data = JSON.parse(raw);
          if (!this.data.version || this.data.version !== '3.0') {
            this.data = getSeedData();
            this.saveDB();
          }
        }
      } catch (e) {
        console.warn('CampusDB: Failed to load from storage, resetting to seed data.', e);
        this.data = getSeedData();
        this.saveDB();
      }
    }

    saveDB() {
      try {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('CampusDB: Error saving to LocalStorage', e);
      }
    }

    notifyChange(collection, action, item) {
      this.saveDB();
      window.dispatchEvent(
        new CustomEvent('campus:db-change', {
          detail: { collection, action, item, timestamp: Date.now() }
        })
      );
    }

    // ----------------------------------------------------
    // AUTHENTICATION & ROLE MANAGEMENT
    // ----------------------------------------------------
    initAuth() {
      try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) {
          this.currentUser = JSON.parse(raw);
        } else {
          this.currentUser = { ...DEMO_USERS.student };
          this.saveAuth();
        }
      } catch (e) {
        this.currentUser = { ...DEMO_USERS.student };
        this.saveAuth();
      }
    }

    saveAuth() {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
      } catch (e) {}
    }

    getCurrentUser() {
      return this.currentUser;
    }

    getRole() {
      return this.currentUser ? this.currentUser.role : 'guest';
    }

    isAdmin() {
      return this.currentUser && this.currentUser.role === 'admin';
    }

    isStudent() {
      return this.currentUser && this.currentUser.role === 'student';
    }

    login(email, password) {
      const cleanEmail = (email || '').trim().toLowerCase();
      if (cleanEmail === DEMO_USERS.admin.email.toLowerCase() && password === DEMO_USERS.admin.password) {
        this.currentUser = { ...DEMO_USERS.admin };
        this.saveAuth();
        window.dispatchEvent(new CustomEvent('campus:auth-change', { detail: { user: this.currentUser } }));
        return { success: true, user: this.currentUser };
      }
      if (cleanEmail === DEMO_USERS.student.email.toLowerCase() && password === DEMO_USERS.student.password) {
        this.currentUser = { ...DEMO_USERS.student };
        this.saveAuth();
        window.dispatchEvent(new CustomEvent('campus:auth-change', { detail: { user: this.currentUser } }));
        return { success: true, user: this.currentUser };
      }
      return { success: false, message: 'Invalid credentials. Use student@campus360.edu or admin@campus360.edu' };
    }

    loginAs(role) {
      if (role === 'admin') {
        this.currentUser = { ...DEMO_USERS.admin };
      } else {
        this.currentUser = { ...DEMO_USERS.student };
      }
      this.saveAuth();
      window.dispatchEvent(new CustomEvent('campus:auth-change', { detail: { user: this.currentUser } }));
      return this.currentUser;
    }

    logout() {
      this.currentUser = null;
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('campus:auth-change', { detail: { user: null } }));
    }

    requireAdmin() {
      if (!this.isAdmin()) {
        throw new Error('Unauthorized: Administrator privilege required for this action.');
      }
    }

    resetDatabase() {
      this.data = getSeedData();
      this.saveDB();
      this.notifyChange('all', 'reset', null);
      return true;
    }

    // ----------------------------------------------------
    // NOTICES / ANNOUNCEMENTS
    // ----------------------------------------------------
    getNotices(options = {}) {
      const { category, search, department, status, onlyPublished = true } = options;
      let list = [...(this.data.notices || [])];

      if (!this.isAdmin() || onlyPublished) {
        list = list.filter(n => n.status === 'published');
      } else if (status) {
        list = list.filter(n => n.status === status);
      }

      if (category && category !== 'all') {
        if (category === 'Urgent') {
          list = list.filter(n => n.isUrgent);
        } else {
          list = list.filter(n => n.category.toLowerCase() === category.toLowerCase());
        }
      }

      if (department && department !== 'all') {
        list = list.filter(n => n.department.toLowerCase().includes(department.toLowerCase()));
      }

      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        list = list.filter(n =>
          n.title.toLowerCase().includes(query) ||
          n.content.toLowerCase().includes(query) ||
          n.department.toLowerCase().includes(query)
        );
      }

      return list.sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        if (a.isUrgent !== b.isUrgent) return b.isUrgent ? 1 : -1;
        return new Date(b.date) - new Date(a.date);
      });
    }

    getNoticeById(id) {
      return (this.data.notices || []).find(n => n.id === id);
    }

    createNotice(noticeData) {
      this.requireAdmin();
      const newNotice = {
        id: 'notif-' + Date.now().toString(36),
        title: noticeData.title.trim(),
        category: noticeData.category || 'General',
        department: noticeData.department || 'Institute Administration',
        content: noticeData.content.trim(),
        author: this.currentUser.name + ' (' + (this.currentUser.designation || 'Admin') + ')',
        date: new Date().toISOString().split('T')[0],
        timeAgo: 'Just now',
        isUrgent: Boolean(noticeData.isUrgent),
        status: noticeData.status || 'published',
        views: 0,
        pinned: Boolean(noticeData.pinned)
      };

      this.data.notices.unshift(newNotice);

      if (newNotice.status === 'published') {
        this.addNotification({
          title: (newNotice.isUrgent ? '🚨 Urgent: ' : '📢 ') + newNotice.title,
          message: newNotice.content.slice(0, 120) + '...',
          type: 'notice',
          targetRole: 'all',
          link: 'pages/notices.html'
        });
      }

      this.logActivity('Published Notice', newNotice.title);
      this.notifyChange('notices', 'create', newNotice);
      return newNotice;
    }

    updateNotice(id, updates) {
      this.requireAdmin();
      const index = (this.data.notices || []).findIndex(n => n.id === id);
      if (index === -1) throw new Error('Notice not found.');

      this.data.notices[index] = {
        ...this.data.notices[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.logActivity('Updated Notice', this.data.notices[index].title);
      this.notifyChange('notices', 'update', this.data.notices[index]);
      return this.data.notices[index];
    }

    deleteNotice(id) {
      this.requireAdmin();
      const notice = this.getNoticeById(id);
      if (!notice) return false;

      this.data.notices = this.data.notices.filter(n => n.id !== id);
      this.logActivity('Deleted Notice', notice.title);
      this.notifyChange('notices', 'delete', { id });
      return true;
    }

    // ----------------------------------------------------
    // EVENTS & CAMPUS LIFE
    // ----------------------------------------------------
    getEvents(options = {}) {
      const { category, search, onlyPublished = true, registeredOnly = false } = options;
      let list = [...(this.data.events || [])];

      if (!this.isAdmin() || onlyPublished) {
        list = list.filter(e => e.status === 'published');
      }

      if (registeredOnly && this.currentUser) {
        list = list.filter(e => (e.registeredUsers || []).includes(this.currentUser.id));
      }

      if (category && category !== 'all') {
        list = list.filter(e => e.category.toLowerCase() === category.toLowerCase());
      }

      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        list = list.filter(e =>
          e.title.toLowerCase().includes(query) ||
          e.venue.toLowerCase().includes(query) ||
          e.organizer.toLowerCase().includes(query) ||
          (e.tags || []).some(t => t.toLowerCase().includes(query))
        );
      }

      return list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getEventById(id) {
      return (this.data.events || []).find(e => e.id === id);
    }

    createEvent(eventData) {
      this.requireAdmin();
      const newEvent = {
        id: 'evt-' + Date.now().toString(36),
        title: eventData.title.trim(),
        category: eventData.category || 'Fest',
        date: eventData.date,
        endDate: eventData.endDate || eventData.date,
        time: eventData.time || '10:00 AM - 05:00 PM',
        venue: eventData.venue || 'Campus Auditorium',
        organizer: eventData.organizer || 'Student Affairs',
        capacity: Number(eventData.capacity) || 500,
        registeredUsers: [],
        description: eventData.description || '',
        tags: Array.isArray(eventData.tags) ? eventData.tags : (eventData.tags || 'Campus, Event').split(',').map(s => s.trim()),
        fee: eventData.fee || 'Free for Students',
        status: eventData.status || 'published'
      };

      this.data.events.unshift(newEvent);

      if (newEvent.status === 'published') {
        this.addNotification({
          title: '🎉 New Campus Event: ' + newEvent.title,
          message: `Join ${newEvent.title} at ${newEvent.venue} on ${newEvent.date}. Registrations now open!`,
          type: 'event',
          targetRole: 'all',
          link: 'pages/campus-life.html'
        });
      }

      this.logActivity('Created Event', newEvent.title);
      this.notifyChange('events', 'create', newEvent);
      return newEvent;
    }

    updateEvent(id, updates) {
      this.requireAdmin();
      const index = (this.data.events || []).findIndex(e => e.id === id);
      if (index === -1) throw new Error('Event not found.');

      this.data.events[index] = { ...this.data.events[index], ...updates };
      this.logActivity('Updated Event', this.data.events[index].title);
      this.notifyChange('events', 'update', this.data.events[index]);
      return this.data.events[index];
    }

    deleteEvent(id) {
      this.requireAdmin();
      const event = this.getEventById(id);
      if (!event) return false;

      this.data.events = this.data.events.filter(e => e.id !== id);
      this.logActivity('Deleted Event', event.title);
      this.notifyChange('events', 'delete', { id });
      return true;
    }

    registerForEvent(eventId) {
      if (!this.currentUser) throw new Error('Please login to register for events.');
      const event = this.getEventById(eventId);
      if (!event) throw new Error('Event not found.');

      if (!event.registeredUsers) event.registeredUsers = [];

      const alreadyRegistered = event.registeredUsers.includes(this.currentUser.id);
      if (alreadyRegistered) {
        event.registeredUsers = event.registeredUsers.filter(id => id !== this.currentUser.id);
        this.notifyChange('events', 'registration-cancelled', event);
        return { registered: false, event };
      } else {
        if (event.registeredUsers.length >= event.capacity) {
          throw new Error('Registration closed: Event capacity reached.');
        }
        event.registeredUsers.push(this.currentUser.id);
        const ticketCode = 'TKT-' + eventId.slice(-3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
        this.addNotification({
          title: '🎟️ Registration Confirmed: ' + event.title,
          message: `Your pass code is ${ticketCode}. Show this at ${event.venue} on ${event.date}.`,
          type: 'event',
          targetRole: 'student',
          link: 'pages/campus-life.html'
        });
        this.notifyChange('events', 'registered', { event, ticketCode });
        return { registered: true, ticketCode, event };
      }
    }

    isEventRegistered(eventId) {
      if (!this.currentUser) return false;
      const event = this.getEventById(eventId);
      return Boolean(event && event.registeredUsers && event.registeredUsers.includes(this.currentUser.id));
    }

    // ----------------------------------------------------
    // ACADEMICS (TIMETABLE, ATTENDANCE, MATERIALS, ASSIGNMENTS, EXAMS)
    // ----------------------------------------------------
    getTimetable(day = 'Monday') {
      const timetable = (this.data.academics && this.data.academics.timetable) || {};
      return timetable[day] || [];
    }

    getAttendanceSummary() {
      const list = (this.data.academics && this.data.academics.attendance) || [];
      const totalAttended = list.reduce((sum, item) => sum + item.attended, 0);
      const totalConducted = list.reduce((sum, item) => sum + item.total, 0);
      const overall = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 1000) / 10 : 0;
      return {
        overall,
        totalAttended,
        totalConducted,
        subjects: list
      };
    }

    getStudyMaterials(subjectFilter = 'all', searchQuery = '') {
      let list = (this.data.academics && this.data.academics.materials) || [];
      if (subjectFilter && subjectFilter !== 'all') {
        list = list.filter(m => m.subject.toLowerCase().includes(subjectFilter.toLowerCase()) || m.code.toLowerCase() === subjectFilter.toLowerCase());
      }
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(m => m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q));
      }
      return list;
    }

    createStudyMaterial(materialData) {
      this.requireAdmin();
      const newMaterial = {
        id: 'mat-' + Date.now().toString(36),
        title: materialData.title.trim(),
        subject: materialData.subject || 'Computer Science',
        code: materialData.code || 'CS300',
        semester: materialData.semester || 'Sem 6',
        uploadedBy: this.currentUser.name,
        fileType: materialData.fileType || 'PDF',
        size: materialData.size || '3.5 MB',
        date: new Date().toISOString().split('T')[0],
        downloadUrl: '#material-preview',
        status: 'published'
      };

      if (!this.data.academics.materials) this.data.academics.materials = [];
      this.data.academics.materials.unshift(newMaterial);

      this.addNotification({
        title: '📚 New Study Material: ' + newMaterial.subject,
        message: `${newMaterial.title} was uploaded by ${this.currentUser.name}.`,
        type: 'academic',
        targetRole: 'student',
        link: 'pages/academics.html'
      });

      this.logActivity('Uploaded Study Notes', newMaterial.title);
      this.notifyChange('academics', 'material-create', newMaterial);
      return newMaterial;
    }

    deleteStudyMaterial(id) {
      this.requireAdmin();
      if (!this.data.academics.materials) return false;
      this.data.academics.materials = this.data.academics.materials.filter(m => m.id !== id);
      this.notifyChange('academics', 'material-delete', { id });
      return true;
    }

    getAssignments(statusFilter = 'all') {
      let list = (this.data.academics && this.data.academics.assignments) || [];
      if (statusFilter && statusFilter !== 'all') {
        list = list.filter(a => a.status === statusFilter);
      }
      return list;
    }

    createAssignment(data) {
      this.requireAdmin();
      const newAsg = {
        id: 'asg-' + Date.now().toString(36),
        title: data.title.trim(),
        subject: data.subject || 'General Engineering',
        code: data.code || 'CS300',
        dueDate: data.dueDate,
        dueInDays: Math.max(0, Math.ceil((new Date(data.dueDate) - new Date()) / (1000 * 60 * 60 * 24))),
        totalMarks: Number(data.totalMarks) || 20,
        instructions: data.instructions || '',
        status: 'pending',
        submittedDate: null,
        score: null
      };

      if (!this.data.academics.assignments) this.data.academics.assignments = [];
      this.data.academics.assignments.unshift(newAsg);

      this.addNotification({
        title: '📝 New Assignment Due: ' + newAsg.subject,
        message: `${newAsg.title} (Due: ${newAsg.dueDate}). Max Marks: ${newAsg.totalMarks}.`,
        type: 'academic',
        targetRole: 'student',
        link: 'pages/academics.html'
      });

      this.logActivity('Published Assignment', newAsg.title);
      this.notifyChange('academics', 'assignment-create', newAsg);
      return newAsg;
    }

    submitAssignment(id, fileInfo = {}) {
      const assignments = (this.data.academics && this.data.academics.assignments) || [];
      const asg = assignments.find(a => a.id === id);
      if (!asg) throw new Error('Assignment not found.');

      asg.status = 'submitted';
      asg.submittedDate = new Date().toISOString().split('T')[0];
      asg.submissionNotes = fileInfo.notes || 'Verified digital assignment submission';

      this.addNotification({
        title: '✅ Assignment Submitted Successfully',
        message: `Your submission for "${asg.title}" has been recorded for evaluation.`,
        type: 'academic',
        targetRole: 'student',
        link: 'pages/academics.html'
      });

      this.notifyChange('academics', 'assignment-submit', asg);
      return asg;
    }

    getExamsSchedule() {
      return (this.data.academics && this.data.academics.exams) || [];
    }

    // ----------------------------------------------------
    // OPPORTUNITIES HUB (INTERNSHIPS, SCHOLARSHIPS, COMPETITIONS)
    // ----------------------------------------------------
    getOpportunities(options = {}) {
      const { type, search, onlyPublished = true, savedOnly = false } = options;
      let list = [...(this.data.opportunities || [])];

      if (!this.isAdmin() || onlyPublished) {
        list = list.filter(o => o.status === 'published');
      }

      if (savedOnly && this.currentUser) {
        list = list.filter(o => (o.savedBy || []).includes(this.currentUser.id));
      }

      if (type && type !== 'all') {
        list = list.filter(o => o.type.toLowerCase() === type.toLowerCase());
      }

      if (search && search.trim()) {
        const q = search.toLowerCase();
        list = list.filter(o =>
          o.title.toLowerCase().includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q)
        );
      }

      return list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    createOpportunity(data) {
      this.requireAdmin();
      const newOpp = {
        id: 'opp-' + Date.now().toString(36),
        title: data.title.trim(),
        type: data.type || 'Internship',
        company: data.company.trim(),
        stipend: data.stipend || 'Competitive Stipend',
        location: data.location || 'Remote / Hybrid',
        deadline: data.deadline,
        description: data.description || '',
        eligibility: data.eligibility || 'All engineering students with relevant skills',
        applyUrl: data.applyUrl || '#apply',
        status: data.status || 'published',
        savedBy: [],
        appliedBy: []
      };

      this.data.opportunities.unshift(newOpp);

      if (newOpp.status === 'published') {
        this.addNotification({
          title: '🚀 New Career Opportunity: ' + newOpp.title,
          message: `${newOpp.company} is hiring for ${newOpp.type} (${newOpp.stipend}). Apply by ${newOpp.deadline}.`,
          type: 'opportunity',
          targetRole: 'student',
          link: 'pages/opportunities.html'
        });
      }

      this.logActivity('Posted Opportunity', newOpp.title);
      this.notifyChange('opportunities', 'create', newOpp);
      return newOpp;
    }

    updateOpportunity(id, updates) {
      this.requireAdmin();
      const index = (this.data.opportunities || []).findIndex(o => o.id === id);
      if (index === -1) throw new Error('Opportunity not found.');

      this.data.opportunities[index] = { ...this.data.opportunities[index], ...updates };
      this.logActivity('Updated Opportunity', this.data.opportunities[index].title);
      this.notifyChange('opportunities', 'update', this.data.opportunities[index]);
      return this.data.opportunities[index];
    }

    deleteOpportunity(id) {
      this.requireAdmin();
      const opp = (this.data.opportunities || []).find(o => o.id === id);
      if (!opp) return false;

      this.data.opportunities = this.data.opportunities.filter(o => o.id !== id);
      this.logActivity('Deleted Opportunity', opp.title);
      this.notifyChange('opportunities', 'delete', { id });
      return true;
    }

    toggleSaveOpportunity(id) {
      if (!this.currentUser) throw new Error('Please login to bookmark opportunities.');
      const opp = (this.data.opportunities || []).find(o => o.id === id);
      if (!opp) throw new Error('Opportunity not found.');

      if (!opp.savedBy) opp.savedBy = [];
      const isSaved = opp.savedBy.includes(this.currentUser.id);

      if (isSaved) {
        opp.savedBy = opp.savedBy.filter(uid => uid !== this.currentUser.id);
      } else {
        opp.savedBy.push(this.currentUser.id);
      }

      this.notifyChange('opportunities', 'saved-toggle', { id, isSaved: !isSaved });
      return !isSaved;
    }

    applyOpportunity(id, applicationNotes = '') {
      if (!this.currentUser) throw new Error('Please login to apply.');
      const opp = (this.data.opportunities || []).find(o => o.id === id);
      if (!opp) throw new Error('Opportunity not found.');

      if (!opp.appliedBy) opp.appliedBy = [];
      if (!opp.appliedBy.includes(this.currentUser.id)) {
        opp.appliedBy.push(this.currentUser.id);
      }

      this.addNotification({
        title: '📋 Application Submitted: ' + opp.title,
        message: `Your application profile was successfully transmitted to ${opp.company}.`,
        type: 'opportunity',
        targetRole: 'student',
        link: 'pages/opportunities.html'
      });

      this.notifyChange('opportunities', 'applied', { id, opp });
      return true;
    }

    // ----------------------------------------------------
    // STUDENT MARKETPLACE (BUY, SELL, MODERATE)
    // ----------------------------------------------------
    getMarketplaceListings(options = {}) {
      const { category, search, sort = 'newest', statusFilter = 'approved' } = options;
      let list = [...(this.data.marketplace || [])];

      if (!this.isAdmin()) {
        list = list.filter(item => item.status === 'approved' || (this.currentUser && item.sellerId === this.currentUser.id));
      } else if (statusFilter && statusFilter !== 'all') {
        list = list.filter(item => item.status === statusFilter);
      }

      if (category && category !== 'all') {
        list = list.filter(item => item.category.toLowerCase() === category.toLowerCase());
      }

      if (search && search.trim()) {
        const q = search.toLowerCase();
        list = list.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.sellerName.toLowerCase().includes(q)
        );
      }

      if (sort === 'price-low') {
        list.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        list.sort((a, b) => b.price - a.price);
      } else {
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      return list;
    }

    createMarketplaceListing(data) {
      if (!this.currentUser) throw new Error('Login required to post items.');

      const newListing = {
        id: 'mkt-' + Date.now().toString(36),
        title: data.title.trim(),
        category: data.category || 'Stationery',
        price: Number(data.price) || 0,
        condition: data.condition || 'Good',
        sellerId: this.currentUser.id,
        sellerName: this.currentUser.name + (this.isAdmin() ? ' (Faculty)' : ' (' + (this.currentUser.department ? this.currentUser.department.split(' ')[0] : 'Student') + ')'),
        sellerContact: data.contact || this.currentUser.email,
        date: new Date().toISOString().split('T')[0],
        description: data.description || '',
        status: 'approved'
      };

      this.data.marketplace.unshift(newListing);

      this.addNotification({
        title: '🛍️ Marketplace Item Listed',
        message: `"${newListing.title}" is now available for other students to explore at ₹${newListing.price}.`,
        type: 'marketplace',
        targetRole: 'all',
        link: 'pages/marketplace.html'
      });

      this.logActivity('Posted Marketplace Listing', newListing.title);
      this.notifyChange('marketplace', 'create', newListing);
      return newListing;
    }

    deleteMarketplaceListing(id) {
      const item = (this.data.marketplace || []).find(m => m.id === id);
      if (!item) return false;

      if (!this.isAdmin() && (!this.currentUser || item.sellerId !== this.currentUser.id)) {
        throw new Error('Unauthorized to remove this listing.');
      }

      this.data.marketplace = this.data.marketplace.filter(m => m.id !== id);
      this.logActivity('Removed Listing', item.title);
      this.notifyChange('marketplace', 'delete', { id });
      return true;
    }

    // ----------------------------------------------------
    // A. LOST & FOUND CENTER (STUDENTS & ADMIN)
    // ----------------------------------------------------
    getLostFoundItems(options = {}) {
      const { type, category, status, search } = options;
      let list = [...(this.data.lostFound || [])];

      if (type && type !== 'all') {
        list = list.filter(i => i.type === type);
      }

      if (category && category !== 'all') {
        list = list.filter(i => i.category.toLowerCase() === category.toLowerCase());
      }

      if (status && status !== 'all') {
        list = list.filter(i => i.status === status);
      }

      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(i =>
          i.title.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
        );
      }

      return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    getLostFoundById(id) {
      return (this.data.lostFound || []).find(i => i.id === id);
    }

    reportLostFoundItem(data) {
      if (!this.currentUser) throw new Error('Please login to report items.');

      const newItem = {
        id: 'lf-' + Date.now().toString(36),
        type: data.type || 'found', // 'lost' | 'found'
        title: data.title.trim(),
        category: data.category || 'Other',
        location: data.location.trim(),
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description.trim(),
        status: data.type === 'lost' ? 'lost' : 'found', // 'lost', 'found', 'claim_pending', 'returned'
        reporterId: this.currentUser.id,
        reporterName: this.currentUser.name,
        reporterRole: this.currentUser.role,
        claims: []
      };

      if (!this.data.lostFound) this.data.lostFound = [];
      this.data.lostFound.unshift(newItem);

      this.addNotification({
        title: `🔎 Lost & Found: New ${newItem.type.toUpperCase()} Item`,
        message: `${newItem.title} was reported at ${newItem.location}.`,
        type: 'lost_found',
        targetRole: 'all',
        link: 'pages/campus-life.html#lost-found'
      });

      this.logActivity(`Reported ${newItem.type.toUpperCase()} Item`, newItem.title);
      this.notifyChange('lostFound', 'create', newItem);
      return newItem;
    }

    claimLostFoundItem(itemId, claimDetails) {
      if (!this.currentUser) throw new Error('Please login to submit a claim.');
      const item = this.getLostFoundById(itemId);
      if (!item) throw new Error('Item not found.');

      const claim = {
        id: 'cl-' + Date.now().toString(36),
        claimantId: this.currentUser.id,
        claimantName: this.currentUser.name,
        claimantDept: this.currentUser.department || 'Enrolled Student',
        proofDescription: claimDetails.proofDescription.trim(),
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      if (!item.claims) item.claims = [];
      item.claims.push(claim);
      item.status = 'claim_pending';

      this.addNotification({
        title: '🛡️ Claim Submitted: ' + item.title,
        message: `Your ownership claim for ${item.title} has been forwarded to campus security/admin for verification.`,
        type: 'lost_found',
        targetRole: 'student',
        link: 'pages/campus-life.html#lost-found'
      });

      this.logActivity('Submitted Item Claim', `${this.currentUser.name} claimed ${item.title}`);
      this.notifyChange('lostFound', 'claim', { item, claim });
      return claim;
    }

    verifyClaim(itemId, claimId, action) {
      this.requireAdmin();
      const item = this.getLostFoundById(itemId);
      if (!item) throw new Error('Item not found.');

      const claim = (item.claims || []).find(c => c.id === claimId);
      if (!claim) throw new Error('Claim not found.');

      if (action === 'approve') {
        claim.status = 'approved';
        item.status = 'returned';

        this.addNotification({
          title: '✅ Claim Approved: ' + item.title,
          message: `Your claim was approved! You can pick up the item at Central Security Desk with your ID card.`,
          type: 'lost_found',
          targetRole: 'all',
          link: 'pages/campus-life.html#lost-found'
        });
      } else {
        claim.status = 'rejected';
        item.status = item.type === 'lost' ? 'lost' : 'found';
      }

      this.logActivity('Verified Claim', `${action.toUpperCase()} for ${item.title}`);
      this.notifyChange('lostFound', 'verify-claim', { item, claim, action });
      return item;
    }

    deleteLostFound(id) {
      this.requireAdmin();
      const item = this.getLostFoundById(id);
      if (!item) return false;

      this.data.lostFound = (this.data.lostFound || []).filter(i => i.id !== id);
      this.logActivity('Deleted Lost & Found Item', item.title);
      this.notifyChange('lostFound', 'delete', { id });
      return true;
    }

    // ----------------------------------------------------
    // B. CAMPUS NAVIGATION & DIRECTORY
    // ----------------------------------------------------
    getCampusLocations(category = 'all', searchQuery = '') {
      let list = [...(this.data.campusLocations || [])];

      if (category && category !== 'all') {
        list = list.filter(l => l.category.toLowerCase() === category.toLowerCase());
      }

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(l =>
          l.name.toLowerCase().includes(q) ||
          l.code.toLowerCase().includes(q) ||
          l.building.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
        );
      }

      return list;
    }

    addCampusLocation(data) {
      this.requireAdmin();
      const newLoc = {
        id: 'loc-' + Date.now().toString(36),
        name: data.name.trim(),
        code: data.code.trim().toUpperCase(),
        building: data.building.trim(),
        floor: data.floor || 'Ground Floor',
        category: data.category || 'Classrooms',
        description: data.description || '',
        operatingHours: data.operatingHours || '08:00 AM - 06:00 PM',
        contact: data.contact || 'Campus Helpdesk'
      };

      if (!this.data.campusLocations) this.data.campusLocations = [];
      this.data.campusLocations.unshift(newLoc);

      this.logActivity('Added Campus Location', newLoc.name);
      this.notifyChange('campusLocations', 'create', newLoc);
      return newLoc;
    }

    deleteCampusLocation(id) {
      this.requireAdmin();
      this.data.campusLocations = (this.data.campusLocations || []).filter(l => l.id !== id);
      this.notifyChange('campusLocations', 'delete', { id });
      return true;
    }

    getDirections(fromId, toId) {
      const from = (this.data.campusLocations || []).find(l => l.id === fromId);
      const to = (this.data.campusLocations || []).find(l => l.id === toId);
      if (!from || !to) return null;

      return {
        from: from.name,
        to: to.name,
        estimatedTime: '3 - 5 mins walk',
        distance: '180 meters',
        steps: [
          `Exit ${from.building} at the central foyer`,
          `Proceed along the covered pedestrian walkway towards ${to.building}`,
          `Take the central stairs / elevator to ${to.floor}`,
          `Arrive at ${to.name} (${to.code})`
        ]
      };
    }

    // ----------------------------------------------------
    // D. CAMPUS TRANSPORT ROUTES & CANTEEN
    // ----------------------------------------------------
    getTransportRoutes() {
      return this.data.transportRoutes || [];
    }

    updateTransportStatus(id, newStatus) {
      this.requireAdmin();
      const route = (this.data.transportRoutes || []).find(r => r.id === id);
      if (route) {
        route.status = newStatus;
        this.notifyChange('transportRoutes', 'update', route);
      }
      return route;
    }

    getCanteenMenu() {
      return this.data.canteenMenu || [];
    }

    getEmergencyContacts() {
      return this.data.emergencyContacts || [];
    }

    getClubs() {
      return this.data.clubs || [];
    }

    toggleClubJoin(clubId) {
      if (!this.currentUser) throw new Error('Please login to join clubs.');
      const club = (this.data.clubs || []).find(c => c.id === clubId);
      if (!club) throw new Error('Club not found.');

      club.joined = !club.joined;
      if (club.joined) club.members += 1;
      else club.members -= 1;

      this.notifyChange('clubs', 'toggle-join', club);
      return club;
    }

    // ----------------------------------------------------
    // D. FEEDBACK & COMPLAINTS WITH STATUS TRACKING
    // ----------------------------------------------------
    getFeedbackReports() {
      return this.data.feedbackReports || [];
    }

    submitFeedback(data) {
      if (!this.currentUser) throw new Error('Please login to submit feedback.');
      const newReport = {
        id: 'ISSUE-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
        category: data.category || 'General',
        title: data.title.trim(),
        description: data.description.trim(),
        date: new Date().toISOString().split('T')[0],
        studentName: this.currentUser.name,
        status: 'submitted',
        adminNotes: null
      };

      if (!this.data.feedbackReports) this.data.feedbackReports = [];
      this.data.feedbackReports.unshift(newReport);

      this.addNotification({
        title: '📋 Ticket Generated: ' + newReport.id,
        message: `Your issue regarding "${newReport.title}" was registered for Dean review.`,
        type: 'feedback',
        targetRole: 'student',
        link: 'pages/dashboard.html#utilities'
      });

      this.logActivity('Submitted Issue Ticket', newReport.id);
      this.notifyChange('feedbackReports', 'create', newReport);
      return newReport;
    }

    updateFeedbackStatus(id, newStatus, adminNotes = '') {
      this.requireAdmin();
      const report = (this.data.feedbackReports || []).find(r => r.id === id);
      if (!report) throw new Error('Report ticket not found.');

      report.status = newStatus;
      if (adminNotes) report.adminNotes = adminNotes;

      this.addNotification({
        title: `⚡ Ticket ${report.id} Status: ${newStatus.toUpperCase()}`,
        message: `Your grievance ticket "${report.title}" status has been updated to ${newStatus}.`,
        type: 'feedback',
        targetRole: 'student',
        link: 'pages/dashboard.html#utilities'
      });

      this.logActivity('Updated Issue Status', `${report.id} -> ${newStatus}`);
      this.notifyChange('feedbackReports', 'update', report);
      return report;
    }

    // ----------------------------------------------------
    // C. CAMPUS AI ASSISTANT QUERY ENGINE
    // ----------------------------------------------------
    queryAI(prompt) {
      const q = (prompt || '').trim().toLowerCase();
      if (!q) {
        return {
          answer: 'Hello! I am your **Campus 360 AI Operating System Assistant**. Ask me about your timetable, upcoming exams, urgent notices, assignment due dates, internships, or campus directions!',
          suggestions: ['What is my timetable today?', 'Show urgent exam notices', 'Pending assignments due soon', 'Where is the HPC Lab?'],
          references: []
        };
      }

      const references = [];
      let answer = '';

      // 1. Timetable & classes query
      if (q.includes('timetable') || q.includes('class') || q.includes('schedule') || q.includes('today')) {
        const monClasses = this.getTimetable('Monday');
        const listStr = monClasses.map(c => `• **Period ${c.period} (${c.time})**: ${c.subject} (${c.code}) in **${c.room}** with *${c.faculty}* [${c.type}]`).join('\n');
        answer = `📅 **Your Schedule for Today (Monday):**\n\n${listStr}\n\n💡 *Tip:* Next up is **Data Structures & Algorithms (CS301)** at 09:00 AM in Room L-201.`;
        references.push({ title: 'Academics Hub: Full Timetable', link: 'pages/academics.html' });
      }

      // 2. Exam queries
      else if (q.includes('exam') || q.includes('mid-term') || q.includes('mid term') || q.includes('test') || q.includes('hall ticket')) {
        const exams = this.getExamsSchedule();
        const examStr = exams.map(e => `• **${e.date} (${e.time})**: ${e.subject} (${e.code}) — **Hall: ${e.hall}**, Designated Seat: **${e.seat}**`).join('\n');
        answer = `🚨 **Spring 2026 Mid-Semester Examination Schedule:**\n\n${examStr}\n\n⚠️ **Protocol Alert:** Hall tickets must be carried physically. Reporting time is strictly 09:30 AM (30 minutes before start).`;
        references.push({ title: 'Examination Seating & Circulars', link: 'pages/academics.html' });
        references.push({ title: 'Urgent Notices', link: 'pages/notices.html' });
      }

      // 3. Notices queries
      else if (q.includes('notice') || q.includes('circular') || q.includes('announcement') || q.includes('urgent')) {
        const urgent = this.getNotices({ category: 'Urgent' });
        const listStr = urgent.map(n => `• **[${n.department}]** ${n.title} (*${n.timeAgo}*) — ${n.content.slice(0, 110)}...`).join('\n\n');
        answer = `📢 **Latest High-Priority Circulars:**\n\n${listStr}\n\nCheck the full noticeboard for official circulars and downloadable attachments.`;
        references.push({ title: 'Campus Noticeboard', link: 'pages/notices.html' });
      }

      // 4. Assignments & Tasks
      else if (q.includes('assignment') || q.includes('task') || q.includes('due') || q.includes('homework') || q.includes('deadline')) {
        const pending = this.getAssignments('pending');
        const asgStr = pending.map(a => `• **${a.subject} (${a.code})**: ${a.title}\n  *Due Date:* **${a.dueDate}** (${a.dueInDays} days left) | Max Marks: ${a.totalMarks}`).join('\n\n');
        answer = `📝 **Your Pending Assignments:**\n\n${asgStr}\n\n💡 **Study Plan Advice:** Prioritize **Assignment 3 (AVL Trees in C++)** as it is due in 3 days!`;
        references.push({ title: 'Academics Hub: Assignments', link: 'pages/academics.html' });
      }

      // 5. Attendance & Margin
      else if (q.includes('attendance') || q.includes('bunk') || q.includes('percent') || q.includes('margin')) {
        const att = this.getAttendanceSummary();
        const subStr = att.subjects.map(s => `• **${s.subject}**: ${s.percentage}% (${s.attended}/${s.total}) ${s.percentage < 75 ? '⚠️ *Below 75%*' : '✅ *Safe*'}`).join('\n');
        answer = `📊 **Current Academic Attendance Overview:**\n\nOverall Attendance: **${att.overall}%** (${att.totalAttended}/${att.totalConducted} classes attended).\n\n${subStr}\n\n⚠️ **Action Required:** In **Database Management Systems (72%)**, you must attend the next 3 consecutive lectures to reach the 75% threshold!`;
        references.push({ title: 'Smart Dashboard', link: 'pages/dashboard.html' });
      }

      // 6. Opportunities & Internships
      else if (q.includes('intern') || q.includes('scholarship') || q.includes('opportunity') || q.includes('job') || q.includes('stipend')) {
        const opps = this.getOpportunities();
        const oppStr = opps.slice(0, 3).map(o => `• **${o.title}** by *${o.company}*\n  Reward: **${o.stipend}** | Deadline: ${o.deadline} | Mode: ${o.location}`).join('\n\n');
        answer = `💼 **Top Verified Opportunities Currently Open:**\n\n${oppStr}\n\nSubmit applications directly using your verified Campus 360 profile!`;
        references.push({ title: 'Opportunities Hub', link: 'pages/opportunities.html' });
      }

      // 7. Navigation & Locations
      else if (q.includes('where is') || q.includes('location') || q.includes('hpc') || q.includes('room') || q.includes('canteen') || q.includes('library') || q.includes('auditorium') || q.includes('map')) {
        const locs = this.getCampusLocations();
        const found = locs.find(l => q.includes(l.name.toLowerCase()) || q.includes(l.code.toLowerCase()) || q.includes(l.building.toLowerCase()));
        if (found) {
          answer = `🗺️ **Location Details: ${found.name} (${found.code})**\n\n• **Building:** ${found.building} (${found.floor})\n• **Category:** ${found.category}\n• **Hours:** ${found.operatingHours}\n• **Description:** ${found.description}\n• **Contact:** ${found.contact}`;
        } else {
          answer = `🗺️ **Campus Directory:**\n• **Main Academic Block A**: Lecture Halls L-101 to L-204, Dean Office, T&P Suite\n• **Block B (4th Floor)**: High Performance Computing Lab (HPC-402) & AI Research Labs\n• **Central Library**: Ground to 3rd Floor, Open 08:00 AM - 09:30 PM\n• **Student Plaza**: Main Canteen & Food Court\n• **Auditorium**: Central Campus (1,200 seats)`;
        }
        references.push({ title: 'Interactive Campus Map', link: 'pages/campus-map.html' });
      }

      // 8. Lost & Found
      else if (q.includes('lost') || q.includes('found') || q.includes('wallet') || q.includes('id card') || q.includes('airpods')) {
        const items = this.getLostFoundItems();
        const itemStr = items.slice(0, 3).map(i => `• **[${i.status.toUpperCase()}] ${i.title}**\n  Location: ${i.location} | Date: ${i.date}`).join('\n\n');
        answer = `🔎 **Recent Lost & Found Registry:**\n\n${itemStr}\n\nYou can report lost items or submit a verified ownership claim on Campus Life.`;
        references.push({ title: 'Lost & Found Center', link: 'pages/campus-life.html#lost-found' });
      }

      // 9. Feedback & Grievances
      else if (q.includes('feedback') || q.includes('grievance') || q.includes('complaint') || q.includes('issue') || q.includes('ticket') || q.includes('report problem')) {
        const reports = this.getFeedbackReports();
        const activeTickets = reports.slice(0, 3).map(r => `• **${r.id}** [${r.status.toUpperCase()}]: ${r.title} (*${r.category}*)`).join('\n');
        answer = `📋 **Campus Grievance & Feedback Portal:**\n\nYou can submit feedback or report issues regarding facilities, Wi-Fi, academics, or canteen from the **Smart Dashboard** (under Utilities: *Grievance / Help* or click *+ New Ticket*).\n\n**Your Current Tickets:**\n${activeTickets || 'No active grievances filed.'}\n\nEach ticket generates a unique tracking ID (e.g. ISSUE-2026-xxx) reviewed directly by the Dean's Office.`;
        references.push({ title: 'Submit Feedback & Grievance', link: 'pages/dashboard.html#feedback' });
      }

      // Default contextual overview
      else {
        answer = `I analyzed the campus database for: **"${prompt}"**.\n\nHere is what I found for you:\n• **Next Class:** Data Structures (CS301) in Room L-201 at 09:00 AM\n• **Active Exam Alert:** Mid-term exams commence March 2, 2026\n• **Pending Task:** AVL Trees Assignment due in 3 days\n• **Attendance Standing:** 84.4% overall (DBMS needs 3 more classes for 75%)\n\nFeel free to ask for specific directions, study plans, or circular details!`;
        references.push({ title: 'Smart Dashboard', link: 'pages/dashboard.html' });
        references.push({ title: 'Academics Hub', link: 'pages/academics.html' });
      }

      return {
        answer,
        suggestions: [
          'What is my timetable today?',
          'How is my attendance in DBMS?',
          'What assignments are due soon?',
          'Where is the HPC Lab / Room L-201?'
        ],
        references
      };
    }

    // ----------------------------------------------------
    // NOTIFICATIONS SYSTEM
    // ----------------------------------------------------
    getNotifications() {
      const role = this.getRole();
      return (this.data.notifications || []).filter(n => n.targetRole === 'all' || n.targetRole === role);
    }

    getUnreadCount() {
      return this.getNotifications().filter(n => !n.read).length;
    }

    addNotification(notif) {
      const newNotif = {
        id: 'notif-dyn-' + Date.now().toString(36),
        title: notif.title,
        message: notif.message,
        timestamp: 'Just now',
        type: notif.type || 'system',
        read: false,
        targetRole: notif.targetRole || 'all',
        link: notif.link || 'index.html'
      };

      if (!this.data.notifications) this.data.notifications = [];
      this.data.notifications.unshift(newNotif);
      this.saveDB();
      window.dispatchEvent(new CustomEvent('campus:notification', { detail: newNotif }));
      return newNotif;
    }

    markNotificationRead(id) {
      const notifs = this.data.notifications || [];
      const item = notifs.find(n => n.id === id);
      if (item) {
        item.read = true;
        this.saveDB();
        window.dispatchEvent(new CustomEvent('campus:notification-read', { detail: { id } }));
      }
    }

    markAllNotificationsRead() {
      const role = this.getRole();
      (this.data.notifications || []).forEach(n => {
        if (n.targetRole === 'all' || n.targetRole === role) {
          n.read = true;
        }
      });
      this.saveDB();
      window.dispatchEvent(new CustomEvent('campus:notifications-all-read'));
    }

    // ----------------------------------------------------
    // ACTIVITY LOGS & STATS (ADMIN DASHBOARD)
    // ----------------------------------------------------
    logActivity(action, target) {
      const log = {
        id: 'act-' + Date.now().toString(36),
        action,
        target,
        user: this.currentUser ? this.currentUser.name : 'System',
        role: this.getRole(),
        timestamp: new Date().toLocaleString()
      };
      if (!this.data.activityLog) this.data.activityLog = [];
      this.data.activityLog.unshift(log);
      if (this.data.activityLog.length > 50) this.data.activityLog.pop();
    }

    getAdminMetrics() {
      const notices = this.data.notices || [];
      const events = this.data.events || [];
      const opps = this.data.opportunities || [];
      const materials = (this.data.academics && this.data.academics.materials) || [];
      const marketplace = this.data.marketplace || [];
      const lostFound = this.data.lostFound || [];
      const feedback = this.data.feedbackReports || [];

      return {
        totalNotices: notices.filter(n => n.status === 'published').length,
        draftNotices: notices.filter(n => n.status === 'draft').length,
        totalEvents: events.filter(e => e.status === 'published').length,
        draftEvents: events.filter(e => e.status === 'draft').length,
        totalOpportunities: opps.filter(o => o.status === 'published').length,
        totalMaterials: materials.length,
        marketplaceListings: marketplace.length,
        pendingMarketplace: marketplace.filter(m => m.status === 'pending_review').length,
        totalLostFound: lostFound.length,
        pendingClaims: lostFound.filter(i => i.status === 'claim_pending').length,
        totalFeedback: feedback.length,
        pendingFeedback: feedback.filter(f => f.status === 'submitted').length,
        recentActivity: (this.data.activityLog || []).slice(0, 8)
      };
    }
  }

  // Export Singleton
  window.CampusDB = new CampusDatabase();
  window.DEMO_USERS = DEMO_USERS;

})();
