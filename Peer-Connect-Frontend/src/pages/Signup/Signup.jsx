const Signup = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center px-5 pb-10 pt-2">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text pb-5 text-center text-7xl font-bold text-transparent">
        Sign up
      </h1>
      <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-opacity-50 pl-10 pr-10 pt-10 shadow-white backdrop-blur-[7.4px]">
        <div className="mb-1 text-3xl">
          <h1>Nice to meet you! Lets get acquainted.</h1>
        </div>
        <div className="pt-5 text-2xl">
          <h1 className="">What is your email?</h1>
          <div className="mt-4 text-sm">
            <h2>Email:</h2>
          </div>
          <div className="">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="pt-4 text-2xl">
          <h1 className="">What is your password?</h1>
          <div className="mt-4 text-sm">
            <h2>Password:</h2>
          </div>
          <div className="">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="username pt-4 text-2xl">
          <h1>What is your name?</h1>
          <div className="mt-4 text-sm">
            <h2>First Name:</h2>
          </div>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your firstname"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg" // Optional styling for input
          />
          <div className="mt-4 text-sm">
            <h2>Last Name:</h2>
          </div>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your lastname"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg" // Optional styling for input
          />
        </div>
        <div className="pt-7 text-2xl">
          <h1 className="">What is your city?</h1>
          <div className="mt-4 text-sm">
            <h2>City:</h2>
          </div>
          <div className="">
            <input
              type="select"
              id="city"
              name="city"
              placeholder="Enter your city"
              required
              className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="pt-4 text-2xl">
          <h1 className="">What is your github?</h1>
          <div className="mt-4 text-sm">
            <h2>Github:</h2>
          </div>
          <div className="">
            <input
              type="text"
              id="github"
              name="github"
              placeholder="Enter your github"
              required
              className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="pt-4 text-2xl">
          <h1 className="">What is your linkedIn?</h1>
          <div className="mt-4 text-sm">
            <h2>LinkedIn:</h2>
          </div>
          <div className="">
            <input
              type="text"
              id="linkedIn"
              name="LinkedIn"
              placeholder="Enter your LinkedIn"
              required
              className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="pt-4 text-2xl">
          <h1 className="">Write your Bio</h1>
          <div className="mt-4 text-sm">
            <h2>Bio:</h2>
          </div>
          <div className="">
            <input
              type="text"
              id="bio"
              name="bio"
              placeholder="Enter your bio"
              required
              className="h-25 w-[40%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="pt-4 text-2xl">
          <h1 className="">Add you Projects</h1>
          <div className="mt-4 text-sm"></div>
          <div className="">
            <button
              id="projects"
              name="projects"
              className="w-60 rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Projects
            </button>
            <h2 className="text-sm">Projects:</h2>

            <div>1</div>
          </div>
        </div>

        <div className="pt-4 text-2xl">
          <h1 className="">What are your skills?</h1>
          <div className="mt-4 text-sm">
            <h2>Skills:</h2>
          </div>
          <div className="">
            <div className="flex flex-wrap gap-4">
              <button
                id="frontend"
                name="frontend"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Frontend
              </button>
              <button
                id="backend"
                name="backend"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Backend
              </button>
              <button
                id="fullstack"
                name="fullstack"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Fullstack
              </button>
              <button
                id="dsa"
                name="dsa"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                DSA
              </button>
              <button
                id="flutter"
                name="flutter"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Flutter
              </button>
              <button
                id="python"
                name="python"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Python
              </button>
              <button
                id="aiml"
                name="aiml"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                AI/ML
              </button>
              <button
                id="html"
                name="html"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                HTML
              </button>
              <button
                id="css"
                name="css"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                CSS
              </button>
              <button
                id="javascript"
                name="javascript"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                JAVASCRIPT
              </button>
              <button
                id="react"
                name="react"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                REACT
              </button>
              <button
                id="c/c++"
                name="c/c++"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                C/C++
              </button>
              <button
                id="java"
                name="java"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                JAVA
              </button>
              <button
                id="angular"
                name="angular"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                ANGULAR
              </button>
              <button
                id="node"
                name="node"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                NODE.JS
              </button>
              <button
                id="ruby on rails"
                name="ruby on rails"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Ruby on Rails
              </button>
              <button
                id="mongodb"
                name="mongodb"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                MONGODB
              </button>
              <button
                id="sql"
                name="sql"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                SQL
              </button>
              <button
                id="postgresql"
                name="posgresql"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                POSTGRESQL
              </button>
              <button
                id="springboot"
                name="springboot"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                SPRINGBOOT
              </button>
              <button
                id="nextjs"
                name="nextjs"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                NEXT.JS
              </button>
              <button
                id="rust"
                name="rust"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                RUST
              </button>
              <button
                id="golang"
                name="golang"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                GOLANG
              </button>
              <button
                id="git"
                name="git"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                GIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
