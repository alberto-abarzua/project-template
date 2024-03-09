import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    CalendarIcon,
    NewspaperIcon,
    HomeIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import UserInfoCard from '@/components/auth/UserInfoCard';
import PropTypes from 'prop-types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const SideNav = ({ children }) => {
    const location = useLocation();

    const navigation = [
        { name: 'Inicio', href: '/', icon: HomeIcon, current: location.pathname === '/' },
        {
            name: 'Fechas',
            href: '/dates/',
            icon: CalendarIcon,
            current: location.pathname === '/dates/',
        },
        {
            name: 'Pun News',
            href: '/news/',
            icon: NewspaperIcon,
            current: location.pathname === '/news/',
        },
    ];
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="h-full">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src="/brand/logo.svg"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7"
                                            >
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map(item => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    to={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-gray-800 text-white'
                                                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className="h-6 w-6 shrink-0"
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <img className="h-8 w-auto" src="/brand/logo.svg" alt="Your Company" />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map(item => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                    )}
                                                >
                                                    <item.icon
                                                        className="h-6 w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className=" mt-auto">
                                    <UserInfoCard />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-white">
                        Dashboard
                    </div>
                    <UserInfoCard />
                </div>

                <main className="h-full lg:pl-72">
                    <div className="h-full">
                        <div className="relative isolate h-full overflow-hidden bg-gray-900">
                            <svg
                                className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                                        width={200}
                                        height={200}
                                        x="50%"
                                        y={-1}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M.5 200V.5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                                    <path
                                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                        strokeWidth={0}
                                    />
                                </svg>
                                <rect
                                    width="100%"
                                    height="100%"
                                    strokeWidth={0}
                                    fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
                                />
                            </svg>
                            <div
                                className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                                aria-hidden="true"
                            >
                                <div
                                    className="to-violet-700-500 aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-pink-300 opacity-30"
                                    style={{
                                        clipPath:
                                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                                    }}
                                />
                            </div>
                            <ScrollArea className="h-full">
                                {children}
                                <ScrollBar />
                            </ScrollArea>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

SideNav.propTypes = {
    children: PropTypes.node,
};
export default SideNav;
