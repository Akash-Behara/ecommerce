interface NullDataProps {
    title: string
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
    return (
        <div className='flex w-full text-xl md:text-2xl items-center justify-center h-[50vh]'>
            <h1 className='text-3xl font-bold'>{title}</h1>
        </div>
    )
}

export default NullData