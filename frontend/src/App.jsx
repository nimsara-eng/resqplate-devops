/**
 * ResQPlate - Surplus Food Rescue & Community Distribution Platform
 * Plain React (JSX) implementation for student projects.
 * No extra libraries required. Uses pure React and standard CSS.
 */

import { useState, useMemo } from 'react';
import './App.css';

// Local High-Resolution Food Assets
import heroPizzaImg from './assets/Pizza-3007395.jpg';
import sourdoughImg from './assets/sourdough-bread.jpg';
import pastriesImg from './assets/french-pastries.jpg';
import harvestBowlsImg from './assets/harvest-bowls.jpg';
import cateringPlattersImg from './assets/catering-platters.jpg';

// Initial Sample Listings for Demonstration
const INITIAL_LISTINGS = [
  {
    id: 'resq-01',
    title: 'Artisanal Margherita & Garden Veggie Pizzas',
    provider: 'Stone & Hearth Oven Co.',
    providerType: 'Restaurant',
    category: 'Prepared Meals',
    quantity: '6 whole 12" pies (approx. 24 generous portions)',
    location: '412 West Elm Street',
    neighborhood: 'Downtown Core',
    distance: '0.6 miles away',
    deadline: 'Today by 6:30 PM (Kitchen closing)',
    isUrgent: true,
    image: heroPizzaImg,
    storageCondition: 'Kept hot in commercial warming cabinets; ready for thermal container pickup.',
    pickupInstructions: 'Enter through the side staff entrance on Elm Alley. Ask for Marco or kitchen shift lead.',
    allergens: ['Dairy (Mozzarella)', 'Wheat/Gluten'],
    servingsEstimate: 24,
  },
  {
    id: 'resq-02',
    title: 'Morning Sourdough Batards & Country Baguettes',
    provider: 'Heritage Grain Bakehouse',
    providerType: 'Bakery',
    category: 'Bakery',
    quantity: '14 crusty sourdough loaves & 10 French baguettes',
    location: '88 Artisan Way',
    neighborhood: 'Riverside Arts Quarter',
    distance: '1.2 miles away',
    deadline: 'Today by 7:15 PM',
    isUrgent: false,
    image: sourdoughImg,
    storageCondition: 'Baked fresh today at 5:00 AM. Stored dry in bakery parchment bags.',
    pickupInstructions: 'Front counter pickup. Inform the barista you are collecting for community food pantry.',
    allergens: ['Wheat/Gluten (Organic stone-ground flours)'],
    servingsEstimate: 36,
  },
  {
    id: 'resq-03',
    title: 'Viennoiserie Assortment: Croissants & Pain au Chocolat',
    provider: 'Café Lumière Pastry Bar',
    providerType: 'Cafe',
    category: 'Bakery',
    quantity: '22 individually baked golden pastries',
    location: '204 University Blvd',
    neighborhood: 'North Campus',
    distance: '0.9 miles away',
    deadline: 'Today by 5:45 PM',
    isUrgent: true,
    image: pastriesImg,
    storageCondition: 'Boxed in bakery cartons with wax liners, room temperature.',
    pickupInstructions: 'Drive-through window or front counter. Display ResQPlate reservation pass.',
    allergens: ['Butter/Dairy', 'Eggs', 'Wheat/Gluten', 'Traces of Almonds'],
    servingsEstimate: 22,
  },
  {
    id: 'resq-04',
    title: 'Roasted Harvest Grain & Sweet Potato Bowls',
    provider: 'The Green Fork Eatery',
    providerType: 'Restaurant',
    category: 'Prepared Meals',
    quantity: '12 eco-friendly meal boxes (Quinoa, roasted greens, tahini)',
    location: '1540 Market Square',
    neighborhood: 'Downtown Core',
    distance: '0.4 miles away',
    deadline: 'Today by 8:00 PM',
    isUrgent: false,
    image: harvestBowlsImg,
    storageCondition: 'Refrigerated at 3.5°C in tamper-evident sealed compostable containers.',
    pickupInstructions: 'Pick up at the delivery staging counter near the rear parking lot.',
    allergens: ['Sesame (Tahini)', 'Vegan', 'Gluten-Free'],
    servingsEstimate: 12,
  },
  {
    id: 'resq-05',
    title: 'Mediterranean Mezze & Falafel Catering Platters',
    provider: 'Cedar & Olive Event Catering',
    providerType: 'Catering',
    category: 'Produce & Platters',
    quantity: '4 large stainless hotel pans (Hummus, tabbouleh, baked falafel)',
    location: '720 Summit Center Way',
    neighborhood: 'Greenwood District',
    distance: '2.1 miles away',
    deadline: 'Today by 6:00 PM (Strict loading dock window)',
    isUrgent: true,
    image: cateringPlattersImg,
    storageCondition: 'Chilled catering pans held in insulated transport carriers.',
    pickupInstructions: 'Loading Dock C. Security will check vehicle or collector ID.',
    allergens: ['Sesame', 'Legumes (Chickpeas)', 'Dairy-free'],
    servingsEstimate: 40,
  },
];

export default function App() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [urgentOnly, setUrgentOnly] = useState(false);

  // Modal States
  const [selectedListing, setSelectedListing] = useState(null);
  const [reservationSuccessCode, setReservationSuccessCode] = useState(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [howItWorksTab, setHowItWorksTab] = useState('collectors');

  // Intake Form
  const [newTitle, setNewTitle] = useState('');
  const [newProvider, setNewProvider] = useState('');
  const [newCategory, setNewCategory] = useState('Prepared Meals');
  const [newQuantity, setNewQuantity] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('Downtown Core');
  const [newDeadline, setNewDeadline] = useState('Today by 7:30 PM');
  const [newInstructions, setNewInstructions] = useState('');

  // Search and Filter computation
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.provider.toLowerCase().includes(q) ||
        item.neighborhood.toLowerCase().includes(q) ||
        item.allergens.some((a) => a.toLowerCase().includes(q));

      const matchesNeighborhood =
        selectedNeighborhood === 'All' || item.neighborhood === selectedNeighborhood;

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesUrgency = !urgentOnly || item.isUrgent;

      return matchesSearch && matchesNeighborhood && matchesCategory && matchesUrgency;
    });
  }, [listings, searchQuery, selectedNeighborhood, selectedCategory, urgentOnly]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedNeighborhood('All');
    setSelectedCategory('All');
    setUrgentOnly(false);
  };

  const handleReserve = (item) => {
    const randomCode = `RESQ-${Math.floor(1000 + Math.random() * 9000)}-${item.id.slice(-2).toUpperCase()}`;
    setReservationSuccessCode(randomCode);
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProvider.trim()) return;

    const newEntry = {
      id: `resq-${Date.now()}`,
      title: newTitle.trim(),
      provider: newProvider.trim(),
      providerType: 'Restaurant',
      category: newCategory,
      quantity: newQuantity || '10 fresh prepared portions',
      location: newLocation || '100 Main Street',
      neighborhood: newNeighborhood,
      distance: '0.5 miles away',
      deadline: newDeadline,
      isUrgent: true,
      image: newCategory === 'Bakery' ? sourdoughImg : heroPizzaImg,
      storageCondition: 'Standard food-safe thermal packaging, ready for collection.',
      pickupInstructions: newInstructions || 'Front desk check-in. Present ResQPlate confirmation.',
      allergens: ['Standard commercial kitchen handling'],
      servingsEstimate: 10,
    };

    setListings([newEntry, ...listings]);
    setIsProviderModalOpen(false);
    setNewTitle('');
    setNewProvider('');
    setNewQuantity('');
    setNewLocation('');
    setNewInstructions('');
  };

  return (
    <div className="resq-app">
      {/* 1. Header Navigation */}
      <header className="resq-header" role="banner">
        <div className="resq-container resq-header-inner">
          <a href="#" className="resq-brand" aria-label="ResQPlate Home">
            <span className="resq-brand-icon" aria-hidden="true">🌱</span>
            <span>ResQPlate</span>
          </a>

          <nav className="resq-nav" aria-label="Main Navigation">
            <a href="#find-food" className="resq-nav-link">Find Food</a>
            <a href="#how-it-works" className="resq-nav-link">How It Works</a>
            <a href="#safety-standards" className="resq-nav-link">Safety Standards</a>
            <a href="#community-impact" className="resq-nav-link">Impact</a>
            <a href="#provider-hub" className="resq-nav-link">For Food Providers</a>
          </nav>

          <div className="resq-header-actions">
            <button
              type="button"
              className="resq-btn-ghost"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Log In
            </button>
            <button
              type="button"
              className="resq-btn-primary"
              onClick={() => setIsProviderModalOpen(true)}
            >
              Offer Surplus Food
            </button>
            <button
              type="button"
              className="resq-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="resq-mobile-menu" aria-label="Mobile Navigation">
            <a href="#find-food" className="resq-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Find Food</a>
            <a href="#how-it-works" className="resq-nav-link" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#safety-standards" className="resq-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Safety Standards</a>
            <a href="#community-impact" className="resq-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Impact</a>
            <a href="#provider-hub" className="resq-nav-link" onClick={() => setIsMobileMenuOpen(false)}>For Food Providers</a>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                className="resq-btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
              >
                Log In
              </button>
              <button
                type="button"
                className="resq-btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProviderModalOpen(true);
                }}
              >
                Offer Food
              </button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="resq-hero" aria-labelledby="hero-heading">
          <div className="resq-container">
            <div className="resq-hero-grid">
              <div className="resq-hero-content">
                <div className="resq-editorial-tag">
                  <span aria-hidden="true" />
                  Direct Community Food Rescue
                </div>
                <h1 id="hero-heading" className="resq-hero-title">
                  Good food belongs on tables, not in waste bins.
                </h1>
                <p className="resq-hero-desc">
                  ResQPlate connects local bakeries, restaurants, and event kitchens with registered community organizations and neighbors for timely, organized surplus food pickup.
                </p>

                <div className="resq-hero-trust">
                  <div className="resq-hero-trust-item">
                    <span>🛡️ Free Community Pickup</span>
                  </div>
                  <div className="resq-hero-trust-item">
                    <span>🏢 Verified Kitchen Donors</span>
                  </div>
                  <div className="resq-hero-trust-item">
                    <span>🤝 Zero Delivery Fees</span>
                  </div>
                </div>

                <div className="resq-hero-actions">
                  <a href="#find-food" className="resq-btn-saffron">
                    Browse Today's Surplus
                  </a>
                  <button
                    type="button"
                    className="resq-btn-outline"
                    onClick={() => setIsProviderModalOpen(true)}
                  >
                    List Surplus from Your Kitchen
                  </button>
                </div>
              </div>

              <div className="resq-hero-media-wrapper">
                <div className="resq-hero-media-card">
                  <img
                    src={heroPizzaImg}
                    alt="Freshly baked artisanal margherita pizzas in boxes ready for community pickup"
                    className="resq-hero-img"
                  />
                  <div className="resq-hero-media-caption">
                    <div>
                      <div className="resq-hero-media-title">
                        Stone & Hearth Oven Co. · Downtown
                      </div>
                      <div className="resq-hero-media-sub">
                        6 Artisanal Pizzas prepped for community collection
                      </div>
                    </div>
                    <span className="resq-hero-prototype-badge">
                      Illustrative Listing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Search and Filtering */}
        <section id="find-food" className="resq-search-section">
          <div className="resq-container">
            <div className="resq-search-card">
              <div className="resq-search-row">
                <div className="resq-input-group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by food name (e.g., pizza, sourdough, meals)..."
                    className="resq-input"
                    style={{ paddingLeft: '16px' }}
                  />
                </div>

                <div className="resq-input-group">
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="resq-select"
                    style={{ paddingLeft: '16px' }}
                  >
                    <option value="All">All Pickup Neighborhoods</option>
                    <option value="Downtown Core">Downtown Core</option>
                    <option value="Riverside Arts Quarter">Riverside Arts Quarter</option>
                    <option value="North Campus">North Campus</option>
                    <option value="Greenwood District">Greenwood District</option>
                  </select>
                </div>

                <button
                  type="button"
                  className={`resq-tab-btn ${urgentOnly ? 'active' : ''}`}
                  onClick={() => setUrgentOnly(!urgentOnly)}
                  style={{ height: '48px', padding: '0 18px' }}
                >
                  {urgentOnly ? '✓ Pickup Within 2 Hrs' : 'Expiring Soon'}
                </button>
              </div>

              <div className="resq-filter-tabs">
                <span className="resq-filter-label">Food Category:</span>
                {['All', 'Prepared Meals', 'Bakery', 'Produce & Platters'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`resq-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'All' ? 'All Categories' : cat}
                  </button>
                ))}

                {(searchQuery || selectedNeighborhood !== 'All' || selectedCategory !== 'All' || urgentOnly) && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="resq-clear-btn"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>

            <div className="resq-results-meta">
              <span>
                Showing <strong className="resq-results-count">{filteredListings.length}</strong> available rescue packages
              </span>
              <span className="resq-results-sample-tag">
                Note: Listings are realistic prototype data for demonstration
              </span>
            </div>
          </div>
        </section>

        {/* 4. Available Food Cards */}
        <section className="resq-listings-section">
          <div className="resq-container">
            {filteredListings.length === 0 ? (
              <div className="resq-empty-state">
                <h3 className="resq-empty-title">No matching surplus listings found</h3>
                <p className="resq-empty-desc">
                  Try clearing your search keyword or switching your pickup neighborhood to see available community donations.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="resq-btn-outline"
                >
                  View All Available Food
                </button>
              </div>
            ) : (
              <div className="resq-listings-grid">
                {filteredListings.map((item) => (
                  <article key={item.id} className="resq-card">
                    <div className="resq-card-image-wrap">
                      <img
                        src={item.image}
                        alt={`${item.title} offered by ${item.provider}`}
                        className="resq-card-img"
                        loading="lazy"
                      />
                      <div className={`resq-card-urgency-banner ${item.isUrgent ? 'urgent' : ''}`}>
                        <span>{item.isUrgent ? '⏰ Closing Soon' : '✓ Ready for Pickup'}</span>
                      </div>
                      <div className="resq-card-category-indicator">
                        {item.category}
                      </div>
                    </div>

                    <div className="resq-card-body">
                      <div className="resq-card-provider-row">
                        <span className="resq-card-provider-name">{item.provider}</span>
                        <span>{item.distance}</span>
                      </div>

                      <h2 className="resq-card-title">{item.title}</h2>

                      <div className="resq-card-meta-list">
                        <div className="resq-card-meta-item">
                          <span>📍 {item.location} · {item.neighborhood}</span>
                        </div>
                        <div className="resq-card-meta-item">
                          <span>⏰ Deadline: {item.deadline}</span>
                        </div>
                        <div className="resq-card-meta-item">
                          <span>📦 {item.quantity}</span>
                        </div>
                      </div>

                      <div className="resq-card-footer">
                        <div className="resq-card-quantity">
                          Est. ~{item.servingsEstimate} meals saved
                        </div>
                        <button
                          type="button"
                          className="resq-card-btn"
                          onClick={() => {
                            setSelectedListing(item);
                            setReservationSuccessCode(null);
                          }}
                        >
                          View Pickup Details
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. How It Works */}
        <section id="how-it-works" className="resq-how-section">
          <div className="resq-container">
            <div className="resq-section-header">
              <span className="resq-section-kicker">Simple 3-Step Pickup Model</span>
              <h2 className="resq-section-title">
                Direct pickup and handover. No middlemen or delivery waste.
              </h2>
              <p className="resq-section-desc">
                ResQPlate is a community-powered logistics bridge. We empower local food businesses to publish safe surplus portions so nearby charities and individuals can collect them directly.
              </p>

              <div style={{ display: 'inline-flex', gap: '8px', marginTop: '20px', background: 'rgba(26,59,43,0.08)', padding: '4px', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => setHowItWorksTab('collectors')}
                  className={`resq-tab-btn ${howItWorksTab === 'collectors' ? 'active' : ''}`}
                >
                  For Community Collectors
                </button>
                <button
                  type="button"
                  onClick={() => setHowItWorksTab('providers')}
                  className={`resq-tab-btn ${howItWorksTab === 'providers' ? 'active' : ''}`}
                >
                  For Kitchen Providers
                </button>
              </div>
            </div>

            {howItWorksTab === 'collectors' ? (
              <div className="resq-how-grid">
                <div className="resq-step-card">
                  <span className="resq-step-number">01</span>
                  <h3 className="resq-step-title">Discover Nearby Surplus</h3>
                  <p className="resq-step-text">
                    Browse real-time listings of surplus meals, artisan bread, and fresh produce posted by licensed neighborhood kitchens before closing.
                  </p>
                  <div className="resq-step-tag">Filter by distance & dietary details</div>
                </div>

                <div className="resq-step-card">
                  <span className="resq-step-number">02</span>
                  <h3 className="resq-step-title">Claim a Collection Slot</h3>
                  <p className="resq-step-text">
                    Reserve the quantity your organization or household can responsibly utilize, generating a verified digital pickup pass with collection window instructions.
                  </p>
                  <div className="resq-step-tag">Zero payment · 100% free food rescue</div>
                </div>

                <div className="resq-step-card">
                  <span className="resq-step-number">03</span>
                  <h3 className="resq-step-title">Direct On-Site Pickup</h3>
                  <p className="resq-step-text">
                    Walk or drive to the kitchen's designated pickup counter or loading entrance during the specified window, present your pass, and pack your boxes.
                  </p>
                  <div className="resq-step-tag">Direct handover · Safe & courteous</div>
                </div>
              </div>
            ) : (
              <div className="resq-how-grid">
                <div className="resq-step-card">
                  <span className="resq-step-number">01</span>
                  <h3 className="resq-step-title">Post Surplus in 60 Seconds</h3>
                  <p className="resq-step-text">
                    At the end of service or prep shift, log remaining prepared trays, pastries, or bread with quantity, storage temperature, and collection deadline.
                  </p>
                  <div className="resq-step-tag">Quick mobile or desktop entry</div>
                </div>

                <div className="resq-step-card">
                  <span className="resq-step-number">02</span>
                  <h3 className="resq-step-title">Automated Community Match</h3>
                  <p className="resq-step-text">
                    Nearby registered charities, shelters, student pantries, and verified neighbors receive immediate notification of available surplus in their radius.
                  </p>
                  <div className="resq-step-tag">Pre-screened community collectors</div>
                </div>

                <div className="resq-step-card">
                  <span className="resq-step-number">03</span>
                  <h3 className="resq-step-title">Fast Kitchen Door Handoff</h3>
                  <p className="resq-step-text">
                    The collector arrives before your closing deadline with containers. You verify their code, hand over the food, and log the donation impact.
                  </p>
                  <div className="resq-step-tag">Zero disruption to commercial kitchen flow</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. Safety Standards */}
        <section id="safety-standards" className="resq-safety-section">
          <div className="resq-container">
            <div className="resq-safety-grid">
              <div className="resq-safety-content">
                <span className="resq-section-kicker">Responsible Practice</span>
                <h2 className="resq-section-title">
                  Modest, practical food safety principles for community sharing.
                </h2>
                <p className="resq-section-desc">
                  We believe in transparency and honest standards. ResQPlate connects kitchens with the community, but safe food handling requires mutual care from both donor and recipient.
                </p>

                <div className="resq-safety-disclaimer">
                  <strong>Important Notice:</strong> While participating kitchens follow standard food safety codes, ResQPlate does not independently inspect individual food parcels. Recipients should visually examine items and adhere to standard reheating and chilling practices.
                </div>
              </div>

              <div className="resq-safety-box">
                <div className="resq-safety-point">
                  <div className="resq-safety-point-icon">🛡️</div>
                  <div>
                    <h3 className="resq-safety-point-title">Strict Temperature Windows</h3>
                    <p className="resq-safety-point-desc">
                      Hot prepared items must be held above 60°C and collected promptly, or rapidly chilled below 4°C prior to posting on ResQPlate.
                    </p>
                  </div>
                </div>

                <div className="resq-safety-point">
                  <div className="resq-safety-point-icon">ℹ️</div>
                  <div>
                    <h3 className="resq-safety-point-title">Clear Allergen Disclosure</h3>
                    <p className="resq-safety-point-desc">
                      Kitchens must state major known allergens (gluten, dairy, nuts, shellfish). When uncertain, cross-contact warnings must be visibly communicated.
                    </p>
                  </div>
                </div>

                <div className="resq-safety-point">
                  <div className="resq-safety-point-icon">✓</div>
                  <div>
                    <h3 className="resq-safety-point-title">Clean Food-Grade Containers</h3>
                    <p className="resq-safety-point-desc">
                      Food must be packaged in sanitary commercial takeout containers, hotel pans, or bakery parchment. Collectors are encouraged to bring insulated cooler bags.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Impact Section */}
        <section id="community-impact" className="resq-impact-section">
          <div className="resq-container">
            <div className="resq-impact-header">
              <span className="resq-impact-kicker">Collective Conservation</span>
              <h2 className="resq-impact-title">
                Transforming surplus into community nourishment.
              </h2>
              <p className="resq-impact-desc">
                When fresh food is redirected from disposal to neighbors, we prevent wasted water, soil nutrients, and methane emissions while supporting local resilience.
              </p>
            </div>

            <div className="resq-impact-grid">
              <div className="resq-impact-card">
                <span className="resq-impact-num">1,420+</span>
                <span className="resq-impact-label">Meals Rescued</span>
                <span className="resq-impact-sub">Redirected from waste</span>
              </div>
              <div className="resq-impact-card">
                <span className="resq-impact-num">840 kg</span>
                <span className="resq-impact-label">CO₂e Prevented</span>
                <span className="resq-impact-sub">Landfill diversion estimate</span>
              </div>
              <div className="resq-impact-card">
                <span className="resq-impact-num">28</span>
                <span className="resq-impact-label">Local Kitchens</span>
                <span className="resq-impact-sub">Bakeries, caterers & diners</span>
              </div>
              <div className="resq-impact-card">
                <span className="resq-impact-num">100%</span>
                <span className="resq-impact-label">Free Direct Pickup</span>
                <span className="resq-impact-sub">No collector fees ever</span>
              </div>
            </div>

            <p className="resq-impact-notice">
              * Note: Metrics reflect illustrative pilot benchmarks modeled for the academic demonstration.
            </p>
          </div>
        </section>

        {/* 8. Provider CTA */}
        <section id="provider-hub" className="resq-cta-section">
          <div className="resq-container">
            <div className="resq-cta-card">
              <div>
                <h2 className="resq-cta-title">
                  Operate a kitchen, bakery, or catering service?
                </h2>
                <p className="resq-cta-text">
                  Turn unsold evening baguettes, surplus event platters, and prep overruns into verified goodwill. Join our pilot network of ethical food businesses.
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="resq-btn-saffron"
                    onClick={() => setIsProviderModalOpen(true)}
                  >
                    Simulate Listing Surplus Food
                  </button>
                  <button
                    type="button"
                    className="resq-btn-outline"
                    style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Partner Inquiries
                  </button>
                </div>
              </div>

              <div className="resq-cta-perks">
                <div className="resq-cta-perk-item">
                  <span>✓ Reduce commercial disposal and dumpster fees</span>
                </div>
                <div className="resq-cta-perk-item">
                  <span>✓ Support local student pantries and shelters</span>
                </div>
                <div className="resq-cta-perk-item">
                  <span>✓ Bill Emerson Good Samaritan Act protection</span>
                </div>
                <div className="resq-cta-perk-item">
                  <span>✓ Zero commission or subscription costs</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer className="resq-footer" role="contentinfo">
        <div className="resq-container">
          <div className="resq-footer-grid">
            <div className="resq-footer-brand">
              <span className="resq-footer-logo">ResQPlate</span>
              <p className="resq-footer-mission">
                Connecting local restaurants, bakeries, and event organizers who have safe surplus food with registered community organizations and neighbors for direct pickup.
              </p>
            </div>

            <div className="resq-footer-col">
              <h4 className="resq-footer-heading">Platform</h4>
              <ul className="resq-footer-links">
                <li><a href="#find-food" className="resq-footer-link">Browse Surplus Food</a></li>
                <li><a href="#how-it-works" className="resq-footer-link">How Pickup Works</a></li>
                <li><a href="#safety-standards" className="resq-footer-link">Safety Principles</a></li>
                <li><a href="#community-impact" className="resq-footer-link">Pilot Impact Data</a></li>
              </ul>
            </div>

            <div className="resq-footer-col">
              <h4 className="resq-footer-heading">For Providers</h4>
              <ul className="resq-footer-links">
                <li><span className="resq-footer-link" onClick={() => setIsProviderModalOpen(true)}>List Food Item</span></li>
                <li><span className="resq-footer-link" onClick={() => setIsAuthModalOpen(true)}>Kitchen Registration</span></li>
                <li><span className="resq-footer-link" onClick={() => setIsAuthModalOpen(true)}>Good Samaritan Legal Guide</span></li>
                <li><span className="resq-footer-link" onClick={() => setIsAuthModalOpen(true)}>Container Protocols</span></li>
              </ul>
            </div>

            <div className="resq-footer-col">
              <h4 className="resq-footer-heading">Project Info</h4>
              <p style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)' }}>
                Academic capstone project prototype. Built with plain React & Vite for clarity and extensibility.
              </p>
              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  className="resq-btn-ghost"
                  style={{ color: '#F6C88B', padding: '0', fontSize: '0.8125rem' }}
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  View System Architecture Status →
                </button>
              </div>
            </div>
          </div>

          <div className="resq-footer-bottom">
            <span>© {new Date().getFullYear()} ResQPlate Initiative. Community food rescue demonstration.</span>
            <span>Not a food delivery service · Direct pickup and donation model</span>
          </div>
        </div>
      </footer>

      {/* Modal: Pickup Details & Reservation */}
      {selectedListing && (
        <div
          className="resq-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedListing(null)}
        >
          <div
            className="resq-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resq-modal-header">
              <h3 className="resq-modal-title">Pickup & Package Details</h3>
              <button
                type="button"
                className="resq-modal-close"
                onClick={() => setSelectedListing(null)}
              >
                ✕
              </button>
            </div>

            <div className="resq-modal-body">
              <img
                src={selectedListing.image}
                alt={selectedListing.title}
                className="resq-modal-img"
              />

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                  {selectedListing.title}
                </h4>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)' }}>
                  Offered by <strong>{selectedListing.provider}</strong> ({selectedListing.providerType})
                </div>
              </div>

              <div className="resq-modal-notice-box">
                <strong>Demonstration Note:</strong> This is an interactive frontend prototype. Reservations generated here create a local confirmation pass for UI testing. Live database syncing is connected in the backend module.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.875rem' }}>
                <div style={{ background: 'var(--color-cream)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-forest)', marginBottom: '4px' }}>Quantity Available</div>
                  <div>{selectedListing.quantity}</div>
                </div>
                <div style={{ background: 'var(--color-cream)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-forest)', marginBottom: '4px' }}>Collection Window</div>
                  <div>{selectedListing.deadline}</div>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                  Exact Pickup Location & Door Access:
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', lineHeight: '1.5' }}>
                  {selectedListing.location}, {selectedListing.neighborhood}
                  <br />
                  <em>{selectedListing.pickupInstructions}</em>
                </p>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-forest)', marginBottom: '4px' }}>
                  Storage & Handling Condition:
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)' }}>
                  {selectedListing.storageCondition}
                </p>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-forest)', marginBottom: '6px' }}>
                  Disclosed Allergens:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedListing.allergens.map((alg, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--color-forest-subtle)',
                        color: 'var(--color-forest)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {alg}
                    </span>
                  ))}
                </div>
              </div>

              {reservationSuccessCode ? (
                <div className="resq-pass-box">
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-forest)', fontWeight: 600 }}>
                    ✓ Simulated Pickup Pass Generated
                  </div>
                  <div className="resq-pass-code">{reservationSuccessCode}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-charcoal-muted)' }}>
                    Present this pass code at {selectedListing.provider} before {selectedListing.deadline}.
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="resq-btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                  onClick={() => handleReserve(selectedListing)}
                >
                  Generate Collection Pass
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Offer Surplus Food (Intake Demo) */}
      {isProviderModalOpen && (
        <div
          className="resq-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsProviderModalOpen(false)}
        >
          <div
            className="resq-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resq-modal-header">
              <h3 className="resq-modal-title">Post Surplus Food for Community Pickup</h3>
              <button
                type="button"
                className="resq-modal-close"
                onClick={() => setIsProviderModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="resq-modal-body">
              <div className="resq-modal-notice-box">
                <strong>Kitchen Demo Flow:</strong> Submitting this form adds a realistic listing to your current session so you can immediately see it appear in the search results!
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                  Food Package Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 Fresh Ciabatta Loaves, 8 Prepared Curry Trays"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="resq-input"
                  style={{ height: '42px', paddingLeft: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                    Kitchen / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University Dining Hall"
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    className="resq-input"
                    style={{ height: '42px', paddingLeft: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="resq-select"
                    style={{ height: '42px', paddingLeft: '14px' }}
                  >
                    <option value="Prepared Meals">Prepared Meals</option>
                    <option value="Bakery">Bakery & Breads</option>
                    <option value="Produce & Platters">Produce & Catering Platters</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                    Quantity & Packaging
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12 containers, 5 kg"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="resq-input"
                    style={{ height: '42px', paddingLeft: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                    Neighborhood
                  </label>
                  <select
                    value={newNeighborhood}
                    onChange={(e) => setNewNeighborhood(e.target.value)}
                    className="resq-select"
                    style={{ height: '42px', paddingLeft: '14px' }}
                  >
                    <option value="Downtown Core">Downtown Core</option>
                    <option value="Riverside Arts Quarter">Riverside Arts Quarter</option>
                    <option value="North Campus">North Campus</option>
                    <option value="Greenwood District">Greenwood District</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                  Street Address & Access Door
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500 Campus Center Dr, Rear kitchen entrance"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="resq-input"
                  style={{ height: '42px', paddingLeft: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                  Collection Window / Deadline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Today by 7:30 PM"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="resq-input"
                  style={{ height: '42px', paddingLeft: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                  Special Pickup Instructions
                </label>
                <textarea
                  placeholder="e.g. Bring own tote bags or hotel pans. Knock on delivery door."
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-cream)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  className="resq-btn-ghost"
                  onClick={() => setIsProviderModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="resq-btn-primary"
                >
                  Publish Listing to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Authentication Status (Honest, No Fake Login) */}
      {isAuthModalOpen && (
        <div
          className="resq-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div
            className="resq-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px' }}
          >
            <div className="resq-modal-header">
              <h3 className="resq-modal-title">Portal Authentication Status</h3>
              <button
                type="button"
                className="resq-modal-close"
                onClick={() => setIsAuthModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="resq-modal-body">
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--color-forest-subtle)',
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '1.5rem'
                  }}
                >
                  🛡️
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-forest-dark)', marginBottom: '8px' }}>
                  Authentication Module Staged
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', lineHeight: '1.5' }}>
                  In accordance with the project roadmap, the frontend authentication flow is decoupled until the backend database (Node / MongoDB / Auth) is connected in Phase 2.
                </p>
              </div>

              <div style={{ background: 'var(--color-cream)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.84rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-forest)', marginBottom: '8px' }}>
                  Scheduled User Roles for Next Sprint:
                </div>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--color-charcoal-muted)' }}>
                  <li><strong>Commercial Kitchen Provider:</strong> Restaurant/Bakery dashboard, food log history, safe handling verification.</li>
                  <li><strong>Verified Community Collector:</strong> 501(c)(3) charities, student pantry leaders, community organizers.</li>
                  <li><strong>Individual Neighbor:</strong> Direct pickup quota for household consumption.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  type="button"
                  className="resq-btn-primary"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  Understood & Continue Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
