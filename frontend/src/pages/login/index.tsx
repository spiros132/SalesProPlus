import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function onSubmit() {
        // Check if the username and password are correct and then move to the dashboard
        router.push("/");
    }

    return (
    <div>
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

            <Button onClick={onSubmit}>
                Login
            </Button>
        </div>
    </div>
    );
}