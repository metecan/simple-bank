import type { FC } from 'react';

interface AvatarProps {
  image: string;
  name: string;
  email: string;
}

const Avatar: FC<AvatarProps> = ({ image, name, email }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-sm text-right">
        <div className="font-medium text-gray-700">{name}</div>
        <div className="text-gray-400">{email}</div>
      </div>
      <div className="relative h-10 w-10">
        <img className="h-full w-full rounded-full object-cover object-center" src={image} alt="" />
        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
      </div>
    </div>
  );
};
export default Avatar;
