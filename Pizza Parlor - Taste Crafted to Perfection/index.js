document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll("section, footer");
	const navLi = document.querySelectorAll(".nav-links li a");

	window.onscroll = () => {
		let current = "";

		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if(pageYOffset >= sectionTop - 60){
				current = section.getAttribute("id");
			}
		});

		navLi.forEach((li) => {
			li.classList.remove("active");
			if(li.getAttribute("href") === `#${current}`){
				li.classList.add("active");
			}
		});
	};

	const searchIconLink = document.querySelector('.header-icons a[aria-label="Search"]');
	if(searchIconLink){
		searchIconLink.addEventListener('click', (e) => {
			e.preventDefault();
			alert("Search functionality would open here.");
		});
	}

	// --- cart logic ---
	let cart = [];

	const cartButtons = document.querySelectorAll('.add-to-cart');
	const cartCountBadge = document.getElementById('cart-count');
	const openCartBtn = document.getElementById('open-cart-btn');
	const closeReceiptBtn = document.getElementById('close-receipt-btn');
	const receiptModal = document.getElementById('receipt-modal');

	const receiptItemsContainer = document.getElementById('receipt-items-container');
	const receiptTotalPrice = document.getElementById('receipt-total-price');
	const receiptDate = document.getElementById('receipt-date');

	cartButtons.forEach(button => {
		button.addEventListener('click', function(){
			const card = this.closest('.menu-card') || this.closest('.special-card');
			const name = card.querySelector('h3').innerText;

			const priceElement = card.querySelector('.new-price') || card.querySelector('.price');
			const priceText = priceElement.innerText;
			const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

			const existingItem = cart.find(item => item.name === name);

			if(existingItem){
				existingItem.quantity += 1;
			}else{
				cart.push({name:name, price:price, quantity:1});
			}

			updateCartBadge();
			alert(`${name} added to your basket!`);
		});
	});

	function updateCartBadge(){
		const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

		cartCountBadge.innerText = totalItems;

		cartCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
	}

	openCartBtn.addEventListener('click', (e) => {
		e.preventDefault();
		generateReceipt();
		receiptModal.classList.add('active');
	});

	closeReceiptBtn.addEventListener('click', () => {
		receiptModal.classList.remove('active');
	});

	receiptModal.addEventListener('click', (e) => {
		if(e.target === receiptModal){
			receiptModal.classList.remove('active');
		}
	});

	function generateReceipt(){
		receiptItemsContainer.innerHTML = '';

		const now = new Date();
		receiptDate.innerText = `Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

		if(cart.length === 0){
			receiptItemsContainer.innerHTML = 
			'<p style="text-align:center; color:#777; margin:20px 0;">Your cart is empty.</p>';
			receiptTotalPrice.innerText = "UGX 0";
			return;
		}

		let totalBill = 0;

		cart.forEach(item => {
			const rowTotal = item.price * item.quantity;
			totalBill += rowTotal;

			const row = document.createElement('div');
			row.className = 'receipt-item-row';

			const formattedRowTotal = rowTotal.toLocaleString('en-US');

			row.innerHTML = `
				<span class="receipt-item-qty">${item.quantity}x</span>
				<span class="receipt-item-name">${item.name}</span>
				<span>UGX ${formattedRowTotal}</span>
			`;

			receiptItemsContainer.appendChild(row);

		});

		receiptTotalPrice.innerText = `UGX ${totalBill.toLocaleString('en-US')}`;
	}

		// Testimonials Carousel Arrows
	const track = document.getElementById('testimonialTrack');
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');

	if(track && prevBtn && nextBtn){
		nextBtn.addEventListener('click', () => {
			track.scrollBy({left:380,behavior:'smooth'});
		});
		prevBtn.addEventListener('click', () => {
			track.scrollBy({left:-380, behavior:'smooth'});
		});
	}

	// navbar highlight on scroll
	
	window.onscroll = () => {
		let current = "";
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if(pageYOffset >= sectionTop - 100){
				current = section.getAttribute("id");
			}
		});

		navLi.forEach((li) => {
			li.classList.remove("active");
			if(li.getAttribute("href") === `#${current}`){
				li.classList.add("active");
			}
		});
	};

	// Sign up Modal

	const openSignupBtn = document.getElementById('open-signup-btn');
	const closeSignupBtn = document.getElementById('close-signup-btn');
	const signupModal = document.getElementById('signup-modal');

	if(openSignupBtn && signupModal){
		openSignupBtn.addEventListener('click', (e)=>{
			e.preventDefault();
			signupModal.classList.add('active');
		});
		closeSignupBtn.addEventListener('click',()=>{
			signupModal.classList.remove('active');
		});
		signupModal.addEventListener('click',(e)=>{
			if(e.target===signupModal){signupModal.classList.remove('active');}
		});
	}

});

