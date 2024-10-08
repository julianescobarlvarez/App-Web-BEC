import {useForm} from 'react-hook-form'

function PagRegistro(){
    const {register, handleSubmit} = useForm()
    return (
        <div className='bg-slate-900 max-w-md p-10 rounded-md'>
            <form onSubmit={handleSubmit((values) => {
                    console.log(values)
                })}
            >
                <input type="text" {...register("nombre", {required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                placeholder='Nombre'/>
                <input type="email" {...register("email", {required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                placeholder='Email'/>
                <input type="password" {...register("password", {required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                placeholder='Password'/>
                <button className='text-white'>
                    Registrar
                </button>
            </form>
        </div>
    )
}

export default PagRegistro