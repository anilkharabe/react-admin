const Input = ({label, ...props})=>{
    return(
        <div>
            <label className="font-bold">{label}</label>
            <input className="border p-2 rounded m-2" {...props}></input>
        </div>
    )
}

export default Input;