import { BsFillArchiveFill, } from 'react-icons/bs';
import { GiPayMoney } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";


interface SidebarProps {
    openSidebarToggle: boolean;
    OpenSidebar: () => void;
    openModal: (content: string) => void;
}

function Sidebar({ openSidebarToggle, OpenSidebar, openModal }: SidebarProps) {
    const navigate = useNavigate();
   
    const logout = () => { 
        localStorage.clear();
        navigate("/");
        googleLogout();
     }


     return (
        <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <GiPayMoney className="icon_header" />Budget App
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a  onClick={() => openModal("monthlyIncomes")}>
                        <GiPayMoney className='icon' /> Montly Incomes
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a onClick={() => openModal("category")}>
                        <BsFillArchiveFill className='icon' /> Category
                    </a>
                </li>
            </ul>
            <div className="sidebar-list-item">
                <div className="sidebar-brand" onClick={logout}>
                    <CiLogout className="icon_header"  />Logout
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;