import { useState } from 'react'

function CarSelector() {
  const cars = ['Mercedes S600', 'BMW M5', 'Audi A8']
  const colors = ['Black', 'White', 'Red']

  // Mặc định chọn phần tử đầu tiên trong danh sách
  const [selectedCar, setSelectedCar] = useState(cars[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Select your car</h1>

      <div className="mb-4">
        <label className="mr-2">Select a car</label>
        <select
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}
          className="border px-2 py-1"
        >
          {cars.map((car) => (
            <option key={car} value={car}>
              {car}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Select a color</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border px-2 py-1"
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <p className="font-semibold text-lg">
        You selected a <span className="text-black">{selectedColor}</span> -{' '}
        <span className="text-black">{selectedCar}</span>
      </p>
    </div>
  )
}

export default CarSelector
