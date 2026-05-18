import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, BookOpen, Building2, 
  User, Shield, HelpCircle, GraduationCap, Sun, Moon
} from 'lucide-react';
import JobPortal from './components/JobPortal';
import PrepHub from './components/PrepHub';
import CompanyGuides from './components/CompanyGuides';

export default function App() {
  const [activeTab, setActiveTab] = useState('portal'); // portal, prep, companies
  const [isAdmin, setIsAdmin] = useState(false); // Recruiter vs Applicant Mode
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  // Global Mock Database
  const [jobs, setJobs] = useState([
    {
      id: 'job_google_1',
      title: 'Senior Frontend Engineer',
      company: 'Google LLC',
      logoLetter: 'G',
      location: 'Mountain View, CA (Hybrid)',
      type: 'Hybrid',
      experience: 'Senior Level',
      salary: '$150,000 - $190,000',
      posted: '2 days ago',
      description: 'Design and develop complex user interfaces for Google Cloud products. Collaborate with design teams, optimize layout performance, and lead technical standards across teams.',
      requirements: '8+ years of JavaScript/TypeScript engineering. Deep React/Vite understanding. Strong browser rendering and diagnostic optimization background.',
      deadline: '15 Days'
    },
    {
      id: 'job_amazon_1',
      title: 'Software Development Engineer II (SDE-2)',
      company: 'Amazon',
      logoLetter: 'A',
      location: 'Seattle, WA (On-site)',
      type: 'On-site',
      experience: 'Mid Level',
      salary: '$130,000 - $160,000',
      posted: '3 days ago',
      description: 'Build backend pipelines supporting Amazon Prime Day transactions. Design highly scalable distributed APIs, optimize database schema structures, and deliver fast REST services.',
      requirements: '4+ years of Java/C++ developer experience. System design knowledge. Cloud platform (AWS/Azure) architectures background.',
      deadline: '20 Days'
    },
    {
      id: 'job_microsoft_1',
      title: 'Cloud Security Engineer',
      company: 'Microsoft',
      logoLetter: 'M',
      location: 'Redmond, WA (Remote)',
      type: 'Remote',
      experience: 'Mid Level',
      salary: '$140,000 - $170,000',
      posted: '1 week ago',
      description: 'Secure Azure core infrastructure pipelines. Conduct threat modeling reviews, audit authentication protocols, and design automated compliance systems.',
      requirements: '3+ years cloud security background. Deep TCP/IP network protocol understanding. Experience with Kubernetes, Docker, and shell scripting.',
      deadline: '10 Days'
    },
    {
      id: 'job_tcs_1',
      title: 'Systems Engineer - Digital Division',
      company: 'Tata Consultancy Services',
      logoLetter: 'T',
      location: 'Austin, TX (Hybrid)',
      type: 'Hybrid',
      experience: 'Entry Level',
      salary: '$80,000 - $95,000',
      posted: 'Just now',
      description: 'Support cloud integration services for client portals. Build database queries, optimize API response parsing, and maintain integration document systems.',
      requirements: 'Bachelor degree in Computer Engineering or related fields. Solid Java/Python/SQL programming knowledge. Strong analytical skills.',
      deadline: '30 Days'
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 'app_mock_1',
      jobId: 'job_google_1',
      jobTitle: 'Senior Frontend Engineer',
      company: 'Google LLC',
      status: 'Review', // Applied, Review, Interviewing, Offered
      candidateName: 'Nigel Jacob',
      candidateEmail: 'nigel@example.com',
      resume: 'Nigel_Jacob_Resume_2026.pdf',
      appliedDate: '5/18/2026'
    },
    {
      id: 'app_mock_2',
      jobId: 'job_microsoft_1',
      jobTitle: 'Cloud Security Engineer',
      company: 'Microsoft',
      status: 'Interviewing',
      candidateName: 'Nigel Jacob',
      candidateEmail: 'nigel@example.com',
      resume: 'Nigel_Jacob_Resume_2026.pdf',
      appliedDate: '5/12/2026'
    }
  ]);

  return (
    <div className={`app-container ${theme}-theme`}>
      
      {/* 1. SIDEBAR NAVIGATION PANELS */}
      <aside className="sidebar">
        <div className="sidebar-brand" onClick={() => setActiveTab('portal')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <GraduationCap size={24} />
          </div>
          <span className="brand-name">ApexPrep</span>
        </div>

        <ul className="sidebar-menu">
          <li 
            className={`menu-item ${activeTab === 'portal' ? 'active' : ''}`}
            onClick={() => setActiveTab('portal')}
          >
            <Briefcase size={20} />
            <span>Job Portal Desk</span>
          </li>

          <li 
            className={`menu-item ${activeTab === 'prep' ? 'active' : ''}`}
            onClick={() => setActiveTab('prep')}
          >
            <BookOpen size={20} />
            <span>Preparation Hub</span>
          </li>

          <li 
            className={`menu-item ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            <Building2 size={20} />
            <span>Hiring Guides</span>
          </li>
        </ul>

        {/* Sidebar Footer User profile */}
        <div className="sidebar-footer">
          <button 
            className="btn btn-secondary" 
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              marginBottom: '12px',
              padding: '8px 12px',
              fontSize: '0.85rem'
            }}
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div className="user-profile">
            <div className="avatar">NJ</div>
            <div className="user-info">
              <span className="user-name">Nigel Jacob</span>
              <span className="user-title">Software Engineer</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SCROLLABLE CONTAINER */}
      <main className="main-content">
        
        {/* Dynamic Page Header Bar */}
        <header className="header-bar">
          <div className="header-title-section">
            {activeTab === 'portal' && (
              <>
                <h1>Opportunities Hub</h1>
                <p>Track applications, apply using quick simulators, or post positions to recruit talent.</p>
              </>
            )}
            {activeTab === 'prep' && (
              <>
                <h1>Structured Prep Desk</h1>
                <p>Level up your quantitative aptitude, practice compiler coding, flip flashcards, and run HR simulators.</p>
              </>
            )}
            {activeTab === 'companies' && (
              <>
                <h1>Recruitment Portals</h1>
                <p>Explore round criteria, eligibility metrics, and run strict mock assessment engines.</p>
              </>
            )}
          </div>

          {/* Role Switcher Action (Available in Job Portal Mode) */}
          {activeTab === 'portal' && (
            <div className="header-actions">
              <div className="role-toggle">
                <button 
                  className={`role-btn ${!isAdmin ? 'active' : ''}`}
                  onClick={() => setIsAdmin(false)}
                >
                  <User size={14} /> Applicant
                </button>
                <button 
                  className={`role-btn ${isAdmin ? 'active' : ''}`}
                  onClick={() => setIsAdmin(true)}
                >
                  <Shield size={14} /> Employer
                </button>
              </div>
            </div>
          )}
        </header>

        {/* 3. DYNAMIC CONTENT RENDERING */}
        {activeTab === 'portal' && (
          <JobPortal 
            jobs={jobs} 
            setJobs={setJobs}
            applications={applications}
            setApplications={setApplications}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'prep' && (
          <PrepHub />
        )}

        {activeTab === 'companies' && (
          <CompanyGuides />
        )}

      </main>

    </div>
  );
}
