'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Calendar,
  UserCircle,
  List,
  Table,
  FileText,
  PieChart,
  Boxes,
  Plug,
  Settings,
} from 'lucide-react';

interface SubItem {
  name: string;
  path: string;
  pro: boolean;
}

interface NavItem {
  icon: React.ElementType;
  name: string;
  path?: string;
  subItems?: SubItem[];
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    name: 'Dashboard',
    subItems: [{ name: 'Ecommerce', path: '/', pro: false }],
  },
  {
    icon: Calendar,
    name: 'Calendar',
    path: '/calendar',
  },
  {
    icon: UserCircle,
    name: 'User Profile',
    path: '/profile',
  },
  {
    name: 'Forms',
    icon: List,
    subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }],
  },
  {
    name: 'Tables',
    icon: Table,
    subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
  },
  {
    name: 'Pages',
    icon: FileText,
    subItems: [
      { name: 'Blank Page', path: '/blank', pro: false },
      { name: '404 Error', path: '/error-404', pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: PieChart,
    name: 'Charts',
    subItems: [
      { name: 'Line Chart', path: '/line-chart', pro: false },
      { name: 'Bar Chart', path: '/bar-chart', pro: false },
    ],
  },
  {
    icon: Boxes,
    name: 'UI Elements',
    subItems: [
      { name: 'Alerts', path: '/alerts', pro: false },
      { name: 'Avatar', path: '/avatars', pro: false },
      { name: 'Badge', path: '/badge', pro: false },
      { name: 'Buttons', path: '/buttons', pro: false },
      { name: 'Images', path: '/images', pro: false },
      { name: 'Videos', path: '/videos', pro: false },
    ],
  },
  {
    icon: Plug,
    name: 'Authentication',
    subItems: [
      { name: 'Sign In', path: '/signin', pro: false },
      { name: 'Sign Up', path: '/signup', pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="space-y-2">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <div>
              <button
                onClick={() => toggleMenu(nav.name)}
                className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <span className="flex items-center space-x-2">
                  <nav.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span>{nav.name}</span>
                </span>
                {openMenu === nav.name ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {openMenu === nav.name && (
                <ul className="pl-8 mt-2 space-y-1">
                  {nav.subItems.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.path}
                        className="block px-3 py-1 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              href={nav.path ?? '#'}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <nav.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span>{nav.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-semibold text-lg text-gray-800 dark:text-white">
            Green House Admin
          </span>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-gray-500 text-sm uppercase mb-2">Main</h3>
          {renderMenuItems(navItems)}

          <h3 className="text-gray-500 text-sm uppercase mt-6 mb-2">Others</h3>
          {renderMenuItems(othersItems)}
        </div>
      </div>

      {/* Bottom user/settings area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/settings"
          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default AppSidebar;
