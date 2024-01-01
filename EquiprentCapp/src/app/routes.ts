export const Routes = {
  home: {
    breadcrumbs: {
      default: 'General.Dashboard'
    },
    navigations: {
      default: 'home'
    },
    paths: {
      default: 'home'
    }
  },
  login: {
    navigations: {
      default: 'login'
    },
    paths: {
      default: 'login'
    }
  },
  clientRepresentatives: {
    breadcrumbs: {
      creation: 'ClientRepresentative.Create',
      edition: 'ClientRepresentative.Edit',
      list: 'ClientRepresentative.List'
    },
    navigations: {
      creation: 'home/client-representatives/create',
      edition: (id: string) => `home/client-representatives/edit/${id}`,
      list: 'home/client-representatives'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'client-representatives'
    }
  },
  clients: {
    breadcrumbs: {
      creation: 'Client.Create',
      edition: 'Client.Edit',
      list: 'Client.List'
    },
    navigations: {
      creation: 'home/clients/create',
      edition: (id: string) => `home/clients/edit/${id}`,
      list: 'home/clients'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'clients'
    },
    tabs: {
      general: {
        index: 0
      },
      representatives: {
        index: 1
      },
      audits: {
        index: 2
      }
    }
  },
  userRoles: {
    breadcrumbs: {
      creation: 'UserRole.Create',
      edition: 'UserRole.Edit',
      list: 'UserRole.List'
    },
    navigations: {
      creation: 'home/user-roles/create',
      edition: (id: number) => `home/user-roles/edit/${id}`,
      list: 'home/user-roles'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'user-roles'
    }
  },
  users: {
    breadcrumbs: {
      creation: 'User.Create',
      edition: 'User.Edit',
      list: 'User.List'
    },
    navigations: {
      creation: 'home/users/create',
      edition: (id: string) => `home/users/edit/${id}`,
      list: 'home/users'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'users'
    }
  }
}