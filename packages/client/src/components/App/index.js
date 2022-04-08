import './App.css';

import Auth from '../Auth';
import Sidebar from '../Sidebar';

import { SocketContext } from '../contexts/SocketContext';

function App() {

    const isLoggedIn = false;

    // TODO: Add background graphics
    return (
        <section id="content">
            {isLoggedIn ? (
                <Sidebar>
                    {/* UserProfile */}
                    {/* FriendsList */}
                </Sidebar>
            ) : (
                <div />
            )}
        </section>
    );
}

export default App;
