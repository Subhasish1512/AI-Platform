"use client";

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { formSchema } from "./constants";
import {LuMusic } from "react-icons/lu";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music")
      
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      router.refresh();
    }
  }

  return ( 
    <div>
      <Heading
        title="Music"
        description="Turn your prompt into music."
        icon={LuMusic}
        iconColor="text-emerald-700"
        bgColor="bg-violet-500/10"
      />
      <div>
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="
                  rounded-lg 
                  border 
                  w-full 
                  p-4 
                  px-3 
                  md:px-6 
                  focus-within:shadow-sm
                  grid
                  grid-cols-12
                  gap-2
                "
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading} 
                          placeholder="Piano Solo" 
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            
            {!music === 0 && !isLoading && (
              <div>
                Music will be generated...
              </div>
            )} 
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default MusicPage;
