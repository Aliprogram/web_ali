async function actualizarDivisas() {
    const laBarra = document.getElementById('mi-barra-prueba');

    // 1. Valores fijos de respaldo (por si la API se cae o no hay internet)
    let compraFinal = 11.20; 
    let ventaFinal = 11.50; 

    try {
        const response = await fetch('https://paralelo.bo/api/v1/rate');
        if (!response.ok) throw new Error('Error de conexión');
        const data = await response.json();
        
        // 2. Extraemos los valores de compra y venta de la API
        if (data) {
            // Nota: La API suele usar 'buy' y 'sell'. Si usaran español, cambiar a data.compra / data.venta
            if (data.buy) compraFinal = parseFloat(data.buy);
            if (data.sell) ventaFinal = parseFloat(data.sell);
            
            console.log("¡API decodificada con éxito! Compra:", compraFinal, "Venta:", ventaFinal);
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
        
        laBarra.style.display = "flex";
        laBarra.style.flexWrap = "wrap"; 
        laBarra.style.justifyContent = "center";
        laBarra.style.alignItems = "center";
        laBarra.style.gap = "15px"; // Un poco más de espacio al quitar un elemento
        laBarra.style.fontSize = "13px"; 

        // Actualizamos el HTML interno removiendo el oficial e introduciendo Compra y Venta
        laBarra.innerHTML = `
            <span style="color: #ff9f43; font-weight: bold; white-space: nowrap;">📊 MERCADO CAMBIARIO</span>
            <span style="white-space: nowrap; font-family: Arial, sans-serif;">Dólar Compra: <strong style="color: #4cd137;">${compraFinal.toFixed(2)}</strong> BS</span>
            <span style="white-space: nowrap; font-family: Arial, sans-serif;">Dólar Venta: <strong style="color: #4cd137;">${ventaFinal.toFixed(2)}</strong> BS</span>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarDivisas();
});