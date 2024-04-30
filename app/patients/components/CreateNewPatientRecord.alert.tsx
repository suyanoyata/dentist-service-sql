import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Text } from "@/components/app-components/typography";

export default function CreateNewPatientRecord() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Text
          variant="sm"
          style={{
            color: "black",
          }}
          className="hover:underline cursor-pointer select-none"
        >
          Додати пацієнта
        </Text>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Додати пацієнта</AlertDialogTitle>
          <AlertDialogDescription>
            FORM_DISPLAY_COMPONENT
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрити</AlertDialogCancel>
          <AlertDialogAction>Додати</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
