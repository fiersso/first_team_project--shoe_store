import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            
            <div style={{
                width: '100%',
                paddingTop: '7.5rem',
                backgroundColor: 'var(--bgColor)',
            }}><Outlet /> </div>
            
        </>
    );
}
 
export default Layout;