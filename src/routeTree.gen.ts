/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WeeklyIndexImport } from './routes/weekly/index'
import { Route as dashboardDashboardImport } from './routes/(dashboard)/_dashboard'
import { Route as dashboardDashboardHomeImport } from './routes/(dashboard)/_dashboard.home'

// Create Virtual Routes

const dashboardImport = createFileRoute('/(dashboard)')()

// Create/Update Routes

const dashboardRoute = dashboardImport.update({
  id: '/(dashboard)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WeeklyIndexRoute = WeeklyIndexImport.update({
  id: '/weekly/',
  path: '/weekly/',
  getParentRoute: () => rootRoute,
} as any)

const dashboardDashboardRoute = dashboardDashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => dashboardRoute,
} as any)

const dashboardDashboardHomeRoute = dashboardDashboardHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => dashboardDashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(dashboard)': {
      id: '/(dashboard)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof dashboardImport
      parentRoute: typeof rootRoute
    }
    '/(dashboard)/_dashboard': {
      id: '/(dashboard)/_dashboard'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof dashboardDashboardImport
      parentRoute: typeof dashboardRoute
    }
    '/weekly/': {
      id: '/weekly/'
      path: '/weekly'
      fullPath: '/weekly'
      preLoaderRoute: typeof WeeklyIndexImport
      parentRoute: typeof rootRoute
    }
    '/(dashboard)/_dashboard/home': {
      id: '/(dashboard)/_dashboard/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof dashboardDashboardHomeImport
      parentRoute: typeof dashboardDashboardImport
    }
  }
}

// Create and export the route tree

interface dashboardDashboardRouteChildren {
  dashboardDashboardHomeRoute: typeof dashboardDashboardHomeRoute
}

const dashboardDashboardRouteChildren: dashboardDashboardRouteChildren = {
  dashboardDashboardHomeRoute: dashboardDashboardHomeRoute,
}

const dashboardDashboardRouteWithChildren =
  dashboardDashboardRoute._addFileChildren(dashboardDashboardRouteChildren)

interface dashboardRouteChildren {
  dashboardDashboardRoute: typeof dashboardDashboardRouteWithChildren
}

const dashboardRouteChildren: dashboardRouteChildren = {
  dashboardDashboardRoute: dashboardDashboardRouteWithChildren,
}

const dashboardRouteWithChildren = dashboardRoute._addFileChildren(
  dashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof dashboardDashboardRouteWithChildren
  '/weekly': typeof WeeklyIndexRoute
  '/home': typeof dashboardDashboardHomeRoute
}

export interface FileRoutesByTo {
  '/': typeof dashboardDashboardRouteWithChildren
  '/weekly': typeof WeeklyIndexRoute
  '/home': typeof dashboardDashboardHomeRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(dashboard)': typeof dashboardRouteWithChildren
  '/(dashboard)/_dashboard': typeof dashboardDashboardRouteWithChildren
  '/weekly/': typeof WeeklyIndexRoute
  '/(dashboard)/_dashboard/home': typeof dashboardDashboardHomeRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/weekly' | '/home'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/weekly' | '/home'
  id:
    | '__root__'
    | '/'
    | '/(dashboard)'
    | '/(dashboard)/_dashboard'
    | '/weekly/'
    | '/(dashboard)/_dashboard/home'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  dashboardRoute: typeof dashboardRouteWithChildren
  WeeklyIndexRoute: typeof WeeklyIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  dashboardRoute: dashboardRouteWithChildren,
  WeeklyIndexRoute: WeeklyIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(dashboard)",
        "/weekly/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(dashboard)": {
      "filePath": "(dashboard)",
      "children": [
        "/(dashboard)/_dashboard"
      ]
    },
    "/(dashboard)/_dashboard": {
      "filePath": "(dashboard)/_dashboard.tsx",
      "parent": "/(dashboard)",
      "children": [
        "/(dashboard)/_dashboard/home"
      ]
    },
    "/weekly/": {
      "filePath": "weekly/index.tsx"
    },
    "/(dashboard)/_dashboard/home": {
      "filePath": "(dashboard)/_dashboard.home.tsx",
      "parent": "/(dashboard)/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
