import { Separator } from "@/components/ui/separator";
import AllMembers from "@/components/workspace/member/all-members";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";

export default function Members() {
  return (
    <div className="w-full h-auto pt-2">
      <WorkspaceHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto pt-3">
          

          <Separator className="my-4 !h-[0.5px]" />

          <AllMembers />
        </div>
      </main>
    </div>
  );
}
