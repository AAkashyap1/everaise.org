import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  adminDashboardNavigation,
  adminDashboardSecondaryNavigation
} from '../../data/launch/navigation/labels';
import LaunchNav from '../../components/global/navs/LaunchNav';
import SideNav from '../../components/global/navs/SideNav';
import courseData from '../../data/launch/courseData';
import Page from '../../components/page';
import Modules from '../../components/admin/modules/modules';
import { MenuAlt1Icon } from '@heroicons/react/outline';
import {} from '@heroicons/react/solid';

export default function Dashboard() {
  const { course } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Page
      title={courseData[course].courseName + ' - Admin Dashboard'}
      description=""
    >
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={adminDashboardNavigation}
          secondaryNavigation={adminDashboardSecondaryNavigation}
        />
        <div className="flex-1 overflow-auto focus:outline-none">
          <div className="block lg:hidden relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            <LaunchNav
              admin={true}
              info={courseData[course].courseName + ' - Admin'}
            />
            <Modules />
          </main>
        </div>
      </div>
    </Page>
  );
}
