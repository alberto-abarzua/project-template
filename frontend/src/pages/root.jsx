import { useOutlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import NavBar from '@/components/layout/nav/NavBar';

export default function Root() {
    let Outlet = useOutlet();

    return (
        <>
            <NavBar />
            {Outlet}
            <Toaster />
        </>
    );
}
