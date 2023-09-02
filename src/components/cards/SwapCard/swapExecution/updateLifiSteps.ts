const getStepStatus = (action) => {
  switch (action.status.toLowerCase()) {
    case 'failed':
      return 'error'
    case 'done':
      return 'success'
    case 'success':
      return 'success'
    case 'action_required':
      return 'pending'
    case 'pending':
      return 'pending'
    default:
      return 'await'
  }
}

const getStepTitle = (action) => action?.message || action?.error?.message || null

export const updateLifiSteps = ({ swapDispatch, selectedRoute }) => {
  const messages = selectedRoute.execution.reduce((acc, step) => {
    if (!step?.process) return acc

    const stepMessages = step.process.map((action) => ({
      title: getStepTitle(action),
      body: action.substatusMessage || null,
      status: getStepStatus(action),
      txLink: action.txLink || null,
    }))

    return [...acc, ...stepMessages]
  }, [])

  swapDispatch({
    type: 'SET_SWAP_STEPS',
    payload: messages,
  })
}
