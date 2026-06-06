# RetractLab - Premium Lighter Case Designer

**RetractLab** is an interactive web application for designing and customizing premium retractable lighter cases with AI-powered logo generation.

## 🎨 Features

### Interactive 3D Preview
- Real-time visualization of lighter case customizations
- Smooth animations and realistic gradients
- Responsive design preview

### Color Customization
- 6 premium color options:
  - Neon Orange (Turuncu)
  - Lime Green (Yeşil Neon)
  - Fuchsia Pink (Asi Pembe)
  - Cyan Blue (Buz Mavisi)
  - Night Black (Gece Siyahı)
  - Pure White (Mat Beyaz)

### Texture Patterns
- Smooth Matte (Düz Premium Mat)
- Street Art Splash (Sokak Sanatı Splash)
- Marble Vein (Mermer Damar)
- Carbon Fiber (Karbon Fiber)

### Pre-designed Logo Collection
- Cheerful Smiley (Asi Smiley)
- Football Splash (Futbol Splash)
- Neon Abstract (Neon Soyut)
- Japanese Wave (Japon Dalga)

### AI Logo Generation
- Google Gemini Imagen 4.0 integration
- Generate custom emblems from text prompts
- Auto-optimized for circular badge designs

### E-commerce Integration
- Shopping cart system
- Order management
- Customer information collection
- Real-time price calculation

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Tailwind CSS
- **Styling**: Custom CSS with animations and gradients
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Cabinet Grotesk, Plus Jakarta Sans (Google Fonts)
- **JavaScript**: Vanilla ES6+
- **AI Integration**: Google Gemini Imagen 4.0 API

## 📦 Project Structure

```
retractlab/
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS styles and animations
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/onurakdaq7oa-wq/cakmaklik.git
cd cakmaklik
```

2. Open `index.html` in your web browser:
```bash
open index.html
# or
start index.html
```

### Configuration

To enable AI logo generation, add your Google Gemini API key:

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. In `script.js`, line 133, replace the empty string:
```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

## 🎯 Usage

1. **Select Color**: Click on any of the 6 color buttons
2. **Choose Texture**: Pick a texture pattern (matte, splash, marble, or carbon)
3. **Select Logo**: Choose from pre-designed logos or upload custom ones
4. **Generate AI Logo**: Enter a prompt and let AI create a unique design
5. **Set Quantity**: Adjust the quantity using +/- buttons
6. **Add to Cart**: Click "Tasarımla Siparişi Başlat" to add to cart
7. **Checkout**: Fill in your details and confirm the order

## 💡 Features Explained

### Real-time Preview
Every design change updates the 3D preview instantly with smooth animations.

### Smart Text Rendering
The case text automatically adjusts color and blend mode based on the selected case color for optimal readability.

### Glow Effects
Studio glow effect changes dynamically based on the selected color, enhancing the premium feel.

### Responsive Layout
- Desktop: Side-by-side layout with sticky preview
- Tablet/Mobile: Stacked layout with adaptive sizing

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 State Management

The application maintains a `designState` object that tracks:
```javascript
{
  colorId,        // Color identifier
  colorClass,     // Tailwind CSS class
  colorName,      // Display name
  textureId,      // Texture pattern
  textureName,    // Texture display name
  logoUrl,        // Logo image URL
  logoName,       // Logo display name
  text            // Case text
}
```

Cart items store design state + quantity and price for checkout.

## 🎬 Animations

- **Shimmer**: Loading animation during AI generation
- **Hover Scale**: Preview case scales on hover
- **Smooth Transitions**: All color and texture changes animate smoothly
- **Toast Notification**: Quick feedback when items are added to cart

## 📝 Customization

### Adding New Colors
1. Add button in color section with `updateColor()` call
2. Provide: colorId, Tailwind class, display name, case text

### Adding New Textures
1. Add texture gradient to `textures` object in `script.js`
2. Add button with `updateTexture()` call

### Adding New Pre-designed Logos
1. Add button in logo section with `updateLogo()` call
2. Provide: image URL and display name

## 🔐 API Integration

### Google Gemini Imagen 4.0
The AI logo generation uses:
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict`
- Retry mechanism: 5 attempts with exponential backoff
- Prompt enrichment: Automatically formats prompts for optimal badge design

## 📄 License

© 2026 RetractLab Özel Tasarım Atölyesi. All rights reserved.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For issues, questions, or feedback, please open an issue on the GitHub repository.

---

**RetractLab** - Where Premium Meets Customization ✨