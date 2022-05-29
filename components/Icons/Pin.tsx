interface props {
  className?: string
}

const Pin: React.FC<props> = ({ className }) => (
  <svg className={className} viewBox="0 0 368.67 368.67" >
    <path d="M184.33 0c-82.32 0-149.3 66.97-149.3 149.3 0 33.97 11.14 65.96 32.2 92.51C94.5 276.2 173.8 357.83 177.16 361.3l7.17 7.38 7.17-7.38c3.37-3.46 82.7-85.11 109.97-119.5a147.4 147.4 0 0 0 32.16-92.5C333.63 66.98 266.66 0 184.33 0zM285.8 229.35c-21.96 27.7-80.92 89.28-101.47 110.59-20.54-21.3-79.48-82.88-101.43-110.56a127.63 127.63 0 0 1-27.86-80.08c0-71.3 58-129.3 129.3-129.3 71.29 0 129.29 58 129.29 129.3 0 29.4-9.63 57.1-27.83 80.05z"/>
    <path d="M184.33 59.27c-48.73 0-88.37 39.64-88.37 88.37 0 48.73 39.64 88.37 88.37 88.37s88.38-39.64 88.38-88.37-39.65-88.37-88.38-88.37zm0 156.74a68.45 68.45 0 0 1-68.37-68.37c0-37.7 30.67-68.38 68.37-68.38s68.38 30.68 68.38 68.38A68.45 68.45 0 0 1 184.33 216z"/>
</svg>
)

export default Pin
