"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createIcons, icons } from "lucide"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

import Footer from "@/components/footer"
import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  reason: z.string({
    required_error: "Please select a reason for contact.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

const contactReasons = [
  "Partnership and Collaboration",
  "Event Details and Concerns",
  "Internships and Job inquiries",
  "Payment Procedures",
  "Ticketing and Refund",
  "Others",
]

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    createIcons({ icons })
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.reason,
          message: values.message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        })
        form.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
        <StarBackground />
      
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-400 text-lg">Have a question or need assistance? We're here to help!</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-zinc-900 p-6 md:p-8 rounded-lg border-2 border-blue-600/20"
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                              <Input placeholder="Your name" {...field} className="bg-zinc-800 border-zinc-700" />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input
                              placeholder="your.email@example.com"
                              {...field}
                              className="bg-zinc-800 border-zinc-700"
                              />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Reason for Contact</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                          {contactReasons.map((reason) => (
                          <SelectItem
                              key={reason}
                              value={reason}
                              className="text-white hover:bg-blue-600 hover:text-black transition-colors duration-200"
                          >
                              {reason}
                          </SelectItem>
                          ))}
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="How can we help you?"
                            className="bg-zinc-800 border-zinc-700 min-h-[150px]"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-600 text-black hover:bg-yellow-600" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <i data-lucide="loader-2" className="mr-2 h-4 w-4 animate-spin"></i>
                        Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                    </Button>
                </div>
                </form>
            </Form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 grid md:grid-cols-3 gap-8 text-center"
            >
            {[
                {
                icon: "phone",
                title: "Phone",
                description: "+65 6324 2521",
                },
                {
                icon: "mail",
                title: "Email",
                description: "info@midaspromotions.com",
                },
                {
                icon: "map-pin",
                title: "Address",
                description: "123 Entertainment Drive, Singapore",
                },
            ].map((item, index) => (
                <div key={index} className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="mb-4 inline-block">
                    <i data-lucide={item.icon} className="h-6 w-6 text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                </div>
            ))}
            </motion.div>
        </div>
        <Toaster />
        <Footer />
    </div>
  )
}

