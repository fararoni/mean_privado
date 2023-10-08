const getMenu = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Mi Perfil',
          icono: 'mdi mdi-account-alert',
          url: '/dashboard/perfil'
        }
    ];

    if( role === 'ADMIN_ROLE') {
        menu.unshift({titulo: 'Usuarios', icono: 'mdi mdi-account-alert', url: '/dashboard/usuarios'});
        menu.unshift({titulo: 'Nuevo Documento', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/nuevo-documento'});
        menu.unshift({titulo: 'Documentos Generales', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/documentos'})
    }   
    
    return menu;
}

module.exports = {
    getMenu
}