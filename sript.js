    document.addEventListener("DOMContentLoaded", () => {
        // Navegação
        const navLinks = document.querySelectorAll("nav a")
    
        navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            navLinks.forEach((item) => item.classList.remove("active"))
            this.classList.add("active")
        })
        })
    
        // Atualizar navegação ativa com base na rolagem
        window.addEventListener("scroll", () => {
        let current = ""
        const sections = document.querySelectorAll("section")
    
        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
    
            if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id")
            }
        })
    
        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active")
            }
        })
        })
    
        // Modal de imagem
        const imageModal = document.getElementById("imageModal")
        const modalImg = document.getElementById("modalImg")
        const closeButtons = document.querySelectorAll(".close-modal")
    
        // Função para abrir o modal de imagem
        window.openModal = (img) => {
        imageModal.style.display = "block"
        modalImg.src = img.src
        }
    
        // Modal de WiFi
        const wifiBtn = document.getElementById("wifi-btn")
        const wifiModal = document.getElementById("wifiModal")
        const connectWifiBtn = document.getElementById("connect-wifi-btn")
    
        if (wifiBtn) {
        wifiBtn.addEventListener("click", () => {
            wifiModal.style.display = "block"
        })
        }
    
        if (connectWifiBtn) {
        connectWifiBtn.addEventListener("click", () => {
            // Aqui você pode adicionar código para conectar automaticamente ao WiFi
            // Isso geralmente requer permissões especiais ou integração com APIs nativas
            alert("Função de conexão automática disponível apenas em dispositivos compatíveis.")
        })
        }
    
        // Modal de PIX
        const pixBtn = document.getElementById("pix-btn")
        const pixModal = document.getElementById("pixModal")
        const copyPixBtn = document.getElementById("copy-pix-btn")
    
        if (pixBtn) {
        pixBtn.addEventListener("click", () => {
            pixModal.style.display = "block"
        })
        }
    
        if (copyPixBtn) {
        copyPixBtn.addEventListener("click", () => {
            // Copiar a chave PIX para a área de transferência
            const pixKey = "12960037000140"
    
            navigator.clipboard
            .writeText(pixKey)
            .then(() => {
                alert("Chave PIX copiada para a área de transferência!")
            })
            .catch(() => {
                // Fallback para navegadores que não suportam clipboard API
                const tempInput = document.createElement("input")
                tempInput.value = pixKey
                document.body.appendChild(tempInput)
                tempInput.select()
                document.execCommand("copy")
                document.body.removeChild(tempInput)
                alert("Chave PIX copiada para a área de transferência!")
            })
        })
        }
    
        // Fechar modais
        closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            imageModal.style.display = "none"
            wifiModal.style.display = "none"
            pixModal.style.display = "none"
        })
        })
    
        // Fechar modal ao clicar fora
        window.addEventListener("click", (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = "none"
        }
        if (e.target === wifiModal) {
            wifiModal.style.display = "none"
        }
        if (e.target === pixModal) {
            pixModal.style.display = "none"
        }
        })
    
        // Processar logo para fundo transparente
        function processLogo() {
        const logo = new Image()
        logo.crossOrigin = "anonymous"
        logo.src = "logo.png"
    
        logo.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = logo.width
            canvas.height = logo.height
    
            const ctx = canvas.getContext("2d")
            ctx.drawImage(logo, 0, 0)
    
            // Converter para PNG com transparência
            const logoElements = document.querySelectorAll('img[src="logo.png"]')
            logoElements.forEach((element) => {
            element.src = canvas.toDataURL("image/png")
            })
        }
        }
    
        // Inicializar processamento do logo
        processLogo()
    
        // Substituir imagens de placeholder por imagens reais quando disponíveis
        function loadPlaceholderImages() {
        const images = document.querySelectorAll('img[src^="img/"]')
    
        images.forEach((img) => {
            // Verificar se a imagem existe
            const xhr = new XMLHttpRequest()
            xhr.open("HEAD", img.src, true)
            xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 404) {
                // Se a imagem não existir, usar um placeholder
                const width = img.width || 300
                const height = img.height || 200
                img.src = `https://via.placeholder.com/${width}x${height}/cccccc/333333?text=Neilan+Estética`
                }
            }
            }
            xhr.send(null)
        })
        }
    
        // Carregar imagens de placeholder
        loadPlaceholderImages()
    })
    
    