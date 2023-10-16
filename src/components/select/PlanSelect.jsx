import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/ui/select'
import { plan } from '@services/storage';
import React from 'react'

const PlanSelect = ({field}) => {
    
  const currentPlan = plan.get();

  return (
    <Select onValueChange={(newValue) => {field.onChange(newValue)}} >
      <SelectTrigger className='w-[180px] border border-gray-400'>
        <SelectValue placeholder= {
          `${currentPlan == 'bstandard' 
            ? 'Business Standard' 
            : currentPlan == 'bpremium' 
            ? 'Business Premium' : 'Enterprise'
          }`
        }/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Plans</SelectLabel>
          <SelectItem value={'bstandard'} >Business Standard</SelectItem>
          <SelectItem value={'bpremium'} >Business Premium</SelectItem>
          <SelectItem value={'enterprise'} >Enterprise</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PlanSelect