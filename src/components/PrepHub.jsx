import React, { useState, useEffect } from 'react';
import { 
  Award, BookOpen, Code, Cpu, MessageSquare, Play, 
  RotateCcw, Check, X, ArrowRight, HelpCircle, ChevronRight 
} from 'lucide-react';

export default function PrepHub() {
  const [activeTab, setActiveTab] = useState('aptitude'); // aptitude, dsa, technical, hr

  // ==========================================
  // 1. APTITUDE PRACTICE STATE
  // ==========================================
  const [selectedTopic, setSelectedTopic] = useState('Quant');
  const [quizState, setQuizState] = useState('idle'); // idle, active, completed
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const aptitudeQuestions = {
    Quant: [
      {
        q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "150 metres", "324 metres", "180 metres"],
        answer: 1, // "150 metres"
        explain: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length of train = Speed * Time = (50/3) * 9 = 150 metres."
      },
      {
        q: "A sum of money at simple interest amounts to $815 in 3 years and to $854 in 4 years. The sum is:",
        options: ["$650", "$690", "$698", "$700"],
        answer: 2, // "$698"
        explain: "S.I. for 1 year = $(854 - 815) = $39. S.I. for 3 years = $(39 * 3) = $117. Sum = $(815 - 117) = $698."
      },
      {
        q: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?",
        options: ["12 minutes", "15 minutes", "25 minutes", "50 minutes"],
        answer: 0, // "12 minutes"
        explain: "Net part filled in 1 minute = 1/20 + 1/30 = 5/60 = 1/12. Hence, tank fills in 12 minutes."
      }
    ],
    Logical: [
      {
        q: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
        options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"],
        answer: 1, // "(1/8)"
        explain: "This is a simple division series; each number is one-half of the previous number."
      },
      {
        q: "If A + B means A is the brother of B; A - B means A is the sister of B and A x B means A is the father of B. Which of the following means that C is the son of M?",
        options: ["M - N x C + F", "F - C + N x M", "N + M - F x C", "M x C - N"],
        answer: 0, // "M - N x C + F"
        explain: "C + F means C is brother of F. N x C means N is father of C. M - N means M is sister of N. Hence C is the nephew/son of the lineage. To be specific, let's verify C's male gender from (+ F) and lineage connection to M."
      }
    ],
    Verbal: [
      {
        q: "Find the synonym of 'CANDID':",
        options: ["Vague", "Outspoken", "Secretive", "Dishonest"],
        answer: 1, // "Outspoken"
        explain: "'Candid' means truthful and straightforward; outspoken or frank is the exact synonym."
      },
      {
        q: "Choose the word which is opposite in meaning to 'ABUNDANT':",
        options: ["Plentiful", "Scarce", "Ample", "Generous"],
        answer: 1, // "Scarce"
        explain: "'Abundant' means existing or available in large quantities. The antonym is 'Scarce'."
      }
    ]
  };

  useEffect(() => {
    let timer;
    if (quizState === 'active' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && quizState === 'active') {
      setQuizState('completed');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizState]);

  const startQuiz = () => {
    setQuizState('active');
    setCurrentQ(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(60);
  };

  const handleOptionSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === aptitudeQuestions[selectedTopic][currentQ].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQ = () => {
    if (currentQ < aptitudeQuestions[selectedTopic].length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizState('completed');
    }
  };

  // ==========================================
  // 2. DSA PLAYGROUND STATE
  // ==========================================
  const dsaProblems = [
    {
      id: 'twosum',
      title: 'Two Sum',
      difficulty: 'Easy',
      desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input would have exactly one solution.',
      examples: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
      jsTemplate: `function twoSum(nums, target) {\n  // Write your code here\n  const map = new Map();\n  for(let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if(map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      pyTemplate: `def twoSum(nums, target):\n    # Write your code here\n    hashmap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hashmap:\n            return [hashmap[complement], i]\n        hashmap[num] = i\n    return []`
    },
    {
      id: 'reverse',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      desc: 'Given the head of a singly linked list, reverse the list, and return its reversed list head node.',
      examples: 'Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]',
      jsTemplate: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr !== null) {\n    let nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  return prev;\n}`,
      pyTemplate: `def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev`
    },
    {
      id: 'brackets',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      desc: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. Brackets must close in correct order.',
      examples: 'Input: s = "()[]{}"\nOutput: true\n\nInput: s = "(]"\nOutput: false',
      jsTemplate: `function isValid(s) {\n  const stack = [];\n  const mapping = { ")": "(", "}": "{", "]": "[" };\n  for (let char of s) {\n    if (char in mapping) {\n      const topElement = stack.length === 0 ? "#" : stack.pop();\n      if (topElement !== mapping[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}`,
      pyTemplate: `def isValid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n    return not stack`
    }
  ];

  const [activeDsa, setActiveDsa] = useState(dsaProblems[0]);
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(activeDsa.jsTemplate);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    setCode(lang === 'javascript' ? activeDsa.jsTemplate : activeDsa.pyTemplate);
    setConsoleLogs([]);
  }, [activeDsa, lang]);

  const runCodeMock = () => {
    setIsCompiling(true);
    setConsoleLogs(["Initializing compilers...", "Running lexical analyses...", "Binding parameters..."]);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        "✔ Test Case 1 Passed! Input: nums = [2,7,11,15], target = 9 | Output matches: [0,1]",
        "✔ Test Case 2 Passed! Input: nums = [3,2,4], target = 6 | Output matches: [1,2]",
        "",
        "------------------------------------",
        "STATUS: Success (All tests passed)",
        "Execution Time: 48ms",
        "Memory Usage: 41.2 MB",
        "Complexity Analysis:",
        "- Time Complexity: O(N) single pass hashing",
        "- Space Complexity: O(N) hash table storage"
      ]);
      setIsCompiling(false);
    }, 1500);
  };

  // ==========================================
  // 3. TECHNICAL FLASHCARDS STATE
  // ==========================================
  const flashcardCategories = ['DBMS', 'OS', 'Networks', 'System Design'];
  const [selectedCat, setSelectedCat] = useState('DBMS');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStats, setCardStats] = useState({ Easy: 0, Medium: 0, Hard: 0 });

  const flashcardsData = {
    DBMS: [
      { q: "What is Database Normalization and why is it used?", a: "Normalization is the process of organizing database fields and tables to minimize redundancy and dependency. It divides large tables into smaller ones and links them using relationships (1NF, 2NF, 3NF, BCNF) to prevent anomalies during Insert, Update, and Delete operations." },
      { q: "Explain ACID properties in relational databases.", a: "ACID stands for:\n- Atomicity: Entire transaction succeeds or entirely fails.\n- Consistency: Database moves from one valid state to another.\n- Isolation: Transactions execute separately without interfering.\n- Durability: Once committed, data remains saved even during power failure." }
    ],
    OS: [
      { q: "What is a Deadlock and what are its four necessary conditions?", a: "A deadlock occurs when processes are unable to proceed because each holds a resource and waits for another held by someone else.\nConditions:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait" },
      { q: "Difference between Process and Thread.", a: "A Process is an independent program execution unit with separate memory space allocated by OS. A Thread is a lightweight sub-process sharing the same memory and resources of its parent process, enabling efficient parallel tasks with minimal context-switch overhead." }
    ],
    Networks: [
      { q: "Describe the three-way TCP Handshake process.", a: "It establishes a reliable TCP connection:\n1. SYN: Client sends Synchronize packet to Server.\n2. SYN-ACK: Server acknowledges and sends its own Synchronize signal.\n3. ACK: Client acknowledges back. Connection is now ESTABLISHED." },
      { q: "Difference between HTTP and HTTPS.", a: "HTTP (Hypertext Transfer Protocol) transmits data in plain text, making it vulnerable to interception. HTTPS (Hypertext Transfer Protocol Secure) encrypts communication using SSL/TLS, assuring data privacy, integrity, and client-server identity verification." }
    ],
    'System Design': [
      { q: "What is Horizontal vs Vertical Scaling?", a: "Vertical Scaling (Scale-up) means adding more power (CPU, RAM) to an existing single machine. Horizontal Scaling (Scale-out) means adding more machines/servers to the infrastructure pool, distributing load using load balancers. Horizontal scale is highly elastic and reliable." },
      { q: "What is a CDN (Content Delivery Network)?", a: "A CDN is a geographically distributed network of proxy servers and data centers. It caches static assets (images, CSS, JS) closer to users worldwide, dramatically accelerating page response speed and lowering core origin server bandwidth load." }
    ]
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const rateCardFamiliarity = (difficulty) => {
    setCardStats(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));
    setIsFlipped(false);
    // Go to next card in category
    const catCards = flashcardsData[selectedCat];
    setCardIndex(prev => (prev + 1) % catCards.length);
  };

  // ==========================================
  // 4. HR SIMULATOR STATE
  // ==========================================
  const hrDialogues = {
    start: {
      question: "Welcome! Tell me about yourself and why you are interested in this software development career pathway.",
      options: [
        {
          text: "[STAR Method] I have a solid foundation in computer engineering, built interactive apps, and want to leverage my DSA skills to build scalable products here.",
          score: 10,
          feedback: "Excellent! Direct, references concrete achievements, and aligns perfectly with engineering expectations.",
          next: "challenge"
        },
        {
          text: "I really need a job, and I am very good at coding. I can learn anything you throw at me quickly.",
          score: 5,
          feedback: "A bit desperate and generic. Try highlighting specific frameworks or past projects instead of empty claims.",
          next: "challenge"
        },
        {
          text: "To be honest, the compensation and brand of this company is what attracts me the most. I want to code and retire early.",
          score: 2,
          feedback: "Caution: Excessively honest about money. Employers value long term interest in technical problem solving.",
          next: "challenge"
        }
      ]
    },
    challenge: {
      question: "Describe a situation where you had a major disagreement with a team member on technical choices. How did you navigate it?",
      options: [
        {
          text: "[STAR Method] In a project, a peer wanted MongoDB while I proposed PostgreSQL. I drew a benchmarking chart comparing structured relationships and transaction integrity. We reviewed it together, agreed Postgres fit, and launched successfully.",
          score: 10,
          feedback: "Stellar! Uses data-driven decision making, shows emotional maturity, and demonstrates conflict resolution.",
          next: "failure"
        },
        {
          text: "I argued with them until they realized MongoDB had schema issues. Eventually they gave in and we used SQL.",
          score: 4,
          feedback: "Too combative. Shows poor teamwork and lack of collaborative respect.",
          next: "failure"
        },
        {
          text: "I avoided conflict by letting them use whatever they wanted, even though it led to bugs in production.",
          score: 3,
          feedback: "Passivity hurts project safety. A good engineer raises concerns constructively, not stays silent.",
          next: "failure"
        }
      ]
    },
    failure: {
      question: "Can you detail a time when a system launch failed under your control, and what key lessons you learned?",
      options: [
        {
          text: "[STAR Method] I pushed an API update that crashed secondary nodes due to missing env variables. I owned the error, initiated rollback protocols, added system configuration checks in CI/CD pipeline, and established robust backup monitoring.",
          score: 10,
          feedback: "Fantastic! Demonstrates accountability, rapid resolution, and permanent engineering fail-safes.",
          next: "end"
        },
        {
          text: "The server crashed because my team lead forgot to review my pull request. I did my part correctly.",
          score: 2,
          feedback: "Deflecting blame is highly toxic. Recruiters look for personal ownership and constructive lessons.",
          next: "end"
        }
      ]
    }
  };

  const [chatHistory, setChatHistory] = useState([
    { sender: 'hr', text: hrDialogues.start.question }
  ]);
  const [currentStep, setCurrentStep] = useState('start');
  const [totalHrScore, setTotalHrScore] = useState(0);

  const selectHrOption = (opt) => {
    // Add user response bubble
    setChatHistory(prev => [
      ...prev,
      { sender: 'candidate', text: opt.text },
      { sender: 'feedback', text: `💡 Recruiter Feedback: ${opt.feedback}` }
    ]);
    
    setTotalHrScore(prev => prev + opt.score);

    setTimeout(() => {
      if (opt.next === 'end') {
        const finalPercent = Math.round(((totalHrScore + opt.score) / 30) * 100);
        setChatHistory(prev => [
          ...prev,
          { 
            sender: 'hr', 
            text: `Thank you for completing the simulation! Interview completed. Your calculated HR Suitability Rating: ${finalPercent}%. You used structural frameworks effectively.` 
          }
        ]);
        setCurrentStep('end');
      } else {
        const nextPrompt = hrDialogues[opt.next];
        setChatHistory(prev => [
          ...prev,
          { sender: 'hr', text: nextPrompt.question }
        ]);
        setCurrentStep(opt.next);
      }
    }, 1000);
  };

  const resetHrChat = () => {
    setChatHistory([{ sender: 'hr', text: hrDialogues.start.question }]);
    setCurrentStep('start');
    setTotalHrScore(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Dynamic Tabs Navigation */}
      <div className="prep-modules-tabs">
        <button 
          className={`prep-tab-btn ${activeTab === 'aptitude' ? 'active' : ''}`}
          onClick={() => setActiveTab('aptitude')}
        >
          <Award size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Aptitude Quizzes
        </button>
        <button 
          className={`prep-tab-btn ${activeTab === 'dsa' ? 'active' : ''}`}
          onClick={() => setActiveTab('dsa')}
        >
          <Code size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          DSA Coding Terminal
        </button>
        <button 
          className={`prep-tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          <Cpu size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Technical Flashcards
        </button>
        <button 
          className={`prep-tab-btn ${activeTab === 'hr' ? 'active' : ''}`}
          onClick={() => setActiveTab('hr')}
        >
          <MessageSquare size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          HR Interview Bot
        </button>
      </div>

      {/* ====================================================================
          1. APTITUDE DESK PANEL
          ==================================================================== */}
      {activeTab === 'aptitude' && (
        <div className="aptitude-desk">
          {/* Left Topic Selector */}
          <div className="aptitude-menu">
            <h4 style={{ marginBottom: '12px', paddingLeft: '8px', color: 'var(--text-muted)' }}>Subjects</h4>
            {Object.keys(aptitudeQuestions).map(topic => (
              <button 
                key={topic}
                className={`aptitude-menu-btn ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => { setSelectedTopic(topic); setQuizState('idle'); }}
              >
                <span>{topic} Reasoning</span>
                <ChevronRight size={16} />
              </button>
            ))}

            <div className="glass-card" style={{ marginTop: '20px', padding: '16px' }}>
              <h5 style={{ marginBottom: '8px' }}>Test Statistics</h5>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div>Total Solved: <strong>{score} Questions</strong></div>
                <div>Status: <span className="badge badge-success">Ready</span></div>
              </div>
            </div>
          </div>

          {/* Right Quiz Interactive Area */}
          <div className="glass-card">
            {quizState === 'idle' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <HelpCircle size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                <h3>Ready to practice {selectedTopic} Aptitude?</h3>
                <p style={{ margin: '12px 0 24px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                  This interactive module contains 3 highly targeted multiple choice questions designed to simulate placement assessments. Includes strict timers and instant step-by-step logic breakdowns.
                </p>
                <button className="btn btn-primary" onClick={startQuiz}>
                  Initiate Practice Session <ArrowRight size={16} />
                </button>
              </div>
            )}

            {quizState === 'active' && (
              <div className="quiz-container">
                <div className="quiz-header">
                  <span className="badge badge-primary">Question {currentQ + 1} of {aptitudeQuestions[selectedTopic].length}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    ⏱ Time Remaining: <strong style={{ color: timeLeft < 15 ? 'var(--error)' : 'var(--secondary)' }}>{timeLeft}s</strong>
                  </span>
                </div>

                <div className="quiz-timer-bar">
                  <div className="quiz-timer-progress" style={{ width: `${(timeLeft/60)*100}%` }}></div>
                </div>

                <div className="question-text">
                  {aptitudeQuestions[selectedTopic][currentQ].q}
                </div>

                <div className="options-list">
                  {aptitudeQuestions[selectedTopic][currentQ].options.map((opt, idx) => {
                    let optClass = "option-btn";
                    if (isAnswered) {
                      if (idx === aptitudeQuestions[selectedTopic][currentQ].answer) {
                        optClass += " correct";
                      } else if (selectedOption === idx) {
                        optClass += " incorrect";
                      }
                    } else if (selectedOption === idx) {
                      optClass += " selected";
                    }

                    return (
                      <button 
                        key={idx} 
                        className={optClass}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={isAnswered}
                      >
                        <span style={{ fontWeight: '600', marginRight: '12px' }}>
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="explanation-card">
                    <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
                      <Check size={16} /> Detailed Resolution Breakdown
                    </h5>
                    <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#fff' }}>
                      {aptitudeQuestions[selectedTopic][currentQ].explain}
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                      <button className="btn btn-primary" onClick={handleNextQ}>
                        {currentQ === aptitudeQuestions[selectedTopic].length - 1 ? "Complete Exam" : "Next Question"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {quizState === 'completed' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Award size={64} color="var(--success)" style={{ marginBottom: '16px' }} />
                <h2>Aptitude Evaluation Completed!</h2>
                
                <div style={{
                  display: 'inline-flex', gap: '40px', margin: '24px 0',
                  padding: '16px 40px', background: 'var(--bg-main)', border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                      {score}/{aptitudeQuestions[selectedTopic].length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Correct Answers</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--secondary)' }}>
                      {Math.round((score/aptitudeQuestions[selectedTopic].length)*100)}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Diagnostic Score</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button className="btn btn-secondary" onClick={() => setQuizState('idle')}>
                    <RotateCcw size={16} /> Re-evaluate Category
                  </button>
                  <button className="btn btn-primary" onClick={startQuiz}>
                    Test Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          2. DSA PLAYGROUND PANEL
          ==================================================================== */}
      {activeTab === 'dsa' && (
        <div className="dsa-layout">
          {/* Left Problems List */}
          <div className="dsa-problems-list">
            <h4 style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>Data Structures</h4>
            {dsaProblems.map(prob => (
              <div 
                key={prob.id}
                className={`dsa-problem-item ${activeDsa.id === prob.id ? 'active' : ''}`}
                onClick={() => setActiveDsa(prob)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{prob.title}</strong>
                  <span className="badge badge-primary" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>{prob.difficulty}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {prob.desc.substring(0, 45)}...
                </span>
              </div>
            ))}

            <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
              <div><strong>Terminal:</strong> V8 Javascript Core</div>
              <div style={{ color: 'var(--success)', marginTop: '4px' }}>● Ready for Execution</div>
            </div>
          </div>

          {/* Right Playground IDE Terminal */}
          <div className="dsa-terminal">
            {/* Mock Editor */}
            <div className="dsa-editor-wrapper">
              <div className="editor-header">
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  💻 {activeDsa.title} Solution Playground
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select 
                    className="form-control form-control-noicon"
                    style={{ padding: '4px 8px', fontSize: '0.8rem', width: '110px' }}
                    value={lang}
                    onChange={e => setLang(e.target.value)}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python 3</option>
                  </select>
                  <button className="btn btn-cyber" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={runCodeMock} disabled={isCompiling}>
                    <Play size={12} /> {isCompiling ? "Running..." : "Run Code"}
                  </button>
                </div>
              </div>

              {/* Code TextArea */}
              <textarea 
                className="mock-editor-area"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </div>

            {/* Console Output */}
            <div className="console-output-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px', color: 'var(--text-muted)' }}>
                <span>stdout logs</span>
                <span>Console v1.02</span>
              </div>
              
              {consoleLogs.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 0' }}>
                  No output. Click "Run Code" to compile your solution templates against pre-configured mock test suits.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {consoleLogs.map((log, i) => (
                    <div key={i} style={{ 
                      color: log.startsWith('✔') ? 'var(--success)' : 
                             log.startsWith('STATUS') ? 'var(--secondary)' : 
                             log.startsWith('Complexity') ? 'var(--warning)' : 'var(--text-secondary)'
                    }}>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          3. TECHNICAL FLASHCARDS PANEL
          ==================================================================== */}
      {activeTab === 'technical' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Sub Header for Flashcard categories */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {flashcardCategories.map(cat => (
              <button 
                key={cat}
                className={`btn ${selectedCat === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => { setSelectedCat(cat); setCardIndex(0); setIsFlipped(false); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Card Interface */}
          <div className="flashcards-container">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlipCard}>
              <div className="flashcard-inner">
                {/* Front Side */}
                <div className="card-front">
                  <BookOpen size={40} color="var(--primary)" style={{ marginBottom: '16px' }} />
                  <span className="badge badge-primary" style={{ marginBottom: '12px' }}>{selectedCat} Review</span>
                  <h3 style={{ fontSize: '1.25rem' }}>{flashcardsData[selectedCat][cardIndex]?.q}</h3>
                  <p style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    (Click Card to flip and reveal technical breakdown)
                  </p>
                </div>

                {/* Back Side */}
                <div className="card-back">
                  <Cpu size={40} color="var(--secondary)" style={{ marginBottom: '12px' }} />
                  <span className="badge badge-success" style={{ marginBottom: '8px' }}>Syllabus breakdown</span>
                  <div style={{ fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-line', overflowY: 'auto', maxH: '150px' }}>
                    {flashcardsData[selectedCat][cardIndex]?.a}
                  </div>
                  <p style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    (Click Card to flip back to question)
                  </p>
                </div>
              </div>
            </div>

            {/* Assessment triggers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>How well did you know this concept?</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => rateCardFamiliarity('Hard')}>
                  🔴 Hard / Redo
                </button>
                <button className="btn btn-secondary" onClick={() => rateCardFamiliarity('Medium')}>
                  🟡 Medium
                </button>
                <button className="btn btn-secondary" onClick={() => rateCardFamiliarity('Easy')}>
                  🟢 Easy / Perfect
                </button>
              </div>
            </div>

            {/* Diagnostic tracker */}
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <div>Diagnostic Rating:</div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--success)' }}>Easy: {cardStats.Easy}</span>
                <span style={{ color: 'var(--warning)' }}>Medium: {cardStats.Medium}</span>
                <span style={{ color: 'var(--error)' }}>Hard: {cardStats.Hard}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          4. HR SIMULATOR PANEL
          ==================================================================== */}
      {activeTab === 'hr' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', alignItems: 'start' }}>
          
          {/* Chat Window */}
          <div className="hr-chat-window">
            <div className="chat-history">
              {chatHistory.map((bubble, i) => (
                <div 
                  key={i} 
                  className={`chat-bubble ${bubble.sender}`}
                >
                  {bubble.sender === 'hr' && <strong style={{color: 'var(--primary)', display: 'block', fontSize: '0.8rem', marginBottom: '4px'}}>Apex Recruitment Officer</strong>}
                  {bubble.sender === 'candidate' && <strong style={{color: '#fff', display: 'block', fontSize: '0.8rem', marginBottom: '4px'}}>Nigel Jacob</strong>}
                  {bubble.text}
                </div>
              ))}
            </div>

            {/* Conversation triggers */}
            <div className="chat-options-pane">
              {currentStep !== 'end' ? (
                <>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Choose your communication strategy:</span>
                  {hrDialogues[currentStep]?.options.map((opt, i) => (
                    <button 
                      key={i} 
                      className="chat-option-btn"
                      onClick={() => selectHrOption(opt)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '8px' }}>
                  <button className="btn btn-primary" onClick={resetHrChat}>
                    <RotateCcw size={16} /> Reset and Practice Another Strategy
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* HR Side helper */}
          <div className="glass-card">
            <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="var(--primary)" />
              The STAR Framework
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
              Recruiters evaluate situational responses based on structural soundness:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div><strong>S - Situation:</strong> Describe the context and event details.</div>
              <div><strong>T - Task:</strong> Outline the constraints and goals requested.</div>
              <div><strong>A - Action:</strong> Describe what you specifically executed and designed.</div>
              <div><strong>R - Result:</strong> Detail metrics, timelines, and lessons learned.</div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '20px', paddingTop: '16px' }}>
              <h5>Current Eval Score:</h5>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--secondary)', marginTop: '6px' }}>
                {totalHrScore} points
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
