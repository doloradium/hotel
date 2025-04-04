import { tags } from '@/data/constants';
import { TagProps } from '@/interfaces';

export default function Tag({ name, isClickable = false, isActive = false, onClick }: TagProps) {
    const filteredTags = tags.filter((item) => item.name === name);

    return (
        filteredTags.map((tag, index) => (
            <div onClick={onClick} key={index} className={`flex rounded-lg items-center justify-center gap-2 px-4 py-2 ${isClickable == true && 'hover:scale-90 cursor-pointer transition-all duration-300'} ${isActive == true ? 'text-white fill-white bg-blue-500' : 'text-blue-500 fill-blue-500 bg-blue-200'} ${isClickable == true && (isActive == true ? 'active:bg-orange-500 active:text-white' : 'active:bg-orange-200 active:text-orange-500 active:fill-orange-500')}`}>
                {tag.text}
                {tag.icon}
            </div>
        ))
    );
}