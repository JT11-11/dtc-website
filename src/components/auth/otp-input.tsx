import { useRef, useEffect } from 'react'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: boolean
}

export function OtpInput({ value, onChange, disabled, error }: OtpInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '')
    onChange(rawValue.slice(0, 6))
  }

  // Create an array of 6 elements for the digits
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '')

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hidden input to capture keyboard events and autofill */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
        autoComplete="one-time-code"
      />

      {/* Pill-shaped boxes container */}
      <div
        onClick={handleContainerClick}
        className="flex justify-center gap-2.5 sm:gap-3 cursor-pointer py-2"
      >
        {digits.map((digit, index) => {
          const isFocused = value.length === index || (index === 5 && value.length === 6)
          const hasValue = digit !== ''

          return (
            <div
              key={index}
              className={`flex h-20 w-11 sm:h-24 sm:w-14 items-center justify-center rounded-[1.75rem] border text-2xl font-semibold transition-all duration-150 ${
                isFocused
                  ? 'border-black bg-white shadow-md scale-105 ring-1 ring-black'
                  : error
                    ? 'border-red-300 bg-red-50/30 text-red-600'
                    : hasValue
                      ? 'border-gray-300 bg-white shadow-xs text-gray-900'
                      : 'border-gray-200 bg-gray-50/50 text-gray-400'
              }`}
            >
              {digit}
            </div>
          );
        })}
      </div>
    </div>
  )
}
