import UserCard from './UserCard';

const projects = [
  {
    name: 'Amazon Clone',
    link: 'https://github.com/johndoe/project1',
    description: 'A web application built with React and Node.js',
  },
  {
    name: 'Tinder Clone',
    link: 'https://github.com/johndoe/project2',
    description: 'A mobile app developed using React Native',
  },
];

const UserCardWrapper = () => {
  return (
    <div className="p-15 h-screen w-full">
      <div className="h-full w-full rounded-3xl bg-gradient-to-r from-slate-400 to-green-400">
        <UserCard
          bio="Full stack developer passionate about web technologies. Experienced in building scalable web applications using modern frameworks and libraries. Always eager to learn new technologies and improve coding skills."
          projects={projects}
        />
      </div>
    </div>
  );
};

export default UserCardWrapper;
