# Mobile & Tablet Testing Guide

This guide helps you test the mobile responsiveness of your resume site across different devices.

## Device Breakpoints

The site is optimized for these device sizes:

| Device Type | Breakpoint | Examples |
|------------|------------|----------|
| **Desktop** | > 1024px | Standard monitors |
| **Tablet Landscape** | ≤ 1024px | iPad Pro landscape, iPad Air landscape |
| **Tablet Portrait** | ≤ 768px | iPad portrait, iPad Mini |
| **Mobile Landscape** | ≤ 640px | Phones in landscape mode |
| **Mobile Portrait** | ≤ 480px | iPhone, Android phones |
| **Extra Small** | ≤ 360px | Older/smaller phones |

## How to Test Mobile Responsiveness

### Method 1: Browser DevTools (Easiest)

#### Chrome/Edge:
1. Open your site in the browser
2. Press `F12` or `Right-click → Inspect`
3. Click the device toggle icon (📱) or press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)
4. Select different devices from the dropdown:
   - **iPhone SE** (375x667) - Small phone
   - **iPhone 12/13/14** (390x844) - Modern iPhone
   - **iPhone 14 Pro Max** (430x932) - Large iPhone
   - **iPad Mini** (768x1024) - Tablet portrait
   - **iPad Air** (820x1180) - Tablet portrait
   - **iPad Pro** (1024x1366) - Large tablet
5. Test both portrait and landscape orientations

#### Firefox:
1. Press `F12` or `Right-click → Inspect`
2. Click the Responsive Design Mode icon (📱) or press `Ctrl+Shift+M`
3. Choose preset devices or custom dimensions

#### Safari (Mac):
1. Enable Developer menu: `Safari → Settings → Advanced → Show Develop menu`
2. Open your site
3. Click `Develop → Enter Responsive Design Mode`
4. Test different iOS devices

### Method 2: Real Device Testing (Most Accurate)

#### For Local Testing:
1. Find your computer's local IP address:
   - **Mac/Linux**: Run `ifconfig | grep inet` in terminal
   - **Windows**: Run `ipconfig` in command prompt
   - Look for something like `192.168.1.xxx`

2. If using Azure Static Web Apps, use your deployed URL

3. On your phone/tablet:
   - Connect to the same WiFi network
   - Open browser and visit your site URL

#### iOS Devices (iPhone/iPad):
- Safari is the primary browser
- Test in both portrait and landscape
- Check that buttons are easy to tap (44x44px minimum)

#### Android Devices:
- Test in Chrome and Samsung Internet
- Check various screen sizes

### Method 3: Online Testing Tools

Free tools to test multiple devices:

1. **Responsive Design Checker**
   - Visit: https://responsivedesignchecker.com
   - Enter your site URL
   - Test various devices

2. **BrowserStack** (Free trial)
   - Visit: https://www.browserstack.com
   - Test on real devices in the cloud

3. **Google Mobile-Friendly Test**
   - Visit: https://search.google.com/test/mobile-friendly
   - Enter your URL
   - Get Google's mobile-friendliness report

## What to Check

### ✅ Visual Checklist

- [ ] **Navigation**: Easy to tap, not overlapping
- [ ] **Hero Title**: Readable size, not too big or small
- [ ] **Visitor Badge**: Displays properly, not blocking content
- [ ] **Skills Cards**: Stack vertically on mobile, look good
- [ ] **Experience Section**: Company logos centered on mobile
- [ ] **Contact Links**: Easy to tap (44x44px minimum)
- [ ] **Certifications**: Images sized appropriately
- [ ] **Text**: All text is readable without zooming
- [ ] **Spacing**: Content not cramped or too spread out
- [ ] **Images**: Load properly and are appropriately sized
- [ ] **Scrolling**: Smooth vertical scrolling
- [ ] **No Horizontal Scroll**: Content fits screen width

### ⚡ Performance Checklist

- [ ] **Load Time**: Site loads quickly on mobile network
- [ ] **Animations**: Smooth, not janky
- [ ] **Touch Targets**: All buttons/links easy to tap
- [ ] **Font Readability**: Text is clear and legible

### 🔍 Functionality Checklist

- [ ] **Email Link**: Opens mail app
- [ ] **LinkedIn Link**: Opens in browser/app
- [ ] **GitHub Link**: Opens in browser/app
- [ ] **Visitor Counter**: Loads and displays correctly
- [ ] **Navigation Links**: Work properly (when blog is added)

## Common Issues & Fixes

### Issue: Text too small on mobile
**Fix**: Check the media query at @media (max-width: 480px) - font sizes are optimized

### Issue: Buttons hard to tap
**Fix**: Contact items have `min-height: 44px` for proper touch targets

### Issue: Images too large on mobile
**Fix**: Company logos automatically resize: 80px on phones, 100px on tablets

### Issue: Horizontal scrolling
**Fix**: All containers use `max-width` and proper padding

### Issue: Navigation too cramped
**Fix**: Navigation stacks vertically on mobile with proper spacing

## Mobile-Specific Features

### Features Optimized for Mobile:
✅ **Touch-friendly buttons** - Minimum 44x44px touch targets
✅ **Reduced animations** - Lighter shadows for better performance
✅ **Optimized images** - Smaller certification badges on mobile
✅ **Readable typography** - Font sizes scale appropriately
✅ **Proper spacing** - Padding adjusted for smaller screens
✅ **Vertical layout** - Content stacks naturally on narrow screens

## Quick Test Commands

If you need to test your local development server:

```bash
# Check your local IP
# Mac/Linux:
hostname -I

# Windows:
ipconfig
```

Then visit `http://YOUR_IP:PORT` on your mobile device.

## Recommended Testing Flow

1. **Desktop First**: Test at 1920x1080 (standard desktop)
2. **Tablet**: Test iPad (768x1024) portrait
3. **Modern Phone**: Test iPhone 12/13 (390x844)
4. **Small Phone**: Test iPhone SE (375x667)
5. **Landscape**: Test phone in landscape mode
6. **Real Device**: Test on at least one real phone/tablet

## Notes

- The site uses a mobile-first responsive design approach
- All interactive elements meet accessibility standards (WCAG 2.1)
- Touch targets are optimized for iOS Human Interface Guidelines (44x44px minimum)
- The comic book theme is preserved across all device sizes
