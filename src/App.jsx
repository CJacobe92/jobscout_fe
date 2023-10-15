import Landing from '@pages/Landing'
import Password from '@pages/auth/Password'
import Signin from '@pages/auth/Signin'
import Step1 from '@pages/auth/Step1'
import Step2 from '@pages/auth/Step2'
import Layout from '@pages/common/Layout'
import TenantDashboard from '@pages/tenant/TenantDashboard'
import Assigned from '@pages/tenant/assigned/Assigned'
import Clients from '@pages/tenant/clients/Clients'
import Employees from '@pages/tenant/employees/Employees'
import Unassigned from '@pages/tenant/unassigned/Unassigned'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Landing />}/>
      <Route path={'/signin'} element={<Signin />}/>
      <Route path={'/password'} element={<Password />} />
      <Route path={'/step1'} element={<Step1 />} />
      <Route path={'/step2'} element={<Step2 />} />


      <Route element={<Layout />}>
        <Route path={'/t/dashboard'} element={<TenantDashboard />}/>
        <Route path={'/t/assigned'} element={<Assigned />}/>
        <Route path={'/t/unassigned'} element={<Unassigned />}/>
        <Route path={'/t/clients'} element={<Clients />}/>
        <Route path={'/t/employees'} element={<Employees />}/>

      </Route>

    </Routes>
  )
}

export default App