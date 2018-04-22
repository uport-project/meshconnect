import { abacus, dataAnalytics, management, networkCloud, flowChartComplex } from 'assets/svg'
export default [
  {
    title: 'History',
    to: '/dashboard/blocks/history',
    svg: dataAnalytics,
  },
  {
    title: 'Gas Analysis',
    to: '/dashboard/blocks/gas',
    svg: abacus,
  },
  {
    title: 'Transactions',
    to: '/dashboard/blocks/transactions',
    svg: management,
  },
  {
    title: 'Monitor',
    to: '/dashboard/blocks/monitor',
    svg: networkCloud,
  },
  {
    title: 'Patterns',
    to: '/dashboard/blocks/patterns',
    svg: flowChartComplex,
  },
]