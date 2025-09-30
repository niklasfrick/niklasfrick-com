# Company Logo Feature

This feature automatically generates and displays company logos for work experience entries in your portfolio.

## Overview

The company logo system provides three levels of logo support:

1. **Custom logos** - You can provide specific logo URLs
2. **Real company logos** - Automatically fetched from Clearbit's Logo API
3. **Generated logos** - Beautiful fallback logos created from company initials

## How It Works

### 1. Logo Priority System

When displaying a company logo, the system follows this priority:

1. **Local logo file** (from public/logos/ folder)
2. **External logo URL** (if provided in data)
3. **Generated logo** (created from company initials)

### 2. Logo Generation

Generated logos use:

- **Company initials** (first 2 letters of company name)
- **Consistent gray background** with white text
- **Professional styling** (via DiceBear API)

### 3. Color Consistency

All generated logos use a consistent gray background with white text, ensuring they work perfectly with both dark and light modes.

## Usage

### Adding Work Experience with Logos

```typescript
// In app/data.ts
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Google',
    title: 'Senior Software Engineer',
    start: '2023',
    end: 'Aktuell',
    link: 'https://google.com',
    id: 'work1',
    logo: '/logos/google.png', // Local logo file
  },
  {
    company: 'My Startup',
    title: 'Founder',
    start: '2022',
    end: '2023',
    link: 'https://mystartup.com',
    id: 'work2',
    logo: '/logos/mystartup.png', // Local logo file
  },
  {
    company: 'Another Company',
    title: 'Developer',
    start: '2021',
    end: '2022',
    link: 'https://example.com',
    id: 'work3',
    // No logo field - will use generated initials logo
  },
]
```

### Setting Up Company Logos

#### Download Pre-made Logos

```bash
node scripts/setup-company-logos.js
```

This script will:

- Download logos for popular companies (Google, Microsoft, Apple, etc.)
- Save them to `public/logos/` folder
- Provide usage instructions

#### Using the Interactive Script

```bash
node scripts/add-work-experience.js
```

This script will:

- Ask for company details
- Generate a work experience entry
- Show the generated logo URL
- Provide instructions for adding to your data

## Technical Details

### API Endpoints Used

- **Clearbit Logo API**: `https://logo.clearbit.com/{company}.com`
- **DiceBear API**: `https://api.dicebear.com/7.x/initials/svg`

### Color Scheme

The system uses a consistent color scheme:

- **Background**: Light Zinc (`#a1a1aa`) - subtle and less prominent
- **Text**: White (`#ffffff`) - provides excellent contrast

### Component Structure

- `CompanyLogo` component handles logo display and fallbacks
- `generateCompanyLogo()` utility creates fallback logos
- `getCompanyLogo()` utility attempts to fetch real logos

## Customization

### Customizing Colors

To change the logo colors, modify the color values in `lib/utils.ts`:

```typescript
const backgroundColor = 'a1a1aa' // Zinc-400
const textColor = 'ffffff' // White
```

### Changing Logo Size

Modify the `size` prop when using the `CompanyLogo` component:

```tsx
<CompanyLogo
  companyName="Google"
  size={64} // Larger logo
/>
```

### Custom Logo Styling

The generated logos use DiceBear's initials style. You can customize the API parameters in `generateCompanyLogo()`:

```typescript
return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=${color}&textColor=ffffff&size=64&fontSize=28&fontWeight=700`
```

## Troubleshooting

### Logo Not Loading

If logos aren't loading:

1. Check your internet connection
2. Verify the company name is spelled correctly
3. The system will automatically fall back to generated logos

### Custom Logo Issues

If custom logos aren't displaying:

1. Verify the URL is accessible
2. Ensure the image format is supported (PNG, JPG, SVG)
3. Check that the URL doesn't require authentication

### Performance

- Generated logos are cached by the browser
- Real logo fetching is done asynchronously
- Fallback logos are generated instantly

## Examples

### Real Company Logos

- Google, Microsoft, Apple, etc. will fetch real logos
- Smaller companies may fall back to generated logos

### Generated Logo Examples

- "Acme Corp" → "AC" in gray with white text
- "Tech Solutions Inc" → "TS" in gray with white text
- "Freelance" → "FR" in gray with white text

## Future Enhancements

Potential improvements:

- Logo caching system
- More logo generation styles
- Company logo database integration
- Logo optimization and compression
