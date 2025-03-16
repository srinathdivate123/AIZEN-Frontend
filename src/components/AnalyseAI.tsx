import { analyseAIMutationFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function AnalizeAIComponent({ imagePath }: { imagePath: string }) {

    // const fileName = imagePath.split('/').pop() || "";

    const { data, isLoading } = useQuery({
        queryKey: ["filename", imagePath],
        queryFn: () => analyseAIMutationFn({ filename: imagePath.trim() }), // Prevent empty values
        staleTime: 0,
        enabled: !!imagePath?.trim(),
    });

    const formattedText = data?.message.replace(/\*/g, "");  


    return (

        <div className="w-full h-auto max-w-full">
            <div className="h-full">
                <div>
                    <div className="mb-5 pb-2 border-b">
                        <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1 text-center sm:text-left mb-5">

                            {isLoading?
                            (
                                <p>Analyzing image using Gemini-1.5-Flash</p>
                                
                            ) :(
                                
                                <p>Analyzed using Gemini-1.5-Flash</p>
                            )}
                        </h1>


                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center space-x-2">
                                <Loader className="animate-spin" />
                                <p>Please wait</p>
                            </div>
                        ) : (

                            <pre className="text-muted-foreground text-sm leading-tight" style={{ whiteSpace: "pre-wrap" }} >
                                {formattedText}

                            </pre>
                        )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}