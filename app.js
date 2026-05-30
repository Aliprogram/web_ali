async function actualizarDivisas() {
    const laBarra = document.getElementById('mi-barra-prueba');

    // Valores fijos por si la API se cae o no hay internet
    const OFICIAL_BASE = 6.96;
    let paraleloFinal = 11.45; 

    try {
        const response = await fetch('https://paralelo.bo/api/v1/rate');
        if (!response.ok) throw new Error('Error de conexión');
        const data = await response.json();
        
        if (data && data.median) {
            paraleloFinal = parseFloat(data.median);
            console.log("¡API decodificada con éxito! Valor actual:", paraleloFinal);
        }
    } catch (error) {
        console.warn("Usando respaldo comercial:", error.message);
    }

    // 3. Pintamos la barra optimizada para Celulares y Computadoras
    if (laBarra) {
        laBarra.style.backgroundColor = "#0b0f19"; 
        laBarra.style.color = "#ffffff";           
        laBarra.style.padding = "6px 10px";
        laBarra.style.width = "100%";
        laBarra.style.boxSizing = "border-box";
        
        // 🌟 EL TRUCO PARA MÓVILES: Flexbox dinámico que se adapta al tamaño de pantalla
        laBarra.style.display = "flex";
        laBarra.style.flexWrap = "wrap"; 
        laBarra.style.justifyContent = "center";
        laBarra.style.alignItems = "center";
        laBarra.style.gap = "10px"; // Espaciado inteligente entre elementos
        laBarra.style.fontSize = "13px"; // Un toque más sutil en tamaño de letra

        laBarra.innerHTML = `
            <span style="color: #ff9f43; font-weight: bold; white-space: nowrap;">📊 MERCADO CAMBIARIO</span>
            <span style="white-space: nowrap; font-family: Arial, sans-serif;">Dólar Oficial: <strong style="color: #4cd137;">${OFICIAL_BASE.toFixed(2)}</strong> BS</span>
            <span style="white-space: nowrap; font-family: Arial, sans-serif;">Dólar Paralelo: <strong style="color: #4cd137;">${paraleloFinal.toFixed(2)}</strong> BS</span>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarDivisas();
});