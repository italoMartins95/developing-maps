
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Nav.css';

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { LiaMapSolid } from "react-icons/lia";
import { RxGlobe } from "react-icons/rx";
import { BiSolidMap } from "react-icons/bi";
import { TbLassoPolygon } from "react-icons/tb";
import { TfiMapAlt } from "react-icons/tfi";
import { GoCodeReview } from "react-icons/go";

const Nav = () => {

    const navigate = useNavigate();
    const [retract, setRetract] = useState<boolean>(true)

    const navigateToRoute = (routerName: string) => {
        navigate(`/${routerName}`);
        setRetract(!retract);
    };

    return (
        <nav className={retract ? 'retract' : 'not-retract'}>

            {
                retract ?
                    <BiMenu className='btn-retract' onClick={() => { setRetract(!retract) }} /> :
                    <AiOutlineClose className='btn-not-retract' onClick={() => { setRetract(!retract) }} />
            }

            <ul>
                <li onClick={() => navigateToRoute('')}>
                    <HiOutlineHome />
                    <span>
                        Home
                    </span>
                </li>
                <li onClick={() => navigateToRoute('maps')}>
                    <LiaMapSolid />
                    <span>
                        Maps
                    </span>
                </li>
                <li onClick={() => navigateToRoute('geocoding')}>
                    <RxGlobe />
                    <span>
                        Geocoding
                    </span>
                </li>
                <li onClick={() => navigateToRoute('marker')}>
                    <BiSolidMap />
                    <span>
                        Markers
                    </span>
                </li>
                <li onClick={() => navigateToRoute('search-and-set-marker')}>
                    <TfiMapAlt />
                    <span>
                        Geolocation
                    </span>
                </li>
                <li onClick={() => navigateToRoute('polygon')}>
                    <TbLassoPolygon />
                    <span>
                        Polygons                        
                    </span>
                </li>
                <li onClick={() => navigateToRoute('conclusion')}>
                    <GoCodeReview />
                    <span>
                        Conclusion
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;