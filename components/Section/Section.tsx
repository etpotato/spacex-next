interface props {
  title?: String,
  error: Boolean,
  children: React.ReactNode,
}

const Section: React.FC<props> = ({ title, error, children }) => (
  <section>
    <>
      <h2 className='font-bold mb-6'>{title}</h2>
      { error
        ? <p className='text-red-600'>Error: can&apos;t load data. Please, reload the page.</p>
        : children
      }
    </>
  </section>
);

export default Section;
