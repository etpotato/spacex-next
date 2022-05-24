interface props {
  title?: String,
  error: {
    exist: Boolean,
    message: String,
  }
  children: React.ReactNode,
}

const Section: React.FC<props> = ({ title, error, children }) => (
  <section>
    <>
      <h2 className='font-bold mb-6'>{title}</h2>
      { error.exist
        ? <p>{ error.message }</p>
        : children
      }
    </>
  </section>
);

export default Section;
