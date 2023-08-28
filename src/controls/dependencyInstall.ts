export const dependencyInstall = {
  sass: '-D sass @types/sass',
  styledcomponents:
    'styled-components@^6.0.0-rc.6 @types/styled-components@^5.1.26',
  mui5: {
    emotion: '@mui/material @emotion/react @emotion/styled @mui/icons-material',
    styledcomponents:
      'styled-components@^6.0.0-rc.6 @types/styled-components@^5.1.26 @mui/material @mui/styled-engine-sc @mui/icons-material',
  },
  chakraui: '@chakra-ui/react @emotion/react @emotion/styled framer-motion',
  zustand: 'zustand @types/zustand',
  redux: '@reduxjs/toolkit react-redux',
  reactquery: 'react-query @types/react-query',
  axios: 'axios @types/axios',
  storybook:
    'storybook @storybook/react-vite @storybook/react @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/blocks',
}
