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

        // Realistic INR price ranges based on category
        let priceRange = { min: 200, max: 800 }; // Default
        
        if (sType === 'food') {
          priceRange = { min: 299, max: 1499 }; // Pet food packages
        } else if (sType === 'toys') {
          priceRange = { min: 199, max: 899 }; // Pet toys
        } else if (sType === 'medicine') {
          priceRange = { min: 249, max: 1299 }; // Medicines, supplements
        } else if (sType === 'shampoo') {
          priceRange = { min: 199, max: 699 }; // Pet shampoos
        }

        // Generate realistic price within the range
        const price = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1)) + priceRange.min;

        products.push({
          id: idCounter++,
          name: item.name, // <--- USING REAL NAME
          petType: pType,
          category: sType,
          price: price, // Realistic INR price
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
  const [showCheckout, setShowCheckout] = useState(false);
  
  const basketControls = useAnimation();

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchPet = p.petType === petFilter;
      const matchSub = subFilter === 'all' ? true : p.category === subFilter;
      return matchPet && matchSub;
    });
  }, [petFilter, subFilter]);

  // Calculate Total with quantities
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // --- HANDLER: Add to Cart ---
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex >= 0) {
        // Item exists, increase quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + 1 };
        return updated;
      } else {
        // New item, add with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    basketControls.start({
      scale: [1, 1.3, 0.9, 1.1, 1],
      transition: { duration: 0.4 }
    });
  };

  // --- HANDLER: Remove from Cart ---
  const removeFromCart = (indexToRemove) => {
    setCart(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  // --- HANDLER: Update Quantity ---
  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
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
                <div style={{ display: 'grid', gridTemplateColumns: '40px 60px 1fr 100px 100px 40px', padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #ccc', backgroundColor: '#f9f9f9', fontSize: '0.9rem' }}>
                    <span>No.</span>
                    <span>Img</span>
                    <span>Item Name</span>
                    <span style={{ textAlign: 'center' }}>Qty</span>
                    <span>Price</span>
                    <span></span>
                </div>

                {/* List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>Basket is empty.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: '40px 60px 1fr 100px 100px 40px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <span style={{ color: '#888' }}>{index + 1}</span>
                                <img src={item.img} alt="thumb" style={{ width: '40px', height: '40px', borderRadius: '5px', objectFit: 'cover' }} />
                                <span style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                                  <button 
                                    onClick={() => updateQuantity(index, -1)}
                                    style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  >
                                    -
                                  </button>
                                  <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' }}>{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(index, 1)}
                                    style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  >
                                    +
                                  </button>
                                </div>
                                <span style={{ color: '#E07A5F', fontWeight: 'bold' }}>₹{item.price * item.quantity}</span>
                                <button onClick={() => removeFromCart(index)} style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderTop: '2px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1rem', color: '#4A3728' }}>
                        <span>Total:</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <button onClick={() => setShowCheckout(true)} style={{ width: '100%', padding: '1rem', backgroundColor: '#27AE60', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        CHECKOUT
                    </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL */}
      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal 
            cart={cart}
            totalPrice={totalPrice}
            onClose={() => setShowCheckout(false)}
            onSuccess={() => {
              setCart([]);
              setShowCheckout(false);
              setIsCartOpen(false);
            }}
          />
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
                    <span style={{ color: '#E07A5F', fontWeight: 'bold' }}>₹{product.price}</span>
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

// --- CHECKOUT MODAL COMPONENT ---
const CheckoutModal = ({ cart, totalPrice, onClose, onSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState('form'); // 'form', 'processing', 'success'
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'upi'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
      >
        {paymentStatus === 'form' && (
          <>
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#888'
              }}
            >
              ×
            </button>

            <h2 style={{ margin: '0 0 1.5rem 0', color: '#4A3728', fontFamily: "'Long Cang', cursive", fontSize: '2rem' }}>
              Checkout
            </h2>

            {/* Order Summary - Expandable */}
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <div 
                onClick={() => setShowOrderDetails(!showOrderDetails)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#4A3728' }}>Order Summary</h3>
                <span style={{ fontSize: '1.2rem', color: '#4A3728' }}>
                  {showOrderDetails ? '▲' : '▼'}
                </span>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: '#666', margin: '0.5rem 0' }}>
                {totalItems} item{totalItems > 1 ? 's' : ''} in cart
              </div>
              
              <AnimatePresence>
                {showOrderDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ 
                      marginTop: '0.5rem', 
                      paddingTop: '0.5rem', 
                      borderTop: '1px solid #ddd',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {cart.map((item, index) => (
                        <div 
                          key={index}
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem 0',
                            fontSize: '0.85rem',
                            borderBottom: index < cart.length - 1 ? '1px solid #eee' : 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                            <img 
                              src={item.img} 
                              alt={item.name}
                              style={{ 
                                width: '30px', 
                                height: '30px', 
                                borderRadius: '5px', 
                                objectFit: 'cover' 
                              }}
                            />
                            <span style={{ color: '#333' }}>{item.name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: '#888' }}>x{item.quantity}</span>
                            <span style={{ color: '#E07A5F', fontWeight: 'bold', minWidth: '70px', textAlign: 'right' }}>
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E07A5F', marginTop: '0.5rem' }}>
                Total: ₹{totalPrice}
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4A3728' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4A3728' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4A3728' }}>
                  Phone Number
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ 
                    padding: '0.7rem', 
                    border: '1px solid #ccc', 
                    borderRadius: '5px', 
                    backgroundColor: '#f5f5f5',
                    fontWeight: 'bold',
                    color: '#4A3728'
                  }}>
                    +91
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit number"
                    style={{
                      flex: 1,
                      padding: '0.7rem',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4A3728' }}>
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4A3728' }}>
                  Payment Method
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {['upi', 'card', 'cod'].map((method) => (
                    <label key={method} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>
                        {method === 'upi' ? 'UPI' : method === 'card' ? 'Card' : 'Cash on Delivery'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#27AE60',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Place Order - ₹{totalPrice}
              </button>
            </form>
          </>
        )}

        {paymentStatus === 'processing' && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '60px',
                height: '60px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #27AE60',
                borderRadius: '50%',
                margin: '0 auto 1.5rem'
              }}
            />
            <h3 style={{ color: '#4A3728', margin: '0 0 0.5rem 0' }}>Processing Payment...</h3>
            <p style={{ color: '#888', margin: 0 }}>Please wait while we confirm your order</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#27AE60',
                borderRadius: '50%',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: '#fff'
              }}
            >
              ✓
            </motion.div>
            <h3 style={{ color: '#27AE60', margin: '0 0 0.5rem 0' }}>Payment Successful!</h3>
            <p style={{ color: '#666', margin: '0 0 1rem 0' }}>Your order has been placed successfully</p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>Order confirmation sent to {formData.email}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PetShop;