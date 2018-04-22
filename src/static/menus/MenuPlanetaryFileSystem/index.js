import { financialFolder, conversion, commerceInvoice, commerceOnlineBanking, } from 'assets/svg'
export default [
  {
    title: 'Name Lookup',
    to: '/dashboard/ens/history',
    svg: financialFolder,
  },
  {
    title: 'Bidding',
    to: '/dashboard/ens/transactions',
    svg: commerceInvoice,
  },
  {
    title: 'Registrations',
    to: '/dashboard/ens/gas',
    svg: commerceOnlineBanking,
  },
  {
    title: 'Scan Blockchain',
    to: '/dashboard/ens/scan',
    svg: conversion,
  },
]