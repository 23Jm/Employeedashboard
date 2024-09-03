import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "employees"],
      },
      {
        icon: "/calendar.png",
        label: "Calendars",
        href: "/list/calendars",
        visible: ["admin", "employees"],
      },
      {
        icon: "/exam.png",
        label: "Spreadsheet",
        href: "/list/spreadsheet",
        visible: ["admin", "employees"],
      },
      {
        icon: "/lesson.png",
        label: "Tasks",
        href: "/list/tasks",
        visible: ["admin", "employees"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "employees"],
      },
      {
        icon: "/lesson.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["employees"],
      },
      {
        icon: "/announcement.png",
        label: "Announcement",
        href: "/list/announcements",
        visible: ["admin", "employees"],
      },
      {
        icon: "/message.png",
        label: "Leave Request",
        href: "/list/leaveRequest",
        visible: ["admin"],
      },
      {
        icon: "/lesson.png",
        label: "Users",
        href: "/list/users",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/list/profile",
        visible: ["admin", "employees"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "employees"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className=" flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light text-[10px] my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gray-100"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
