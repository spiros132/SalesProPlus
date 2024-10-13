'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "../lib/BackendConnection";

/* Main page which should be the login page */
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function onSubmit() {
        // Check if the username and password are correct and then move to the dashboard
        Login(username, password)
        .then((user) => {
            if(user == null) {
                // Couldn't login, maybe error?
            }
            else {
                document.cookie = `username=${user.username};`;
                document.cookie = `department=${user.department};`;
                document.cookie = `region=${user.region};`;

                router.push("/dashboard");
            }
        });
    }

    return (
    <div className="p-12">
        <h1 className="text-center text-6xl font-bold">IKEA Sales Pro Plus</h1>
        <div className="flex-initial flex-col place-content-center space-y-4 mt-6">
            <Input 
                isClearable
                type="text" 
                label="Username" 
                variant="underlined" 
                size="lg"
                value={username}
                onValueChange={setUsername}
                />
            <Input 
                isClearable
                type="password" 
                label="Password" 
                variant="underlined" 
                size="lg"
                value={password}
                onValueChange={setPassword}
                />

            <Button type="submit" onClick={onSubmit}>
                Login
            </Button>
        </div>
    </div>
    );
}