import Image from 'next/image'

interface BrandLogoProps {
  size?: 'compact' | 'full'
  priority?: boolean
}

export default function BrandLogo({ size = 'compact', priority = false }: BrandLogoProps) {
  const isFull = size === 'full'

  return (
    <Image
      src="/logo.svg"
      alt="HealthEdu AI"
      width={isFull ? 190 : 42}
      height={isFull ? 190 : 42}
      priority={priority}
      sizes={isFull ? '190px' : '42px'}
      style={{
        width: isFull ? 190 : 42,
        height: isFull ? 190 : 42,
        objectFit: 'contain',
      }}
    />
  )
}
