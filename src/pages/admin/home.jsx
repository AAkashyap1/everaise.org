import { useState, useEffect } from 'react'
import Cards from '../../components/admin/home/cards'
import AdminAnnouncements from '../../components/admin/home/announcements'
import {
  MenuAlt1Icon,
} from '@heroicons/react/outline'
import SideNav from '../../components/global/navs/SideNav'
import { homeNavigation } from '../../data/launch/navigation/labels'
import LaunchNav from '../../components/global/navs/LaunchNav'
import Access from '../../components/admin/home/access'
import Registration from '../../components/admin/home/registration'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { database } from '../../firebase' 
import { useAuth } from '../../contexts/AuthContext'
import Page from '../../components/page'

export default function AdminHome() {
  const { currentUser } = useAuth();
  const user = useDocumentData(database.users.doc(currentUser.email))[0];
  const [admin, setAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user) {
      setAdmin(user.admin)
    }
  }, [user])

  return (
    <Page 
      title="Admin Home - Everaise Launch"
      description=""
    >
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideNav 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={homeNavigation}
          secondaryNavigation={[]}
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
            <LaunchNav admin={true} info={'Home - Admin'} />
            <Cards />
            {admin &&
              <div>
                <AdminAnnouncements />
                <Access />
                <Registration />
              </div>
            }
          </main>
        </div>
      </div>  
    </Page>
  )
}