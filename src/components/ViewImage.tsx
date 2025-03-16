import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { viewImagesMutationFn } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnalizeAIComponent from "./AnalyseAI";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";


export default function ViewImages() {

    const { data: images = [], isLoading, isFetching } = useQuery({
        queryKey: ["images"],
        queryFn: viewImagesMutationFn,
        staleTime: 0
    });

    return (


        <div className="container pt-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading || isFetching  ? (
                    <div className="col-span-full flex items-center justify-center space-x-2">
                        <Loader className="animate-spin" />
                        <p>Loading images...</p>
                    </div>
                ) : images.length > 0 ? (
                    images.map((image_path: string, index: number) => (
                        <Card key={index} className="shadow-lg rounded-lg overflow-hidden">
                            <CardContent className="p-4 flex justify-center">
                                <img
                                    src={image_path}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <div>
                                    <Dialog modal={true}>
                                        <DialogTrigger>
                                            <Button>
                                                Analyze Using AI
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
                                            <AnalizeAIComponent />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <h6 className="text-danger text-center col-span-full">No images found</h6>
                )}
            </div>
        </div>
    );
}