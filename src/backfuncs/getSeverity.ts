export const getSeverity = (status: any) => {
  switch (status) {
    case 'Критическая':
      return 'danger'

    case 'Низкая':
      return 'info'

    case 'Высокая':
      return 'warning'
  }
}
