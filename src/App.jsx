import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Modals
import BookingModal from './components/BookingModal';
import ApplyCounsellorModal from './components/ApplyCounsellorModal';
import HostCircleModal from './components/HostCircleModal';
import RequestBuddyModal from './components/RequestBuddyModal';
import VolunteerBuddyModal from './components/VolunteerBuddyModal';
import CoursePlayerModal from './components/CoursePlayerModal';
import SponsorModal from './components/SponsorModal';
import BreathingModal from './components/BreathingModal';
import MockSessionRoomModal from './components/MockSessionRoomModal';
import MySessionsDrawer from './components/MySessionsDrawer';

// Views
import HomeView from './views/HomeView';
import AIListenerView from './views/AIListenerView';
import CounsellorsView from './views/CounsellorsView';
import SocialCirclesView from './views/SocialCirclesView';
import PeerBuddyView from './views/PeerBuddyView';
import SponsorsView from './views/SponsorsView';

export default function App() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E293B]">
      {/* Top Persistent Navbar */}
      <Navbar />

      {/* Main Body */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'ai-listener' && <AIListenerView />}
        {activeTab === 'counsellors' && <CounsellorsView />}
        {activeTab === 'social-circles' && <SocialCirclesView />}
        {activeTab === 'peer-buddy' && <PeerBuddyView />}
        {activeTab === 'sponsors' && <SponsorsView />}
      </main>

      {/* Global Modals & Drawers */}
      <BookingModal />
      <ApplyCounsellorModal />
      <HostCircleModal />
      <RequestBuddyModal />
      <VolunteerBuddyModal />
      <CoursePlayerModal />
      <SponsorModal />
      <BreathingModal />
      <MockSessionRoomModal />
      <MySessionsDrawer />

      {/* Notification Toasts */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
