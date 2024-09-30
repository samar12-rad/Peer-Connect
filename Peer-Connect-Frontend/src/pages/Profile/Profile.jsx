
const Profile = () => {
  return (
    <div className="h-fit w-full flex flex-col gap-7">
      <div className=" text-white  justify-evenly flex text-2xl"><h1>PROFILE</h1>
       <button type="submit" className="text-white rounded-md px-2 bg-blue-800 hover:bg-blue-950 text-2xl">edit profile</button>
       </div>
      <div className="grid h-full w-full grid-cols-6 grid-rows-8 gap-3 px-10 ">
        <div className="col-span-2 row-span-5 rounded-xl bg-graydark"><p className="text-center bg-graydark text-xl font-bold mt-5">
          <img src="user-profile-icon-free-vector.jpeg" alt="Profile" className="w-40 h-40 mx-auto mt-10 rounded-full" />
        </p>
        <div className="flex justify-between ">
        <p className="pb-2 pt-50 pl-10">Name:
        <input type="text" placeholder="Enter your skills" className="justify-center ml-20 mr-10 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p></div>
        <div className="flex justify-between ">
        <p className="pb-2 pt-2 pl-10">UserName:
        <input type="text" placeholder="Enter your skills" className="justify-center mr-10 ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p></div>
        <div className="flex justify-between ">
        <p className="pb-2 pt-2 pl-10">Bio:
        <input type="text" placeholder="Enter your skills" className="justify-center mr-10 ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p></div>
        <div className="flex justify-between">
        <p className="pb-2 pt-2 pl-10">Pronouns:
        <input type="text" placeholder="Enter your skills" className="justify-center mr-10 ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p></div>
        </div>
        <div className="col-span-4 row-span-3 rounded-xl bg-graydark"><p className="text-center bg-graydark font-bold mt-5 text-xl">SKILLS</p>
        <p className="pt-5 pb-2 pl-10">Portfolio website:
        <input type="text" placeholder="Enter your Portfolio website" className="justify-center ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p>
        <p className="pb-2 pt-2 pl-10">Projects:
        <input type="text" placeholder="Enter your Projects" className="justify-center ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p>
        <p className="pb-2 pt-2 pl-10">Github Stats:
        <input type="text" placeholder="Enter your Github Stats" className="justify-center ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p>
        <p className="pb-2 pt-2 pl-10">Peer Score:
        <input type="text" placeholder="Enter your Peer Score" className="justify-center ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p>
        <p className="pb-5 pt-5 pl-10">Skills:
        </p> 
        </div>
        <div className="col-span-2 row-span-5 rounded-xl bg-graydark"><p className="text-center bg-graydark font-bold text-xl">SOCIALS</p>
        <p className="pt-5 pb-5 ml-10 text-sm">GitHub:
                <input type="text" placeholder="Enter your skills" className="justify-center text-black bg-graydark border-2 text-sm"/></p>

        <p className="pt-1 pb-1 text-sm">Linked In:
        <input type="text" placeholder="Enter your Linked In link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>:
        <p className="pt-1 pb-1 text-sm">Leetcode:
        <input type="text" placeholder="Enter your Leetcode link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>
        <p className="pt-1 pb-1 text-sm">Instagram:
        <input type="text" placeholder="Enter your Instagram link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>
        <p className="pt-1 pb-1 text-sm">Whatsapp:
        <input type="text" placeholder="Enter your Whatsapp link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>:
        <p className="pt-1 pb-1 text-sm">Telegram:
        <input type="text" placeholder="Enter your Telegram link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>:
        <p className="pt-1 pb-1 text-sm">Twitter:
        <input type="text" placeholder="Enter your Twitter link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>
        </div>
        <div className="col-span-2 row-span-3 pr-7 rounded-xl bg-graydark"><p className="text-center font-bold text-xl">CODING</p>
        <p className="pl-10">Interests:
        <input type="text" placeholder="Enter your Twitter link" className="pt-1 pb-1 text-black bg-graydark  border-2 text-sm"/></p>
        <p className="pl-10">Hobbies Outside Coding:
        <input type="text" placeholder="Enter your Twitter link" className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"/></p>
        </div>
        <div className="col-span-2 row-span-3 rounded-xl bg-graydark"><p className="text-center font-bold text-xl">PREFERRENCES</p>
        <p className="pt-5 pl-10 pb-2">Language:
        <input type="text" placeholder="Enter your preferred language" className="pt-1 bg-graydark text-black pb-1 border-2 text-sm"/></p>
        <p className="pt-2 pl-10 pb-2">Time:
          <input type="text" placeholder="Enter your preferred time" className="pt-1 pb-1 bg-graydark border-2 text-black text-sm"/></p>
        </div>
        <div className="col-span-2 row-span-2 rounded-xl bg-graydark"><p className="text-center font-bold text-xl">LETS WORK TOGETHER</p>
        <p className="text-lg">Email Me </p>
        <p className="text-lg">Schedule a Call </p>
        </div>
        
    </div></div>
  );
}

export default Profile;
// const dummyData = {
//   name: "ishika verma",
//   about: "I am a student at IIIT Kalyani, currently in my third year. I am passionate about coding and have experience in web development, machine learning, and data structures and algorithms. I am always looking for new opportunities to learn and grow, and I am excited to see what the future holds.",

// }