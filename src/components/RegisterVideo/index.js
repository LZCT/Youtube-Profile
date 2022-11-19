import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";
import {getVideoId} from "../Helpers"


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

const PROJECT_URL = "https://kprqnqeejresdacfcaou.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwcnFucWVlanJlc2RhY2ZjYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQyMjksImV4cCI6MTk4Mzc3MDIyOX0.HYTP-tipGhRL7b6RuS0s7JfV9mZMKyRVC0H0f66o80c";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


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
                let videoID = getVideoId(formRegister.values.url);
                supabase.from("video").insert({
                    title: formRegister.values.title,
                    url: formRegister.values.url,
                    thumb: `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
                    playlist: "Black Sabbath",
                }).then((resp) => {
                    console.log(resp)
                })
                .catch((err) => {
                    console.log(err);
                })

                setFormVisibility(false);
                formRegister.clearForm();
            }}>
                <div>
                    <h1>Video Register</h1>
                    <br></br>
                    <button type="button" className="close-modal" onClick={() => setFormVisibility(false)}>
                        X
                    </button>
                    <input placeholder="Video Name" value={formRegister.values.title} 
                        name="title"
                        onChange={formRegister.handleChange}/>
                    <input placeholder="URL" value={formRegister.values.url} 
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