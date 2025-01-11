const fs = require('fs').promises
const path = require('path')

const filePaths = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/error.tsx',
  'app/loading.tsx',
  'app/theme.ts',
  'app/providers.tsx',

  'app/(auth)/login/page.tsx',

  'app/dashboard/layout.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/loading.tsx',
  'app/dashboard/projects/page.tsx',
  'app/dashboard/projects/[id]/page.tsx',
  'app/dashboard/projects/[id]/apply/page.tsx',
  'app/dashboard/applications/page.tsx',
  'app/dashboard/messages/page.tsx',
  'app/dashboard/messages/[userId]/page.tsx',
  'app/dashboard/profile/page.tsx',

  'app/admin/layout.tsx',
  'app/admin/page.tsx',
  'app/admin/projects/page.tsx',
  'app/admin/projects/[id]/page.tsx',
  'app/admin/users/page.tsx',

  'app/(components)/ui/buttons/GoogleButton.tsx',
  'app/(components)/ui/buttons/SubmitButton.tsx',
  'app/(components)/ui/cards/ProjectCard.tsx',
  'app/(components)/ui/cards/StatsCard.tsx',
  'app/(components)/ui/forms/ProjectForm.tsx',
  'app/(components)/ui/forms/ApplicationForm.tsx',
  'app/(components)/ui/navigation/Navbar.tsx',
  'app/(components)/ui/navigation/Sidebar.tsx',
  'app/(components)/ui/navigation/Footer.tsx',
  'app/(components)/dashboard/ActivityFeed.tsx',
  'app/(components)/dashboard/ProjectsList.tsx',
  'app/(components)/dashboard/StatsOverview.tsx',
  'app/(components)/admin/ProjectsTable.tsx',
  'app/(components)/admin/UsersTable.tsx',

  'app/(hooks)/firebase/useAuth.ts',
  'app/(hooks)/firebase/useFirestore.ts',
  'app/(hooks)/firebase/useStorage.ts',
  'app/(hooks)/firebase/useMessaging.ts',
  'app/(hooks)/ui/useDialog.ts',
  'app/(hooks)/ui/useSnackbar.ts',
  'app/(hooks)/ui/useMediaQuery.ts',

  'app/(lib)/firebase/config.ts',
  'app/(lib)/firebase/auth.ts',
  'app/(lib)/firebase/db.ts',
  'app/(lib)/firebase/storage.ts',
  'app/(lib)/utils/dateFormat.ts',
  'app/(lib)/utils/validation.ts',
  'app/(lib)/utils/helpers.ts',

  'app/(types)/auth.ts',
  'app/(types)/project.ts',
  'app/(types)/user.ts',
  'app/(types)/message.ts'
]

async function createFiles() {
  for (const filePath of filePaths) {
    const absolutePath = path.resolve(__dirname, filePath)
    const directory = path.dirname(absolutePath)

    try {
      await fs.mkdir(directory, { recursive: true })

      try {
        await fs.access(absolutePath)
        console.log(`File exists: ${filePath}`)
      } catch (err) {
        if (err.code === 'ENOENT') {
          const content = generateTemplate(filePath)
          await fs.writeFile(absolutePath, content, 'utf8')
          console.log(`Created: ${filePath}`)
        }
      }
    } catch (err) {
      console.error(`Error with ${filePath}:`, err)
    }
  }
}

function generateTemplate(filePath) {
  const name = path.basename(filePath, path.extname(filePath))

  if (filePath.includes('/page.tsx')) {
    return generatePageTemplate(name, filePath)
  }

  if (filePath.includes('layout.tsx')) {
    return generateLayoutTemplate(filePath)
  }

  if (filePath.includes('/(components)/')) {
    return generateComponentTemplate(name)
  }

  if (filePath.includes('/(hooks)/')) {
    return generateHookTemplate(name)
  }

  if (filePath.includes('/(types)/')) {
    return generateTypeTemplate(name)
  }

  if (filePath.includes('theme.ts')) {
    return generateThemeTemplate()
  }

  if (filePath.includes('providers.tsx')) {
    return generateProvidersTemplate()
  }

  return generateUtilTemplate(name)
}

function generatePageTemplate(name, filePath) {
  const isClient =
    filePath.includes('/admin/') ||
    filePath.includes('/dashboard/') ||
    filePath.includes('/(auth)/')

  return `${isClient ? "'use client';\n\n" : ''}import { Container, Typography } from '@mui/material';

export default function ${toPascalCase(name)}Page() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        ${toTitleCase(name)}
      </Typography>
    </Container>
  );
}`
}

function generateLayoutTemplate(filePath) {
  const isRoot = !filePath.includes('/dashboard/') && !filePath.includes('/admin/')

  if (isRoot) {
    return `import { Providers } from './providers';

export const metadata = {
  title: 'Freelancer Platform',
  description: 'Connect with talented freelancers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}`
  }

  return `'use client';

import { Box } from '@mui/material';
import { Navbar } from '../(components)/ui/navigation/Navbar';
import { Sidebar } from '../(components)/ui/navigation/Sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}`
}

function generateComponentTemplate(name) {
  return `'use client';

import { Box } from '@mui/material';

export const ${toPascalCase(name)} = () => {
  return (
    <Box>
      {/* Component content */}
    </Box>
  );
};`
}

function generateHookTemplate(name) {
  return `'use client';

;

export const ${camelCase(name)} = () => {
  
  return {
    
  };
};`
}

function generateTypeTemplate(name) {
  return `export interface ${toPascalCase(name)} {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  
}

export type ${toPascalCase(name)}Input = Omit<${toPascalCase(name)}, 'id' | 'createdAt' | 'updatedAt'>;`
}

function generateThemeTemplate() {
  return `'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
}));`
}

function generateProvidersTemplate() {
  return `'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}`
}

function generateUtilTemplate(name) {
  return `

export const ${camelCase(name)} = () => {
  
};`
}

function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function camelCase(str) {
  const pascal = toPascalCase(str)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

function toTitleCase(str) {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

createFiles()
  .then(() => console.log('All files created successfully.'))
  .catch(err => console.error('An error occurred:', err))
