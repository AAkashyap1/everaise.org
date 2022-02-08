import {
  ChartBarIcon,
  ChatAlt2Icon,
  DocumentTextIcon,
  HomeIcon,
} from '@heroicons/react/solid'

export const homeworkNavigation = [
  { name: 'Dashboard', href: '', icon: ChartBarIcon, current: false },
  { name: 'Homework', href: '', icon: DocumentTextIcon, current: true },
  { name: 'Discussion', href: 'https://discord.gg/JE5TaCrrFn', icon: ChatAlt2Icon, current: false },
]

export const dashboardNavigation = [
  { name: 'Dashboard', href: '', icon: ChartBarIcon, current: true },
  { name: 'Homework', href: '', icon: DocumentTextIcon, current: false },
  { name: 'Discussion', href: 'https://discord.gg/JE5TaCrrFn', icon: ChatAlt2Icon, current: false },
]

export const dashboardSecondaryNavigation = [
  { name: 'Home', href: '/home', icon: HomeIcon, current: false },
]

export const homeNavigation = [
  { name: 'Home', href: '/home', icon: HomeIcon, current: true },
]

export const homeSecondaryNavigation = [
  { name: 'Discussion', href: 'https://discord.gg/JE5TaCrrFn', icon: ChatAlt2Icon, current: false },
]