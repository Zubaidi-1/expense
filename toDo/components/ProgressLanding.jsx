import MyProgress from "../components/Progress";

export default function progressLanding() {
  return (
    <div className="bg-[#1282a2] h-full w-full grid grid-cols-2  place-items-center">
      <div className="flex flex-col items-center text-2xl gap-2 text-white">
        <span>Rent</span>
        <MyProgress value={35} />
      </div>
      <div className="flex flex-col items-center text-2xl gap-2 text-white">
        <span>Food</span>
        <MyProgress value={25} />
      </div>
      <div className="flex flex-col items-center text-2xl gap-2 text-white">
        <span>Transport</span>
        <MyProgress value={15} />
      </div>
      <div className="flex flex-col items-center text-2xl gap-2 text-white">
        <span>Subscriptions</span>
        <MyProgress value={25} />
      </div>
    </div>
  );
}
