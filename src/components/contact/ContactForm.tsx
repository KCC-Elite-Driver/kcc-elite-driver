import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/i18n/LanguageContext";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Required").max(30),
  message: z.string().trim().min(1, "Required").max(2000),
  service_type: z.string().min(1, "Required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      service_type: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // For now, just show a success toast. Will connect to Supabase later.
    console.log("Contact form submitted:", { ...data, email: "[redacted]" });
    toast({
      title: "✓",
      description: t.contact_success,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-sm text-muted-foreground">{t.contact_name}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-secondary border-border focus:ring-primary"
                  maxLength={100}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-sm text-muted-foreground">{t.contact_email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="bg-secondary border-border focus:ring-primary"
                    maxLength={255}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-sm text-muted-foreground">{t.contact_phone}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    className="bg-secondary border-border focus:ring-primary"
                    maxLength={30}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-sm text-muted-foreground">{t.contact_service}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder={t.contact_service} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="airport">{t.contact_service_airport}</SelectItem>
                  <SelectItem value="hourly">{t.contact_service_hourly}</SelectItem>
                  <SelectItem value="event">{t.contact_service_event}</SelectItem>
                  <SelectItem value="other">{t.contact_service_other}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-sm text-muted-foreground">{t.contact_message}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  className="bg-secondary border-border focus:ring-primary resize-none"
                  maxLength={2000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send size={16} />
          {t.contact_send}
        </button>
      </form>
    </Form>
  );
};

export default ContactForm;
