
const Profile = () => {
  return (
    <div className="h-screen w-full flex">
    
      <div className="grid h-full w-full grid-cols-6 grid-rows-8 gap-3 ">
     
        <div className="col-span-2 row-span-5 ml-5  mt-5 rounded-xl mt-0 bg-graydark"><p className="text-center bg-graydark text-xl font-bold mt-5">PROFILE</p>
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
        <div className="col-span-4 row-span-3 ml-1 mt-5 rounded-xl mr-3 bg-graydark"><p className="text-center bg-graydark font-bold mt-5 text-xl">SKILLS</p>
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
        <p className="pb-2 pt-2 pl-10">Skills:
        <input type="text" placeholder="Enter your skills" className="justify-center ml-20 text-black bg-graydark mb-2 border-2 text-sm"/>
        </p>
        </div>
        <div className="col-span-2 row-span-5 ml-1 mb-5 rounded-xl bg-graydark"><p className="text-center bg-graydark font-bold mt-5 text-xl">SOCIALS</p>
        <p className="pt-5 pb-5 ml-10 text-sm">GitHub:
                <input type="text" placeholder="Enter your skills" className="justify-center ml-20 text-black bg-graydark mb-2 border-2 text-sm"/></p>

        <p className="pt-1 pb-1 ml-10 text-sm">Linked In:
        <input type="text" placeholder="Enter your Linked In link" className="pt-1 pb-1 text-black bg-graydark ml-20 border-2 text-sm"/></p>:
        <p className="pt-1 pb-1 ml-10 text-sm">Leetcode:
        <input type="text" placeholder="Enter your Leetcode link" className="pt-1 pb-1 text-black bg-graydark *:ml-20 border-2 text-sm"/></p>
        <p className="pt-1 pb-1 ml-10 text-sm">Instagram:
        <input type="text" placeholder="Enter your Instagram link" className="pt-1 pb-1 text-black bg-graydark ml-20 border-2 text-sm"/></p>
        <p className="pt-1 pb-1 ml-10 text-sm">Whatsapp:
        <input type="text" placeholder="Enter your Whatsapp link" className="pt-1 pb-1 text-black bg-graydark ml-20 border-2 text-sm"/></p>:
        <p className="pt-1 pb-1 ml-10 text-sm">Telegram:
        <input type="text" placeholder="Enter your Telegram link" className="pt-1 pb-1 text-black bg-graydark ml-20 border-2 text-sm"/></p>:
        <p className="pt-1 pb-1 ml-10 text-sm">Twitter:
        <input type="text" placeholder="Enter your Twitter link" className="pt-1 pb-1 text-black bg-graydark ml-20 border-2 text-sm"/></p>
        </div>
        <div className="col-span-2 row-span-3 ml-1 mr-3 rounded-xl bg-graydark"><p className="text-center font-bold mt-5 text-xl">CODING</p>
        <p className="mt-5 mb-2 pl-10">Interests:
        <input type="text" placeholder="Enter your Twitter link" className="pt-1 pb-1 text-black bg-graydark ml-20 border-2 text-sm"/></p>
        <p className="mt-5 mb-2 pl-10">Hobbies Outside Coding:
        <input type="text" placeholder="Enter your Twitter link" className="pt-1 pb-1 text-black bg-graydark ml-10 border-2 text-sm"/></p>
        </div>
        <div className="col-span-2 row-span-3 ml-4 rounded-xl mb-5 bg-graydark"><p className="text-center font-bold mt-5 text-xl">PREFERRENCES</p>
        <p className="pt-5 pl-10 pb-2">Language:
        <input type="text" placeholder="Enter your preferred language" className="pt-1 bg-graydark text-black pb-1 ml-20 border-2 text-sm"/></p>
        <p className="pt-2 pl-10 pb-2">Time:
          <input type="text" placeholder="Enter your preferred time" className="pt-1 pb-1 ml-20 bg-graydark border-2 text-black text-sm"/></p>
        </div>
        <div className="col-span-2 row-span-2 ml-1 mb-5 mr-3 rounded-xl bg-graydark"><p className="text-center font-bold mt-5 text-xl">LETS WORK TOGETHER</p>
        <p className="mt-7 ml-10 text-lg">Email Me </p>
        <p className="mt-2 ml-10 text-lg">Schedule a Call </p>
        </div>
        
    </div></div>
  );
}

export default Profile;
