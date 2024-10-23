'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { useCookies } from "next-client-cookies";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";

export default function Settings() {
    const [username, setUsername] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        const u = cookies.get("username");
        const d = cookies.get("department");
        const r = cookies.get("region");

        if(u && d && r) {
            setUsername(u);
            setDepartment(d);
            setRegion(r);
            setIsLoaded(true);
        }
    }, []);

    function onLogout() {
        cookies.remove("username");
        cookies.remove("department");
        cookies.remove("region");

        router.push("/");
    }

    return (
        <Skeleton className="flex flex-col -space-y-16 m-4" isLoaded={isLoaded}>
            <Input
                isRequired
                isReadOnly
                type="text"
                variant="underlined"
                label="Username"
                labelPlacement="outside"
                value={username}
                size="lg"
                />
            <Input
                isRequired
                isReadOnly
                type="text"
                variant="underlined"
                label="Department"
                labelPlacement="outside"
                value={department}
                size="lg"
                />
            <Input
                isRequired
                isReadOnly
                type="text"
                variant="underlined"
                label="Region"
                labelPlacement="outside"
                value={region}
                size="lg"
                />
            <Button isDisabled={true} size="lg" className="text-xl">Save</Button>

            <Divider className="m-4"/>

            <Button size="lg" className="text-xl" onClick={onLogout}>Log out</Button>
        </Skeleton>
    );
}