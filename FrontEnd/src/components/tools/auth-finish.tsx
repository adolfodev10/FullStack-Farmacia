import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TextWelcome{
    LineOne1:string,
    LineOne2?:string,
    LineTwo?:string,
    LineThree?:string

}

export const AuthFinish = (props:TextWelcome) =>{
    return(
        <>
         <main>
            <div className=" bg-FDwhite h-[100%] p-10 text-center rounded-[40px] shadow-md w-[600px]">
                    <CheckCircleIcon className='text-green-600 mb-2' fontSize={"large"}/>
                <div className='mt-2'>{props.LineOne1} <br /> {props.LineOne2}<br /></div>
                <span className="text-CPorange mt-2 text-sm">{props.LineTwo}</span>
                <div className=' mt-2'><span>{props.LineThree}</span></div>
            </div>
         </main>
        </>
    )
}