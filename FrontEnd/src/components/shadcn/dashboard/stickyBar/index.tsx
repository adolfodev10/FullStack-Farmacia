// import {
//    Avatar,
//   AvatarFallback, 
//   AvatarImage 
// } from "../../ui/avatar";
// import { useState } from "react";
// import { toast } from "sonner";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
// import { ServicesAvailables, History } from "@/utils/constants/services";

// function formatAngolanCurrency(Number: number) {
//   if (isNaN(Number)) {
//     return "Numero Invalido!";
//   }

//   const formatter = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' });
//   return formatter.format(Number);
// }
 
//   export function StickyBar(){
//     const [value, setValue] = useState<string | null>()
//     const [amount, setAmount] = useState<string | null>()

//     function handleToast() {
//       if (!value && !amount) {
//         toast.error("Impossivel realizar a operação, preencha os campos")
//         setValue(null)
//         setAmount(null)
//       }
//       else {
  
//         toast.success(`Enviado com sucesso para ${value} o valor de ${formatAngolanCurrency(Number(amount))}`)
//         setValue(null)
//         setAmount(null)
//       }
//     }
//     return (
//       <section className="sticky top-0 bg-white h-[calc(100vh-73px)] w-[400px]">
//         <div className="flex gap-4 items-center">
//           <Dialog>
//               <DialogTrigger className="w-full outline-none">
//                 <button className="bg-black/80 hover:brightness-75 text-white font-sans font-bold w-full rounded-full p-2">
//                   Enviar
//                 </button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Enviar</DialogTitle>
//                   <section>
//                   <input className="border-b border-gray-400 w-full py-2 my-4" placeholder="Destinatário" onChange={ e => setValue(e.target.value)}  type="text" />
//                   <input className="border-b border-gray-400 w-full py-2 my-4" placeholder="Valor" onChange={e => setAmount(e.target.value)} type="number"  />
//                  <button className="bg-neutral-500 w-full text-white font-bold rounded-lg p-2 mt-8" onClick={handleToast} >Enviar</button>
//                   </section>
//                 </DialogHeader>
//               </DialogContent>
//             </Dialog>

//             <button className="bg-black/80 hover:brightness-75 text-white font-bold  font-sans rounded-full p-2">
//             Solicitar
//             </button>
//             </div>

//             <section className="px-4 mt-8 w-full">
//             <p className="font-semibold">Serviços Disponíveis</p>

//             <div className="flex justify-between gap-4 w-full overflow-auto">
//               {ServicesAvailables.map((service)=>(
//                 <div className="mt-4">
//                   <div  className="w-[50px] h-[50px] bg-gray-300 rounded-full" />
//                   <p className="text-center">{service}</p>
//                 </div>
//               ))}
//             </div>
//             </section>
//             <section className="px-4 mt-8 w-full">
//             <p className="font-semibold">Enviar Novamente</p>

//             <div className="flex gap-4 w-full overflow-auto">
//               {History.map((history)=>(
//                 <div className="mt-4">
//                   <Avatar>
//                     <AvatarImage src={`https://github.com/${history.photo}.png`} />
//                     <AvatarFallback>{history.name.split("")[0]}</AvatarFallback>
//                   </Avatar>
//                   <p className="text-center">{history.name}</p>
//                 </div>
//               ))}
//             </div>
//             </section>
//       </section>
//     );
//   };
  