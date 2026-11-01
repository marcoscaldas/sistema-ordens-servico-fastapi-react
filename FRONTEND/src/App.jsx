import { useEffect, useState } from "react";
import FormularioOrdem from "./components/FormularioOrdem";
import ListaOrdens from "./components/ListaOrdens";
import { cadastrarOrdem, listarOrdens } from "./services/api";


export default function App(){

    const [ordens, setOrdens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');

    async function carregar(){
        try {
            const dados = await listarOrdens()
            setOrdens(dados);
        } catch (erro) {
            setMensagem(erro.message)

        } finally{
            setCarregando(false)
        }
    }

    useEffect(()=>{

        carregar();
    },[])

    async function cadastrar(dados){

        try {

            await cadastrarOrdem(dados);
            await carregar();
            setMensagem('Ordem cadastrada com sucesso!');

            setTimeout(() => {
                setMensagem("")
            }, 2000);
            
        } catch (erro) {
            setMensagem(erro.message)
            return false;            
        }
    }
    return(

        <div className="pagina">
            <header className="topo">
                <span className="marca">DESVENDANDO O CÓDIGO</span>
                <h1>Gestão de <span>Ordens de Serviços</span></h1>
                <p>React + FastApi MySQL</p>
            </header>

            <main>
                {mensagem && <p className="mensagem" role="status">{mensagem}</p>}
                <FormularioOrdem onCadastrar={cadastrar}/>
                <ListaOrdens ordens={ordens} carregando={carregando}/>
            </main>

            <footer>DESVENDANDO O CÓDIGO. Programação é processo.</footer>
        </div>
    );
}



