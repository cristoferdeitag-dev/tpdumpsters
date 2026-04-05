'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function IconHome({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconDashboard({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconTruck({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconCalendar({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconReceipt({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  );
}

function IconUsers({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const navItems: NavItem[] = [
  {
    href: '/hub',
    label: 'Hub',
    icon: <IconHome active={false} />,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <IconDashboard active={false} />,
  },
  {
    href: '/driver',
    label: 'Driver',
    icon: <IconTruck active={false} />,
  },
  {
    href: '/booking',
    label: 'Booking',
    icon: <IconCalendar active={false} />,
  },
  {
    href: '/internal/quote',
    label: 'Quotes',
    icon: <IconReceipt active={false} />,
  },
  {
    href: '/internal/customers',
    label: 'Customers',
    icon: <IconUsers active={false} />,
  },
];

function NavIcon({ href, active }: { href: string; active: boolean }) {
  switch (href) {
    case '/hub': return <IconHome active={active} />;
    case '/dashboard': return <IconDashboard active={active} />;
    case '/driver': return <IconTruck active={active} />;
    case '/booking': return <IconCalendar active={active} />;
    case '/internal/quote': return <IconReceipt active={active} />;
    case '/internal/customers': return <IconUsers active={active} />;
    default: return null;
  }
}

export default function AppBottomNav() {
  const pathname = usePathname();

  // Only show on internal/app pages (NOT on /booking — that's public)
  const showNav = ['/hub', '/dashboard', '/driver', '/internal'].some(
    (p) => pathname.startsWith(p)
  );

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t border-gray-800 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-lg transition-all ${
                isActive ? 'text-red-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <NavIcon href={item.href} active={isActive} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-red-500' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
