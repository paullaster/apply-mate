class ColorHelper {
    colorsHelper(type) {
        return {
          lead: '#5867DD',
          admin: '#FFB04C',
          primary: '#5867DD',
          secondary: '#FFB04C',
          accent: '#8792E4',
          error: '#FF5252',
          warning: '#FFC107',
          info: '#2196F3',
          success: '#4CAF50',
          light: '#F5F5F5',
          dark: '#212121'
        }[type];
      }
}

export default new ColorHelper();