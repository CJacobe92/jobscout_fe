import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/ui/select'
import { PersonIcon, SwitchIcon } from '@radix-ui/react-icons'
import { Link, useNavigate } from 'react-router-dom'

const SwitchSelect = ({username}) => {

  const navigate = useNavigate();
  
  const handleSwitch = (value) => {
    if (value == 'switch') {
      navigate('/signin')
    }
  }
  
  return (
    <Select onValueChange={handleSwitch}>
      <SelectTrigger className='w-[180px] text-xs border border-gray-300'>
        <SelectValue placeholder={
        <div className='flex flex-row items-center justify-center gap-2 text-xs'>
          <PersonIcon /> 
          <p>{username}</p>
        </div>
      }/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectLabel className='text-xs'>Signing in as:</SelectLabel>
          <SelectItem value='account'>
            <div className='flex flex-row items-center justify-center gap-4 text-xs'>
              <PersonIcon /> 
              <p>{username}</p>
            </div>
          </SelectItem>
          <SelectItem value='switch' className='text-xs'>
            <div className='flex flex-row items-center justify-center gap-4 text-xs'>
              <SwitchIcon /> 
              <p>Switch account</p>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SwitchSelect