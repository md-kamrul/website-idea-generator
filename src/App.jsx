import React, { useState, useEffect } from 'react';
import { BrainCircuit, Loader, Wand2, Sun, Moon } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle.jsx';
import FormInput from './components/FormInput.jsx';
import FormSelect from './components/FormSelect.jsx';
import MultiSelect from './components/MultiSelect.jsx';

// Main App Component
export default function App() {
  // --- STATE MANAGEMENT ---
  const [theme, setTheme] = useState('light');
  const [experience, setExperience] = useState('Beginner');
  const [skills, setSkills] = useState(['HTML', 'CSS', 'JavaScript']);
  const [focus, setFocus] = useState('Frontend');
  const [interests, setInterests] = useState(['Productivity', 'Personal Development']);
  const [goal, setGoal] = useState('Learn a new skill');
  const [time, setTime] = useState('1-2 weeks');
  const [features, setFeatures] = useState('Clean UI, Local Storage');
  const [avoid, setAvoid] = useState('Complex backend, APIs');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- THEME EFFECT ---
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // --- FORM OPTIONS ---
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const projectFocuses = ['Frontend', 'Backend', 'Full-Stack', 'Mobile (React Native)', 'Data Science', 'Game Development'];
  const projectGoals = ['Learn a new skill', 'Build a complex app', 'Showcase design skills', 'Create a commercial product', 'Contribute to open-source'];
  const timeCommitments = ['Weekend project', '1-2 weeks', '1 month+', 'Long-term (3+ months)'];
  const techSkillsOptions = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS', 'Bootstrap',
    'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'Ruby on Rails', 'Java', 'Spring Boot', 'PHP', 'Laravel',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase',
    'Git', 'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure', 'GraphQL', 'REST API', 'WebSockets'
  ];
  const interestOptions = [
    'Productivity', 'Personal Development', 'E-commerce', 'Social Media', 'Healthcare',
    'Finance & FinTech', 'Education & EdTech', 'Gaming', 'Music & Audio', 'Video & Streaming',
    'Travel & Hospitality', 'Food & Recipe', 'Fitness & Wellness', 'News & Blogging',
    'Data Visualization', 'Artificial Intelligence', 'Machine Learning', 'Internet of Things (IoT)',
    'Sustainability & Green Tech'
  ];

  // --- API CALL HANDLER ---
  const handleGenerateIdea = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedIdea('');

    const prompt = `
      Act as an expert project idea generator for a developer's portfolio. 
      Based on the following details, generate a single, creative, and well-defined project idea.
      
      **Developer Profile:**
      - **Experience Level:** ${experience}
      - **Technical Skills:** ${skills.join(', ')}
      - **Desired Project Focus:** ${focus}
      - **Personal Interests/Domains:** ${interests.join(', ')}
      - **Primary Goal:** ${goal}
      - **Time Commitment:** ${time}
      - **Key Features Wanted:** ${features}
      - **Technologies/Concepts to Avoid:** ${avoid}

      **Your Task:**
      Provide a project idea that includes:
      1.  **Project Title:** A catchy and descriptive name.
      2.  **Core Concept:** A brief (2-3 sentence) description of the project.
      3.  **Key Features:** A bulleted list of 3-5 essential features.
      4.  **Tech Stack Suggestion:** Recommend specific technologies based on the user's skills.
      5.  **Learning Opportunity:** Highlight what the developer could learn from this project.

      Format the response clearly. Use '###' for main section titles (e.g., "### Core Concept"). Use '**' for bolding text within paragraphs.
    `;

    try {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        // SECURITY WARNING: It is strongly recommended to use environment variables
        // for API keys rather than hardcoding them in your code.
        // Your README.md file contains instructions on how to set this up properly.
        const apiKey = "AIzaSyC8BYFzT9MRdxtrgof5GUzeADT2gACO6VQ";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const result = await response.json();
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            setGeneratedIdea(result.candidates[0].content.parts[0].text);
        } else {
            throw new Error("Invalid response structure from API.");
        }
    } catch (err) {
        console.error("Error generating project idea:", err);
        setError("Sorry, something went wrong. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  // --- FORMATTING HELPER ---
  const formatIdea = (text) => {
    if (!text) return '';
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
      .replace(/<\/h3><br \/>/g, '</h3>');
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="relative text-center mb-8 sm:mb-12">
          <div className="absolute top-0 right-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full p-3 mb-4">
            <BrainCircuit size={40} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">Portfolio Project Generator</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fill out the form below to get a personalized project idea tailored to your skills and interests.
          </p>
        </header>

        <main className="grid grid-cols-1 gap-8 w-[70%] mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Tell Us About Yourself</h2>
            <form onSubmit={handleGenerateIdea} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect label="Experience Level" value={experience} onChange={setExperience} options={experienceLevels} />
                <FormSelect label="Project Focus" value={focus} onChange={setFocus} options={projectFocuses} />
              </div>
              <MultiSelect label="Your Technical Skills" options={techSkillsOptions} selectedOptions={skills} onChange={setSkills} />
              <MultiSelect label="Interests or Domains" options={interestOptions} selectedOptions={interests} onChange={setInterests} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect label="Project Goal" value={goal} onChange={setGoal} options={projectGoals} />
                <FormSelect label="Time Commitment" value={time} onChange={setTime} options={timeCommitments} />
              </div>
              <FormInput label="Key Features Wanted" placeholder="e.g., User auth, Real-time data" value={features} onChange={setFeatures} />
              <FormInput label="What to Avoid" placeholder="e.g., E-commerce, Social media clones" value={avoid} onChange={setAvoid} />
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 disabled:bg-indigo-400 dark:disabled:bg-indigo-700 disabled:cursor-not-allowed">
                {isLoading ? <><Loader className="animate-spin" size={20} /> Generating...</> : <><Wand2 size={20} /> Generate My Project Idea</>}
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Your Generated Idea</h2>
              <div className="flex-grow rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 min-h-[300px]">
                  {isLoading && <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400"><Loader className="animate-spin mb-4" size={48} /><p className="text-lg">Crafting your perfect project...</p></div>}
                  {error && <div className="flex items-center justify-center h-full text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-lg"><p>{error}</p></div>}
                  {!isLoading && !error && !generatedIdea && <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400"><Wand2 size={48} className="mb-4" /><p className="text-lg">Your project idea will appear here.</p></div>}
                  {generatedIdea && <div className="prose prose-indigo dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: formatIdea(generatedIdea) }} />}
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}
