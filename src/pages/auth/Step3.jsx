import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion"

import { ClockIcon } from "@radix-ui/react-icons"

import React from 'react'
import { Button } from "@components/ui/button"
import { Link } from "react-router-dom"

const Step3 = () => {
  return (
    <div className='container flex flex-col items-center justify-center w-full min-h-screen mx-auto'>
      <Card className='border border-gray-300 rounded-lg w-[28rem] pt-4'>
        <CardHeader className='space-y-4'>
          <h1 className='text-xl font-bold text-indigo-700'>JobScout</h1>
          <CardTitle className='text-xl text-gray-700 semifont-bold'>
            Your application is under review
          </CardTitle>
          <CardDescription className='text-xs'>
            We have received your application and now in the process of reviewing it.
            An activation email will be sent to you once approved.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-xs'>
          <Accordion type="single" collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-gray-600'>What's next?</AccordionTrigger>
              <AccordionContent className='text-xs'>
                An email verification from our team will be sent to your email.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-gray-600'>Why my application is being reviewed?</AccordionTrigger>
              <AccordionContent className='text-xs'>
                We review your application to ensure adherence to our terms of service and conditions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-gray-600'>How long is the application process?</AccordionTrigger>
              <AccordionContent className='text-xs'>
              Normal processing time is 5 business days from the date of submission.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className='flex items-center justify-end'>
          <Button><Link to={'/'}>Return</Link></Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step3