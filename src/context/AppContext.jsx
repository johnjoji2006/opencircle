import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COUNSELLORS,
  INITIAL_CIRCLES,
  INITIAL_PEER_BUDDIES,
  INITIAL_COURSES,
  INITIAL_SPONSORS,
  RANDOM_ALIASES
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  ANONYMOUS_MODE: 'opencircle_anonymous_mode',
  USER_ALIAS: 'opencircle_user_alias',
  COUNSELLORS: 'opencircle_counsellors_v1',
  BOOKED_SESSIONS: 'opencircle_booked_sessions',
  CIRCLES: 'opencircle_circles_v1',
  BUDDIES: 'opencircle_buddies_v1',
  COMPLETED_COURSES: 'opencircle_completed_courses',
  SPONSORS: 'opencircle_sponsors_v1',
  CHAT_MESSAGES: 'opencircle_chat_messages'
};

export function AppProvider({ children }) {
  // Navigation
  const [activeTab, setActiveTab] = useState('home');
  const [counsellorSubTab, setCounsellorSubTab] = useState('book'); // 'book' | 'tracker'
  const [peerSubTab, setPeerSubTab] = useState('find'); // 'find' | 'learn'

  // Anonymous Mode
  const [anonymousMode, setAnonymousMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANONYMOUS_MODE);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [userAlias, setUserAlias] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ALIAS);
    if (saved) return saved;
    const random = RANDOM_ALIASES[Math.floor(Math.random() * RANDOM_ALIASES.length)];
    localStorage.setItem(STORAGE_KEYS.USER_ALIAS, random);
    return random;
  });

  // Counsellors
  const [counsellors, setCounsellors] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUNSELLORS);
    return saved ? JSON.parse(saved) : INITIAL_COUNSELLORS;
  });

  // Booked sessions
  const [bookedSessions, setBookedSessions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKED_SESSIONS);
    return saved ? JSON.parse(saved) : [
      {
        id: 'mock-booking-1',
        counsellorId: 'c1',
        counsellorName: 'Dr. Ananya Sen',
        mode: 'Anonymous Chat',
        slot: 'Today, 4:00 PM',
        alias: 'CalmPanda42',
        note: 'Struggling with final year thesis anxiety and sleep issues',
        createdAt: new Date().toISOString(),
        status: 'Confirmed'
      }
    ];
  });

  // Social circles
  const [socialCircles, setSocialCircles] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CIRCLES);
    return saved ? JSON.parse(saved) : INITIAL_CIRCLES;
  });

  // Peer Buddies
  const [peerBuddies, setPeerBuddies] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BUDDIES);
    return saved ? JSON.parse(saved) : INITIAL_PEER_BUDDIES;
  });

  // Listener Courses progress
  const [completedCourses, setCompletedCourses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_COURSES);
    return saved ? JSON.parse(saved) : ['course-1']; // 1 completed by default so progress shows
  });

  // Sponsors
  const [sponsors, setSponsors] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SPONSORS);
    return saved ? JSON.parse(saved) : INITIAL_SPONSORS;
  });

  // CircleBot Chat messages
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'bot-welcome',
        sender: 'bot',
        text: "Hi there, I’m CircleBot — your warm, judgement-free listener. 🌿 Whatever you're holding inside right now, you don't have to carry it all by yourself. Feel free to vent, talk through exam stress, homesickness, or simply breathe with me.",
        groundingTip: "You are currently protected under Anonymous Mode. No real names, no IP tracking, 100% confidential.",
        followUp: "How is your heart feeling today? You can choose a quick topic below or type anything that comes to mind.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Modals & Active Drawers
  const [modalState, setModalState] = useState({
    type: null, // 'bookCounsellor' | 'applyCounsellor' | 'hostCircle' | 'requestBuddy' | 'volunteerBuddy' | 'coursePlayer' | 'sponsorModal' | 'breathing' | 'mockRoom' | 'aliasPicker' | 'mySessions'
    data: null
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANONYMOUS_MODE, JSON.stringify(anonymousMode));
  }, [anonymousMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_ALIAS, userAlias);
  }, [userAlias]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUNSELLORS, JSON.stringify(counsellors));
  }, [counsellors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKED_SESSIONS, JSON.stringify(bookedSessions));
  }, [bookedSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CIRCLES, JSON.stringify(socialCircles));
  }, [socialCircles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDDIES, JSON.stringify(peerBuddies));
  }, [peerBuddies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_COURSES, JSON.stringify(completedCourses));
  }, [completedCourses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(sponsors));
  }, [sponsors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Toast helper
  const showToast = (message, type = 'success', subtitle = '') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, subtitle }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Alias regenerator
  const regenerateAlias = () => {
    const filtered = RANDOM_ALIASES.filter(a => a !== userAlias);
    const newAlias = filtered[Math.floor(Math.random() * filtered.length)];
    setUserAlias(newAlias);
    showToast(`Anonymous Alias updated to ${newAlias}`, 'info', 'Your identity is shielded across all bookings and circles.');
  };

  // Book a counsellor session
  const bookSession = (bookingData) => {
    const counsellor = counsellors.find(c => c.id === bookingData.counsellorId);
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      counsellorName: counsellor ? counsellor.name : 'OpenCircle Counsellor',
      counsellorAvatar: counsellor ? counsellor.avatar : '',
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setBookedSessions(prev => [newBooking, ...prev]);

    // Increment counsellor's verified sessions
    setCounsellors(prev =>
      prev.map(c =>
        c.id === bookingData.counsellorId
          ? { ...c, verifiedSessions: c.verifiedSessions + 1 }
          : c
      )
    );

    showToast(
      'Session Booked Successfully! (₹0 Cost)',
      'success',
      `Confirmed with ${newBooking.counsellorName} for ${newBooking.slot}. Mode: ${newBooking.mode}`
    );
  };

  // Counsellor logs a completed session (Live Demo feature)
  const logCompletedSession = (counsellorId) => {
    const c = counsellors.find(item => item.id === counsellorId);
    setCounsellors(prev =>
      prev.map(item =>
        item.id === counsellorId
          ? { ...item, verifiedSessions: item.verifiedSessions + 1 }
          : item
      )
    );
    showToast(
      `Session Verified for ${c ? c.name : 'Counsellor'} (+1 Logged)`,
      'success',
      'Tracked under OpenCircle Impact Contract. Sponsor stipend pool updated!'
    );
  };

  // Add a newly recruited counsellor
  const addCounsellor = (counsellorData) => {
    const newCounsellor = {
      id: `counsellor-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      verifiedSessions: 0,
      tier: 'Community Fellow (New)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      availableDays: counsellorData.availableDays || 'Flexible',
      nextAvailableSlot: 'Tomorrow, 5:00 PM',
      slots: ['Tomorrow, 5:00 PM', 'Saturday, 11:00 AM'],
      languages: ['English', 'Hindi'],
      ...counsellorData
    };

    setCounsellors(prev => [newCounsellor, ...prev]);
    showToast(
      'Application Accepted & Directory Updated!',
      'success',
      `Welcome ${newCounsellor.name}. You are now listed on the OpenCircle Counsellor Directory under the Impact Contract.`
    );
  };

  // Join / Leave a social circle
  const toggleJoinCircle = (circleId) => {
    const aliasToUse = anonymousMode ? userAlias : 'You';
    setSocialCircles(prev =>
      prev.map(c => {
        if (c.id === circleId) {
          const isJoined = c.attendees.includes(aliasToUse) || c.isJoined;
          if (isJoined) {
            showToast(`Left "${c.title}"`, 'info', 'You can re-join anytime before the circle starts.');
            return {
              ...c,
              isJoined: false,
              joinedCount: Math.max(0, c.joinedCount - 1),
              attendees: c.attendees.filter(a => a !== aliasToUse)
            };
          } else {
            showToast(`Joined "${c.title}"!`, 'success', `See you at ${c.location}. Identity protected as: ${aliasToUse}`);
            return {
              ...c,
              isJoined: true,
              joinedCount: c.joinedCount + 1,
              attendees: [...c.attendees, aliasToUse]
            };
          }
        }
        return c;
      })
    );
  };

  // Host a new circle
  const hostNewCircle = (circleData) => {
    const newCircle = {
      id: `circle-${Date.now()}`,
      joinedCount: 1,
      attendees: [anonymousMode ? userAlias : circleData.hostName || 'Organizer'],
      hostAlias: anonymousMode ? userAlias : circleData.hostName || 'Organizer',
      isJoined: true,
      tags: [circleData.category, 'Campus Meetup', '₹0 Free'],
      ...circleData
    };

    setSocialCircles(prev => [newCircle, ...prev]);
    showToast(
      'Social Circle Published!',
      'success',
      `Your hangout "${newCircle.title}" is now live on the community board.`
    );
  };

  // Request Peer Buddy
  const requestPeerBuddy = (buddyId, requestDetails) => {
    const buddy = peerBuddies.find(b => b.id === buddyId);
    showToast(
      `Company Request Sent to ${buddy ? buddy.name : 'Peer Buddy'}!`,
      'success',
      `Activity: ${requestDetails.activity}. Sent anonymously as ${userAlias}. They will message via OpenCircle notification.`
    );
  };

  // Volunteer as a Peer Buddy
  const volunteerBuddy = (buddyData) => {
    const newBuddy = {
      id: `pb-${Date.now()}`,
      badge: 'Peer Listener (New)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      availability: buddyData.availability || 'Evenings',
      ...buddyData
    };
    setPeerBuddies(prev => [newBuddy, ...prev]);
    showToast(
      'Thank you for stepping up!',
      'success',
      'You are now listed as a friendly peer companion for students in need.'
    );
  };

  // Complete a Course
  const toggleCourseCompleted = (courseId) => {
    if (completedCourses.includes(courseId)) {
      setCompletedCourses(prev => prev.filter(id => id !== courseId));
      showToast('Course progress updated', 'info');
    } else {
      const nextCompleted = [...completedCourses, courseId];
      setCompletedCourses(nextCompleted);
      if (nextCompleted.length === INITIAL_COURSES.length) {
        showToast(
          '🎉 Congratulations! Certified Peer Listener Badge Earned!',
          'success',
          'You have completed all 4 listener training modules. You are now qualified to hold safe peer space.'
        );
      } else {
        showToast(
          'Lesson Completed! (+1 Credit)',
          'success',
          `${nextCompleted.length} of ${INITIAL_COURSES.length} courses finished.`
        );
      }
    }
  };

  // Add Sponsor Pledge
  const addSponsor = (sponsorData) => {
    const newSponsor = {
      id: `sp-${Date.now()}`,
      sessionsFunded: parseInt(sponsorData.sessionsFunded, 10) || 50,
      pledgeAmount: `₹${((parseInt(sponsorData.sessionsFunded, 10) || 50) * 300).toLocaleString('en-IN')}`,
      logoText: `🤝 ${sponsorData.name.toUpperCase()}`,
      ...sponsorData
    };
    setSponsors(prev => [newSponsor, ...prev]);
    showToast(
      'Sponsor Pledge Recorded!',
      'success',
      `Thank you ${newSponsor.name}! Your pledge directly funds ${newSponsor.sessionsFunded} free sessions for students.`
    );
  };

  // Reset or clear chat
  const clearChat = () => {
    const welcome = [
      {
        id: 'bot-welcome-fresh',
        sender: 'bot',
        text: "Fresh space, clear mind. 🌿 I’m right here whenever you want to talk or just take a quiet breather.",
        groundingTip: "Protected under Anonymous Mode. What's on your mind?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setChatMessages(welcome);
    showToast('Chat history cleared', 'info');
  };

  // Stats calculation
  const totalVerifiedSessions = counsellors.reduce((acc, c) => acc + (c.verifiedSessions || 0), 0);
  const totalSponsorFunds = sponsors.reduce((acc, s) => {
    const num = parseInt(s.pledgeAmount.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + num;
  }, 0);
  const activeCirclesCount = socialCircles.length;
  const trainedListenersCount = 320 + completedCourses.length * 8;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        counsellorSubTab,
        setCounsellorSubTab,
        peerSubTab,
        setPeerSubTab,
        anonymousMode,
        setAnonymousMode,
        userAlias,
        setUserAlias,
        regenerateAlias,
        counsellors,
        bookSession,
        bookedSessions,
        setBookedSessions,
        logCompletedSession,
        addCounsellor,
        socialCircles,
        toggleJoinCircle,
        hostNewCircle,
        peerBuddies,
        requestPeerBuddy,
        volunteerBuddy,
        courses: INITIAL_COURSES,
        completedCourses,
        toggleCourseCompleted,
        sponsors,
        addSponsor,
        chatMessages,
        setChatMessages,
        clearChat,
        toasts,
        showToast,
        removeToast,
        modalState,
        setModalState,
        stats: {
          totalVerifiedSessions,
          totalSponsorFunds,
          activeCirclesCount,
          trainedListenersCount
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
