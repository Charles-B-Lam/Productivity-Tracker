
import { MdAddTask } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { TfiTimer } from "react-icons/tfi";
import {GoHome } from "react-icons/go";

export const SidebarData = [
    {
        title: "Home",
        path: "/home",
        icon: <GoHome/>
    },
    {
        title: "Task List",
        path: "/tasklist",
        icon: <MdAddTask/>
    },
    {
        title: "Calendar",
        path: "/calendar",
        icon: <FcCalendar/>
    },
    {
        title: "Timer",
        path: "/timer",
        icon: <TfiTimer/>
    },
]