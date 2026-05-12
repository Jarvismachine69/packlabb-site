// Packlabb — shared interactions + cart + Shopify checkout

var SHOPIFY_STORE = 'bxuave-7n.myshopify.com';

// SKU → Shopify variant ID map
var SHOPIFY_VARIANTS = {
  'CAN-250-SAMPLE': 48812896321786,
  'CAN-250-P-50': 48812896354554, 'CAN-250-P-100': 48812896420090,
  'CAN-250-P-200': 48812896452858, 'CAN-250-P-400': 48812896485626,
  'CAN-250-P-600': 48812896518394, 'CAN-250-P-800': 48812896551162,
  'CAN-250-P-1000': 48812896583930, 'CAN-250-P-2000': 48812896616698,
  'CAN-250-P-5000': 48812896682234,
  'CAN-250-U-1CTN': 48812896715002, 'CAN-250-U-2CTN': 48812896747770,
  'CAN-250-U-5CTN': 48812896780538, 'CAN-250-U-10CTN': 48812896813306,
  'CAN-330-SAMPLE': 48812897272058,
  'CAN-330-P-50': 48812897304826, 'CAN-330-P-100': 48812897337594,
  'CAN-330-P-200': 48812897370362, 'CAN-330-P-400': 48812897403130,
  'CAN-330-P-600': 48812897435898, 'CAN-330-P-800': 48812897468666,
  'CAN-330-P-1000': 48812897534202, 'CAN-330-P-2000': 48812897566970,
  'CAN-330-P-5000': 48812897599738,
  'CAN-330-U-1CTN': 48812897632506, 'CAN-330-U-2CTN': 48812897665274,
  'CAN-330-U-5CTN': 48812897698042, 'CAN-330-U-10CTN': 48812897730810,
  'CAN-500-SAMPLE': 48812897796346,
  'CAN-500-P-50': 48812897829114, 'CAN-500-P-100': 48812897861882,
  'CAN-500-P-200': 48812897894650, 'CAN-500-P-400': 48812897927418,
  'CAN-500-P-600': 48812897960186, 'CAN-500-P-800': 48812897992954,
  'CAN-500-P-1000': 48812898025722, 'CAN-500-P-2000': 48812898058490,
  'CAN-500-P-5000': 48812898124026,
  'CAN-500-U-1CTN': 48812898156794, 'CAN-500-U-2CTN': 48812898189562,
  'CAN-500-U-5CTN': 48812898222330, 'CAN-500-U-10CTN': 48812898255098,
  'CUP-SAMPLE': 48812898386170,
  'CUP-8-P-50': 48812898451706, 'CUP-8-P-100': 48812898484474,
  'CUP-8-P-250': 48812898517242, 'CUP-8-P-500': 48812898550010,
  'CUP-8-P-1000': 48812898582778, 'CUP-8-P-2000': 48812898615546,
  'CUP-8-P-5000': 48812898648314, 'CUP-8-P-10000': 48812898681082,
  'CUP-12-P-50': 48812898746618, 'CUP-12-P-100': 48812898779386,
  'CUP-12-P-250': 48812898812154, 'CUP-12-P-500': 48812898844922,
  'CUP-12-P-1000': 48812898877690, 'CUP-12-P-2000': 48812898910458,
  'CUP-12-P-5000': 48812898943226, 'CUP-12-P-10000': 48812898975994,
  'CUP-16-P-50': 48812899041530, 'CUP-16-P-100': 48812899074298,
  'CUP-16-P-250': 48812899107066, 'CUP-16-P-500': 48812899139834,
  'CUP-16-P-1000': 48812899172602, 'CUP-16-P-2000': 48812899205370,
  'CUP-16-P-5000': 48812899238138, 'CUP-16-P-10000': 48812899270906,
  'CUP-8-U-1CTN': 48812899336442, 'CUP-12-U-1CTN': 48812899369210, 'CUP-16-U-1CTN': 48812899401978,
  'PETCUP-SAMPLE': 48812899631354,
  'PCUP-N12-P-50': 48812899664122, 'PCUP-N12-P-100': 48812899696890,
  'PCUP-N12-P-250': 48812899729658, 'PCUP-N12-P-500': 48812899762426,
  'PCUP-N12-P-1000': 48812899827962, 'PCUP-N12-P-2000': 48812899860730,
  'PCUP-N12-P-5000': 48812899893498, 'PCUP-N12-P-10000': 48812899926266,
  'PCUP-N16-P-50': 48812899959034, 'PCUP-N16-P-100': 48812899991802,
  'PCUP-N16-P-250': 48812900024570, 'PCUP-N16-P-500': 48812900057338,
  'PCUP-N16-P-1000': 48812900090106, 'PCUP-N16-P-2000': 48812900155642,
  'PCUP-N16-P-5000': 48812900188410, 'PCUP-N16-P-10000': 48812900221178,
  'PCUP-N20-P-50': 48812900253946, 'PCUP-N20-P-100': 48812900286714,
  'PCUP-N20-P-250': 48812900319482, 'PCUP-N20-P-500': 48812900352250,
  'PCUP-N20-P-1000': 48812900385018, 'PCUP-N20-P-2000': 48812900450554,
  'PCUP-N20-P-5000': 48812900483322, 'PCUP-N20-P-10000': 48812900516090,
  'PCUP-N24-P-50': 48812900548858, 'PCUP-N24-P-100': 48812900581626,
  'PCUP-N24-P-250': 48812900614394, 'PCUP-N24-P-500': 48812900647162,
  'PCUP-N24-P-1000': 48812900679930, 'PCUP-N24-P-2000': 48812900745466,
  'PCUP-N24-P-5000': 48812900778234, 'PCUP-N24-P-10000': 48812900811002,
  'PCUP-U12-P-50': 48812900843770, 'PCUP-U12-P-100': 48812900876538,
  'PCUP-U12-P-250': 48812900909306, 'PCUP-U12-P-500': 48812900942074,
  'PCUP-U12-P-1000': 48812900974842, 'PCUP-U12-P-2000': 48812901040378,
  'PCUP-U12-P-5000': 48812901073146, 'PCUP-U12-P-10000': 48812901105914,
  'PCUP-U16-P-50': 48812901138682, 'PCUP-U16-P-100': 48812901171450,
  'PCUP-U16-P-250': 48812901204218, 'PCUP-U16-P-500': 48812901236986,
  'PCUP-U16-P-1000': 48812901269754, 'PCUP-U16-P-2000': 48812901335290,
  'PCUP-U16-P-5000': 48812901368058, 'PCUP-U16-P-10000': 48812901400826,
  'PCUP-U20-P-50': 48812901433594, 'PCUP-U20-P-100': 48812901466362,
  'PCUP-U20-P-250': 48812901499130, 'PCUP-U20-P-500': 48812901531898,
  'PCUP-U20-P-1000': 48812901564666, 'PCUP-U20-P-2000': 48812901630202,
  'PCUP-U20-P-5000': 48812901662970, 'PCUP-U20-P-10000': 48812901695738,
  'PCUP-U24-P-50': 48812901728506, 'PCUP-U24-P-100': 48812901761274,
  'PCUP-U24-P-250': 48812901794042, 'PCUP-U24-P-500': 48812901826810,
  'PCUP-U24-P-1000': 48812901859578, 'PCUP-U24-P-2000': 48812901925114,
  'PCUP-U24-P-5000': 48812901957882, 'PCUP-U24-P-10000': 48812901990650,
  'PCUP-N12-U-1CTN': 48812902023418, 'PCUP-N16-U-1CTN': 48812902056186,
  'PCUP-N20-U-1CTN': 48812902088954, 'PCUP-N24-U-1CTN': 48812902154490,
  'PCUP-U12-U-1CTN': 48812902187258, 'PCUP-U16-U-1CTN': 48812902220026,
  'PCUP-U20-U-1CTN': 48812902252794, 'PCUP-U24-U-1CTN': 48812902285562
};

// ============================================================
// CART
// ============================================================
var CART_KEY = 'packlabb_cart_v1';
var cart = [];

function cartLoad() {
  try {
    var raw = localStorage.getItem(CART_KEY);
    if (raw) cart = JSON.parse(raw) || [];
  } catch(e) { cart = []; }
}

function cartSave() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch(e) {}
}

function cartGetSku(sku) {
  return cart.find(function(i){ return i.sku === sku; });
}

function cartAdd(sku, label, price) {
  var vid = SHOPIFY_VARIANTS[sku];
  if (!vid) {
    alert('We could not add that to your cart automatically. Please call 0415 743 691 or email info@packlabb.com.au and we will set it up for you. Quote SKU: ' + sku);
    return;
  }
  var existing = cartGetSku(sku);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ sku: sku, variantId: vid, label: label, price: price, qty: 1 });
  }
  cartSave();
  cartRender();
  cartOpen();
}

function cartRemove(sku) {
  cart = cart.filter(function(i){ return i.sku !== sku; });
  cartSave();
  cartRender();
}

function cartTotal() {
  return cart.reduce(function(sum, i){ return sum + i.price * i.qty; }, 0);
}

function cartCount() {
  return cart.reduce(function(sum, i){ return sum + i.qty; }, 0);
}

function cartRender() {
  var el = document.getElementById('cart-items');
  var totalEl = document.getElementById('cart-total');
  var countEl = document.getElementById('cart-count');
  var emptyEl = document.getElementById('cart-empty');
  var footEl = document.getElementById('cart-foot');

  if (!el) return;

  // Update badge
  var count = cartCount();
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }

  if (cart.length === 0) {
    el.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'flex';
    if (footEl) footEl.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (footEl) footEl.style.display = 'block';

  el.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-label">' + item.label + '</div>' +
        '<div class="cart-item-price">$' + (item.price * item.qty).toFixed(2) + ' ex GST</div>' +
      '</div>' +
      '<div class="cart-item-actions">' +
        '<span class="cart-item-qty">' + item.qty + 'x</span>' +
        '<button class="cart-item-remove" onclick="cartRemove(\'' + item.sku + '\')" aria-label="Remove">✕</button>' +
      '</div>' +
    '</div>';
  }).join('');

  if (totalEl) {
    totalEl.textContent = '$' + cartTotal().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

function cartOpen() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cartClose() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function cartCheckout() {
  if (cart.length === 0) return;
  var items = cart.map(function(i){ return i.variantId + ':' + i.qty; }).join(',');
  var url = 'https://' + SHOPIFY_STORE + '/cart/' + items;
  window.location.href = url;
}

// Build the cart drawer HTML and inject into body
function cartInit() {
  var html = '<div id="cart-overlay" onclick="cartClose()"></div>' +
    '<div id="cart-drawer">' +
      '<div class="cart-head">' +
        '<h3>Your order</h3>' +
        '<button class="cart-close" onclick="cartClose()" aria-label="Close cart">✕</button>' +
      '</div>' +
      '<div id="cart-empty" class="cart-empty">' +
        '<div style="font-size:40px;margin-bottom:12px;">🛒</div>' +
        '<p>Your cart is empty.</p>' +
        '<p style="font-size:13px;color:var(--ink-3);margin-top:6px;">Add items from any product page.</p>' +
      '</div>' +
      '<div id="cart-items" class="cart-items"></div>' +
      '<div id="cart-foot" class="cart-foot" style="display:none;">' +
        '<div class="cart-foot-row">' +
          '<span>Total (ex GST)</span>' +
          '<strong id="cart-total">$0.00</strong>' +
        '</div>' +
        '<p style="font-size:12px;color:var(--ink-3);margin-bottom:14px;">GST added at checkout. Free express shipping over $200.</p>' +
        '<button class="cart-checkout-btn" onclick="cartCheckout()">Proceed to checkout →</button>' +
        '<p style="font-size:12px;color:var(--ink-3);text-align:center;margin-top:10px;">Secure checkout. Proof sent before we print anything.</p>' +
      '</div>' +
    '</div>';
  var el = document.createElement('div');
  el.innerHTML = html;
  document.body.appendChild(el);
  cartRender();
}

// Called by product pages — adds to cart and shows drawer
function goToCheckout(sku, label, price) {
  cartAdd(sku, label, price);
}

// ============================================================
// NAV
// ============================================================
function toggleNav(btn) {
  btn.classList.toggle('open');
  document.getElementById('nav-menu').classList.toggle('mobile-open');
}

// ============================================================
// SHARED UI
// ============================================================
function toggleFaq(el) {
  el.classList.toggle('open');
}

function artUploaded(input) {
  if (input.files && input.files[0]) {
    var n = document.getElementById('art-name');
    if (n) { n.textContent = 'Attached: ' + input.files[0].name; n.style.display = 'block'; }
  }
}

function showTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('on'); });
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('on'); });
  document.getElementById('tab-' + id).classList.add('on');
  btn.classList.add('on');
}

// Init cart on page load
document.addEventListener('DOMContentLoaded', function() {
  cartLoad();
  cartInit();
});
