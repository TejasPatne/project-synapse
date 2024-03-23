import validator from "validator";
import defaultProfile from "../assets/images/default_profile.png";

export default function Person({
  name,
  photo,
}: {
  name: string;
  photo: string;
}) {
  const photoUrl = photo && validator.isURL(photo) ? photo : defaultProfile;
  console.log(name, photo, photoUrl);
  return (
    <div className="relative leading-tight px-14 md:px-0">
      <div className="w-32 h-32 block bg-slate-400 rounded-full absolute top-2 blur-[2px]"></div>
      <img
        className="max-w-32 max-h-32 bg-white border-white rounded-full border-2 drop-shadow-xl"
        src={photoUrl}
        alt="profile"
      />
      <div className="mt-5">
        <p className="font-semibold">D16AD</p>
        <p className="text-sm opacity-60">{name}</p>
      </div>
    </div>
  );
}
