export const INITIAL_COUNSELLORS = [
  {
    id: 'c1',
    name: 'Dr. Ananya Sen',
    title: 'Clinical Psychologist & Youth Mentor',
    qualification: 'M.Phil Clinical Psychology, Ph.D. (NIMHANS alumnus)',
    specialty: 'Academic Stress & Performance Anxiety',
    specialtyCategory: 'academic',
    rating: 4.9,
    reviewsCount: 142,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    verifiedSessions: 238,
    tier: 'Lead Impact Fellow',
    languages: ['English', 'Hindi', 'Bengali'],
    bio: 'Specializing in student burnout, thesis overwhelm, and exam pressure. My approach is solution-focused, warm, and strictly judgement-free.',
    availableDays: 'Mon, Wed, Fri',
    nextAvailableSlot: 'Today, 4:00 PM',
    slots: ['Today, 4:00 PM', 'Today, 6:30 PM', 'Tomorrow, 11:00 AM', 'Tomorrow, 5:00 PM']
  },
  {
    id: 'c2',
    name: 'Kabir Mehta',
    title: 'Adolescent & Student Wellbeing Specialist',
    qualification: 'M.Sc Applied Psychology (TISS Mumbai)',
    specialty: 'Homesickness & Campus Adjustment',
    specialtyCategory: 'homesick',
    rating: 4.8,
    reviewsCount: 119,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    verifiedSessions: 184,
    tier: 'Senior Counsellor',
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Helping outstation students transition into hostel life, cope with sudden distance from family, and overcome feeling out of place.',
    availableDays: 'Tue, Thu, Sat',
    nextAvailableSlot: 'Today, 5:30 PM',
    slots: ['Today, 5:30 PM', 'Tomorrow, 2:00 PM', 'Tomorrow, 4:30 PM', 'Friday, 6:00 PM']
  },
  {
    id: 'c3',
    name: 'Sneha Mukherjee',
    title: 'Counselling Psychologist & Somatic Practitioner',
    qualification: 'M.A. Counselling Psychology, Certified Mindfulness Facilitator',
    specialty: 'Anxiety, Panic & Emotional Burnout',
    specialtyCategory: 'anxiety',
    rating: 5.0,
    reviewsCount: 168,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    verifiedSessions: 312,
    tier: 'Star Guide',
    languages: ['English', 'Hindi'],
    bio: 'Safe harbor for racing minds. Uses grounding techniques, cognitive reframing, and breathwork to restore nervous system balance.',
    availableDays: 'Daily',
    nextAvailableSlot: 'Tomorrow, 10:00 AM',
    slots: ['Tomorrow, 10:00 AM', 'Tomorrow, 3:30 PM', 'Friday, 11:30 AM', 'Friday, 4:00 PM']
  },
  {
    id: 'c4',
    name: 'Rahul Deshmukh',
    title: 'Community Mental Health Advocate & Listener',
    qualification: 'PG Diploma in Mental Health & Psychotherapy',
    specialty: 'General Listening, Loneliness & Relationship Venting',
    specialtyCategory: 'listening',
    rating: 4.9,
    reviewsCount: 95,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    verifiedSessions: 147,
    tier: 'Community Fellow',
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'No medical jargon, no unsolicited advice unless asked. Here to listen when your thoughts feel too loud or nobody in your circle seems to get it.',
    availableDays: 'Mon to Sat',
    nextAvailableSlot: 'Today, 8:00 PM',
    slots: ['Today, 8:00 PM', 'Tomorrow, 7:00 PM', 'Saturday, 12:00 PM', 'Saturday, 5:00 PM']
  }
];

export const INITIAL_CIRCLES = [
  {
    id: 'circle-1',
    title: 'Evening Small Talk & Tea near College Ground',
    category: 'Small Talks',
    dateLabel: 'Today, 5:30 PM',
    location: 'Chai Point kiosk, College Main Ground (Under the Banyan Tree)',
    spotsTotal: 12,
    joinedCount: 9,
    host: 'Aarav K. (Campus Lead)',
    hostAlias: 'WarmChai99',
    description: 'Zero agenda, zero pressure to be smart or funny. Grab a ₹10 cutting chai, talk about professors, life, weird dreams, or just sit quietly in good company.',
    tags: ['Tea & Chill', 'No-Pressure', 'Introvert Friendly'],
    attendees: ['CalmPanda42', 'SilentOwl11', 'EchoBreeze07', 'ChaiLover9', 'BraveOtter77']
  },
  {
    id: 'circle-2',
    title: 'Acoustic Guitar & Chill Jam Session',
    category: 'Music',
    dateLabel: 'Tomorrow, 6:00 PM',
    location: 'Amphitheatre Central Steps (Bring your instrument or just your ears)',
    spotsTotal: 20,
    joinedCount: 15,
    host: 'Priya N. & OpenStrings Club',
    hostAlias: 'MelodySeeker4',
    description: 'We play soft indie, 90s Bollywood, and lo-fi melodies as the sun sets. You do NOT have to sing or play — sitting on the grass listening is 100% encouraged.',
    tags: ['Acoustic', 'Sunset Vibes', 'Zero Skill Required'],
    attendees: ['Wanderer99', 'QuietRiver19', 'RhythmSoul', 'GentleWillow33']
  },
  {
    id: 'circle-3',
    title: 'Car & Bike Enthusiasts Casual Meetup',
    category: 'Hobbies',
    dateLabel: 'Saturday, 4:30 PM',
    location: 'North Campus Parking Lot, near Gate 3',
    spotsTotal: 15,
    joinedCount: 8,
    host: 'Rohan V.',
    hostAlias: 'GearHead44',
    description: 'For folks who de-stress through machines, road trips, engine sounds, and DIY mods. Casual walk-around, open hoods, talking dreams and routes.',
    tags: ['Motorsports', 'Road Trips', 'Casual Chill'],
    attendees: ['SpeedyTurtle', 'WrenchBoy', 'NightRider21']
  },
  {
    id: 'circle-4',
    title: 'Silent Study & Coffee Buddy Hour',
    category: 'Study',
    dateLabel: 'Today, 7:00 PM',
    location: 'Central Library Cafe (Quiet Corner Corner Tables 4-6)',
    spotsTotal: 10,
    joinedCount: 7,
    host: 'Divya S. (Final Year)',
    hostAlias: 'FocusFox88',
    description: 'Body doubling session! Staring at your syllabus alone feels terrible. We sit together, put our phones on DND, study for 45 mins, then take a 15-min snack break.',
    tags: ['Body Doubling', 'Quiet Focus', 'Exam Friendly'],
    attendees: ['LibraryGhost', 'QuietRiver19', 'StudyBee01']
  },
  {
    id: 'circle-5',
    title: 'Late Evening Walk & Rant Circle',
    category: 'Walks',
    dateLabel: 'Friday, 6:15 PM',
    location: 'Botanical Lake Trail (Meeting at Lake Bridge East)',
    spotsTotal: 16,
    joinedCount: 12,
    host: 'Meera & Siddharth',
    hostAlias: 'NightWalker7',
    description: 'A 45-minute casual walk around the campus lake. Vent about your week, internship hunt, assignments, or just breathe in the cool air without any fear of gossip.',
    tags: ['Lake Walk', 'Vent Safe Space', 'Movement Therapy'],
    attendees: ['PandaWalker', 'SilentBreeze', 'CalmPine', 'BraveOtter77']
  }
];

export const INITIAL_PEER_BUDDIES = [
  {
    id: 'pb-1',
    name: 'Aarav Sharma',
    year: '3rd Year Computer Science',
    interests: ['Anime & Manga', 'Coffee Enthusiast', 'Hosteller (3 yrs)', 'Late-night coding'],
    badge: 'Trained Peer Listener',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    bio: 'Was intensely homesick during my 1st year and almost quit campus. Now here to be the friend I needed back then. Free to grab chai or just listen.',
    availability: 'Evenings 6-9 PM'
  },
  {
    id: 'pb-2',
    name: 'Divya Nair',
    year: '4th Year Economics',
    interests: ['Silent Co-working', 'Thrift Shopping', 'Lofi Beats', 'Cat Videos'],
    badge: 'Certified Active Listener',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    bio: 'Big advocate of "you don\'t have to be bubbly to hang out". If you\'re low on social battery, we can sit in peaceful silence or split a pastry.',
    availability: 'Afternoons & Weekends'
  },
  {
    id: 'pb-3',
    name: 'Rohan Verma',
    year: '2nd Year Mechanical Engineering',
    interests: ['Bikes & DIY', 'Gaming (Valorant)', 'Campus Street Food', 'Indie Rock'],
    badge: 'Peer Listener',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Good listener for guy-talk, semester backs, parental expectations, or when you just feel stuck in a rut. Zero judgement guaranteed.',
    availability: 'Mon, Wed, Fri 5-8 PM'
  },
  {
    id: 'pb-4',
    name: 'Meera Chawla',
    year: 'Postgraduate Psychology Student',
    interests: ['Art Journaling', 'Mindful Walks', 'Plant Parenting', 'Chai & Paratha'],
    badge: 'Master Peer Facilitator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Trained in active empathetic listening. Love helping folks organize messy thoughts before they turn into full spirals.',
    availability: 'Daily 7-9 PM'
  }
];

export const INITIAL_COURSES = [
  {
    id: 'course-1',
    title: 'Active Listening 101: How to Listen Without Judging',
    duration: '8 mins',
    tag: 'Foundational',
    summary: 'The difference between waiting for your turn to speak and truly holding space. How non-verbal nods, mirroring, and silence heal.',
    videoThumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    videoLengthSecs: 480,
    lessons: [
      {
        title: 'Rule 1: Don\'t Rush to "Fix" Their Problem',
        content: 'When someone says "I feel miserable about my grade", our reflex is: "You can re-attempt it next sem!". This invalidates their current grief. Instead say: "That hurts so much after how hard you prepared. I am right here with you."'
      },
      {
        title: 'The 3-Second Pause Technique',
        content: 'Before replying, pause for 3 seconds. 60% of the time, the speaker will add the most authentic layer of their thought during that gap.'
      },
      {
        title: 'Empathetic Body Language',
        content: 'Open posture, gentle eye contact (not staring), soft pitch, and validating head nods without interrupting.'
      }
    ],
    dosAndDonts: [
      { do: 'Acknowledge their emotion first ("That sounds truly exhausting")', dont: 'Say "At least it wasn\'t worse" or compare with your own life' },
      { do: 'Ask open questions: "What was the heaviest part of today?"', dont: 'Give unsolicited advice: "You should just wake up at 5 AM"' },
      { do: 'Validate that their feeling makes total sense', dont: 'Tell them "Don\'t overthink" or "Chill, it happens to everyone"' }
    ],
    quiz: {
      question: 'A friend tells you: "I feel like a total failure because everyone got placed except me." What is the best listener response?',
      options: [
        '“Don’t worry, placement season lasts 3 more months! Have you fixed your resume?”',
        '“It makes total sense that you feel crushed right now. That pressure is so heavy. Want to talk about it or just sit together?”',
        '“At least you don’t have student loan debt like some people!”',
        '“I felt the same way last year, but then I watched a motivational video.”'
      ],
      correctIndex: 1,
      explanation: 'Option 2 validates their emotional pain without premature fixing, silver-linings, or toxic positivity.'
    }
  },
  {
    id: 'course-2',
    title: 'What to Say (and Not Say) to Someone Feeling Homesick',
    duration: '10 mins',
    tag: 'Hostel & Transition',
    summary: 'Homesickness is acute neurological disorientation. Learn how to comfort peers struggling with new food, unfamiliar rooms, and loneliness.',
    videoThumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=80',
    videoLengthSecs: 600,
    lessons: [
      {
        title: 'Normalizing the Physical Grief of Distance',
        content: 'Homesickness often shows up as stomach aches, insomnia, or intense fatigue. Explain that their brain is adapting to thousands of missing sensory cues (sounds of home, smell of mom\'s cooking).'
      },
      {
        title: 'Building Micro-Anchors on Campus',
        content: 'Help them create 1 small familiar routine: e.g., finding one specific tea shop that feels friendly, or a favorite bench by the tree.'
      }
    ],
    dosAndDonts: [
      { do: 'Encourage small phone calls home without guilt', dont: 'Tell them "If you call home you won\'t adjust"' },
      { do: 'Offer to accompany them to dining hall or chai run', dont: 'Leave them alone in their room for 3 days straight' }
    ],
    quiz: {
      question: 'A junior roommate is crying quietly at 11 PM because they miss home. How should you approach them?',
      options: [
        'Pretend not to hear so you don\'t embarrass them.',
        'Offer a glass of water, ask softly if they\'d like company or privacy, and say it is 100% normal to miss home.',
        'Tell them hostel makes everyone tough and they will laugh about this next year.',
        'Force them to come to a loud party to distract them.'
      ],
      correctIndex: 1,
      explanation: 'Giving gentle comfort, water, and honoring their need for either presence or gentle space is the most supportive action.'
    }
  },
  {
    id: 'course-3',
    title: 'Keeping Conversations Positive & Safe',
    duration: '7 mins',
    tag: 'Communication',
    summary: 'How to prevent conversations from spiraling into collective hopelessness (co-rumination) while keeping the space deeply authentic.',
    videoThumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    videoLengthSecs: 420,
    lessons: [
      {
        title: 'Venting vs. Spiral Rumination',
        content: 'Healthy venting releases pressure. Spiral rumination loops the same fear 20 times. The bridge is: "I hear how unfair this was. What is one tiny thing within our power tonight to help you rest?"'
      },
      {
        title: 'The Hope Anchor',
        content: 'Always conclude an emotional peer session by connecting back to the present moment: a warm sip of tea, taking three long breaths, or planning tomorrow\'s breakfast.'
      }
    ],
    dosAndDonts: [
      { do: 'Gently ground them back into their body and room', dont: 'Fuel the spiral with "Yeah everything in this college is doomed"' },
      { do: 'Remind them of a time they survived a tough week', dont: 'Minimize their distress with "Think positive thoughts only!"' }
    ],
    quiz: {
      question: 'What is the goal of positive peer listening?',
      options: [
        'To force people to smile and ignore their sadness.',
        'To provide a warm, non-judgemental space and gently help them find a foothold of calm and hope.',
        'To diagnose their mental health disorder.',
        'To solve their entire college career in 30 minutes.'
      ],
      correctIndex: 1,
      explanation: 'Peer listening creates safety and emotional grounding; it is never about forced smiles or amateur diagnoses.'
    }
  },
  {
    id: 'course-4',
    title: 'Knowing When to Refer to a Professional Counsellor',
    duration: '6 mins',
    tag: 'Safety Protocol',
    summary: 'The vital boundary: You are a compassionate peer, not a licensed therapist. How to recognize red flags and gently guide a peer to free professional help.',
    videoThumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    videoLengthSecs: 360,
    lessons: [
      {
        title: 'Red Flag Indicators',
        content: 'Persistent talk of self-harm, expressing worthlessness for >2 weeks, severe withdrawal from eating/sleeping, or hallucinations/delusions require professional care.'
      },
      {
        title: 'The Warm Hand-Off Protocol',
        content: 'Never say: "You\'re too sick for me, see a doctor". Say: "You matter too much for either of us to tackle this alone. Let’s book a free anonymous session with Dr. Ananya on OpenCircle right now — I can sit with you while you do it."'
      }
    ],
    dosAndDonts: [
      { do: 'Help them open the OpenCircle booking or helpline', dont: 'Promise to keep thoughts of self-harm an absolute secret' },
      { do: 'Stay calm and reassuring', dont: 'Panic or make them feel like a burden' }
    ],
    quiz: {
      question: 'If a student mentions having thoughts that life isn\'t worth living, what should you do?',
      options: [
        'Keep it secret because you promised you wouldn\'t tell anyone.',
        'Stay calm, gently offer to connect them with OpenCircle\'s verified counsellor or a 24x7 crisis line (KIRAN / Tele-MANAS), and do not leave them unattended.',
        'Tell them they are being dramatic.',
        'Argue with them about why life is great.'
      ],
      correctIndex: 1,
      explanation: 'Safety is paramount. Staying present, calm, and gently guiding to verified professional support or crisis helplines saves lives.'
    }
  }
];

export const INITIAL_SPONSORS = [
  {
    id: 'sp-1',
    name: 'Campus Chai Point Co.',
    tier: 'Campus Pillar Sponsor',
    logoText: '☕ CHAI POINT',
    sessionsFunded: 240,
    pledgeAmount: '₹72,000',
    tagline: 'Fueling honest student conversations, one cutting chai at a time.',
    perk: 'Offers 1 free chai token to every student attending an OpenCircle meetup.'
  },
  {
    id: 'sp-2',
    name: 'MindCare Tech Foundation',
    tier: 'CSR Impact Partner',
    logoText: '💙 MINDCARE',
    sessionsFunded: 600,
    pledgeAmount: '₹1,80,000',
    tagline: 'Supporting youth emotional resilience across Indian universities.',
    perk: 'Directly subsidizes professional stipend pool for youth psychologists.'
  },
  {
    id: 'sp-3',
    name: 'The Study Brew Cafe',
    tier: 'Safe Space Venue Partner',
    logoText: '📚 THE STUDY BREW',
    sessionsFunded: 150,
    pledgeAmount: '₹45,000',
    tagline: 'Providing quiet, cosy spaces for student peer study hours.',
    perk: 'Hosts our weekly Silent Study & Coffee circles with reserved lounge seats.'
  },
  {
    id: 'sp-4',
    name: 'HostelKart Goods',
    tier: 'Student Wellness Backer',
    logoText: '🎒 HOSTELKART',
    sessionsFunded: 180,
    pledgeAmount: '₹54,000',
    tagline: 'Making outstation students feel at home from day one.',
    perk: 'Distributes anti-stress care packages to freshmen hostel wings.'
  }
];

export const RANDOM_ALIASES = [
  'CalmPanda42',
  'QuietRiver19',
  'BraveOtter77',
  'GentleWillow33',
  'SunlitSparrow88',
  'CozyPinecone14',
  'SereneBreeze56',
  'PatientKoala91',
  'HopefulRobin24',
  'WarmCloud12',
  'StarlitFern95',
  'PeacefulHarbor38'
];
