import { dna, flowChartShapes, flowChartCircle, dataMining } from 'assets/svg'
export default [
  {
    title: 'Documentation',
    to: '/dashboard/smart-contract/documentation',
    svg: flowChartCircle,
  },
  {
    title: 'Structure',
    to: '/dashboard/ens/transactions',
    svg: dna,
  },
  {
    title: 'Testing',
    to: '/dashboard/ens/gas',
    svg: flowChartShapes,
  },
  {
    title: 'Deploy',
    to: '/dashboard/ens/scan',
    svg: dataMining,
  },
]