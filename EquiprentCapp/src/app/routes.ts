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
  userRoles: {
    breadcrumbs: {
      list: 'UserRole.List'
    },
    navigations: {
      list: 'home/user-roles'
    },
    paths: {
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