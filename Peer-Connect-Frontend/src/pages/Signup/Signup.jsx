import { useState } from 'react';
import Skill from '../../Components/unitComponents/Skill';
import Card from '../../Components/finderComponents/Card';
import ProjectModal from '../../Components/unitComponents/ProjectModal';
import { LinkPreview } from '../../Components/unitComponents/LinkPreview';
import { motion } from 'framer-motion';

const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [github, setGithub] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [skillsArray, setSkillsArray] = useState([]);
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [theme, setTheme] = useState(2);

  const MAX_PROJECTS = 5;

  const backendUrl = import.meta.BACKEND_URI;

  // Use backendUrl wherever you need the backend URL
  console.log(backendUrl);

  const handleChanges = (e) => {
    if (e.target.name === 'firstname') {
      setFirstName(e.target.value);
    } else if (e.target.name === 'lastname') {
      setLastName(e.target.value);
    } else if (e.target.name === 'city') {
      setCity(e.target.value);
    } else if (e.target.name === 'github') {
      setGithub(e.target.value);
    } else if (e.target.name === 'linkedIn') {
      setLinkedIn(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender); // This will automatically unselect the previous gender
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(skillsArray);
    const user = {
      username: `${lastName}${firstName}`,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      city: city,
      github: github,
      linkedIn: linkedIn,
      skills: skillsArray,
      projects: projects,
      gender: gender,
      bio: 'I am a software developer',
    };
    console.log(user);
    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(response);
  };

  const selectSkill = (e) => {
    const skill = e.currentTarget || e.target;
    const skillName = skill.name || skill.getAttribute('name');
    const isSelected = skill.classList.contains('bg-green-500');

    if (!isSelected) {
      skill.classList.remove('bg-transparent');
      skill.classList.add('bg-green-500');
      setSkillsArray((prev) => [...prev, [skillName]]); // Wrap skill in array
    } else {
      skill.classList.remove('bg-green-500');
      skill.classList.add('bg-transparent');
      setSkillsArray((prev) => prev.filter((s) => s[0] !== skillName));
    }
  };

  const handleAddProject = (project) => {
    setProjects([...projects, project]);
  };

  const skillNames = [
    'Frontend',
    'Backend',
    'Fullstack',
    'DSA',
    'Flutter',
    'Python',
    'AIML',
    'HTML',
    'CSS',
    'JS',
    'React',
    'Java',
    'Angular',
    'Ruby',
    'Mongo',
    'SQL',
    'PostgreSQL',
    'Next',
    'SpringBoot',
    'Rust',
    'Golang',
    'GIT',
    'CPP',
  ];

  const themes = [
    { id: 1, name: 'Beginner', color: 'from-white to-green-300' },
    { id: 2, name: 'Intermediate', color: 'from-white to-blue-500' },
    { id: 3, name: 'Expert', color: 'from-white to-yellow-400' },
  ];

  return (
    <div className="flex h-fit w-full flex-col items-center px-5 pb-10 pt-2">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text pb-5 text-center text-7xl font-bold text-transparent">
        Create your Profile
      </h1>
      <div className="flex h-fit w-full justify-center">
        <div className="flex h-full w-fit flex-col gap-4 rounded-lg bg-opacity-50 pl-10 pr-10 pt-10 shadow-white backdrop-blur-[7.4px]">
          <div className="mb-1 text-3xl">
            <h1>Nice to meet you! Lets get you acquainted.</h1>
          </div>

          <div className="pt-4 text-2xl">
            <h1>Choose your card theme</h1>
            <div className="mt-4 flex gap-4">
              {themes.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`relative flex h-fit w-fit overflow-hidden rounded-full px-4 py-2 ${
                    theme === t.id ? 'ring-2 ring-white' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-t ${t.color} opacity-75`}
                  />
                  <span className="relative z-10 text-lg font-medium text-white">
                    {t.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pt-5 text-2xl">
            <h1>Create your username</h1>
            <div className="mt-4 text-sm">
              <h2>Username:</h2>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => handleChanges(e)}
              placeholder="Enter your username"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></input>
          </div>

          {/* Email Section */}
          <div className="pt-5 text-2xl">
            <h1>What is your email?</h1>
            <div className="mt-4 text-sm">
              <h2>Email:</h2>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Section */}
          <div className="pt-4 text-2xl">
            <h1>What is your password?</h1>
            <div className="mt-4 text-sm">
              <h2>Password:</h2>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleChanges(e)}
              placeholder="Enter your password"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Name Section */}
          <div className="username pt-4 text-2xl">
            <h1>Create your username</h1>
            <div className="mt-4 text-sm">
              <h2>First Name:</h2>
            </div>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={(e) => handleChanges(e)}
              placeholder="Enter your first name"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg"
            />
            <div className="mt-4 text-sm">
              <h2>Last Name:</h2>
            </div>
            <input
              type="text"
              id="lastname"
              onChange={(e) => handleChanges(e)}
              name="lastname"
              placeholder="Enter your last name"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg"
            />
          </div>
          <div className="pt-7 text-2xl">
            <h1>What is your gender?</h1>
            <div className="mt-4 text-sm">
              <h2>Gender:</h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`w-30 rounded-md border border-white px-4 py-2 ${
                    gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handleGenderChange('male')}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`w-30 rounded-md border border-white px-4 py-2 ${
                    gender === 'female'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => handleGenderChange('female')}
                >
                  Female
                </button>
              </div>
            </div>
          </div>
          {/* City Section */}
          <div className="pt-7 text-2xl">
            <h1>What is your city?</h1>
            <div className="mt-4 text-sm">
              <h2>City:</h2>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              onChange={(e) => handleChanges(e)}
              placeholder="Enter your city"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Github Section */}
          <div className="pt-4 text-2xl">
            <h1>What is your GitHub?</h1>
            <div className="mt-4 text-sm">
              <h2>GitHub:</h2>
            </div>
            <input
              type="text"
              id="github"
              name="github"
              onChange={(e) => handleChanges(e)}
              placeholder="Enter your GitHub"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LinkedIn Section */}
          <div className="pt-4 text-2xl">
            <h1>What is your LinkedIn?</h1>
            <div className="mt-4 text-sm">
              <h2>LinkedIn:</h2>
            </div>
            <input
              type="text"
              id="linkedIn"
              name="linkedIn"
              onChange={(e) => handleChanges(e)}
              placeholder="Enter your LinkedIn"
              required
              className="w-[50%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Bio Section */}
          <div className="pt-4 text-2xl">
            <h1>Write your Bio</h1>
            <div className="mt-4 text-sm">
              <h2>Bio:</h2>
            </div>
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Enter your bio"
              required
              className="h-50 w-[40%] text-wrap rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Projects Section */}
          <div className="relative h-fit rounded-lg pt-4 text-2xl">
            <h1>Add your Projects</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mb-3 mt-4 w-60 rounded border border-gray-300 bg-indigo-800 p-2 text-lg text-white placeholder-gray-500 hover:bg-gray-200 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Projects
            </button>
            {projects.length > 0 ? (
              <h2 className="mt-4 text-sm">Added Projects</h2>
            ) : null}
            <ul className="flex flex-wrap gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  className="flex items-center justify-center text-white"
                >
                  <LinkPreview url={project.link} width={300} height={200}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative text-white hover:underline"
                    >
                      <div className="min-w-35 relative flex w-fit items-center justify-center overflow-hidden rounded-full text-lg font-medium tracking-widest">
                        {/* Animated gradient border */}
                        <div className="animate-gradient absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-75" />
                        {/* Content */}
                        <div className="relative z-10 rounded px-4 py-2 tracking-[0.25em] transition-transform duration-300 group-hover:scale-105">
                          {project.name}
                        </div>
                      </div>
                    </a>
                  </LinkPreview>
                </motion.div>
              ))}
            </ul>

            {/* Project count indicator */}
            <div className="mt-2 text-sm text-gray-400">
              {projects.length} / {MAX_PROJECTS} projects added
            </div>
            <ProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddProject={handleAddProject}
            />
          </div>

          <div className="pt-4 text-2xl">
            <h1 className="">What are your skills?</h1>
            <div className="mt-4 text-sm">
              <h2>Skills:</h2>
            </div>
            <div className="">
              <div className="flex flex-wrap gap-6">
                {skillNames.map((skillName) => (
                  <Skill
                    key={skillName}
                    name={skillName}
                    onClick={selectSkill}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="h-fit w-fit rounded border border-white bg-indigo-800 px-4 py-4 text-white hover:bg-indigo-900"
            >
              <h1> I&apos;m Ready to Explore Peer Connect!!</h1>
            </button>
          </div>
        </div>

        <div className="pt-13 relative h-screen w-[50vw] items-center justify-center">
          <div className="fixed -ml-20 h-fit w-[30vw]">
            <Card
              firstName={firstName}
              lastName={lastName}
              city={city}
              github={github}
              linkedin={linkedIn}
              email={email}
              gender={gender}
              skills={skillsArray}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
