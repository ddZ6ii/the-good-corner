/* -------------------------------------------------------------------------- */
/*                              Design Guide                                  */
/* -------------------------------------------------------------------------- */
export const theme = {
  borderRadius: {
    rounded_sm: '1px',
    rounded: '2px',
    rounded_md: '4px',
    rounded_lg: '8px',
    pill: '9999px',
  },
  color: {
    white: '#ffffff',
    primary: {
      main: '#ffa41b',
      dark: '#e69418',
      light: '#ffad31',
    },
    secondary: {
      main: '#005fcc',
      dark: '#0056b8',
      light: '#1a6fd1',
    },
    status: {
      success: '#00C851',
      warning: '#ffbb33',
      danger: '#c00504',
    },
    neutral: {
      lightest: '#D3D3D3',
      light: '#666',
      dark: '#3f3f3f',
      darkest: '#2A2A2A',
    },
    pills: [
      '#f4cce3',
      '#d6ccc8',
      '#dacfed',
      '#fff3d1',
      '#d0e7b6',
      '#99edcd',
      '#cfd8dc',
    ],
  },
  shadow: {
    base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '-8px 8px 20px 0px rgba(0, 0, 0, 0.2)',
  },
}

export function mapColor(index: number): string {
  return theme.color.pills[index % theme.color.pills.length]
}
