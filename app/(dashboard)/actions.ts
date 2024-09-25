"use server"

import { redirect } from "next/navigation";


export const redirectToSignin = () => { //TODO Not used yet.
    redirect('/signin');
  }