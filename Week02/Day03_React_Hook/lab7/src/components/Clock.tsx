import { useClock } from '../hooks/useClock'

function Clock() {
  const time = useClock()

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-blue-900 text-white font-bold text-2xl px-8 py-4 rounded-xl">
        {time}
      </div>
    </div>
  )
}

export default Clock
