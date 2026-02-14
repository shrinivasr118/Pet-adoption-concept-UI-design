import React, { useState, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// --- 1. DATA GENERATION & IMAGE LINKS ---
const CATEGORIES = ['Dog', 'Cat', 'Bird', 'Rabbit'];
const SUB_CATEGORIES = ['Food', 'Toys', 'Medicine', 'Shampoo'];

// A. DATABASE OF DISTINCT IMAGES
// I have populated this with specific Unsplash IDs to ensure every category looks different.
// You can add more links to these arrays to add more variety.
const PRODUCT_DB = {
  dog: {
    food: [
      {name: "Pedigree", img: "https://m.media-amazon.com/images/I/41G-apM01nL._SY300_SX300_QL70_FMwebp_.jpg"}, // Dog eating
      {name: "Purepet", img: "https://m.media-amazon.com/images/I/41Qwe9iCBYL._SY300_SX300_QL70_FMwebp_.jpg"}, // Bowl of food
      {name: "Drools", img: "https://m.media-amazon.com/images/I/41bbvbJGR+L._SY300_SX300_QL70_FMwebp_.jpg"}, 
      {name:"Tasty Jerky",img:"https://m.media-amazon.com/images/I/61L0yrNDhBL._AC_SX644_CB1169409_QL70_.jpg"},
      {name:"Meat up",img:"https://m.media-amazon.com/images/I/71vXhM3XFkL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"meat up biscuts",img:"https://m.media-amazon.com/images/I/71tHpVu0w3L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"drools wet food",img:"https://m.media-amazon.com/images/I/81U526CZqqL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Maxi",img:"https://m.media-amazon.com/images/I/71Rm2nnnuTL._AC_UL480_FMwebp_QL65_.jpg"},
       // Treats
    ],
    toys: [
      {name:"Rope Toy", img:"https://m.media-amazon.com/images/I/61t009wfLWL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Goofy Tails Dog toy",img:"https://m.media-amazon.com/images/I/516eozP79pL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Rubber ball",img:"https://m.media-amazon.com/images/I/61xGIPSxS5L._AC_UL480_FMwebp_QL65_.jpg"}, 
      {name:"Rope toy set",img:"https://m.media-amazon.com/images/I/91S5aESG1QL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Rope toy set",img:"https://m.media-amazon.com/images/I/71kjtvLNy4L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Chew toy",img:"https://m.media-amazon.com/images/I/817UzL+QmSL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Squeaky toy",img:"https://m.media-amazon.com/images/I/71mZtM+OOYL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Tug toy",img:"https://m.media-amazon.com/images/I/61f4u7+ktkL._AC_SX644_CB1169409_QL70_.jpg"},
      // Rope toy
    ],
    medicine: [
      {name:"Drools absolute",img:"https://m.media-amazon.com/images/I/61sD9YbgwFL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Drools absolute Skin+coat",img:"https://m.media-amazon.com/images/I/61VjY1n8NUL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Drools absolute-vitamins",img:"https://m.media-amazon.com/images/I/61J0XLCiZEL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Himalaya spary",img:"https://m.media-amazon.com/images/I/61nzt8RbOJL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dewormin tablet",img:"https://m.media-amazon.com/images/I/71m6run0ItL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Himalaya tonic",img:"https://m.media-amazon.com/images/I/61PIFqpciWL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Digest+",img:"https://m.media-amazon.com/images/I/61MQp+j5oZL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Everyday nutrition",img:"https://m.media-amazon.com/images/I/71cm+tQNDnL._AC_UL480_FMwebp_QL65_.jpg"},
       // Pills  
    ],
    shampoo: [
      {name:"Dog shampoo-Neem",img:"https://m.media-amazon.com/images/I/51qG85Jn5pL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog+cat shampoo",img:"https://m.media-amazon.com/images/I/51lt-guJAhL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog+cat Neem shampoo",img:"https://m.media-amazon.com/images/I/71XqvrFN2rL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog coconut lime shampoo",img:"https://m.media-amazon.com/images/I/71Npnm2RvjL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog shampoo-lavender",img:"https://m.media-amazon.com/images/I/71R6qzbwB0L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog moisturizing shampoo",img:"https://m.media-amazon.com/images/I/61l4shM4OBL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog shampoo-total care",img:"https://m.media-amazon.com/images/I/71sCCCLUfrL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog fruit shampoo",img:"https://m.media-amazon.com/images/I/51Hp7Sx1PRL._AC_UL480_FMwebp_QL65_.jpg"},
       // Clean dog  
    ]
  },
  cat: {
    food: [
      {name: "Whiskas", img: "https://m.media-amazon.com/images/I/41V97AW-VEL._SY300_SX300_QL70_FMwebp_.jpg"}, // Cat food
      {name: "Purepet", img: "https://m.media-amazon.com/images/I/415ncxK9zpL._SY300_SX300_QL70_FMwebp_.jpg"},
      {name: "Purepet seafood", img: "https://m.media-amazon.com/images/I/71dtpTT9huL._AC_UL480_FMwebp_QL65_.jpg"},
      {name: "drools", img: "https://m.media-amazon.com/images/I/412rI9BH05L._SY300_SX300_QL70_FMwebp_.jpg"}, 
      {name:"Let's Bite",img:"https://m.media-amazon.com/images/I/61m5hSva+GL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Friskies",img:"https://m.media-amazon.com/images/I/717U9if4Z6L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"drools tuna",img:"https://m.media-amazon.com/images/I/81fBtHYEZXL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Meat up",img:"https://m.media-amazon.com/images/I/71q-fJCbh4L._AC_UL480_FMwebp_QL65_.jpg"} // Wet food
    ],
    toys: [
      {name:"Feather toy", img:"https://m.media-amazon.com/images/I/51mTv4RO3kL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat teaser",img:"https://m.media-amazon.com/images/I/61hlRTDKy+L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat ball",img:"https://m.media-amazon.com/images/I/31WBAa7bh5L._AC_UL480_FMwebp_QL65_.jpg"}, 
      {name:"Cat spring toy",img:"https://m.media-amazon.com/images/I/71C2Gt6x38L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat scratcher",img:"https://m.media-amazon.com/images/I/61JecNpk6TL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat toy set",img:"https://m.media-amazon.com/images/I/813eEgoxN2L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat tunnel toy",img:"https://m.media-amazon.com/images/I/61gbrnFrFBS._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Catnip toy",img:"https://m.media-amazon.com/images/I/71eY5raNiLL._AC_UL480_FMwebp_QL65_.jpg"},
       // Feather toy  
    ],
    medicine: [
     {name:"Cat+Dog dewormin tablet",img:"https://m.media-amazon.com/images/I/614+STg+yfL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Healing spary Dog+cat",img:"https://m.media-amazon.com/images/I/61E-EcCegIL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Digest+",img:"https://m.media-amazon.com/images/I/61MQp+j5oZL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Probiotics and prebiotics",img:"https://m.media-amazon.com/images/I/51XLEOzzRRL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat vitamins",img:"https://m.media-amazon.com/images/I/61J0mjj14IL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat+Dog vitamin tonic",img:"https://m.media-amazon.com/images/I/71+Vp83EArL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"cat+dog dental spary",img:"https://m.media-amazon.com/images/I/7166gmDmHxL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Himalaya tonic dog+cat",img:"https://m.media-amazon.com/images/I/71fzIyjLAxL._AC_UL480_FMwebp_QL65_.jpg"},
       // Pills
    ],
    shampoo: [
      {name:"Dog+cat shampoo",img:"https://m.media-amazon.com/images/I/51lt-guJAhL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Dog+cat Neem shampoo",img:"https://m.media-amazon.com/images/I/71XqvrFN2rL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat+Dog fruit shampoo",img:"https://m.media-amazon.com/images/I/510M4VgBkzL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat conditioner+shampoo",img:"https://m.media-amazon.com/images/I/61RMS1Ht+0L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat shampoo-Deep clean",img:"https://m.media-amazon.com/images/I/51GruHnz97L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat waterless shampoo",img:"https://m.media-amazon.com/images/I/61j7zKGugZL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Persian Cat hairfall shampoo",img:"https://m.media-amazon.com/images/I/71ssWZJVrBL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Cat botanical conditioning shampoo",img:"https://m.media-amazon.com/images/I/51DgemkLb4L._AC_UL480_FMwebp_QL65_.jpg"},  
    ]
  },
  bird: {
    food: [
     {name:"Seed mix premium", img:"https://m.media-amazon.com/images/I/91jQi0m401L._AC_UL480_FMwebp_QL65_.jpg"},
     {name:"seed mix",img:"https://m.media-amazon.com/images/I/713q7hlIjuL._AC_UL480_FMwebp_QL65_.jpg"},
     {name:"Millet food",img:"https://m.media-amazon.com/images/I/91misVYCiXL._AC_UL480_FMwebp_QL65_.jpg"},
     {name:"fruit mix",img:"https://m.media-amazon.com/images/I/715tP+QL5zL._AC_UL480_FMwebp_QL65_.jpg"},    // Bird food
    ],
    toys: [
      {name:"Bird swing", img:"https://m.media-amazon.com/images/I/71B3oieBy-L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Bird chew toy",img:"https://m.media-amazon.com/images/I/91ThhPpoYpL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Bird toy combo",img:"https://m.media-amazon.com/images/I/91KMD4XAOJL._AC_UL480_FMwebp_QL65_.jpg"}, 
      {name:"Bird ladder toy",img:"https://m.media-amazon.com/images/I/81R0J6l76HL._AC_UL480_FMwebp_QL65_.jpg"},
       // Bird swing  
    ],
    medicine: [
      {name:"Bird vitamin chunks",img:"https://m.media-amazon.com/images/I/71cj7tMbFCL._AC_UL480_FMwebp_QL65_.jpg"}, // Bird medicine
      {name:"Bird multivitamin",img:"https://m.media-amazon.com/images/I/71PWECW2o4L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Bird cold medicine",img:"https://m.media-amazon.com/images/I/41I1dzAUy8L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Bird care combo",img:"https://m.media-amazon.com/images/I/81S-KxFW7PL._AC_UL480_FMwebp_QL65_.jpg"},
    ],
    shampoo: [
      {name:"Bird bath shampoo",img:"https://m.media-amazon.com/images/I/61tkWOQat4L._AC_UL480_FMwebp_QL65_.jpg"}, // Clean bird
      {name:"Bird feather shampoo",img:"https://m.media-amazon.com/images/I/61s6oySKCuL._AC_UL480_FMwebp_QL65_.jpg"},  
      {name:"Bird shampoo combo",img:"https://m.media-amazon.com/images/I/71KoHKp2DKL._AC_UL480_FMwebp_QL65_.jpg"}
    ]
  },
  rabbit: {
    food: [
      {name:"rabbit premium food",img:"https://m.media-amazon.com/images/I/61srJDSwo4L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"rabbit pellets",img:"https://m.media-amazon.com/images/I/61ztx6UqHaL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"rabbit pellets",img:"https://m.media-amazon.com/images/I/51JgXm5WfQL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Timothy hay",img:"https://m.media-amazon.com/images/I/61BSTJi3RYL._AC_UL480_FMwebp_QL65_.jpg"},  // Rabbit food  
    ],
    toys: [
      {name:"Wood chew toy",img:"https://m.media-amazon.com/images/I/7116rUtyjCL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"tunnel toy",img:"https://m.media-amazon.com/images/I/61bYAUCqe+L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Wood chew toy",img:"https://m.media-amazon.com/images/I/51FY32yLURL._AC_UL480_FMwebp_QL65_.jpg"}, // Wood chew
    ],
    medicine: [
      {name:"Rabbit supplement",img:"https://m.media-amazon.com/images/I/81fM+rewP2L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Rabbit vitamin supplement",img:"https://m.media-amazon.com/images/I/61UNJVI83fL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"Rabbit liver tonic",img:"https://m.media-amazon.com/images/I/610WdvzX1bL._AC_UL480_FMwebp_QL65_.jpg"}, // Vet check
    ],
    shampoo: [
      {name:"dry bath shampoo",img:"https://m.media-amazon.com/images/I/61nVSNYt1gL._AC_UL480_FMwebp_QL65_.jpg"} ,
      {name:"rabbit shampoo combo",img:"https://m.media-amazon.com/images/I/71Pz7bweZ0L._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"rabbit shampoo high foam",img:"https://m.media-amazon.com/images/I/61sXFQvXHYL._AC_UL480_FMwebp_QL65_.jpg"},
      {name:"rabbit shampoo fleas free",img:"https://m.media-amazon.com/images/I/71vdlhlbSTL._AC_UL480_FMwebp_QL65_.jpg"} // Clean rabbit
    ]
  }
};
// B. GENERATE PRODUCTS USING THE REAL PRODUCT DB
const generateProducts = () => {
  const products = [];
  let idCounter = 1;

  CATEGORIES.forEach(pet => {
    SUB_CATEGORIES.forEach(sub => {
      // Loop through 8 items (or however many we defined in PRODUCT_DB)
      for (let i = 0; i < 8; i++) {
        const pType = pet.toLowerCase();
        const sType = sub.toLowerCase();
        
        // Get the list of real products for this category
        const availableItems = PRODUCT_DB[pType]?.[sType] || [];
        
        // Pick the item (cycle if necessary)
        // If DB is missing for some reason, fallback to generic
        const item = availableItems[i % availableItems.length] || { 
            name: `${pet} ${sub} ${i+1}`, 
            img: "https://source.unsplash.com/random/200x200/?pet" 
        };

        products.push({
          id: idCounter++,
          name: item.name, // <--- USING REAL NAME
          petType: pType,
          category: sType,
          price: Math.floor(Math.random() * 50) + 5,
          img: item.img    // <--- USING REAL IMAGE
        });
      }
    });
  });
  return products;
};

const ALL_PRODUCTS = generateProducts();


// --- 2. MAIN COMPONENT (UNCHANGED) ---
const PetShop = ({ onBack }) => {
  const [petFilter, setPetFilter] = useState('dog');
  const [subFilter, setSubFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const basketControls = useAnimation();

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchPet = p.petType === petFilter;
      const matchSub = subFilter === 'all' ? true : p.category === subFilter;
      return matchPet && matchSub;
    });
  }, [petFilter, subFilter]);

  // Calculate Total
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // --- HANDLER: Add to Cart ---
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    basketControls.start({
      scale: [1, 1.3, 0.9, 1.1, 1],
      transition: { duration: 0.4 }
    });
  };

  // --- HANDLER: Remove from Cart ---
  const removeFromCart = (indexToRemove) => {
    setCart(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      backgroundColor: '#FAEBD7',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden'
    }}>

      {/* --- HEADER --- */}
      <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, backgroundColor: 'rgba(250, 235, 215, 0.9)' }}>
        <button onClick={onBack} style={btnStyle}>← Back</button>
        <h1 style={{ fontFamily: "'Long Cang', cursive", fontSize: '3rem', margin: 0, color: '#4A3728' }}>
          The Pet Store
        </h1>
        <div style={{ width: '80px' }}></div>
      </div>

      {/* --- FILTERS CONTAINER --- */}
      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', paddingBottom: '1rem' }}>
        
        {/* Level 1: Pet Type */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {CATEGORIES.map(cat => (
            <FilterButton 
              key={cat} 
              active={petFilter === cat.toLowerCase()} 
              onClick={() => { setPetFilter(cat.toLowerCase()); setSubFilter('all'); }}
            >
              {cat}
            </FilterButton>
          ))}
        </div>

        {/* Level 2: Sub Category */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <SubFilterButton active={subFilter === 'all'} onClick={() => setSubFilter('all')}>All</SubFilterButton>
          {SUB_CATEGORIES.map(sub => (
            <SubFilterButton 
              key={sub} 
              active={subFilter === sub.toLowerCase()} 
              onClick={() => setSubFilter(sub.toLowerCase())}
            >
              {sub}
            </SubFilterButton>
          ))}
        </div>
      </div>

      {/* --- PRODUCT SHELF --- */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '2rem', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '2rem',
        paddingBottom: '150px' 
      }}>
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map(product => (
            <DraggableProduct 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* --- BASKET ZONE --- */}
      <div 
        onClick={() => setIsCartOpen(true)}
        style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 100, cursor: 'pointer'
        }}
      >
        <motion.div
          animate={basketControls}
          style={{
            width: '180px', height: '100px',
            backgroundColor: '#D35400',
            borderRadius: '10px 10px 40px 40px',
            border: '4px solid #A04000',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: '1.2rem',
            position: 'relative'
          }}
        >
            <div style={{ position: 'absolute', top: '-40px', left: '20px', right: '20px', height: '60px', border: '5px solid #A04000', borderBottom: 'none', borderRadius: '50px 50px 0 0', zIndex: -1 }}></div>
            
            <span>{cart.length === 0 ? "Drag Here" : `${cart.length} Items`}</span>
            {cart.length > 0 && <span style={{ position: 'absolute', bottom: '-25px', color: '#4A3728', fontSize: '0.9rem' }}>(Click to View)</span>}
        </motion.div>
      </div>

      {/* --- CART MODAL WINDOW --- */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
                initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
                style={{
                    width: '90%', maxWidth: '600px', height: '70vh',
                    backgroundColor: '#fff', borderRadius: '15px',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative'
                }}
            >
                {/* Header */}
                <div style={{ padding: '1rem', borderBottom: '2px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4A3728', color: '#fff' }}>
                    <h2 style={{ margin: 0, fontFamily: "'Cinzel', serif" }}>Your Basket</h2>
                    <button 
                        onClick={() => setIsCartOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        ✕
                    </button>
                </div>

                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '40px 60px 1fr 80px 40px', padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #ccc', backgroundColor: '#f9f9f9', fontSize: '0.9rem' }}>
                    <span>No.</span>
                    <span>Img</span>
                    <span>Item Name</span>
                    <span>Price</span>
                    <span></span>
                </div>

                {/* List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>Basket is empty.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: '40px 60px 1fr 80px 40px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <span style={{ color: '#888' }}>{index + 1}</span>
                                <img src={item.img} alt="thumb" style={{ width: '40px', height: '40px', borderRadius: '5px', objectFit: 'cover' }} />
                                <span style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</span>
                                <span style={{ color: '#E07A5F' }}>${item.price}</span>
                                <button onClick={() => removeFromCart(index)} style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderTop: '2px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1rem', color: '#4A3728' }}>
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                    <button style={{ width: '100%', padding: '1rem', backgroundColor: '#27AE60', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        CHECKOUT
                    </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// --- DRAGGABLE PRODUCT CARD ---
const DraggableProduct = ({ product, onAddToCart }) => {
    const controls = useAnimation();

    return (
        <div style={{ position: 'relative', width: '160px', height: '220px' }}>
            
            {/* 1. THE "GHOST" (Visible only when dragging top layer) */}
            <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: '#fff', borderRadius: '15px',
                border: '1px dashed #ccc', opacity: 0.5,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>Stock Item</span>
            </div>

            {/* 2. THE DRAGGABLE CARD */}
            <motion.div
                drag
                dragSnapToOrigin={true} 
                dragElastic={0.2}
                animate={controls}
                whileHover={{ scale: 1.05, cursor: 'grab', zIndex: 50 }}
                whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100 }}
                onDragEnd={async (event, info) => {
                    const dropX = info.point.x;
                    const dropY = info.point.y;
                    const winH = window.innerHeight;
                    const winW = window.innerWidth;

                    // Basket Zone Definition
                    const basketTop = winH - 150;
                    const basketLeft = (winW / 2) - 100;
                    const basketRight = (winW / 2) + 100;

                    if (dropY > basketTop && dropX > basketLeft && dropX < basketRight) {
                        // SUCCESSFUL DROP
                        await controls.start({ 
                            scale: 0, 
                            opacity: 0,
                            y: info.offset.y + 50, 
                            transition: { duration: 0.3 } 
                        });
                        onAddToCart(product);
                        controls.set({ x: 0, y: 0, scale: 1, opacity: 1 });
                    }
                }}
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: '#fff', borderRadius: '15px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden'
                }}
            >
                <div style={{ height: '140px', width: '100%', backgroundColor: '#eee' }}>
                    <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#333' }}>{product.name}</h4>
                    <span style={{ color: '#E07A5F', fontWeight: 'bold' }}>${product.price}</span>
                </div>
            </motion.div>
        </div>
    );
};

// --- STYLED BUTTON COMPONENTS ---
const btnStyle = { 
    padding: '0.5rem 1rem', borderRadius: '20px', border: '2px solid #4A3728', 
    background: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: '#4A3728' 
};

const FilterButton = ({ active, children, onClick }) => (
    <button onClick={onClick} style={{
        padding: '0.8rem 2rem', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem',
        backgroundColor: active ? '#4A3728' : '#fff', color: active ? '#fff' : '#4A3728',
        boxShadow: active ? '0 5px 15px rgba(74, 55, 40, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s'
    }}>
        {children}
    </button>
);

const SubFilterButton = ({ active, children, onClick }) => (
    <button onClick={onClick} style={{
        padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #4A3728', cursor: 'pointer', fontSize: '0.9rem',
        backgroundColor: active ? '#E07A5F' : 'transparent', color: active ? '#fff' : '#4A3728',
        transition: 'all 0.2s'
    }}>
        {children}
    </button>
);

export default PetShop;