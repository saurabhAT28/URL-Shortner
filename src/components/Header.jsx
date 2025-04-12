import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button.jsx'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu.jsx'
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/Context'
import UseFetch from '@/hooks/UseFetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {

    const navigate = useNavigate();
    const { user, fetchUser } = UrlState();
    const { loading, fn: fnLogout } = UseFetch(logout);


    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link to="/">
                    <img src="/short_url.png" alt="trimmer logo" className="h-16" />
                </Link>

                <div className="">
                    {
                        !user ?
                            <Button onClick={() => navigate("/auth")}>Login</Button>
                            : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                                        <Avatar>
                                            <AvatarImage src={user?.user_metadata?.profile_pic} className='object-contain' />
                                            <AvatarFallback>ST</AvatarFallback>
                                        </Avatar>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link to="/dashboard" className='flex'>
                                                <LinkIcon className='mr-2 h-4 w-4' />My Links
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='text-red-400'>
                                            <LogOut className='mr-2 h-4 w-4' />
                                            <span onClick={() => {
                                                fnLogout().then(() => {
                                                    fetchUser();
                                                    navigate("/")
                                                })
                                            }}>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                    }
                </div>
                {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
            </nav>
        </>
    )
}

export default Header