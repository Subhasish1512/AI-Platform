"use client";

import { LuMenu } from "react-icons/lu";
import { Button } from "./ui/button";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
const MobileSidebar =() =>{
    const [isMounted, setIsMounted]= useState(false);

    useEffect(() =>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <LuMenu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;