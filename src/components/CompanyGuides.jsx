import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Calendar, Award, Star, BookOpen, 
  ChevronRight, ArrowLeft, Play, Clock, HelpCircle, Save 
} from 'lucide-react';

export default function CompanyGuides() {
  const [selectedCompany, setSelectedCompany] = useState(null); // google, amazon, tcs, infosys
  const [examState, setExamState] = useState('idle'); // idle, active, completed
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: selectedOption }
  const [markedForReview, setMarkedForReview] = useState({}); // { qIndex: boolean }
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [examScore, setExamScore] = useState(null);

  const companiesList = [
    {
      id: 'google',
      name: 'Google LLC',
      logoLetter: 'G',
      color: '#4285F4',
      package: '$140,000 - $210,000',
      roundsCount: 4,
      eligibility: "B.Tech/M.Tech in CS/IT or equivalent. No CGPA cut-off but high proficiency in algorithms and complex system design. Zero active backlogs.",
      pattern: "Round 1: Online Coding Assessment (2 Questions, 45 mins)\nRound 2: Technical Interview I (Data Structures, Big-O, 45 mins)\nRound 3: Technical Interview II (System Design, Scaling, 45 mins)\nRound 4: Googleyness & Leadership (Cultural alignment, 45 mins)",
      syllabus: "Advanced DSA (Graphs, Dynamic Programming, Segment Trees), System Design, Scalability, Concurrency, and Core OS memory management paradigms.",
      mockQuestions: [
        {
          q: "Which of the following data structures is most efficient for implementing a cache with O(1) read/write times and LRU eviction policy?",
          options: ["Binary Search Tree", "Doubly Linked List + Hash Map", "Min-Heap", "Trie"],
          answer: 1, // DLL + Hash Map
          explain: "A doubly linked list allows O(1) element ordering and node eviction, while a hash map enables O(1) node lookup. Combined, they create a perfect LRU cache."
        },
        {
          q: "What is the primary constraint addressed by Google's MapReduce architecture?",
          options: ["High-speed 3D rendering", "Distributed processing of extremely large datasets across thousands of standard machines", "Single-threaded web crawling", "In-memory SQL transactions"],
          answer: 1,
          explain: "MapReduce is designed to process and generate huge datasets by dividing work into Map and Reduce steps running concurrently on massive commodity hardware clusters."
        },
        {
          q: "In a Distributed System, what does the CAP Theorem state?",
          options: ["Caching, Auditing, and Performance are proportional.", "A system can guarantee at most two out of three: Consistency, Availability, and Partition Tolerance.", "Compilers, Assemblers, and Parsers run sequentially.", "Every transaction is Atomic, Consistent, and Isolated."],
          answer: 1,
          explain: "The CAP Theorem states that a distributed data store can simultaneously provide at most two of the three guarantees: Consistency, Availability, and Partition Tolerance."
        }
      ]
    },
    {
      id: 'amazon',
      name: 'Amazon',
      logoLetter: 'A',
      color: '#FF9900',
      package: '$120,000 - $180,000',
      roundsCount: 4,
      eligibility: "B.Tech/M.Tech in CS/ECE/EE. CGPA: 7.0+ or equivalent percentage. No active backlogs. Deep knowledge of object-oriented designs.",
      pattern: "Round 1: Online Assessment (Coding + Work Simulation, 90 mins)\nRound 2: Technical Interview I (DSA + Leadership Principles, 60 mins)\nRound 3: Technical Interview II (System Design + Leadership Principles, 60 mins)\nRound 4: Bar Raiser (High standards evaluation, 60 mins)",
      syllabus: "Trees, Graphs, Recursion, Object-Oriented Design (OOD), Cache Mechanisms, and Amazon's 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action).",
      mockQuestions: [
        {
          q: "Which Amazon Leadership Principle emphasizes that leaders should act on behalf of the entire company and never say 'that's not my job'?",
          options: ["Customer Obsession", "Ownership", "Bias for Action", "Frugality"],
          answer: 1, // Ownership
          explain: "Ownership states that leaders think long term and act on behalf of the entire company. They never sacrifice long-term value for short-term results."
        },
        {
          q: "Which traversal of a Binary Search Tree (BST) yields elements in sorted, ascending order?",
          options: ["Pre-order traversal", "Post-order traversal", "In-order traversal", "Level-order traversal"],
          answer: 2,
          explain: "In-order traversal visits the left subtree, the root, and then the right subtree, which processes BST elements in sorted order."
        }
      ]
    },
    {
      id: 'tcs',
      name: 'Tata Consultancy Services (TCS NQT)',
      logoLetter: 'T',
      color: '#008080',
      package: '$40,000 - $85,000',
      roundsCount: 3,
      eligibility: "B.E./B.Tech/M.E./M.Tech/MCA/M.Sc. 60% or 6.0 CGPA throughout X, XII, UG and PG. Max 1 active backlog allowed at time of test.",
      pattern: "Round 1: TCS National Qualifier Test (Cognitive, Verbal, Coding - 180 mins)\nRound 2: Technical Interview (Core CS, DBMS, OOPs - 30 mins)\nRound 3: HR & MR Interview (Management & behavioral alignment - 20 mins)",
      syllabus: "Quantitative Aptitude (Partnership, Ratios, Time & Work), Logical Reasoning, Verbal Ability, Core programming logic (C/C++/Java/Python), and SQL/DBMS queries.",
      mockQuestions: [
        {
          q: "If A and B together can complete a work in 12 days, and A alone can complete it in 20 days, how many days will B alone take to finish the work?",
          options: ["25 days", "30 days", "35 days", "40 days"],
          answer: 1, // 30 days
          explain: "B's 1-day work = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. B will take 30 days to finish the work."
        },
        {
          q: "Which SQL command is used to remove all records from a table without logging the individual row deletions, making it faster than DELETE?",
          options: ["DROP", "REMOVE", "TRUNCATE", "ALTER"],
          answer: 2,
          explain: "TRUNCATE is a DDL command that removes all rows from a table. It does not log individual row deletions and cannot be rolled back in some DBMS systems."
        }
      ]
    }
  ];

  // Mock Exam Timer Thread
  useEffect(() => {
    let timer;
    if (examState === 'active' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && examState === 'active') {
      submitExam();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examState]);

  const startMockExam = () => {
    setExamState('active');
    setCurrentQ(0);
    setAnswers({});
    setMarkedForReview({});
    setTimeLeft(600); // 10 minutes mock exam
    setExamScore(null);
  };

  const selectAnswer = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ]: optionIndex
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ]: !prev[currentQ]
    }));
  };

  const submitExam = () => {
    let score = 0;
    const questions = selectedCompany.mockQuestions;
    
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        score += 1;
      }
    });

    setExamScore(score);
    setExamState('completed');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {!selectedCompany ? (
        /* 1. SELECTOR HOME VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h2>Company-Specific Placement Guides</h2>
            <p>Master placement exams of top corporations with updated syllabus, structures, eligibility requirements, and strict mock evaluations.</p>
          </div>

          <div className="company-selector-grid">
            {companiesList.map(comp => (
              <div 
                key={comp.id} 
                className="glass-card company-guide-card"
                onClick={() => setSelectedCompany(comp)}
              >
                <div className="company-badge-header">
                  <div className="company-accent-color" style={{ backgroundColor: comp.color }}>
                    {comp.logoLetter}
                  </div>
                  <span className="badge badge-success">Active Hiring</span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{comp.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>💼 {comp.roundsCount} Interview Rounds</span>
                    <span>•</span>
                    <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>{comp.package}</span>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', justifycontent: 'space-between', alignItems: 'center',
                  paddingTop: '12px', borderTop: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--primary)'
                }}>
                  <span>Syllabus & Mock Exam</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 2. DETAILED COMPANY RECRUITMENT INTELLIGENCE VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '8px 12px' }}
              onClick={() => setSelectedCompany(null)}
            >
              <ArrowLeft size={16} /> Back to Companies
            </button>
            
            <div className="company-accent-color" style={{ backgroundColor: selectedCompany.color, width: '40px', height: '40px', fontSize: '1.1rem' }}>
              {selectedCompany.logoLetter}
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.6rem' }}>{selectedCompany.name} Hiring Hub</h2>
              <p style={{ fontSize: '0.85rem' }}>Average Compensation: <strong style={{color: 'var(--secondary)'}}>{selectedCompany.package}</strong></p>
            </div>
          </div>

          {/* Core Info Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
            
            {/* Eligibility & Rounds Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-card">
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--primary)" />
                  Eligibility Criteria
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#fff', lineHeight: '1.6' }}>
                  {selectedCompany.eligibility}
                </p>
              </div>

              <div className="glass-card">
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} color="var(--secondary)" />
                  Assessment Round Structure
                </h3>
                <div style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  {selectedCompany.pattern}
                </div>
              </div>
            </div>

            {/* Syllabus & Mock Exam Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-card">
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="var(--warning)" />
                  Recruitment Syllabus
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedCompany.syllabus}
                </p>
              </div>

              <div className="glass-card" style={{ 
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.05))',
                borderColor: 'var(--border-primary)'
              }}>
                <h3 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={18} color="var(--secondary)" />
                  Simulated Mock Assessment
                </h3>
                <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
                  Launch a full placement test conforming specifically to <strong>{selectedCompany.name}</strong>'s official standard. Evaluates dynamic time benchmarks, navigation indexing, and diagnostic logic scoring.
                </p>
                
                <button className="btn btn-cyber" onClick={startMockExam}>
                  <Play size={16} /> Launch Simulated Exam
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          3. FULL SCREEN COMPANY MOCK ASSESSMENT OVERLAY
          ==================================================================== */}
      {examState !== 'idle' && selectedCompany && (
        <div className="exam-view-overlay">
          
          {/* Exam Top Navigation Bar */}
          <div className="exam-nav-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="company-accent-color" style={{ backgroundColor: selectedCompany.color, width: '32px', height: '32px', fontSize: '0.9rem' }}>
                {selectedCompany.logoLetter}
              </span>
              <strong style={{ fontSize: '1.1rem' }}>{selectedCompany.name} Assessment Simulator</strong>
            </div>

            {examState === 'active' && (
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)',
                padding: '6px 16px', borderRadius: 'var(--radius-full)', color: 'var(--error)'
              }}>
                <Clock size={16} />
                <strong style={{ fontSize: '0.95rem' }}>Time Remaining: {formatTime(timeLeft)}</strong>
              </div>
            )}
          </div>

          {examState === 'active' && (
            <div className="exam-grid-layout">
              {/* Question Area */}
              <div className="exam-question-area">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  <span className="badge badge-primary">Question {currentQ + 1} of {selectedCompany.mockQuestions.length}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cognitive Evaluation Core</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', lineHeight: '1.6' }}>
                  {selectedCompany.mockQuestions[currentQ].q}
                </h3>

                <div className="options-list" style={{ marginTop: '12px' }}>
                  {selectedCompany.mockQuestions[currentQ].options.map((opt, idx) => (
                    <button 
                      key={idx}
                      className={`option-btn ${answers[currentQ] === idx ? 'selected' : ''}`}
                      onClick={() => selectAnswer(idx)}
                    >
                      <span style={{ fontWeight: '600', marginRight: '12px' }}>
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Submits row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
                  <button className="btn btn-secondary" onClick={toggleMarkForReview}>
                    {markedForReview[currentQ] ? "★ Marked for review" : "☆ Mark for review"}
                  </button>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      className="btn btn-secondary"
                      disabled={currentQ === 0}
                      onClick={() => setCurrentQ(prev => prev - 1)}
                    >
                      Previous
                    </button>
                    
                    {currentQ < selectedCompany.mockQuestions.length - 1 ? (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setCurrentQ(prev => prev + 1)}
                      >
                        Save & Next
                      </button>
                    ) : (
                      <button 
                        className="btn btn-cyber"
                        onClick={submitExam}
                      >
                        Submit Test Suit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Exam Sidebar Navigation Grid */}
              <div className="exam-sidebar-pane">
                <div>
                  <h4 style={{ marginBottom: '8px' }}>Placement Console</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Navigate through questions dynamically. Colors represent answered states.</p>
                </div>

                <div className="question-nav-grid">
                  {selectedCompany.mockQuestions.map((_, idx) => {
                    let navClass = "question-nav-btn";
                    if (currentQ === idx) navClass += " active";
                    else if (answers[idx] !== undefined) navClass += " answered";
                    else if (markedForReview[idx]) navClass += " marked";

                    return (
                      <button 
                        key={idx}
                        className={navClass}
                        onClick={() => setCurrentQ(idx)}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div style={{ 
                  borderTop: '1px solid var(--border-light)', paddingTop: '20px', 
                  display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '2px' }}></span>
                    <span>Answered & Saved</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '12px', height: '12px', background: 'var(--warning)', borderRadius: '2px' }}></span>
                    <span>Marked for Review</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '12px', height: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '2px' }}></span>
                    <span>Unanswered</span>
                  </div>
                </div>

                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: 'auto', border: '1px solid var(--error)', color: 'var(--error)' }}
                  onClick={submitExam}
                >
                  Terminate & Submit
                </button>
              </div>
            </div>
          )}

          {/* Exam Results Score Screen */}
          {examState === 'completed' && (
            <div style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              justifyContent: 'center', flexGrow: 1, padding: '40px', gap: '20px',
              maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'
            }}>
              <Award size={64} color="var(--success)" />
              <h2>Placement Mock Test Completed!</h2>
              <p>Your results have been processed using official grading rubrics.</p>

              <div style={{
                display: 'flex', gap: '40px', margin: '20px 0',
                padding: '20px 40px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                    {examScore}/{selectedCompany.mockQuestions.length}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Correct Answers</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--secondary)' }}>
                    {Math.round((examScore / selectedCompany.mockQuestions.length) * 100)}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accuracy Rating</div>
                </div>
              </div>

              {/* Show question review details */}
              <div style={{ 
                width: '100%', textAlign: 'left', background: 'var(--bg-sidebar)', 
                border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px',
                display: 'flex', flexDirection: 'column', gap: '12px'
              }}>
                <h4 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Test Solutions Diagnostics:</h4>
                {selectedCompany.mockQuestions.map((q, idx) => (
                  <div key={idx} style={{ fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: '600', color: '#fff' }}>Q{idx+1}: {q.q}</div>
                    <div style={{ 
                      marginTop: '4px', 
                      color: answers[idx] === q.answer ? 'var(--success)' : 'var(--error)' 
                    }}>
                      Your Choice: {answers[idx] !== undefined ? q.options[answers[idx]] : "None"} 
                      {answers[idx] !== q.answer && ` (Correct: ${q.options[q.answer]})`}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                      Breakdown: {q.explain}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setExamState('idle')}>
                  Back to Hub
                </button>
                <button className="btn btn-cyber" onClick={startMockExam}>
                  Restart Assessment
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
