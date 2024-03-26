export const ROUTES = {
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
  equipments: {
    breadcrumbs: {
      creation: 'Equipment.Create',
      edition: 'Equipment.Edit',
      list: 'Equipment.List'
    },
    navigations: {
      creation: 'home/equipments/create',
      edition: (id: string) => `home/equipments/edit/${id}`,
      list: `home/equipments`
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'equipments'
    }
  },
  manufacturers: {
    breadcrumbs: {
      creation: 'Manufacturer.Create',
      edition: 'Manufacturer.Edit',
      list: 'Manufacturer.List'
    },
    navigations: {
      creation: 'home/manufacturers/create',
      edition: (id: string) => `home/manufacturers/edit/${id}`,
      list: `home/manufacturers`
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'manufacturers'
    }
  },
  rentals: {
    breadcrumbs: {
      creation: 'Rental.Create',
      edition: 'Rental.Edit',
      list: 'Rental.List'
    },
    navigations: {
      creation: 'home/rentals/create',
      edition: (id: string) => `home/rentals/edit/${id}`,
      list: `home/rentals`
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'rentals'
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
      list: 'User.List',
      profile: 'User.Profile',
    },
    navigations: {
      creation: 'home/users/create',
      edition: (id: string) => `home/users/edit/${id}`,
      list: 'home/users',
      profile: 'home/profile'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'users',
      profile: 'profile',
    }
  }
}