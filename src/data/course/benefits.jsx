import {
    BookOpenIcon,
    ChartBarIcon,
    ClipboardIcon,
    ClockIcon,
    DatabaseIcon,
    DesktopComputerIcon,
    GlobeIcon,
    IdentificationIcon,
    UsersIcon,
  } from '@heroicons/react/outline'

const benefits = [
    {
      title: 'Live sessions taught by our excellent faculty',
      desc: 'Understand the thought process behind problem-solving',
      href: '',
      icon: ClockIcon,
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
    },
    {
      title: 'Well-trained, qualified instructors',
      desc: 'Easily accessible on our discussion board whenever you have questions',
      href: '/people/team',
      icon: UsersIcon,
      iconForeground: 'text-cyan-700',
      iconBackground: 'bg-cyan-100',
    },
    { 
      title: 'Global community of avid learners spanning 6 continents',  
      desc: 'Forge new friendships in a supportive and collaborative environment',
      href: '',
      icon: GlobeIcon, 
      iconForeground: 'text-yellow-700', 
      iconBackground: 'bg-yellow-50' 
    },
    {
      title: 'Well-written course materials',
      desc: 'Complete with detailed walkthrough solutions to thousands of problems',
      href: '/resources',
      icon: BookOpenIcon,
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
    },
    {
      title: 'Variety of carefully-selected homework problems',
      desc: 'Welcoming students of all skill levels',
      href: '/launch',
      icon: DatabaseIcon,
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
    },
    {
      title: 'Hundreds of instructor-produced videos',
      desc: 'For visual and auditory learners',
      href: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
      icon: DesktopComputerIcon,
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
    },
    {
      title: 'Exclusive access to our annual competitions',
      desc: 'Subject-specific End-of-Course contests and Estimathon',
      href: '/events/contests/estimathon',
      icon: ClipboardIcon,
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
    },
    {
      title: 'Priority access in interactive guest speaker events',
      desc: 'Exciting STEM topics with professors and industry professionals',
      href: '/events/guest-speakers',
      icon: IdentificationIcon,
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
    },
    {
      title: 'Climb the course leaderboard',
      desc: 'Earn cash prizes and win unique benefits',
      href: '/launch',
      icon: ChartBarIcon,
      iconForeground: 'text-cyan-700',
      iconBackground: 'bg-cyan-100',
    },
  ]

  export default benefits;