/*
Root element of the form
*/
"use client";
export function handleSavingSuccess({ toast }) {
  toast({
    title: "Record saved",
    status: "success",
    duration: 3000,
  });
}
