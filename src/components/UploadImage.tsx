import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { uploadImageMutationFn } from "@/lib/api";

export default function ImageUpload() {
    const formSchema = z.object({
        images: z
            .custom<File>((val) => val instanceof File, {
                message: "Invalid file input",
            })
            .refine((file) => file !== null, {
                message: "At least one file is required",
            })
            .refine(
                (file) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type),
            { message: "Only PNG, JPG, and JPEG files are allowed" }
            ),
    });

    const {handleSubmit, reset, setValue } = useForm<FormValues>({
        resolver: zodResolver(formSchema), // Ensure Zod validation is used
    });

    type FormValues = z.infer<typeof formSchema>;

    const { mutate, isPending } = useMutation({
        mutationFn: uploadImageMutationFn,
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Image uploaded successfully",
                variant: "success",
            });
            reset();
        },
        onError: (error) => {
            toast({
                title: "Upload Error",
                description: "Image upload failed: " + error,
                variant: "destructive",
            });
        },
    });

    const handleSubmitFunction = (values: FormValues) => {
        if (isPending) 
            return;

        const file = values.images;
        if (!fileValidate(file)) {
            toast({
                title: "Upload Error",
                description: "Invalid file type. Only PNG, JPG, and JPEG are allowed.",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append("files[]", file);

        mutate(formData);
    };

    const fileValidate = (file: File) => {
        console.log("File Type:", file.type);
        if (["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {            
            return true;
        }
        return false;
    };

   

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setValue("images", file as File, { shouldValidate: true });
    };
    

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit(handleSubmitFunction)} className="space-y-4 mt-5 ml-1">
                <Input 
                    type="file" 
                    accept="image/png, image/jpg, image/jpeg" 
                    onChange={handleFileChange} />
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader className="animate-spin" />}
                    {isPending ? "Uploading. Please wait..." : "Upload"}
                </Button>
            </form>
        </div>
    );
};