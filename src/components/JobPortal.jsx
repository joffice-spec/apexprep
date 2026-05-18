import React, { useState } from 'react';
import { 
  Search, Briefcase, MapPin, DollarSign, Calendar, Filter, 
  Layers, Upload, FileText, CheckCircle, PlusCircle, Users, ArrowRight, UserCheck
} from 'lucide-react';

export default function JobPortal({ 
  jobs, setJobs, applications, setApplications, isAdmin 
}) {
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExp, setSelectedExp] = useState('All');
  const [selectedSalary, setSelectedSalary] = useState('All');
  
  // Application Modal State
  const [applyJob, setApplyJob] = useState(null);
  const [applyStep, setApplyStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [answers, setAnswers] = useState({ portfolio: '', start: 'Immediate' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Employer Form State
  const [newJob, setNewJob] = useState({
    title: '', company: '', location: '', type: 'Remote',
    experience: 'Entry Level', salary: '$80,000 - $100,000',
    description: '', requirements: '', deadline: '30 Days'
  });

  // Handle Quick Apply Form Steps
  const handleNextStep = () => {
    if (applyStep === 1 && !resumeFile) {
      alert("Please upload a resume to proceed.");
      return;
    }
    setApplyStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setApplyStep(prev => prev - 1);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Network latency
    setTimeout(() => {
      const newApplication = {
        id: 'app_' + Date.now(),
        jobId: applyJob.id,
        jobTitle: applyJob.title,
        company: applyJob.company,
        status: 'Applied', // Applied, Review, Interviewing, Offered
        candidateName: 'Nigel Jacob',
        candidateEmail: 'nigel@example.com',
        resume: resumeFile.name,
        appliedDate: new Date().toLocaleDateString()
      };

      setApplications(prev => [...prev, newApplication]);
      setIsSubmitting(false);
      setApplyStep(4); // Success step
    }, 1500);
  };

  const resetApplyModal = () => {
    setApplyJob(null);
    setApplyStep(1);
    setResumeFile(null);
    setCoverLetter('');
    setAnswers({ portfolio: '', start: 'Immediate' });
  };

  // Mock file selection trigger
  const triggerMockUpload = () => {
    setResumeFile({ name: 'Nigel_Jacob_Resume_2026.pdf', size: '245 KB' });
  };

  // Post a Job as Employer
  const handlePostJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company || !newJob.location || !newJob.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const job = {
      id: 'job_' + Date.now(),
      ...newJob,
      logoLetter: newJob.company.charAt(0).toUpperCase(),
      posted: 'Just now'
    };

    setJobs(prev => [job, ...prev]);
    alert(`Success! "${newJob.title}" has been posted and added to list.`);
    setNewJob({
      title: '', company: '', location: '', type: 'Remote',
      experience: 'Entry Level', salary: '$80,000 - $100,000',
      description: '', requirements: '', deadline: '30 Days'
    });
  };

  // Update candidate status inside Employer view
  const handleStatusChange = (appId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  // Filter Jobs List
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesExp = selectedExp === 'All' || job.experience === selectedExp;
    
    let matchesSalary = true;
    if (selectedSalary !== 'All') {
      // Very simple mock containment check
      matchesSalary = job.salary.includes(selectedSalary);
    }

    return matchesSearch && matchesType && matchesExp && matchesSalary;
  });

  return (
    <div className="job-portal-dashboard">
      
      {/* 1. Portal Stats Grid */}
      <div className="dashboard-stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon primary">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="stat-number">{filteredJobs.length}</div>
            <div className="stat-label">Available Positions</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon secondary">
            <Layers size={24} />
          </div>
          <div>
            <div className="stat-number">
              {applications.filter(a => a.status === 'Applied' || a.status === 'Review').length}
            </div>
            <div className="stat-label">Active Applications</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon success">
            <UserCheck size={24} />
          </div>
          <div>
            <div className="stat-number">
              {applications.filter(a => a.status === 'Interviewing').length}
            </div>
            <div className="stat-label">Interviews Scheduled</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon warning">
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-number">
              {applications.filter(a => a.status === 'Offered').length}
            </div>
            <div className="stat-label">Offers Received</div>
          </div>
        </div>
      </div>

      {/* 2. Visual Kanban Board for Applicant Tracker */}
      {!isAdmin && applications.length > 0 && (
        <div className="tracker-section">
          <div className="tracker-title-row">
            <h3>Your Application Tracking Board</h3>
            <span className="badge badge-primary">Dynamic Updates</span>
          </div>
          
          <div className="kanban-board">
            {['Applied', 'Review', 'Interviewing', 'Offered'].map(status => {
              const columnApps = applications.filter(a => a.status === status);
              return (
                <div key={status} className="kanban-column">
                  <div className="column-header">
                    <span className="column-title">
                      {status === 'Applied' && <span style={{color: 'var(--primary)'}}>● </span>}
                      {status === 'Review' && <span style={{color: 'var(--secondary)'}}>● </span>}
                      {status === 'Interviewing' && <span style={{color: 'var(--warning)'}}>● </span>}
                      {status === 'Offered' && <span style={{color: 'var(--success)'}}>● </span>}
                      {status}
                    </span>
                    <span className="column-count">{columnApps.length}</span>
                  </div>
                  <div className="kanban-cards-container">
                    {columnApps.map(app => (
                      <div key={app.id} className="kanban-card">
                        <div className="kanban-card-title">{app.jobTitle}</div>
                        <div className="kanban-card-subtitle">
                          <span>{app.company}</span>
                          <span style={{color: 'var(--text-muted)'}}>{app.appliedDate}</span>
                        </div>
                      </div>
                    ))}
                    {columnApps.length === 0 && (
                      <div style={{
                        padding: '24px 12px', textAlign: 'center', 
                        color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px dashed var(--border-light)', 
                        borderRadius: 'var(--radius-sm)'
                      }}>
                        No items
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Main Views Grid (Employer vs Applicant) */}
      {isAdmin ? (
        /* EMPLOYER VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Post a New Job Card */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={20} color="var(--primary)" />
              Post a New Position
            </h3>
            
            <form onSubmit={handlePostJob} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="filter-group">
                <label className="filter-label">Job Title *</label>
                <input 
                  type="text" 
                  className="form-control form-control-noicon" 
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newJob.title}
                  onChange={e => setNewJob(p => ({ ...p, title: e.target.value }))}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Company Name *</label>
                <input 
                  type="text" 
                  className="form-control form-control-noicon" 
                  placeholder="e.g. Apex Tech Corp"
                  value={newJob.company}
                  onChange={e => setNewJob(p => ({ ...p, company: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="filter-group">
                  <label className="filter-label">Workspace Type</label>
                  <select 
                    className="form-control form-control-noicon"
                    value={newJob.type}
                    onChange={e => setNewJob(p => ({ ...p, type: e.target.value }))}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Experience</label>
                  <select 
                    className="form-control form-control-noicon"
                    value={newJob.experience}
                    onChange={e => setNewJob(p => ({ ...p, experience: e.target.value }))}
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Location *</label>
                <input 
                  type="text" 
                  className="form-control form-control-noicon" 
                  placeholder="e.g. San Francisco, CA"
                  value={newJob.location}
                  onChange={e => setNewJob(p => ({ ...p, location: e.target.value }))}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Salary Range</label>
                <input 
                  type="text" 
                  className="form-control form-control-noicon" 
                  placeholder="e.g. $120,000 - $140,000"
                  value={newJob.salary}
                  onChange={e => setNewJob(p => ({ ...p, salary: e.target.value }))}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Job Description *</label>
                <textarea 
                  className="form-control form-control-noicon"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  placeholder="Describe roles and expectations..."
                  value={newJob.description}
                  onChange={e => setNewJob(p => ({ ...p, description: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Publish Listing
              </button>
            </form>
          </div>

          {/* Employer Activity Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="var(--secondary)" />
                Active Candidate Applications ({applications.length})
              </h3>
              
              {applications.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
                  No candidate applications yet. Switch to "Applicant Mode" to simulate submitting resumes!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {applications.map(app => (
                    <div key={app.id} style={{
                      background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', 
                      justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{app.candidateName}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          Applied for <strong style={{color: 'var(--primary)'}}>{app.jobTitle}</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span>Doc: 📃 {app.resume}</span>
                          <span>Date: 📅 {app.appliedDate}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="badge badge-primary">{app.status}</span>
                        <select 
                          className="form-control form-control-noicon"
                          style={{ padding: '4px 10px', fontSize: '0.8rem', width: '130px' }}
                          value={app.status}
                          onChange={e => handleStatusChange(app.id, e.target.value)}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Review">In Review</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Offered">Offer Offered</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '16px' }}>Your Posted Openings ({jobs.filter(j => j.logoLetter === 'A' || j.posted === 'Just now').length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {jobs.map(job => (
                  <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{job.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.company} • {job.location} • {job.type}</div>
                    </div>
                    <span className="badge badge-success">{job.salary}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* APPLICANT EXPLORE VIEW */
        <div className="explore-jobs-section">
          {/* Filters Column */}
          <div className="glass-card filter-panel">
            <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="var(--primary)" />
              Search & Filters
            </h3>

            <div className="filter-group">
              <label className="filter-label">Keywords</label>
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Title, skills, or company"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Workspace Model</label>
              <div className="checkbox-group">
                {['All', 'Remote', 'Hybrid', 'On-site'].map(type => (
                  <label key={type} className="checkbox-label">
                    <input 
                      type="radio" 
                      name="jobType"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Experience Level</label>
              <div className="checkbox-group">
                {['All', 'Entry Level', 'Mid Level', 'Senior Level'].map(level => (
                  <label key={level} className="checkbox-label">
                    <input 
                      type="radio" 
                      name="expLevel"
                      checked={selectedExp === level}
                      onChange={() => setSelectedExp(level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Salary Threshold</label>
              <select 
                className="form-control form-control-noicon"
                value={selectedSalary}
                onChange={e => setSelectedSalary(e.target.value)}
              >
                <option value="All">Show All salaries</option>
                <option value="$80,000">Above $80,000+</option>
                <option value="$120,000">Above $120,000+</option>
                <option value="$150,000">Above $150,000+</option>
              </select>
            </div>
          </div>

          {/* Jobs Listing Column */}
          <div className="jobs-list-pane">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3>Matching Openings ({filteredJobs.length})</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sorted by: Most Relevant</span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>No matches found</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Try refining your search terms, removing filters, or toggle to "Employer Mode" to create a new matching role!
                </p>
              </div>
            ) : (
              filteredJobs.map(job => {
                const hasApplied = applications.some(a => a.jobId === job.id);
                return (
                  <div key={job.id} className="glass-card job-item">
                    <div className="company-logo-placeholder">
                      {job.logoLetter}
                    </div>

                    <div className="job-details-brief">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 className="job-title">{job.title}</h4>
                        <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{job.type}</span>
                      </div>
                      
                      <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>{job.company}</div>
                      
                      <div className="job-meta-row">
                        <span className="meta-item"><MapPin size={14} /> {job.location}</span>
                        <span className="meta-item job-salary"><DollarSign size={14} /> {job.salary}</span>
                        <span className="meta-item"><Calendar size={14} /> {job.experience}</span>
                        <span className="meta-item" style={{color: 'var(--text-muted)'}}>Posted: {job.posted}</span>
                      </div>

                      <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {job.description.length > 180 ? job.description.substring(0, 180) + '...' : job.description}
                      </p>
                    </div>

                    <div>
                      {hasApplied ? (
                        <button className="btn btn-secondary" style={{ cursor: 'not-allowed' }} disabled>
                          <CheckCircle size={16} color="var(--success)" /> Applied
                        </button>
                      ) : (
                        <button className="btn btn-primary" onClick={() => setApplyJob(job)}>
                          Quick Apply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 4. MULTI-STEP QUICK APPLY MODAL */}
      {applyJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={resetApplyModal}>×</button>
            
            <div className="modal-header">
              <h2>Quick Apply to {applyJob.company}</h2>
              <p style={{ fontSize: '0.85rem' }}>Position: <strong style={{color: 'var(--primary)'}}>{applyJob.title}</strong></p>
            </div>

            {/* Stepper bar */}
            <div className="step-indicator">
              <div className={`step-dot ${applyStep >= 1 ? 'active' : ''} ${applyStep > 1 ? 'completed' : ''}`}>1</div>
              <div className={`step-dot ${applyStep >= 2 ? 'active' : ''} ${applyStep > 2 ? 'completed' : ''}`}>2</div>
              <div className={`step-dot ${applyStep >= 3 ? 'active' : ''} ${applyStep > 3 ? 'completed' : ''}`}>3</div>
              <div className={`step-dot ${applyStep >= 4 ? 'active' : ''} ${applyStep > 4 ? 'completed' : ''}`}>✓</div>
            </div>

            {/* Step Content */}
            {applyStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3>Upload Your Credentials</h3>
                <p>Provide your most up-to-date resume. Our simulated parser will fetch relevant details.</p>
                
                <div className="file-upload-zone" onClick={triggerMockUpload}>
                  <Upload size={40} color={resumeFile ? "var(--success)" : "var(--primary)"} />
                  {resumeFile ? (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: 'var(--success)', fontWeight: '600' }}>{resumeFile.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>File loaded successfully • {resumeFile.size}</p>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: '500' }}>Click to upload Resume (Simulated)</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supports PDF, DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button className="btn btn-primary" onClick={handleNextStep}>
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {applyStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3>Application Questionnaire</h3>
                <p>Provide a short cover pitch for the recruiter at {applyJob.company}.</p>
                
                <div className="filter-group">
                  <label className="filter-label">Cover Pitch *</label>
                  <textarea 
                    className="form-control form-control-noicon"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    placeholder="Briefly pitch why your skills align with this position..."
                    value={coverLetter}
                    onChange={e => setCoverLetter(e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label className="filter-label">When can you start?</label>
                  <select 
                    className="form-control form-control-noicon"
                    value={answers.start}
                    onChange={e => setAnswers(prev => ({ ...prev, start: e.target.value }))}
                  >
                    <option value="Immediate">Immediate / Within 1 week</option>
                    <option value="15 Days">Within 15 days</option>
                    <option value="30 Days">30 Days Notice Period</option>
                    <option value="Flexible">Flexible / Open to discussion</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <button className="btn btn-secondary" onClick={handlePrevStep}>Back</button>
                  <button className="btn btn-primary" onClick={handleNextStep}>
                    Review Application <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {applyStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3>Review & Finalize</h3>
                <p>Verify your details before sending them directly to {applyJob.company}'s Hiring Manager.</p>
                
                <div style={{
                  background: 'var(--bg-main)', border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'
                }}>
                  <div>
                    <span className="filter-label">Applied Role:</span>
                    <div style={{ fontWeight: '600' }}>{applyJob.title} @ {applyJob.company}</div>
                  </div>
                  <div>
                    <span className="filter-label">Candidate:</span>
                    <div>Nigel Jacob (nigel@example.com)</div>
                  </div>
                  <div>
                    <span className="filter-label">Uploaded Document:</span>
                    <div style={{ color: 'var(--success)' }}>📃 {resumeFile?.name}</div>
                  </div>
                  <div>
                    <span className="filter-label">Cover Pitch:</span>
                    <div style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      "{coverLetter || "No pitch provided."}"
                    </div>
                  </div>
                  <div>
                    <span className="filter-label">Availability:</span>
                    <div>{answers.start}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <button className="btn btn-secondary" onClick={handlePrevStep} disabled={isSubmitting}>Back</button>
                  <button className="btn btn-cyber" onClick={handleApplySubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Transmitting Profile..." : "Submit Application ✓"}
                  </button>
                </div>
              </div>
            )}

            {applyStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px', padding: '20px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)',
                  display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '2rem'
                }}>
                  ✓
                </div>
                <div>
                  <h3>Application Transmitted!</h3>
                  <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
                    Your application for <strong style={{color: '#fff'}}>{applyJob.title}</strong> has been successfully received by <strong>{applyJob.company}</strong>.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    A visual card has been instantly generated and added to your **Job Tracking Board**. You can track changes or switch to "Employer Mode" to see how recruiters view and change status of your profile!
                  </p>
                </div>
                <button className="btn btn-primary" onClick={resetApplyModal}>
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
