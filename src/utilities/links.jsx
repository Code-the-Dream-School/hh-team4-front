import { MdSpaceDashboard } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { AiFillMinusCircle } from 'react-icons/ai';

import { TbBellFilled } from 'react-icons/tb';
import { BsGraphUp } from 'react-icons/bs';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { BsPersonFillAdd } from 'react-icons/bs';
import { CgProfile, CgUserList } from 'react-icons/cg';

const linksAdmin = [
    { text: 'dashboard', path: '.', icon: <MdSpaceDashboard /> },
    { text: 'add employee', path: 'adduser', icon: <BsPersonFillAdd /> },
    { text: 'add product', path: 'add', icon: <IoAddCircle /> },
    { text: 'dispense drug', path: 'dispense', icon: <AiFillMinusCircle /> },
    { text: 'alerts', path: 'alerts', icon: <TbBellFilled /> },
    { text: 'reports', path: 'reports', icon: <BsGraphUp /> },
    { text: 'past dispensed', path: 'past-orders', icon: <FaArrowCircleLeft /> },
    { text: 'user profile', path: 'user', icon: <CgProfile /> },
    { text: 'users management', path: 'userManagement', icon: <CgUserList /> },
];

const linksInventoryManager = [
    { text: 'dashboard', path: '.', icon: <MdSpaceDashboard /> },
    { text: 'add product', path: 'add', icon: <IoAddCircle /> },
    { text: 'dispense drug', path: 'dispense', icon: <AiFillMinusCircle /> },
    { text: 'alerts', path: 'alerts', icon: <TbBellFilled /> },
    { text: 'past dispensed', path: 'past-orders', icon: <FaArrowCircleLeft /> },
    { text: 'user', path: 'user', icon: <CgProfile /> },
];

const linksClerk = [
    { text: 'dashboard', path: '.', icon: <MdSpaceDashboard /> },
    { text: 'dispense drug', path: 'dispense', icon: <AiFillMinusCircle /> },
    { text: 'alerts', path: 'alerts', icon: <TbBellFilled /> },
    { text: 'past dispensed', path: 'past-orders', icon: <FaArrowCircleLeft /> },
    { text: 'user', path: 'user', icon: <CgProfile /> },
];

export { linksAdmin, linksInventoryManager, linksClerk };
