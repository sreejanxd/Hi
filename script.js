async function getPairCode() {
    const whatsapp = document.getElementById("whatsapp").value;

    if (!whatsapp) {
        alert("⚠️ দয়া করে আপনার WhatsApp নম্বর দিন!");
        return;
    }

    const response = await fetch('/get-pair-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp })
    });

    const data = await response.json();

    if (data.pairCode) {
        document.getElementById("pair-code").innerText = data.pairCode;
        document.getElementById("pair-code-section").style.display = "block";
    } else {
        alert("❌ Pair Code আনতে সমস্যা হয়েছে!");
    }
}

async function sendMusic() {
    const pairCode = document.getElementById("pair-code").innerText;
    const musicUrl = document.getElementById("music-url").value;

    if (!musicUrl) {
        alert("⚠️ দয়া করে মিউজিক লিংক দিন!");
        return;
    }

    const response = await fetch('/send-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pairCode, musicUrl })
    });

    const data = await response.json();

    if (data.success) {
        alert("✅ মিউজিক WhatsApp এ পাঠানো হয়েছে!");
    } else {
        alert("❌ মিউজিক পাঠাতে সমস্যা হয়েছে!");
    }
}
