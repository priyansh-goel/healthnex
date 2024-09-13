import {UserIcon} from "@heroicons/react/24/outline";

export default function ProfilePicture() {
    return (
        <UserIcon className={"h-16 w-16 border-4 rounded-full border-black p-1"}/>
        // <Image src={<UserIcon/>} alt={'profile-picture'}/>
    );
}
