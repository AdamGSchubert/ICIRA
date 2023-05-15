import { Route, Routes } from "react-router-dom"
    
    
    
    import { Login } from "./auth/Login"
    import { Register } from "./auth/Register"
import { Authorized } from "./views/authorized"
import { AppView } from "./views/appview"
import { NavBar } from "./Nav/navbar"
import { RecoverPassword } from "./auth/forgottenLogin"
import { Typography } from "@mui/material"
    

export const IciraView=()=>{
        return (
        
        
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<RecoverPassword/>}/>

    
            <Route path="*" element={
                <Authorized>
                    <>
                        <NavBar />
                        <AppView />
                        
                    </>
                </Authorized>
    
            } />
        </Routes>)
        
        
    }
    
