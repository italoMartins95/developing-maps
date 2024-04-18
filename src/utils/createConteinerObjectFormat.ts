export const createInteractiveView = (obj: any, parentElement: HTMLElement, parentKey: string = '') => {
    
    removeAllChildren(parentElement);

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            
            const container: HTMLDivElement = 
                document.createElement('div') as HTMLDivElement;

            /*
                Cria um Span que representa o atributo RAIZ do Objeto. Esse Span será 
                usado como botão para exibir/ocultar os valores dos atributos abaixo dele
            */
            const toggleElement: HTMLSpanElement = 
                document.createElement('span') as HTMLSpanElement;

            toggleElement.textContent = `${key}: `;
            toggleElement.classList.add('toggle');

            if (isObject(obj[key])) {

                toggleElement.classList.add('has-children');

                let classKey = key;
                if (!isNaN(Number(key))) { // Verifica se a chave é um número
                    classKey = `num-${key}`; // Adiciona um prefixo para evitar conflitos
                }

                toggleElement.addEventListener('click', () => {

                    const childContainer: HTMLElement = 
                        container.querySelector(`.${parentKey}-${classKey}-container`) as HTMLElement;

                    if (childContainer) {                            
                        if (childContainer.style.display === 'none') {
                            childContainer.style.display = 'block';
                            toggleElement.classList.add('open');
                        } else {
                            childContainer.style.display = 'none';
                            toggleElement.classList.remove('open');
                        }                            
                    }

                });

                container.appendChild(toggleElement);

                const childContainer: HTMLDivElement = 
                    document.createElement('div') as HTMLDivElement;

                childContainer.classList.add('object', 'children-container', `${parentKey}-${classKey}-container`);
                childContainer.style.display = 'none';

                container.appendChild(childContainer);

                // Chamada recursiva da função com o prefixo da chave do pai atualizado
                createInteractiveView(obj[key], childContainer, `${parentKey}-${classKey}`);
            } else {
                const span: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;
                span.innerHTML = `<span class="key">${key}:</span> ${(obj as any)[key]}<br>`; // Coerção de tipo para any
                container.appendChild(span);
            }

            // Anexa o container ao elemento pai diretamente
            parentElement.appendChild(container);
        }
    }
};

const isObject = (value: any): value is object => {
    return typeof value === 'object' && value !== null;
}

export const removeAllChildren = (parentElement: HTMLElement) => {
    if (parentElement.hasChildNodes()) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    } else {
        return
    }
};