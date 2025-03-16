import { analyseAIMutationFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function AnalizeAIComponent({ imagePath }: { imagePath: string }) {

    const fileName = imagePath.split('/').pop() || "";

    useQuery({
        queryKey: ["filename", fileName],
        queryFn: () => analyseAIMutationFn({ filename: fileName.trim() }), // Prevent empty values
        staleTime: 0,
        enabled: !!fileName?.trim(),
    });


    return (

        <div className="w-full h-auto max-w-full">
            <div className="h-full">
                <div>
                    <div className="mb-5 pb-2 border-b">
                        <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1 text-center sm:text-left">
                            Analyzed using ChatGPT
                        </h1>
                        <p className="text-muted-foreground text-sm leading-tight">
                            This feature is under development and will be live soon!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}