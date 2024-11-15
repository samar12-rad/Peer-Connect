const Requestbar = () => {
  return (
    <div className="mb-5 flex w-full justify-between px-5 py-10">
      <div className="flex w-fit items-center gap-5">
        <div className="mb-2 h-10 w-10 rounded-full bg-slate-100"></div>
        <div>
          <h1 className="text-3xl">Ishika Verma</h1>
        </div>
      </div>

      <div className="items-center">
        <button className="h-12 rounded-lg bg-green-500 p-2 text-lg hover:bg-green-600">
          Click to view the peer
        </button>
      </div>
    </div>
  );
};

export default Requestbar;
