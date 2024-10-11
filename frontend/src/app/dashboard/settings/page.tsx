'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Settings() {
    return <div className="flex-initial flex-col space-y-12">
        <Input
            isRequired
            type="text"
            variant="underlined"
            label="Input Field"
            labelPlacement="outside"
            value={"Input Test"}
            size="lg"
            />
        <Input
            isRequired
            type="text"
            variant="underlined"
            label="Input Field"
            labelPlacement="outside"
            size="lg"
            />
        <Input
            isRequired
            type="text"
            variant="underlined"
            label="Input Field"
            labelPlacement="outside"
            value={"Input Test"}
            size="lg"
            />
        <Input
            isRequired
            type="text"
            variant="underlined"
            label="Input Field"
            labelPlacement="outside"
            size="lg"
            />
        <Button size="lg" className="text-2xl">Save</Button>
    </div>;
}