interface RouteDescription {
  breadcrumbs: { [key: string]: string | ((...args: any) => string) },
  navigations: { [key: string]: string | ((...args: any) => string) },
  paths: { [key: string]: string }
}