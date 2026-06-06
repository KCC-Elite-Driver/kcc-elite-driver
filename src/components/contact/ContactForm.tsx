import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/i18n/LanguageContext";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30),
  message: z.string().trim().min(1, "Required").max(2000),
  service_type: z.string().min(1, "Required"),
  privacy_accepted: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
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
      privacy_accepted: undefined as unknown as true,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const idempotencyKey = `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const serviceLabelMap: Record<string, string> = {
        airport: t.contact_service_airport,
        hourly: t.contact_service_hourly,
        event: t.contact_service_event,
        city: t.contact_service_city,
        tours: t.contact_service_tours,
        other: t.contact_service_other,
      };
      const serviceLabel = serviceLabelMap[data.service_type] || data.service_type;

      // Notify admin
      const adminInvoke = supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-message",
          idempotencyKey: `${idempotencyKey}-admin`,
          templateData: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: serviceLabel,
            message: data.message,
          },
        },
      });

      // Confirm to user
      const userInvoke = supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: data.email,
          idempotencyKey: `${idempotencyKey}-user`,
          templateData: {
            name: data.name,
            message: data.message,
          },
        },
      });

      const [adminRes, userRes] = await Promise.all([adminInvoke, userInvoke]);
      if (adminRes.error) throw adminRes.error;
      if (userRes.error) throw userRes.error;

      toast({
        title: t.contact_success_title,
        description: t.contact_success,
      });
      form.reset();
    } catch (err) {
      toast({
        title: t.contact_error_title || "Sending failed",
        description: t.contact_error || "Please try again in a moment, or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-foreground mb-1">{t.contact_form_title}</h2>
      <p className="font-sans text-sm text-muted-foreground mb-6">{t.contact_form_desc}</p>

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
                    placeholder={t.contact_name_placeholder}
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
                      placeholder={t.contact_email_placeholder}
                      className="bg-secondary border-border focus:ring-primary"
                      maxLength={255}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">{t.contact_email_helper}</FormDescription>
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
                      placeholder={t.contact_phone_placeholder}
                      className="bg-secondary border-border focus:ring-primary"
                      maxLength={30}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">{t.contact_phone_helper}</FormDescription>
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
                      <SelectValue placeholder={t.contact_service_placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="airport">{t.contact_service_airport}</SelectItem>
                    <SelectItem value="hourly">{t.contact_service_hourly}</SelectItem>
                    <SelectItem value="event">{t.contact_service_event}</SelectItem>
                    <SelectItem value="city">{t.contact_service_city}</SelectItem>
                    <SelectItem value="tours">{t.contact_service_tours}</SelectItem>
                    <SelectItem value="other">{t.contact_service_other}</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">{t.contact_service_helper}</FormDescription>
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
                    placeholder={t.contact_message_placeholder}
                    className="bg-secondary border-border focus:ring-primary resize-none"
                    maxLength={2000}
                  />
                </FormControl>
                <FormDescription className="text-xs">{t.contact_message_helper}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacy_accepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-sans text-sm text-foreground cursor-pointer">
                    {t.contact_privacy_checkbox} *
                  </FormLabel>
                  <FormDescription className="text-xs">
                    {t.contact_privacy_desc}
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={16} />
              {t.contact_send}
            </button>
            <p className="font-sans text-xs text-muted-foreground text-center">{t.contact_submit_helper}</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
