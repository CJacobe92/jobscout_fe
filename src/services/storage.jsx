export const plan = {
  set: (payload) => {localStorage.setItem('plan', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('plan')),
  remove: () => localStorage.removeItem('plan')
}

export const userType = {
  set: (payload) => {localStorage.setItem('type', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('type')),
  remove: () => localStorage.removeItem('type'),
}

export const verified = {
  set: (payload) => {localStorage.setItem('verified', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('verified')),
  remove: () => localStorage.removeItem('verified'),
}

export const user = {
  set: (payload) => {localStorage.setItem('traits', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('traits')),
  remove: () => localStorage.removeItem('traits'),
}

export const tenant = {
  set: (payload) => {localStorage.setItem('tenantId', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('tenantId')),
  remove: () => localStorage.removeItem('tenantId'),
}

export const auth = {
  set: (payload) => {localStorage.setItem('auth', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('auth')),
  remove: () => localStorage.removeItem('auth'),
}



export const userSettings = {

   initialSettings: {
    assignedTable: true,
    unassignedTable: true,
    clientsTable: true,
    employeesTable: true
  },

  set: () => {localStorage.setItem('userSettings', JSON.stringify(userSettings.initialSettings))},
  get: () => JSON.parse(localStorage.getItem('userSettings')),
  remove: () => localStorage.removeItem('userSettings'),
  update: (propertyName, value) => {
    const currentSettings = userSettings.get();
    currentSettings[propertyName] = value;
    localStorage.setItem('userSettings', JSON.stringify(currentSettings));
  },
}