import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { toast } from "@/hooks/use-toast";

const LogoutDialog = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen, setIsOpen } = props;
  const { clearAccessToken } = useStore();



  const handleLogoutNew = () => {
    toast({
      title: "Success",
      description: "You have been logged out",
      variant: "success",
    });
    clearAccessToken();
    setIsOpen(false);
    setTimeout(() => {
      window.location.href ="/";
    }, 1000);
  };


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in
              again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={handleLogoutNew}>
              {/* {isPending && <Loader className="animate-spin" />} */}
              Yes
            </Button>
            <Button type="button" onClick={() => setIsOpen(false)}>
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
