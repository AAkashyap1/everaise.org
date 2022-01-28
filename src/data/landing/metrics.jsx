import { current, archive } from '../../data/team'

const metrics = [
  { id: 1, end: 1500, suffix: '+', emphasis: 'Inspired students', rest: '' },
  { id: 2, end: current.length + archive.length - 1, suffix: '', emphasis: 'Experienced staff members', rest: '' },
  { id: 3, end: 40, suffix: '+', emphasis: 'Countries impacted', rest: '' },
]

export default metrics;