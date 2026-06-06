let designState = {
    colorId: 'orange',
    colorClass: 'bg-amber-500',
    colorName: 'Neon Turuncu',
    textureId: 'none',
    textureName: 'Düz Premium Mat',
    logoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80',
    logoName: 'Asi Smiley',
    text: 'FLAME'
};

let quantity = 1;
let cart = [];

const textures = {
    none: 'none',
    splash: 'radial-gradient(circle, #000000 15%, transparent 16%), radial-gradient(circle, rgba(255,255,255,0.2) 8%, transparent 9%)',
    marble: 'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
    carbon: 'linear-gradient(45deg, rgba(0,0,0,0.15) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,0.15) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.15) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.15) 75%)'
};

function showNotification(title, message, isSuccess = false) {
    document.getElementById('notification-title').innerText = title;
    document.getElementById('notification-message').innerText = message;
    const icon = document.getElementById('notification-icon');
    const iconContainer = document.getElementById('notification-icon-container');

    if (isSuccess) {
        icon.className = "fa-solid fa-circle-check text-2xl text-emerald-500";
        iconContainer.className = "w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20";
    } else {
        icon.className = "fa-solid fa-circle-exclamation text-2xl text-amber-500";
        iconContainer.className = "w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20";
    }

    document.getElementById('notification-modal').classList.remove('hidden');
}

function closeNotification() {
    document.getElementById('notification-modal').classList.add('hidden');
}

function updateColor(colorId, colorClass, colorName, caseText) {
    designState.colorId = colorId;
    designState.colorClass = colorClass;
    designState.colorName = colorName;
    designState.text = caseText;

    const previewCase = document.getElementById('preview-case');
    const previewText = document.getElementById('preview-case-text');
    const studioGlow = document.getElementById('studio-glow');

    previewCase.className = `w-[4.5rem] h-36 rounded-[1.5rem] p-3 flex flex-col items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-all duration-500 border border-white/10 relative overflow-hidden ${colorClass}`;

    if (colorId === 'white') {
        previewText.className = "text-[10px] font-black uppercase tracking-[0.25em] text-zinc-950 text-center drop-shadow-md select-none mix-blend-multiply opacity-80";
        studioGlow.className = "absolute w-72 h-72 rounded-full bg-white/5 blur-[90px] -z-10 transition-all duration-700 transform -translate-y-12";
    } else if (colorId === 'dark') {
        previewText.className = "text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 text-center drop-shadow-md select-none mix-blend-screen opacity-90";
        studioGlow.className = "absolute w-72 h-72 rounded-full bg-zinc-700/10 blur-[90px] -z-10 transition-all duration-700 transform -translate-y-12";
    } else {
        previewText.className = "text-[10px] font-black uppercase tracking-[0.25em] text-zinc-950 text-center drop-shadow-md select-none mix-blend-multiply opacity-80";
        studioGlow.className = `absolute w-72 h-72 rounded-full blur-[90px] -z-10 transition-all duration-700 transform -translate-y-12 ${colorClass}/10`;
    }

    previewText.innerText = caseText;
    document.getElementById('label-color-name').innerText = colorName;

    const buttons = document.querySelectorAll('[onclick^="updateColor"]');
    buttons.forEach(btn => btn.classList.remove('border-amber-500'));
    event.currentTarget.classList.add('border-amber-500');
}

function updateTexture(textureId, textureName) {
    designState.textureId = textureId;
    designState.textureName = textureName;

    const textureLayer = document.getElementById('preview-texture-layer');
    textureLayer.style.backgroundImage = textures[textureId];

    if (textureId === 'carbon') {
        textureLayer.style.backgroundSize = '8px 8px';
    } else if (textureId === 'splash') {
        textureLayer.style.backgroundSize = '24px 24px';
    } else {
        textureLayer.style.backgroundSize = 'auto';
    }

    document.getElementById('label-texture-name').innerText = textureName;

    const buttons = document.querySelectorAll('[onclick^="updateTexture"]');
    buttons.forEach(btn => btn.classList.remove('border-amber-500'));
    event.currentTarget.classList.add('border-amber-500');
}

function updateLogo(logoUrl, logoName) {
    designState.logoUrl = logoUrl;
    designState.logoName = logoName;
    document.getElementById('preview-logo-img').src = logoUrl;

    if (event && event.currentTarget) {
        const buttons = document.querySelectorAll('[onclick^="updateLogo"]');
        buttons.forEach(btn => btn.classList.remove('border-amber-500'));
        event.currentTarget.classList.add('border-amber-500');
    }
}

async function generateAiLogo() {
    const promptInput = document.getElementById('ai-prompt-input');
    const promptText = promptInput.value.trim();

    if (!promptText) {
        showNotification("Prompt Gerekli", "Lütfen üretmek istediğiniz görsel için bir açıklama yazın.");
        return;
    }

    const btnIcon = document.getElementById('ai-btn-icon');
    const btnText = document.getElementById('ai-btn-text');
    const logoWrapper = document.getElementById('preview-logo-wrapper');

    btnIcon.className = "fa-solid fa-spinner animate-spin text-amber-500";
    btnText.innerText = "Görselleşiyor...";
    logoWrapper.classList.add('animate-shimmer');

    try {
        const apiKey = "";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
        const enrichedPrompt = `A high quality circular graphic patch design of: ${promptText}. Highly detailed vector-art illustration style, perfect circles, flat black isolated background. Suitable for a metal medallion badge.`;
        const payload = {
            instances: [{ prompt: enrichedPrompt }],
            parameters: { sampleCount: 1 }
        };

        let response;
        let delay = 1000;

        for (let i = 0; i < 5; i++) {
            try {
                response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (response.ok) break;
            } catch (e) {
                if (i === 4) throw e;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }

        if (!response || !response.ok) {
            throw new Error("Görsel oluşturma sunucusu meşgul.");
        }

        const result = await response.json();
        const base64Data = result.predictions[0].bytesBase64Encoded;
        const generatedImageUrl = `data:image/png;base64,${base64Data}`;
        updateLogo(generatedImageUrl, `AI: ${promptText.substring(0, 15)}...`);
        promptInput.value = "";
    } catch (error) {
        console.error(error);
        showNotification("Sistem Yoğun", "Yapay zeka görsel üretimi sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
        btnIcon.className = "fa-solid fa-gear";
        btnText.innerText = "Görsel Üret";
        logoWrapper.classList.remove('animate-shimmer');
    }
}

function changeQuantity(amount) {
    quantity += amount;
    if (quantity < 1) quantity = 1;
    document.getElementById('quantity-display').innerText = quantity;
}

function addToBasket() {
    const newItem = {
        id: Date.now(),
        design: { ...designState },
        qty: quantity,
        price: 199.90
    };
    cart.push(newItem);
    quantity = 1;
    document.getElementById('quantity-display').innerText = 1;
    updateCartBadge();
    showToast();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalQty;
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.className = "fixed bottom-6 right-6 bg-white text-zinc-950 font-bold px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 transition-transform duration-300 translate-y-0 opacity-100";
    setTimeout(() => {
        toast.className = "fixed bottom-6 right-6 bg-white text-zinc-950 font-bold px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 transition-transform duration-300 translate-y-24 opacity-0 pointer-events-none";
    }, 3000);
}

function openCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalText = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-xs text-zinc-500 text-center py-8">Sepetinizde ürün bulunamadı.</p>`;
        totalText.innerText = '0.00 TL';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, idx) => {
        const sub = item.price * item.qty;
        total += sub;
        html += `<div class="flex items-center justify-between bg-zinc-950 p-3 rounded-2xl border border-zinc-800"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 overflow-hidden relative"><img src="${item.design.logoUrl}" class="w-full h-full object-cover"></div><div><p class="text-[11px] font-bold text-white">${item.design.colorName} / ${item.design.text}</p><p class="text-[9px] text-zinc-400">${item.design.textureName} • ${item.design.logoName}</p></div></div><div class="text-right"><p class="text-xs font-bold text-white">${sub.toFixed(2)} TL</p><p class="text-[9px] text-zinc-500">${item.qty} Adet</p><button onclick="removeFromCart(${idx})" class="text-[10px] text-red-500 hover:underline">Sil</button></div></div>`;
    });

    container.innerHTML = html;
    totalText.innerText = `${total.toFixed(2)} TL`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCartItems();
}

function checkoutOrder() {
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const address = document.getElementById('cust-address').value.trim();

    if (cart.length === 0) {
        showNotification("Boş Sepet", "Lütfen sepetinize bir ürün ekleyin.");
        return;
    }

    if (!name || !phone || !address) {
        showNotification("Bilgiler Eksik", "Lütfen kargo bilgilerini doldurun.");
        return;
    }

    showNotification("Siparış Başarılı!", `${name}, siparişiniz onaylandı. ${phone} numarasına SMS ile kargo takip bilgisi gönderilecektir.`, true);
    closeCart();
    cart = [];
    updateCartBadge();
    document.getElementById('cust-name').value = '';
    document.getElementById('cust-phone').value = '';
    document.getElementById('cust-address').value = '';
}