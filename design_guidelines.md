# SmartCastDemo iOS App - Design Guidelines

## Brand Identity

**Purpose**: Professional portfolio piece demonstrating native iOS video streaming, AirPlay, and OTT-style playback capabilities.

**Aesthetic Direction**: **Cinematic/Editorial** - Dark, content-first design with dramatic contrast and refined typography. Think premium streaming service meets Apple's refined minimalism. The memorable element is the BOLD content presentation with subtle glass-morphism effects that feel premium without being distracting.

**Differentiation**: Sophisticated dark UI with frosted glass overlays, smooth transitions between states, and emphasis on video content as the hero element.

---

## Navigation Architecture

**Root Navigation**: Stack-Only (single feature: video browsing and playback)

### Screens
1. **Video Library** - Browse available videos in table view
2. **Video Player** - Full-screen playback with controls
3. **Settings** - App preferences and device options

---

## Screen-by-Screen Specifications

### 1. Video Library (Home)
**Purpose**: Browse and select videos for playback

**Layout**:
- Header: Custom transparent header
  - Left: Settings icon button
  - Title: "SmartCast" (large title, scrolls away)
  - Right: AirPlay button (system icon)
  - No search bar
- Main content: Scrollable table view (UITableView)
- Top inset: headerHeight + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Components**:
- Video cells: Full-width cards with thumbnail, title, duration, description preview
- Loading state with skeleton cards
- Empty state with illustration if no videos available
- Pull-to-refresh for reloading video list

**Video Cell Design**:
- Thumbnail: 16:9 aspect ratio image
- Overlay gradient on thumbnail (bottom fade for title readability)
- Title: Bold, white text overlaid on thumbnail
- Duration badge: Top-right corner of thumbnail
- Metadata: Below thumbnail (upload date, resolution)
- Chevron indicator on right side

### 2. Video Player
**Purpose**: Full-screen video playback with AirPlay and PiP support

**Layout**:
- Custom full-screen player (AVPlayerViewController)
- Auto-hiding controls overlay
- Status bar hidden during playback
- Safe area ignored for immersive experience

**Components**:
- Standard iOS player controls (play/pause, scrubber, volume)
- AirPlay button in control overlay
- PiP button in control overlay
- Back button (top-left, appears on tap)
- Frosted glass background for control overlays

### 3. Settings
**Purpose**: App preferences and playback options

**Layout**:
- Header: Default navigation header
  - Title: "Settings"
  - Left: Back button (automatic)
- Main content: Scrollable form/grouped list
- Top inset: Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Components**:
- Grouped sections:
  - Playback (Auto-play next, Quality preference)
  - Display (Theme: Dark only for demo)
  - About (Version, GitHub link)

---

## Color Palette

**Dark Theme** (primary theme):
- **Background**: #0A0A0A (near-black)
- **Surface**: #1C1C1E (elevated cards/cells)
- **Surface Elevated**: #2C2C2E (frosted glass overlay)
- **Primary Accent**: #FF6B35 (vibrant coral-orange for CTAs, duration badges)
- **Secondary Accent**: #FFB84D (warm amber for active states)
- **Text Primary**: #FFFFFF
- **Text Secondary**: #98989F (subtle gray for metadata)
- **Text Tertiary**: #636366 (placeholder text)
- **Divider**: #38383A (subtle separators)
- **Overlay**: rgba(0, 0, 0, 0.75) (for video controls background)

---

## Typography

**System Font** (SF Pro for native iOS feel):
- **Large Title**: 34pt, Bold (SF Pro Display)
- **Title 1**: 28pt, Bold (screen headers)
- **Title 2**: 22pt, Semibold (video card titles)
- **Headline**: 17pt, Semibold (section headers)
- **Body**: 17pt, Regular (descriptions)
- **Subheadline**: 15pt, Regular (metadata)
- **Caption**: 12pt, Medium (duration badges, timestamps)

---

## Visual Design

**Touchable Feedback**:
- Table cells: Scale down 0.98 on press + subtle highlight overlay
- Icon buttons: Opacity 0.6 on press
- Primary buttons: Slight scale (0.95) + glow effect on press

**Floating Elements**:
- Frosted glass effect using UIBlurEffect (systemMaterialDark)
- Subtle shadow on floating buttons:
  - shadowOffset: {width: 0, height: 2}
  - shadowOpacity: 0.10
  - shadowRadius: 2

**Cards/Cells**:
- Corner radius: 12px for video cards
- No drop shadow (rely on surface color contrast)
- Dividers: 1px hairline between cells

---

## Assets to Generate

### Required Assets:
1. **icon.png** - App icon featuring stylized play button in coral-orange gradient on dark background - USED: Device home screen
2. **splash-icon.png** - Simplified icon variant for launch screen - USED: App launch
3. **empty-library.png** - Minimal illustration of empty video reel or film slate - USED: Video Library screen when no videos available
4. **placeholder-thumbnail.png** - Dark gradient placeholder for video thumbnails during load - USED: Video cells while thumbnails download

### Recommended Assets:
5. **onboarding-hero.png** - Cinematic illustration showing video streaming concept - USED: Optional first-launch screen
6. **settings-about.png** - Small decorative icon for About section - USED: Settings screen header

**Asset Style**: Minimal, geometric illustrations with coral-orange accents on dark backgrounds. Avoid photorealistic or clipart styles.

---

## Implementation Notes

- Respect iOS safe areas for all screens except fullscreen player
- Use native UIKit components where possible (UITableView, AVPlayerViewController)
- Implement smooth transitions between library and player (push animation with cross-fade)
- Handle loading/error states gracefully with inline messaging
- AirPlay button should auto-appear when AirPlay devices detected