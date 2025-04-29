import { Provider } from 'react-redux';
import { store } from './app/store';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUsers, 
  FiBox, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

// Define your routes
const routes = [
  { path: '/', component: <Dashboard />, icon: <FiHome />, text: 'Dashboard' },
  { path: '/users', component: <NotFound />, icon: <FiUsers />, text: 'Users' },
  { path: '/products', component: <NotFound />, icon: <FiBox />, text: 'Products' },
  { path: '/settings', component: <NotFound />, icon: <FiSettings />, text: 'Settings' }
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : true;
  });
  const [activeContent, setActiveContent] = useState(routes[0].component);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (component) => {
    setActiveContent(component);
  };

  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? 'w-64' : 'w-20'} fixed md:relative h-full z-10`}>
          
          <div className="flex items-center justify-between p-4 border-b border-indigo-700">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold whitespace-nowrap">Project M.</h1>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-indigo-700 transition-colors"
              aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {isSidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            {routes.map((route, index) => (
              <NavItem 
                key={index}
                icon={route.icon}
                onClick={() => handleNavigation(route.component)}
                isOpen={isSidebarOpen}
                text={route.text}
                isActive={activeContent === route.component}
              />
            ))}
          </nav>
        </div>
        
        {/* Main Content */}
        <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-15 md:ml-10' : 'ml-15 md:ml-10'}`}>
          <div className="p-4 md:p-8">
            {activeContent}
          </div>
        </div>
      </div>
    </Provider>
  );
}

function NavItem({ icon, text, isOpen, onClick, isActive }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center px-6 py-3 cursor-pointer transition-colors
        ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && (
        <span className="ml-4 whitespace-nowrap">{text}</span>
      )}
    </div>
  );
}

export default App;