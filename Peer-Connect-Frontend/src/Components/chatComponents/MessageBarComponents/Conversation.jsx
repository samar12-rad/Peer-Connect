import { CgProfile } from 'react-icons/cg';

const Conversation = () => {
  return (
    <>
      <div className="flex h-fit w-full py-3">
        <div className="h-15 flex w-full items-center justify-start gap-3 rounded-full bg-white px-4">
          <div className="h-[60%] rounded-full border-4 border-blue-200 bg-white">
            <CgProfile className="h-full w-full" />
          </div>
          <div className="">
            <div className="font-bold">Name</div>
            <div className="text-sm">Last Message</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
