const API_URL = "http://127.0.0.1:8000";

export async function listarOrdens(){

    const resposta = await fetch(`${API_URL}/ordens`);

    if(!resposta.ok) throw new Error('Não foi possível consultar as ordens.')
    
    return resposta.json();
}

export async function cadastrarOrdem(ordem){

    const resposta = await fetch(`${API_URL}/ordens`,{

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ordem)

    })

   if(!resposta.ok) throw new Error('Não foi possível cadastrar a orden.')
    
   return resposta.json();

}