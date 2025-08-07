
// Application State
const appState = {
    currentUser: null,
    isLoggedIn: false,
    cart: [],
    recipes: [
        {
            id: 1,
            name: "Pasta Italiana",
            author: "Chef Mario",
            image: "🍝",
            ingredients: [
                { name: "Pasta", quantity: "500g" },
                { name: "Tomate", quantity: "3 unidades" },
                { name: "Ajo", quantity: "2 dientes" },
                { name: "Aceite de oliva", quantity: "50ml" },
                { name: "Albahaca", quantity: "10 hojas" }
            ],
            steps: [
                "Hervir agua con sal en una olla grande",
                "Cocinar la pasta según las instrucciones del paquete",
                "Sofreír el ajo en aceite de oliva",
                "Agregar los tomates picados y cocinar 10 minutos",
                "Mezclar la pasta con la salsa y agregar albahaca"
            ],
            comments: [
                { author: "Ana", text: "¡Deliciosa receta! La hice para mi familia y les encantó." },
                { author: "Carlos", text: "Muy fácil de hacer, gracias por compartir." }
            ]
        },
        {
            id: 2,
            name: "Tacos Mexicanos",
            author: "Chef Rosa",
            image: "🌮",
            ingredients: [
                { name: "Tortillas", quantity: "8 unidades" },
                { name: "Carne molida", quantity: "500g" },
                { name: "Cebolla", quantity: "1 unidad" },
                { name: "Tomate", quantity: "2 unidades" },
                { name: "Cilantro", quantity: "1 manojo" }
            ],
            steps: [
                "Cocinar la carne molida con cebolla picada",
                "Sazonar con especias mexicanas",
                "Calentar las tortillas",
                "Rellenar con carne y agregar tomate y cilantro",
                "Servir caliente"
            ],
            comments: [
                { author: "Miguel", text: "Auténtico sabor mexicano." }
            ]
        },
        {
            id: 3,
            name: "Sushi Casero",
            author: "Chef Takeshi",
            image: "🍣",
            ingredients: [
                { name: "Arroz para sushi", quantity: "300g" },
                { name: "Alga nori", quantity: "5 hojas" },
                { name: "Salmón", quantity: "200g" },
                { name: "Pepino", quantity: "1 unidad" },
                { name: "Vinagre de arroz", quantity: "50ml" }
            ],
            steps: [
                "Cocinar el arroz y mezclarlo con vinagre",
                "Extender el alga nori sobre la esterilla",
                "Agregar una capa de arroz",
                "Colocar el salmón y pepino",
                "Enrollar firmemente y cortar"
            ],
            comments: []
        }
    ],
    orders: []
};

// DOM Elements
const sections = {
    home: document.getElementById('homeSection'),
    recipeDetail: document.getElementById('recipeDetailSection'),
    cart: document.getElementById('cartSection'),
    profile: document.getElementById('profileSection'),
    orders: document.getElementById('ordersSection'),
    createRecipe: document.getElementById('createRecipeSection')
};

// Initialize App
function initApp() {
    renderRecipes();
    updateCartCount();
}

// Navigation Functions
function showHome() {
    hideAllSections();
    sections.home.classList.add('visible');
}

function showRecipeDetail(recipeId) {
    const recipe = appState.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    hideAllSections();
    sections.recipeDetail.classList.add('visible');

    // Populate recipe details
    document.getElementById('detailImage').textContent = recipe.image;
    document.getElementById('detailTitle').textContent = recipe.name;
    document.getElementById('detailAuthor').textContent = `Por: ${recipe.author}`;

    // Populate ingredients
    const ingredientsList = document.getElementById('detailIngredients');
    ingredientsList.innerHTML = recipe.ingredients.map(ing => 
        `<li>${ing.name} - ${ing.quantity}</li>`
    ).join('');

    // Populate steps
    const stepsList = document.getElementById('detailSteps');
    stepsList.innerHTML = recipe.steps.map(step => 
        `<li>${step}</li>`
    ).join('');

    // Populate comments
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = recipe.comments.map(comment => 
        `<div class="comment">
            <div class="comment-author">${comment.author}</div>
            <div>${comment.text}</div>
        </div>`
    ).join('');

    // Store current recipe for cart functionality
    sections.recipeDetail.setAttribute('data-recipe-id', recipeId);
}

function showCart() {
    hideAllSections();
    sections.cart.classList.add('visible');
    renderCart();
}

function showProfile() {
    if (!appState.isLoggedIn) {
        showLogin();
        return;
    }
    hideAllSections();
    sections.profile.classList.add('visible');
    renderProfile();
}

function showOrders() {
    if (!appState.isLoggedIn) {
        showLogin();
        return;
    }
    hideAllSections();
    sections.orders.classList.add('visible');
    renderOrders();
}

function showCreateRecipe() {
    if (!appState.isLoggedIn) {
        showLogin();
        return;
    }
    hideAllSections();
    sections.createRecipe.classList.add('visible');
}

function hideAllSections() {
    Object.values(sections).forEach(section => {
        section.classList.remove('visible');
        section.classList.add('hidden');
    });
}

// Auth Functions
// function showLogin() {
//     document.getElementById('loginModal').style.display = 'flex';
// }

// function showRegister() {
//     document.getElementById('registerModal').style.display = 'flex';
// }

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}

function login(email, password) {
    // Simulate login - in real app, this would be an API call
    appState.currentUser = {
        name: 'Usuario Demo',
        email: email,
        id: 1
    };
    appState.isLoggedIn = true;
    
    // Update header
    document.getElementById('authButtons').classList.add('hidden');
    document.getElementById('userButtons').classList.remove('hidden');
    
    closeModal();
    showHome();
}

function logout() {
    appState.currentUser = null;
    appState.isLoggedIn = false;
    appState.cart = [];
    
    // Update header
    document.getElementById('authButtons').classList.remove('hidden');
    document.getElementById('userButtons').classList.add('hidden');
    
    updateCartCount();
    showHome();
}

// Render Functions
function renderRecipes() {
    const recipesGrid = document.getElementById('recipesGrid');
    recipesGrid.innerHTML = appState.recipes.map(recipe => 
        `<div class="recipe-card" onclick="showRecipeDetail(${recipe.id})">
            <div class="recipe-image">${recipe.image}</div>
            <div class="recipe-info">
                <div class="recipe-title">${recipe.name}</div>
                <div class="recipe-author">Por: ${recipe.author}</div>
            </div>
        </div>`
    ).join('');
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (appState.cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Tu carrito está vacío</p>';
        cartTotal.textContent = 'Total: $0';
        return;
    }
    
let total = 0;
cartItems.innerHTML = appState.cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Se genera una lista de ingredientes HTML individuales
    const ingredientesHtml = item.ingredients.map(ing => {
        return `<div class="ingrediente-item">${ing.name} (${ing.quantity})</div>`;
    }).join('');

    return `<div class="cart-item">
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="ingredientes-container">
                ${ingredientesHtml}
            </div>
            <p>Precio unitario: ${item.price}</p>
        </div>
        <div class="cart-item-controls">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
        </div>
    </div>`;
}).join('');
    cartTotal.textContent = `Total: ${total.toFixed(2)}`;
}

function renderProfile() {
    if (appState.currentUser) {
        document.getElementById('profileName').textContent = appState.currentUser.name;
        document.getElementById('profileEmail').textContent = appState.currentUser.email;
    }
    
    // Render user recipes (simulate with first recipe for demo)
    const userRecipes = document.getElementById('userRecipes');
    const userRecipesList = appState.recipes.slice(0, 2); // Demo: show first 2 recipes as user's
    
    userRecipes.innerHTML = userRecipesList.map(recipe => 
        `<div class="recipe-card" onclick="showRecipeDetail(${recipe.id})">
            <div class="recipe-image" style="height: 150px; font-size: 40px;">${recipe.image}</div>
            <div class="recipe-info">
                <div class="recipe-title">${recipe.name}</div>
            </div>
        </div>`
    ).join('');
}

function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (appState.orders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No tienes pedidos aún</p>';
        return;
    }
    
    ordersList.innerHTML = appState.orders.map(order => 
        `<div class="order-card">
            <div class="order-header">
                <h4>Pedido #${order.id}</h4>
                <span class="order-status status-${order.status}">${getStatusText(order.status)}</span>
            </div>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Fecha:</strong> ${order.date}</p>
            <div style="margin-top: 10px;">
                <strong>Productos:</strong>
                <ul style="margin-top: 5px;">
                    ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
                </ul>
            </div>
        </div>`
    ).join('');
}

// Cart Functions
function addRecipeToCart() {
    if (!appState.isLoggedIn) {
        showLogin();
        return;
    }
    
    const recipeId = parseInt(sections.recipeDetail.getAttribute('data-recipe-id'));
    const recipe = appState.recipes.find(r => r.id === recipeId);
    
    if (!recipe) return;
    
    // Check if recipe already in cart
    const existingItem = appState.cart.find(item => item.recipeId === recipeId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            recipeId: recipeId,
            name: recipe.name,
            ingredients: recipe.ingredients,
            price: calculateRecipePrice(recipe.ingredients),
            quantity: 1
        });
    }
    
    updateCartCount();
    alert('Receta agregada al carrito');
}

function calculateRecipePrice(ingredients) {
    // Simulate price calculation based on ingredients
    const basePrices = {
        'Pasta': 2.5,
        'Tomate': 1.0,
        'Ajo': 0.5,
        'Aceite de oliva': 3.0,
        'Albahaca': 1.5,
        'Tortillas': 2.0,
        'Carne molida': 8.0,
        'Cebolla': 0.8,
        'Cilantro': 1.0,
        'Arroz para sushi': 4.0,
        'Alga nori': 3.5,
        'Salmón': 12.0,
        'Pepino': 1.2,
        'Vinagre de arroz': 2.0
    };
    
    return ingredients.reduce((total, ing) => {
        const basePrice = basePrices[ing.name] || 2.0;
        return total + basePrice;
    }, 0);
}

function updateQuantity(index, change) {
    const item = appState.cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        appState.cart.splice(index, 1);
    }
    
    updateCartCount();
    renderCart();
}

function removeFromCart(index) {
    appState.cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = appState.cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function checkout() {
    if (appState.cart.length === 0) return;
    
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const order = {
        id: appState.orders.length + 1,
        items: [...appState.cart],
        total: total.toFixed(2),
        status: 'pending',
        date: new Date().toLocaleDateString()
    };
    
    appState.orders.push(order);
    appState.cart = [];
    updateCartCount();
    
    alert('¡Pedido realizado con éxito! Puedes ver el estado en "Mis pedidos"');
    showOrders();
}

// Recipe Creation
function addIngredientField() {
    const ingredientsList = document.getElementById('ingredientsList');
    const newField = document.createElement('div');
    newField.className = 'ingredient-input-group';
    newField.innerHTML = `
        <input type="text" placeholder="Ingrediente" class="ingredient-name">
        <input type="text" placeholder="Cantidad" class="ingredient-quantity">
        <button type="button" class="remove-ingredient-btn" onclick="removeIngredientField(this)" style="background-color: #dc3545; color: white; border: none; padding: 10px 15px; border-radius: 10px; cursor: pointer;">-</button>
    `;
    ingredientsList.appendChild(newField);
}

function removeIngredientField(button) {
    button.parentElement.remove();
}

function addComment() {
    if (!appState.isLoggedIn) {
        showLogin();
        return;
    }
    
    const commentText = document.getElementById('newComment').value.trim();
    if (!commentText) return;
    
    const recipeId = parseInt(sections.recipeDetail.getAttribute('data-recipe-id'));
    const recipe = appState.recipes.find(r => r.id === recipeId);
    
    if (recipe) {
        recipe.comments.push({
            author: appState.currentUser.name,
            text: commentText
        });
        
        document.getElementById('newComment').value = '';
        showRecipeDetail(recipeId); // Refresh to show new comment
    }
}

// Utility Functions
function getStatusText(status) {
    const statusMap = {
        pending: 'Pendiente',
        received: 'Recibido',
        sent: 'Enviado',
        delivered: 'Entregado'
    };
    return statusMap[status] || status;
}

// // Event Listeners
// document.getElementById('loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const email = this.querySelector('input[type="email"]').value;
//     const password = this.querySelector('input[type="password"]').value;
//     login(email, password);
// });

// document.getElementById('registerForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     // Simulate registration
//     const formData = new FormData(this);
//     alert('Registro exitoso. Ahora puedes iniciar sesión.');
//     closeModal();
//     showLogin();
// });

// document.getElementById('createRecipeForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const recipeName = document.getElementById('recipeName').value;
//     const recipeSteps = document.getElementById('recipeSteps').value;
    
//     // Collect ingredients
//     const ingredientInputs = document.querySelectorAll('.ingredient-input-group');
//     const ingredients = [];
//     ingredientInputs.forEach(group => {
//         const name = group.querySelector('.ingredient-name').value;
//         const quantity = group.querySelector('.ingredient-quantity').value;
//         if (name && quantity) {
//             ingredients.push({ name, quantity });
//         }
//     });
    
//     if (recipeName && ingredients.length > 0 && recipeSteps) {
//         const newRecipe = {
//             id: appState.recipes.length + 1,
//             name: recipeName,
//             author: appState.currentUser.name,
//             image: '🍽️', // Default emoji
//             ingredients: ingredients,
//             steps: recipeSteps.split('\n').filter(step => step.trim()),
//             comments: []
//         };
        
//         appState.recipes.push(newRecipe);
//         renderRecipes();
        
//         // Reset form
//         this.reset();
//         document.getElementById('ingredientsList').innerHTML = `
//             <div class="ingredient-input-group">
//                 <input type="text" placeholder="Ingrediente" class="ingredient-name">
//                 <input type="text" placeholder="Cantidad" class="ingredient-quantity">
//                 <button type="button" class="add-ingredient-btn" onclick="addIngredientField()">+</button>
//             </div>
//         `;
        
//         alert('¡Receta creada exitosamente!');
//         showProfile();
//     } else {
//         alert('Por favor completa todos los campos requeridos.');
//     }
// });

// // Search functionality
// document.getElementById('searchInput').addEventListener('input', function(e) {
//     const searchTerm = e.target.value.toLowerCase();
//     const filteredRecipes = appState.recipes.filter(recipe => 
//         recipe.name.toLowerCase().includes(searchTerm) ||
//         recipe.author.toLowerCase().includes(searchTerm)
//     );
    
//     const recipesGrid = document.getElementById('recipesGrid');
//     recipesGrid.innerHTML = filteredRecipes.map(recipe => 
//         `<div class="recipe-card" onclick="showRecipeDetail(${recipe.id})">
//             <div class="recipe-image">${recipe.image}</div>
//             <div class="recipe-info">
//                 <div class="recipe-title">${recipe.name}</div>
//                 <div class="recipe-author">Por: ${recipe.author}</div>
//             </div>
//         </div>`
//     ).join('');
    
//     if (filteredRecipes.length === 0 && searchTerm) {
//         recipesGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No se encontraron recetas</p>';
//     }
// });

// Close modals when clicking outside
// window.addEventListener('click', function(e) {
//     const loginModal = document.getElementById('loginModal');
//     const registerModal = document.getElementById('registerModal');
    
//     if (e.target === loginModal) {
//         closeModal();
//     }
//     if (e.target === registerModal) {
//         closeModal();
//     }
// });

// Initialize the app
initApp();
