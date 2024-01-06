import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast flex items-center justify-center group-[.toaster]:gap-[1.5rem] group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-foreground group-[.toaster]:shadow-lg",
          title: "text-[18px] group-[.toast]:font-[300]",
          description: "group-[.toast]:text-muted-foreground text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }}
      {...props} />)
  );
}

export { Toaster }
