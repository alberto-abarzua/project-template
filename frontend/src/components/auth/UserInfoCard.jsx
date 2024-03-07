import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSelector, useDispatch } from 'react-redux';
import { userSliceActions } from '@/redux/userSlice';

const UserInfoCard = () => {
    const dispatch = useDispatch();
    const { session } = useSelector(state => state.user);

    const handleLogout = async () => {
        dispatch(userSliceActions.logout());
    };
    return (
        <div className="flex  w-fit flex-row items-center justify-center gap-x-2 rounded-md text-gray-800   shadow drop-shadow-lg lg:mx-5 lg:w-full ">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-full w-full items-center justify-center gap-x-2 px-4 py-2">
                    <span className="whitespace-nowrap">Mi Sesión</span>
                    <img
                        className="w-9 rounded-full border border-gray-300 opacity-75 shadow-lg"
                        src="/svgs/misc/user_session.svg"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-md">
                        {session && session.user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-md">
                        <div onClick={handleLogout} className="flex ">
                            <span>Cerrar sesión</span>
                            <img
                                src="/svgs/misc/logout.svg"
                                className="w-5 transform cursor-pointer hover:scale-110 hover:opacity-50 "
                            />
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserInfoCard;
