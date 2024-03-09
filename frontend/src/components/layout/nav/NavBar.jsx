import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions } from '@/redux/slices/userSlice';
import { useLocation } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const NavBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { session } = useSelector(state => state.user);

    const links = [
        {
            name: 'Home',
            href: '/',
            current: location.pathname === '/',
        },
    ];

    if (session?.user) {
        // links.push({
        //     name: 'Dashboard',
        //     href: '/dashboard',
        //     current: false,
        // });
        // links.push({
        //     name: 'Profile',
        //     href: '/profile',
        //     current: false,
        // });
    } else {
        // links.push({
        //     name: 'Register',
        //     href: '/register',
        //     current: false,
        // });
        links.push({
            name: 'Login',
            href: '/login',
            current: location.pathname === '/login',
        });
    }

    const user_menu = [
        // {
        //     name: 'Your Profile',
        //     href: '#',
        //     fun: () => {},
        // },
        // {
        //     name: 'Settings',
        //     href: '#',
        //     fun: () => {},
        // },
        {
            name: 'Sign out',
            href: '#',
            fun: () => {
                dispatch(userSliceActions.logout());
            },
        },
    ];

    const linkComponents = links.map(link => {
        return (
            <Link
                key={link.name}
                to={link.href}
                className={classNames(
                    link.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={link.current ? 'page' : undefined}
            >
                {link.name}
            </Link>
        );
    });

    const userMenuComponents = user_menu.map(link => {
        return (
            <Menu.Item key={link.name}>
                {({ active }) => (
                    <Link
                        to={link.href}
                        onClick={link.fun}
                        className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                        )}
                    >
                        {link.name}
                    </Link>
                )}
            </Menu.Item>
        );
    });

    const userMenuComponentsMobile = user_menu.map(link => {
        return (
            <Link key={link.name} to={link.href}>
                <Disclosure.Button
                    as="div"
                    href={link.href}
                    onClick={link.fun}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                    {link.name}
                </Disclosure.Button>
            </Link>
        );
    });
    return (
        <Disclosure as="nav" className="bg-gray-900">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link to={'/'}>
                                        <img
                                            className="size-7 w-auto hover:opacity-70"
                                            src="/brand/logo.svg"
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                        {linkComponents}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div
                                    className={` items-center ${session?.user ? 'flex' : 'hidden'}`}
                                >
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <UserCircleIcon className="h-10 w-10 rounded-full stroke-white stroke-1" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <span className="pl-4 font-semibold italic text-gray-800">
                                                    {session?.user ? session.user.email : ''}
                                                </span>
                                                {userMenuComponents}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            {linkComponents}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <UserCircleIcon className="h-10 w-10 rounded-full stroke-white stroke-1" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        {session?.user ? session.user.name : 'No user'}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        {session?.user ? session.user.email : 'Not logged in'}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">{userMenuComponentsMobile}</div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
export default NavBar;
