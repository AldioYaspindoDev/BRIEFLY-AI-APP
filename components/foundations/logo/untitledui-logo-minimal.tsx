"use client";

import type { SVGProps } from "react";
import { useId } from "react";
import { cx } from "@/utils/cx";
import Image from "next/image";

export const UntitledLogoMinimal = (props: SVGProps<SVGSVGElement>) => {
    const id = useId();

    return (
       <main className="flex items-center">
            <Image 
            src="/logo/BrieflyWhite.png"
            width={52}
            height={52}
            alt="Untitled UI Logo"
            />
            
                <p className="font-bold text-sm text-fg-primary">
                    Briefly
                    <span className="text-green-400">
                        AI
                    </span>
                </p>

       </main>
    );
};
