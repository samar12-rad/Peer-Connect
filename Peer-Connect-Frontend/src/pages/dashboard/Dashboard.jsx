import profile from '../../assets/dashboardLogo/profile.png';
import msg from '../../assets/dashboardLogo/msg.png';
import finder from '../../assets/dashboardLogo/finder.png';
export const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen flex-1">
      <div className="justify flex h-full w-full flex-1 flex-col items-center gap-2 rounded-tl-2xl p-2 md:p-10 dark:bg-neutral-900">
        <div className="flex items-center justify-center gap-2">
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
            <h1 className="items-center justify-center text-6xl">Hey!,</h1>
            <h2 className="items-center justify-center whitespace-nowrap text-6xl font-bold">
              Ishika Verma
            </h2>

            <p className="items-center justify-center whitespace-nowrap pt-4 text-2xl font-bold">
              Swipe, Connect, Code – Find your perfect coding partner and build
              together!
            </p>

            <div className="gap-15 grid w-full max-w-3xl grid-cols-1 px-10 pt-20 md:grid-cols-3">
              <div className="h-45 flex flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black">
                <img src={finder} alt="peer finder" className="h-11 w-11" />
                <h3 className="text-2xl font-bold">Peer Finder</h3>
                <p className="text-center text-sm">
                  Discover coders with similar interests.
                </p>
              </div>

              <div className="h-45 flex flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black">
                <img src={msg} alt="msg" className="h-11 w-11" />
                <h3 className="text-2xl font-bold">Message</h3>
                <p className="text-center text-sm">
                  Build connections with like-minded developers.
                </p>
              </div>

              <div className="h-45 flex flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black">
                <img src={profile} alt="profile" className="h-12 w-12" />
                <h3 className="text-2xl font-bold">Profile</h3>
                <p className="text-center text-sm">
                  Show your skills and connect with coders
                </p>
              </div>
            </div>
          </div>
          {[...new Array(4)].map((i) => (
            <div
              key={'first-array' + i}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i) => (
            <div
              key={'second-array' + i}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
