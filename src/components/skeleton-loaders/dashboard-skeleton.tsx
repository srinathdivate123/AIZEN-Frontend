import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

export function DashboardSkeleton() {
  return (
    <div className="p-4">
      <div className="absolute inset-0 z-50 flex items-start pt-10 justify-center bg-[rgba(255,255,255,.01)]">
        <div className="flex items-center space-x-2">
          <Loader size="25px" className="animate-spin" />
          <span className="text-sm font-medium">ImageX...</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-64 space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}