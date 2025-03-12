document.addEventListener("DOMContentLoaded", () => {
    // Modais
    const imageModal = document.getElementById("imageModal");
    const wifiModal = document.getElementById("wifiModal");
    const pixModal = document.getElementById("pixModal");
    
    // Botões
    const wifiBtn = document.getElementById("wifi-btn");
    const pixBtn = document.getElementById("pix-btn");
    const copyPixBtn = document.getElementById("copy-pix-btn");
    const connectWifiBtn = document.getElementById("connect-wifi-btn");
    const saveContactBtn = document.getElementById("save-contact-btn");
    
    // Fechamento de modais
    const closeButtons = document.querySelectorAll(".close-modal");
    
    // Funções para abrir modais
    function openWifiModal() {
        wifiModal.style.display = "block";
    }
    
    function openPixModal() {
        pixModal.style.display = "block";
    }
    
    // Função para fechar modais
    function closeModals() {
        imageModal.style.display = "none";
        wifiModal.style.display = "none";
        pixModal.style.display = "none";
    }
    
    // Função para abrir modal de imagem
    function openModal(img) {
        const modalImg = document.getElementById("modalImg");
        imageModal.style.display = "block";
        modalImg.src = img.src;
    }
    
    // Adicionar essa função ao escopo global para uso nos elementos HTML
    window.openModal = openModal;
    
    // Função para copiar chave PIX
    function copyPixKey() {
        const pixKey = "(75) 99957-7306"; // Chave PIX do seu código HTML
        
        // Tentar usar a API Clipboard moderna
        if (navigator.clipboard) {
            navigator.clipboard.writeText(pixKey)
                .then(() => {
                    alert("Chave PIX copiada com sucesso! Agora você pode colar no seu aplicativo bancário.");
                })
                .catch(err => {
                    // Fallback para o método antigo se a API Clipboard falhar
                    fallbackCopyTextToClipboard(pixKey);
                });
        } else {
            // Fallback para navegadores que não suportam a API Clipboard
            fallbackCopyTextToClipboard(pixKey);
        }
    }
    
    // Método alternativo para copiar texto
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Tornar o elemento invisível
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand("copy");
            if (successful) {
                alert("Chave PIX copiada com sucesso! Agora você pode colar no seu aplicativo bancário.");
            } else {
                alert("Não foi possível copiar a chave PIX. Por favor, copie manualmente: " + text);
            }
        } catch (err) {
            alert("Não foi possível copiar a chave PIX. Por favor, copie manualmente: " + text);
        }
        
        document.body.removeChild(textArea);
    }
    
    // Função para conectar ao WiFi
    function connectToWifi() {
        const ssid = "Bianca";
        const password = "01477410bia";
        
        // Verificar se o navegador suporta a API Web Bluetooth (disponível em alguns navegadores mobile)
        if (navigator && navigator.bluetooth) {
            alert("Tentando conectar automaticamente à rede WiFi: " + ssid);
            // Aqui você poderia implementar a lógica real de conexão, mas isso é limitado por segurança dos navegadores
            // Na prática, a API Web Bluetooth não permite conectar diretamente ao WiFi
        } else {
            // Informar o usuário sobre como conectar manualmente
            alert("Para conectar ao WiFi:\n1. Abra as configurações de WiFi do seu dispositivo\n2. Selecione a rede: " + ssid + "\n3. Digite a senha: " + password);
        }
    }
    
    // Função para salvar contato
    function saveContact() {
        // Criar um vCard (formato padrão de contato)
        const vcard = "BEGIN:VCARD\n" +
                        "VERSION:3.0\n" +
                        "FN:Neilan Estética Automotiva\n" +
                        "TEL;TYPE=CELL:+5575999573706\n" +
                        "ADR:;;Rua João de Souza Sobrinho;;;Heliópolis;Bahia\n" +
                        "EMAIL:contato@neilanestetica.com.br\n" +
                        "URL:https://neilanestetica.com.br\n" +
                        "NOTE:Estética Automotiva\n" +
                        "END:VCARD";
        
        // Criar um blob com o vCard
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        
        // Criar um link temporário e clicar nele
        const link = document.createElement('a');
        link.href = url;
        link.download = "neilan-estetica-automotiva.vcf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Para dispositivos móveis, oferecer também uma opção alternativa
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Em dispositivos móveis, oferecer também uma opção para abrir o app de telefone
            setTimeout(() => {
                if (confirm("Deseja abrir o aplicativo de telefone para adicionar o contato manualmente?")) {
                    window.location.href = "tel:+5575999573706";
                }
            }, 1000);
        } else {
            alert("Contato salvo! Verifique a pasta de downloads do seu dispositivo.");
        }
    }
    
    // Event listeners
    if (wifiBtn) {
        wifiBtn.addEventListener("click", openWifiModal);
    }
    
    if (pixBtn) {
        pixBtn.addEventListener("click", openPixModal);
    }
    
    if (copyPixBtn) {
        copyPixBtn.addEventListener("click", copyPixKey);
    }
    
    if (connectWifiBtn) {
        connectWifiBtn.addEventListener("click", connectToWifi);
    }
    
    if (saveContactBtn) {
        saveContactBtn.addEventListener("click", function(e) {
            e.preventDefault();
            saveContact();
        });
    }
    
    // Fechamento de modais
    closeButtons.forEach(button => {
        button.addEventListener("click", closeModals);
    });
    
    // Fechar modal ao clicar fora dele
    window.addEventListener("click", (event) => {
        if (event.target === imageModal || event.target === wifiModal || event.target === pixModal) {
            closeModals();
        }
    });
});