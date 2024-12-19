export const Clientes = () => {

    const clientesEspeciais = [
        {
            nome:"Adolfo Monteiro",
            category:"Cliente Especial"
        }
    ]
    const clienteMaisRecente = [
        {
            nome : "Silva Santos",
            category:"Cliente Mais Recente"
        }
    ]
    const clienteMaisAntigo = [
        {
            nome:"Maria Josias",
            category:"Cliente Mais Antigo"

        }
    ]
    return (
        <>
        <div className="block" >
        {clientesEspeciais.map(m => (
            <>
        <h1 className="font-medium text-2xl text-center">{m.nome}</h1>
        <p className="text-sm text-gray-500" >{m.category}</p>
        </>
        ))}
        </div>

        <div className="mt-24">
            {clienteMaisRecente.map(c => (
                <>
                <h1 className="font-medium text-2xl text-center" >{c.nome}</h1>
                <p className="text-sm text-gray-500">{c.category}</p>
                </>
            ))}
        </div>

        <div className="mt-24">
            {clienteMaisAntigo.map(c => (
                <>
                <h1 className="font-medium text-2xl text-center" >{c.nome}</h1>
                <p className="text-sm text-gray-500">{c.category}</p>
                </>
            ))}
        </div>
        </>
    )
}