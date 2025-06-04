"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import {
  LineChartIcon as ChartLineUp,
  ArrowRightLeft,
  UserCog,
  LogOut,
  Menu,
  Sun,
  Moon,
  ChevronRight,
  BarChart3,
  Home,
} from "lucide-react";

const Sidebar = ({ onSelectSection, onSignOutClick, activeSection }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "info", label: "Panel", icon: <Home className="h-5 w-5" /> },
    {
      id: "accounts",
      label: "Hesablar",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "transfer",
      label: "Köçürmələr",
      icon: <ArrowRightLeft className="h-5 w-5" />,
    },
    {
      id: "loans",
      label: "Kreditlər",
      icon: <ChartLineUp className="h-5 w-5" />,
    },
    {
      id: "history",
      label: "Tarixçə",
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      id: "update",
      label: "Profil",
      icon: <UserCog className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-lime-500 text-white shadow-md"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <div
        className={`h-screen w-64 pt-7 pb-0 p-4 flex flex-col fixed left-0 top-0 z-20 transition-transform duration-300 transform lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-surface-hover bg-background`}
      >
        {/* Header with logo and theme toggle */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 display-font text-xl font-bold">
            Aivinci Bank
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-hover transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <Link
            to="/"
            className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-surface-hover transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Ana səhifə</span>
          </Link>

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 py-3 px-4 rounded-md transition-colors text-left ${
                activeSection === item.id
                  ? "bg-orange-teal-gradient text-white"
                  : "hover:bg-surface-hover"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeSection === item.id && (
                <ChevronRight className="h-4 w-4 ml-auto" />
              )}
            </button>
          ))}

          <div className="border-t border-surface-hover my-4"></div>

          <button
            onClick={() => {
              onSignOutClick();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-surface-hover transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Çıxış</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
