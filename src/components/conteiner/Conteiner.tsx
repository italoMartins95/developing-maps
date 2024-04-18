import { ReactNode } from 'react';
import './Conteiner.css'

interface IConteiner {
    children?: ReactNode;
} 

const Conteiner: React.FC<IConteiner> = (props) => {
    return (
        <main>
            {
                props.children
            }
        </main>
    )
}

export default Conteiner;