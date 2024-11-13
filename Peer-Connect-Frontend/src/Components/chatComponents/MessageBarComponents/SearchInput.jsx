import { MdPersonSearch } from 'react-icons/md';

const SearchInput = () => {
  return (
    <div className="flex min-h-[10%] items-center justify-center gap-2 border border-white px-3 text-white">
      <MdPersonSearch className="absolute left-5 z-10 text-3xl text-zinc-700" />
      <input
        type="text"
        placeholder="Search your peers"
        className="input input-bordered input-primary h-[60%] w-full border-white pl-10"
      />
    </div>
  );
};

export default SearchInput;
