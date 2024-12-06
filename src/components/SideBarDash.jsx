import { List, ListItem, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const SideBarDash = () => {
    return (
        <>
            <Icon as={IoClose}></Icon>
            <List color="white" font="1.2em">
                <ListItem>
                    <Link to="/dashboard">Dashboard</Link>
                </ListItem>
            </List>
        </>
    );
};

export default SideBarDash;
