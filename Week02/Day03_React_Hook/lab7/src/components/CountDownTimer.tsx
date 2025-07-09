import { useEffect, useState } from 'react'

function CountDownTimer() {
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    // Nếu hết giờ thì hiện alert và dừng
    if (timeLeft === 0) {
      alert("Time's up")
      return
    }

    // Giảm thời gian mỗi 1 giây
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // Dọn dẹp timeout nếu component bị unmount hoặc timeLeft thay đổi
    return () => clearTimeout(timerId)
  }, [timeLeft]) // Chạy lại mỗi khi timeLeft thay đổi

  return (
    <div className="p-4 text-xl">
      Count down from {timeLeft}
    </div>
  )
}

export default CountDownTimer
