// app/theme.ts
'use client'
import { createTheme, Theme, ThemeOptions, Components } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

// Enhanced color palette with semantic colors
const sharedColors = {
  primary: {
    main: '#243e9f',
    light: '#0f91e3',
    lighter: '#54b2de',
    dark: '#042e69',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#1796E5',
    light: '#8adaff',
    dark: '#0E84CF',
    contrastText: '#ffffff'
  },
  success: {
    main: '#228B22',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#ffffff'
  },
  error: {
    main: '#cf2e2e',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff'
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#ffffff'
  }
}

// Enhanced shadows
const shadows = {
  small: '0 2px 8px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
  large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  dark: {
    small: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.5)',
    large: '0 8px 16px rgba(0, 0, 0, 0.7)'
  }
}

// Mode-specific color palettes with enhanced contrast
const getDesignTokens = (mode: PaletteMode): Pick<ThemeOptions, 'palette'> => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: sharedColors.primary,
          secondary: sharedColors.secondary,
          success: sharedColors.success,
          error: sharedColors.error,
          warning: sharedColors.warning,
          info: sharedColors.info,
          background: {
            default: '#ffffff',
            paper: '#f9f9f9'
          },
          text: {
            primary: '#333333',
            secondary: '#444444',
            disabled: 'rgba(0, 0, 0, 0.38)'
          },
          divider: 'rgba(0, 0, 0, 0.12)',
          action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)'
          }
        }
      : {
          primary: {
            ...sharedColors.primary,
            main: '#54b2de',
            dark: '#243e9f'
          },
          secondary: {
            ...sharedColors.secondary,
            main: '#8adaff'
          },
          success: sharedColors.success,
          error: sharedColors.error,
          warning: sharedColors.warning,
          info: sharedColors.info,
          background: {
            default: '#0a1929',
            paper: '#0d2137'
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
            disabled: 'rgba(255, 255, 255, 0.5)'
          },
          divider: 'rgba(255, 255, 255, 0.12)',
          action: {
            active: '#ffffff',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)'
          }
        })
  }
})

// Enhanced typography with better scaling
const typography: TypographyOptions = {
  fontFamily: [
    'Roboto', // Clean, geometric, highly readable, modern
    'Open Sans', // Neutral, friendly, optimized for web and mobile
    'Lato', // Warm, humanist sans-serif with a professional tone
    'Poppins', // Geometric sans-serif with a modern vibe and wide spacing
    'Montserrat', // Modern, stylish, inspired by urban signage
    'Inter', // Optimized for screens with great readability at small sizes
    '-apple-system', // System font for Apple devices
    'BlinkMacSystemFont', // System font for older Apple browsers
    'Segoe UI', // System font for Windows
    'Helvetica Neue', // Popular sans-serif font
    'Arial', // Common sans-serif fallback
    'sans-serif' // Generic sans-serif fallback
  ].join(','),
  h1: {
    fontFamily: 'Cairo',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.01562em'
  },
  h2: {
    fontFamily: 'Cairo',
    fontWeight: 600,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    lineHeight: 1.3,
    letterSpacing: '-0.00833em'
  },
  h3: {
    fontFamily: 'Cairo',
    fontWeight: 500,
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    lineHeight: 1.4,
    letterSpacing: '0em'
  },
  h4: {
    fontFamily: 'Cairo',
    fontWeight: 500,
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    lineHeight: 1.4,
    letterSpacing: '0.00735em'
  },
  h5: {
    fontFamily: 'Cairo',
    fontWeight: 500,
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    lineHeight: 1.5,
    letterSpacing: '0em'
  },
  h6: {
    fontFamily: 'Cairo',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em'
  },
  body1: {
    fontFamily: 'Open Sans',
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.00938em'
  },
  body2: {
    fontFamily: 'Open Sans',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.01071em'
  },
  button: {
    fontFamily: 'Cairo',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'none'
  },
  caption: {
    fontFamily: 'Open Sans',
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em'
  },
  overline: {
    fontFamily: 'Open Sans',
    fontSize: '0.75rem',
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase'
  }
}

// Enhanced components with proper TypeScript types
const getComponents = (mode: PaletteMode): Components<Omit<Theme, 'components'>> => ({
  MuiButton: {
    defaultProps: {
      disableElevation: true
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '25px',
        textTransform: 'none',
        fontFamily: 'Cairo',
        padding: '6px 16px',
        transition: theme.transitions.create([
          'background-color',
          'box-shadow',
          'border-color',
          'color'
        ])
      }),
      contained: {
        boxShadow: mode === 'dark' ? shadows.dark.small : shadows.small,
        '&:hover': {
          boxShadow: mode === 'dark' ? shadows.dark.medium : shadows.medium
        }
      },
      outlined: {
        '&:hover': {
          backgroundColor:
            mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    variants: [
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          background: `linear-gradient(45deg, ${sharedColors.primary.main}, ${sharedColors.primary.light})`
        }
      }
    ]
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        boxShadow: mode === 'dark' ? shadows.dark.medium : shadows.medium,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: mode === 'dark' ? shadows.dark.large : shadows.large
        }
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'dark' ? '#0d2137' : '#ffffff',
        color: mode === 'dark' ? '#ffffff' : '#333333',
        boxShadow: mode === 'dark' ? shadows.dark.small : shadows.small
      }
    }
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: '8px'
      }
    }
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 46,
        height: 27,
        padding: 0,
        margin: 8
      },
      switchBase: {
        padding: 1,
        '&.Mui-checked': {
          transform: 'translateX(19px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor:
              mode === 'dark' ? sharedColors.secondary.light : sharedColors.secondary.main
          }
        }
      },
      thumb: {
        width: 25,
        height: 25,
        boxShadow: mode === 'dark' ? shadows.dark.small : shadows.small
      },
      track: {
        borderRadius: 13.5,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined'
    },
    styleOverrides: {
      root: {
        marginBottom: '16px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          transition: 'border-color 0.2s ease-in-out',
          '&:hover fieldset': {
            borderColor: sharedColors.primary.light
          },
          '&.Mui-focused fieldset': {
            borderColor: sharedColors.primary.main,
            borderWidth: '2px'
          }
        }
      }
    }
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: mode === 'dark' ? '#ffffff' : '#333333',
        color: mode === 'dark' ? '#333333' : '#ffffff',
        fontSize: '0.75rem',
        borderRadius: '4px',
        padding: '8px 12px'
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: 'Open Sans'
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '16px'
      },
      outlined: {
        borderColor: sharedColors.primary.main
      }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        width: 40,
        height: 40
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: '16px',
        borderRadius: '8px'
      }
    }
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        borderRadius: '8px'
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: sharedColors.primary.main
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500
      }
    }
  }
})

// Enhanced theme configuration
const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    ...getDesignTokens(mode).palette
  },
  direction: 'ltr', // Changed to 'ltr' for left-to-right languages. Change to 'rtl' if needed.
  typography,
  components: getComponents(mode),
  shape: {
    borderRadius: 8
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
})

// Create theme function with proper typing
export const createAppTheme = (mode: PaletteMode): Theme => {
  return createTheme(getThemeOptions(mode))
}

export default createAppTheme
export const theme = createAppTheme('light')
