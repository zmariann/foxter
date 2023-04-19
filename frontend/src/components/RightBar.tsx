export default function RightBar() {
  return (
    <>
      <div className={`w-3/12 h-screen bg-white mt-4 px-2`}>
        <div>
          <input
            className="focus:ring-2 focus:ring-offset-lime-300 outline-none rounded-2xl w-full pl-5 p-8"
            type="text"
            placeholder="Search foxes"
          />
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Trends
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Who to follow
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-white p-5 mt-5">
          Footer
        </div>
      </div>
    </>
  );
}
