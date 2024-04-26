import { Image } from "next/image";
import { Data } from '../../app/data/data.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart, faBell } from '@fortawesome/free-solid-svg-icons' // Import specific icons you need

const Header = () => {
    return (
        <nav className="flex relative items-center border-b-2 border-gray-300 py-[10px] mx-[20px] ">
            <div className="flex justify-center items-center  gap-[20px]">
                {/* Use Next.js Image component for optimized image handling */}
                <img src={Data[0].img.src} alt="profile" className="w-[60px]" />
                <h3>{Data[0].name}</h3>
            </div>
            <ul className="absolute flex gap-5 right-0 items-center">
                <li className="text-center">
                    {/* Render FontAwesomeIcon correctly */}
                    <FontAwesomeIcon icon={faSearch} className="w-[30px] l-[30px]" /> 
                </li>
                <li className="text-center">
                    {/* Example of using FontAwesomeIcon with a dynamic icon approach */}
                    <FontAwesomeIcon icon={faHeart} className="w-[30px] l-[30px]" /> 
                </li> 
                <li className="text-center">
                    <FontAwesomeIcon icon={faBell} className="w-[30px] l-[30px] "/>
                </li>
            </ul>
        </nav>
    )
};

export default Header;
