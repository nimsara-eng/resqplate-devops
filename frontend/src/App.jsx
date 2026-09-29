import { useState } from 'react'
import './App.css'

const foods = [
  {
    id: 1,
    icon: '🥖',
    name: 'Fresh Bread',
    provider: 'City Bakery',
    quantity: '20 loaves',
    location: 'Galle',
    deadline: 'Today, 6:00 PM',
  },
  {
    id: 2,
    icon: '🍱',
    name: 'Lunch Meal Packs',
    provider: 'Campus Canteen',
    quantity: '15 packs',
    location: 'Hapugala',
    deadline: 'Today, 2:00 PM',
  },
  {
    id: 3,
    icon: '🥗',
    name: 'Fresh Vegetables',
    provider: 'Green Market',
    quantity: '10 packs',
    location: 'Matara',
    deadline: 'Today, 5:00 PM',
  },
  {
    id: 4,
    icon: '🍛',
    name: 'Cooked Meals',
    provider: 'Community Kitchen',
    quantity: '12 portions',
    location: 'Galle',
    deadline: 'Today, 3:00 PM',
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const filteredFoods = foods.filter((food) => {
    const query = search.trim().toLowerCase()
    const place = location.trim().toLowerCase()

    return (
      (food.name.toLowerCase().includes(query) ||
        food.provider.toLowerCase().includes(query)) &&
      food.location.toLowerCase().includes(place)
    )
  })

  function handleSearch(event) {
    event.preventDefault()
    document.getElementById('available-food')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <a className="brand" href="#" aria-label="ResQPlate home">
            <span className="brand-icon">🍽️</span>
            <span>ResQ<span className="brand-highlight">Plate</span></span>
          </a>

          <nav className="navigation" aria-label="Main navigation">
            <a href="#available-food">Find Food</a>
            <a href="#how-it-works">How It Works</a>
          </nav>

          <a className="header-button" href="#available-food">
            Explore Food
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">SHARE FOOD. REDUCE WASTE.</span>
              <h1>Good food deserves a second chance.</h1>
              <p>
                Discover surplus food available near you and collect it before
                it goes to waste.
              </p>

              <form className="search-panel" onSubmit={handleSearch}>
                <div className="search-heading">Find available food</div>
                <div className="search-fields">
                  <label>
                    <span>Food or provider</span>
                    <input
                      type="search"
                      placeholder="Search food"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </label>

                  <label>
                    <span>Pickup location</span>
                    <input
                      type="search"
                      placeholder="e.g. Galle"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                    />
                  </label>

                  <button type="submit">Find Food →</button>
                </div>
              </form>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-circle">
                <span className="hero-food">🥗</span>
              </div>
              <div className="floating-note">🌿 Save food, share care</div>
            </div>
          </div>
        </section>

        <section className="listings container" id="available-food">
          <div className="section-heading">
            <div>
              <span className="section-label">FOOD RESCUE STARTS HERE</span>
              <h2>Available food near you</h2>
            </div>
            <p>Browse surplus food ready for pickup.</p>
          </div>

          <div className="food-grid">
            {filteredFoods.map((food) => (
              <article className="food-card" key={food.id}>
                <div className="food-image" aria-hidden="true">
                  <span>{food.icon}</span>
                  <span className="pickup-badge">Pickup available</span>
                </div>

                <div className="food-details">
                  <h3>{food.name}</h3>
                  <p className="provider">{food.provider}</p>
                  <p>📍 {food.location}</p>
                  <p>📦 {food.quantity}</p>
                  <p>⏰ Collect before {food.deadline}</p>
                  <button type="button" disabled>
                    Reservation coming soon
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <p className="empty-message">
              No matching food found. Try another food or location.
            </p>
          )}
        </section>

        <section className="how-it-works" id="how-it-works">
          <div className="container">
            <h2>How ResQPlate works</h2>
            <div className="steps">
              <div><span>🔎</span><h3>Find food</h3><p>Browse available surplus food.</p></div>
              <div><span>📍</span><h3>Choose a pickup</h3><p>Check the location and collection time.</p></div>
              <div><span>💚</span><h3>Rescue food</h3><p>Collect food and help reduce waste.</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© 2026 ResQPlate · Share food. Reduce waste.</div>
      </footer>
    </>
  )
}

export default App