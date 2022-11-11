import React from "react";
import { StyledRegisterVideo } from "./Styles";

//Custom Hook - Form 
function useForm(){
    const [values, setValues] = React.useState({title: "", url: ""});

    return {
        values,
        handleChange: e => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,

            });
        },
        clearForm(){
            setValues({});
        }
    };
}

export default function RegisterVideo(){
    const [formVisibility, setFormVisibility] = React.useState(false);
    const formRegister = useForm();
    
    
    return (
    <StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisibility(true)}>
            +
        </button>
        
        {formVisibility ? (
            <form onSubmit={(e) => {
                e.preventDefault();
                setFormVisibility(false);
                formRegister.clearForm();
            }}>
                <div>
                    <button type="button" className="close-modal" onClick={() => setFormVisibility(false)}>
                        X
                    </button>
                    <input placeholder="Video Name:" value={formRegister.values.title} 
                        name="title"
                        onChange={formRegister.handleChange}/>
                    <input placeholder="URL:" value={formRegister.values.url} 
                        name="url"
                        onChange={formRegister.handleChange}/>
                    <button type="Submit">
                        Submit
                    </button>
                </div>
            </form>
        ) : false}
        
    </StyledRegisterVideo>
    )
}