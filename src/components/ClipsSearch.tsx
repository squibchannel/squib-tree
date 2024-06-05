// import React from "react";

// function ClipsSearch() {
//   const twitchClipsForm = useForm<z.infer<typeof clipsFormSchema>>({
//     resolver: zodResolver(chatFormSchema),
//     defaultValues: {
//       channel: "",
//       game: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof clipsFormSchema>) => {
//     const { channel, game } = values;
//     try {
//       await getClips();
//       toast.success("Message Successfully Sent");
//       twitchClipsForm.reset();
//     } catch (error) {
//       toast.error("Message failed to send");
//     }
//   };

//   return (
//     <Card className=" w-[50vw] mx-auto mt-4 p-4">
//       <Form {...twitchClipsForm}>
//         <form
//           onSubmit={twitchClipsForm.handleSubmit(onSubmit)}
//           className="space-y-8"
//         >
//           <FormField
//             control={twitchClipsForm.control}
//             name="channel"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Get Clips</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Hello World!" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Get clips for the chosen channel and game!
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Send</Button>
//         </form>
//       </Form>
//     </Card>
//   );
// }

// export default ClipsSearch;
