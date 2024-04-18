export const copyContentConteiner = (conteiner: HTMLElement) => {  

    if (!conteiner) return;

    const range = document.createRange();
    range.selectNodeContents(conteiner);
    const selecao = window.getSelection();
    selecao?.removeAllRanges();
    selecao?.addRange(range);
  
    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy');
  
    // Limpa a seleção
    selecao?.removeAllRanges();
  
    // Exibe uma mensagem de confirmação
    alert('Conteúdo copiado para a área de transferência!');
  }
  