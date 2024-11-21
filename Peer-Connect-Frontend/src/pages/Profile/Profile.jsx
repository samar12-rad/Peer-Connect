import { useEffect, useState } from 'react';
import Card from '../../Components/finderComponents/Card';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import EditModal, {
  EditSections,
} from '../../Components/unitComponents/EditModal';

const Profile = () => {
  const { getUserInfo, userInfo } = useGetUserInfo(); // Remove setUserInfo
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []); // Add getUserInfo to dependency array

  const handleEditClick = (section) => {
    setEditingSection(section);
    setIsEditModalOpen(true);
  };

  return (
    <div className="max-fit relative flex w-full flex-col gap-4 overflow-hidden pb-9 shadow-xl">
      <div className="flex justify-evenly text-2xl">
        <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text pb-5 text-center text-7xl font-bold text-transparent">
          <span className="text-green-500"> PROFILE</span>
        </h1>
      </div>

      <div className="grid h-full w-full grid-cols-6 grid-rows-7 gap-3 px-10">
        <div className="shadow-6 relative col-span-2 row-span-5 flex items-center justify-center rounded-[16px] border border-white/5 bg-opacity-50 py-10 shadow-white backdrop-blur-[7.4px]">
          <button
            className="w-30 absolute right-2 top-2 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800"
            onClick={() => handleEditClick(EditSections.BASIC_INFO)}
          >
            edit
          </button>
          <Card
            firstName={userInfo?.data.firstName}
            lastName={userInfo?.data.lastName}
            city={userInfo?.data.city}
            github={userInfo?.data.github}
            linkedin={userInfo?.data.linkedin}
            email={userInfo?.data.email}
            gender={userInfo?.data.gender}
            skills={userInfo?.data.skills}
          />
        </div>

        <div className="shadow-6 col-span-4 row-span-3 rounded-xl border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">SKILLS</p>
            <button
              className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800"
              onClick={() => handleEditClick(EditSections.SKILLS)}
            >
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex items-center gap-7">
              <h1 className="-2 flex items-center justify-center text-xl">
                Skills:
              </h1>{' '}
              <div className="flex flex-wrap gap-4">
                {userInfo?.data.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="flex min-w-20 items-center justify-center rounded-full bg-green-500 px-2 py-2 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-4 rounded-xl border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">SOCIALS</p>
            <button
              className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800"
              onClick={() => handleEditClick(EditSections.SOCIAL_LINKS)}
            >
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="-2 pb-3 text-xl">GitHub:</h1>{' '}
              <p className="text-xl">
                <a className="text-green-400" href={userInfo?.data.github}>
                  {userInfo?.data.github}
                </a>
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="-2 pb-3 text-xl">Linked In: </h1>
              <p className="text-xl text-green-400">
                <a className="text-green-400" href={userInfo?.data.linkedin}>
                  {userInfo?.data.linkedin}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">PROJECTS</p>
            <button
              onClick={() => handleEditClick(EditSections.PROJECTS)}
              className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800"
            >
              edit{' '}
            </button>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 flex flex-col gap-10 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[5%]">
            <p className="text-center text-xl font-bold">BIO</p>
            <button
              className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800"
              onClick={() => handleEditClick(EditSections.BIO)}
            >
              edit
            </button>
          </div>
          <div className="flex items-center justify-start text-xl">
            {userInfo?.data.bio}
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between gap-3 px-[5%]">
            <p className="text-center text-xl font-bold">LETS WORK TOGETHER</p>
            <button className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800">
              edit
            </button>
          </div>
          <div className="flex flex-col items-center justify-center pt-7">
            {' '}
            {/* Fixed: Changed flex-grow flex-col to flex flex-col */}
            <p className="mb-2">
              {userInfo?.data?.email ? (
                <a
                  href={`mailto:${userInfo.data.email}`}
                  className="cursor-pointer text-xl text-green-500 transition-colors hover:text-green-400"
                >
                  Email Me
                </a>
              ) : (
                <span className="text-xl text-gray-400">
                  Email not available
                </span>
              )}
            </p>
            <p className="cursor-pointer text-xl transition-colors hover:text-green-400">
              Schedule a Call
            </p>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSection(null);
        }}
        userInfo={userInfo}
        section={editingSection}
        onUpdate={() => {
          // Remove updatedData parameter
          getUserInfo();
        }}
      />
    </div>
  );
};

export default Profile;
