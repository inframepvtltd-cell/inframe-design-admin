'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {

  const slug = usePathname().split('/')[1]

  const tabs = [
    "dashboard",
    "user",
    "enquiries",
    "booked-sessions",
    "course",
    "study-material",
    "test-series",
    "slider",
    "testimonial",
    "free-resources",

  ]

  return (
    <div className="w-full h-[100vh] overflow-y-scroll 
      bg-black backdrop-blur-xl
      border-r border-white/20 shadow-2xl">

      <h3 className="px-10 pt-8 text-[30px] flex items-center gap-1 
        text-white font-bold">
        Inframe <span className="text-gray-400">Design</span>
      </h3>

      <ul className="px-10">
        {tabs.map((item, index) => {
          return (
            <Link key={index} href={`/${item}`}>
              <li
                className={`
                  cursor-pointer py-[13px] my-[20px] px-3 capitalize duration-300
                  border border-white/20
                  ${slug === item
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                {item.replaceAll(/[^a-zA-Z0-9 ]/g, " ")}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
