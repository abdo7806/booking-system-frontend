import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  
  palette: {
    primary: {
      main: '#4e79a7', // اللون الأساسي
    },
    secondary: {
      main: '#e15759', // اللون الثانوي
    },
    background: {
      default: '#f5f7fa', // لون الخلفية العام
      paper: '#ffffff',   // لون الخلفية للأوراق/البطاقات
    },
    sidebar: {
      background: '#1f2d37', // لون خلفية الشريط الجانبي
      text: '#ffffff', // لون النص الأساسي في الشريط الجانبي
      secondaryText: '#b0bec5', // لون النص الثانوي
      hoverBg: 'rgba(255, 255, 255, 0.08)', // لون خلفية العنصر عند التحويم
      activeBg: 'rgba(255, 107, 129, 0.15)', // لون خلفية العنصر النشط
      divider: '#3e5668', // لون الخط الفاصل
      footerBg: '#1a252f', // لون خلفية قسم التذييل
      scrollTrack: '#1f2d37', // لون مسار التمرير
      scrollThumb: '#3e5668' // لون شريط التمرير
    }
  },
  typography: {
    fontFamily: [
      'Tajawal',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 700,
      fontSize: '1.8rem',
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px', // ضبط المسافة بين الأيقونة والنص
        }
      }
    }
  },
  // إعدادات إضافية للشريط الجانبي
  drawerWidth: 240, // عرض الشريط الجانبي
});

export default theme;